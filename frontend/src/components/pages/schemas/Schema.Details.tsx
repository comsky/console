/**
 * Copyright 2022 Redpanda Data, Inc.
 *
 * Use of this software is governed by the Business Source License
 * included in the file https://github.com/redpanda-data/redpanda/blob/dev/licenses/bsl.md
 *
 * As of the Change Date specified in that file, in accordance with
 * the Business Source License, use of this software will be governed
 * by the Apache License, Version 2.0
 */

import { useState } from 'react';
import { observer } from 'mobx-react';
import { appGlobal } from '../../../state/appGlobal';
import { api } from '../../../state/backendApi';
import { PageComponent, PageInitHelper } from '../Page';
import { DefaultSkeleton, Label } from '../../../utils/tsxUtils';
import PageContent from '../../misc/PageContent';
import { makeObservable, observable } from 'mobx';
import { editQuery } from '../../../utils/queryHelper';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CodeBlock, Divider, Flex, Grid, GridItem, ListItem, Tabs, UnorderedList, useToast } from '@redpanda-data/ui';
import { SmallStat } from '../../misc/SmallStat';
import { SchemaRegistrySubjectDetails, SchemaRegistryVersionedSchema } from '../../../state/restInterfaces';
import { Text } from '@redpanda-data/ui';
import { Link } from '@redpanda-data/ui';
import { Link as ReactRouterLink } from 'react-router-dom';
import { SingleSelect } from '../../misc/Select';
import { openDeleteModal, openPermanentDeleteModal } from './modals';
import { KowlDiffEditor } from '../../misc/KowlEditor';

@observer
class SchemaDetailsView extends PageComponent<{ subjectName: string }> {
    subjectNameRaw: string;
    subjectNameEncoded: string;

    @observable version = 'latest' as 'latest' | number;

    initPage(p: PageInitHelper): void {

        const subjectNameRaw = decodeURIComponent(this.props.subjectName);
        const subjectNameEncoded = encodeURIComponent(subjectNameRaw);

        const version = getVersionFromQuery();
        editQuery(x => {
            x.version = String(version);
        });

        p.title = subjectNameRaw;
        p.addBreadcrumb('Schema Registry', '/schema-registry');
        p.addBreadcrumb(subjectNameRaw, `/schema-registry/${subjectNameEncoded}?version=${version}`);
        this.refreshData(false);
        appGlobal.onRefresh = () => this.refreshData(true);
    }

    constructor(p: any) {
        super(p);
        this.subjectNameRaw = decodeURIComponent(this.props.subjectName);
        this.subjectNameEncoded = encodeURIComponent(this.subjectNameRaw);
        makeObservable(this);
    }

    refreshData(force?: boolean) {
        api.refreshSchemaConfig(force);
        api.refreshSchemaMode(force);
        api.refreshSchemaSubjects(force);
        api.refreshSchemaTypes(force);

        const encoded = decodeURIComponent(this.props.subjectName);
        api.refreshSchemaDetails(encoded, force);
    }

    render() {
        this.subjectNameRaw = decodeURIComponent(this.props.subjectName);
        this.subjectNameEncoded = encodeURIComponent(this.subjectNameRaw);

        const subject = api.schemaDetails.get(this.subjectNameRaw);
        if (!subject) return DefaultSkeleton;

        return (
            <PageContent key="b">
                {/* Statistics Bar */}
                <Flex gap="1rem" alignItems="center">
                    <SmallStat title="Format">{subject.type}</SmallStat>
                    <Divider height="2ch" orientation="vertical" />

                    <SmallStat title="Compatability">{subject.compatibility}</SmallStat>
                    <Divider height="2ch" orientation="vertical" />

                    <SmallStat title="Active Versions">{subject.schemas.count(x => !x.isSoftDeleted)}</SmallStat>
                </Flex>

                {/* Buttons */}
                <Flex gap="2">
                    <Button variant="outline">Edit Compatability</Button>
                    <Button variant="outline">Add new version</Button>
                    <Button variant="outline">Delete subject</Button>
                </Flex>

                {/* Definition / Diff */}
                <Tabs
                    isFitted
                    items={[
                        {
                            key: 'definition',
                            name: 'Definition',
                            component: <SubjectDefinition subject={subject} />
                        },
                        {
                            key: 'diff',
                            name: 'Version diff',
                            component: <VersionDiff subject={subject} />
                        }
                    ]} />



            </PageContent>
        );
    }
}

function getVersionFromQuery(): 'latest' | number {
    const query = new URLSearchParams(window.location.search);
    if (query.has('version')) {
        const versionStr = query.get('version');

        if (versionStr != '' && !isNaN(Number(versionStr))) {
            return Number(versionStr);
        }

        if (versionStr == 'latest')
            return 'latest';

        console.log(`unknown version string in query: "${versionStr}" will be ignored, proceeding with "latest"`);
    }

    return 'latest';
}

function schemaTypeToCodeBlockLanguage(type: string) {
    const lower = type.toLowerCase();
    switch (lower) {
        case 'json':
        case 'avro':
            return 'json';

        default:
        case 'proto':
        case 'protobuf':
            return 'protobuf';

    }
}

function getFormattedSchemaText(schema: SchemaRegistryVersionedSchema) {
    const lower = schema.type.toLowerCase();
    if (lower == 'avro' || lower == 'json')
        return JSON.stringify(JSON.parse(schema.schema), undefined, 4);
    return schema.schema;
}

const SubjectDefinition = observer((p: { subject: SchemaRegistrySubjectDetails }) => {
    const toast = useToast();

    const subject = p.subject;

    const defaultVersion = subject.versions[subject.versions.length - 1].version;
    const [selectedVersion, setSelectedVersion] = useState(defaultVersion);

    const schema = subject.schemas.first(x => x.version == selectedVersion)!;
    if (!schema) {
        setSelectedVersion(defaultVersion);
        return null;
    }

    const formattedSchema = getFormattedSchemaText(schema);

    return <Flex gap="10">

        {/* Left Side */}
        <Flex direction="column" gap="4" flexGrow="1" minWidth="0">

            {/* Version Select / Delete / Recover */}
            <Flex gap="2" alignItems="flex-end">
                <Label text="Version">
                    <Box width="200px">
                        <SingleSelect
                            value={selectedVersion}
                            onChange={value => {
                                editQuery(x => x.version = String(value));
                                setSelectedVersion(value);
                            }}
                            options={subject.versions.map((v) => ({
                                value: v.version,
                                label: String(v.version)
                                    + (v.isSoftDeleted ? ' (soft-deleted)' : '')
                                    + ((subject.versions[subject.versions.length - 1] == v) ? ' (latest)' : ''),
                            }))}
                            isDisabled={subject.versions.length == 0}
                        />
                    </Box>
                </Label>
                <Flex height="36px" alignItems="center" ml="4">
                    Schema ID: {schema.id}
                </Flex>

                {schema.isSoftDeleted
                    ? <>
                        <Button
                            variant="outline" ml="auto"
                            onClick={() => openPermanentDeleteModal(`${subject.name} version ${schema.version}`, () => {
                                api.deleteSchemaSubjectVersion(subject.name, schema.version, true)
                                    .then(() => {
                                        api.refreshSchemaDetails(subject.name, true);

                                        toast({
                                            status: 'success', duration: 4000, isClosable: false,
                                            title: 'Schema version permanently deleted'
                                        });
                                    })
                                    .catch(err => {
                                        toast({
                                            status: 'error', duration: null, isClosable: true,
                                            title: 'Failed to permanently delete schema version',
                                            description: String(err),
                                        })
                                    });
                            })}>
                            Permanent delete
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => {
                                api.createSchema(subject.name, {
                                    references: schema.references,
                                    schema: schema.schema,
                                    schemaType: schema.type,
                                })
                                    .then(r => {
                                        toast({
                                            status: 'success', duration: 4000, isClosable: false,
                                            title: `Schema ${subject.name} ${schema.version} has been recovered`,
                                            description: 'Schema ID: ' + r.id,
                                        })
                                    })
                                    .catch(err => {
                                        toast({
                                            status: 'error', duration: null, isClosable: true,
                                            title: `Failed to recover schema ${subject.name} ${schema.version} `,
                                            description: 'Error: ' + String(err),
                                        })
                                    })
                            }}>
                            Recover
                        </Button>
                    </>
                    : <>
                        <Button variant="outline" ml="auto" onClick={() => openDeleteModal(`${subject.name} version ${schema.version}`, () => {
                            api.deleteSchemaSubjectVersion(subject.name, schema.version, false)
                                .then(() => {
                                    api.refreshSchemaDetails(subject.name, true);

                                    toast({
                                        status: 'success', duration: 4000, isClosable: false,
                                        title: 'Schema version deleted',
                                        description: 'You can recover or permanently delete it.',
                                    });
                                })
                                .catch(err => {
                                    toast({
                                        status: 'error', duration: null, isClosable: true,
                                        title: 'Failed to delete schema version',
                                        description: String(err),
                                    })
                                });
                        })}>Delete</Button>
                    </>}
            </Flex>

            {/* Deleted Hint */}
            {schema.isSoftDeleted &&
                <Alert status="warning" variant="left-accent">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Soft-deleted schema</AlertTitle>
                        <AlertDescription>This schema has been soft-deleted. It is still required by other schemas. It remains readable.</AlertDescription>
                    </Box>
                </Alert>
            }

            {/* Code Block */}
            <CodeBlock
                codeString={formattedSchema}
                language={schemaTypeToCodeBlockLanguage(schema.type)}
                theme="light"
                showLineNumbers
                showCopyButton={false}
            />

        </Flex>

        {/* References Box */}
        <Box mt="20">
            <SchemaReferences schema={schema} />
        </Box>

    </Flex>
});


const VersionDiff = observer((p: { subject: SchemaRegistrySubjectDetails }) => {
    const subject = p.subject;

    const defaultVersionLeft = subject.versions[0].version;
    const defaultVersionRight = subject.versions[subject.versions.length - 1].version;

    const [selectedVersionLeft, setSelectedVersionLeft] = useState(defaultVersionLeft);
    const [selectedVersionRight, setSelectedVersionRight] = useState(defaultVersionRight);

    const schemaLeft = subject.schemas.first(x => x.version == selectedVersionLeft);
    const schemaRight = subject.schemas.first(x => x.version == selectedVersionRight);
    if (!schemaLeft) {
        setSelectedVersionLeft(subject.versions[0].version);
        return null;
    }
    if (!schemaRight) {
        setSelectedVersionLeft(subject.versions[0].version);
        return null;
    }

    return <Flex direction="column" gap="10">

        {/* Two version selectors */}
        <Grid templateColumns="repeat(2, 1fr)" gap="4" minWidth="0" width="100%" >
            <GridItem w="100%" >
                {/* Version Select / Delete / Recover */}
                <Flex gap="2" alignItems="flex-end">
                    <Label text="Version">
                        <Box width="200px">
                            <SingleSelect
                                value={selectedVersionLeft}
                                onChange={value => {
                                    setSelectedVersionLeft(value);
                                }}
                                options={subject.versions.map((v) => ({
                                    value: v.version,
                                    label: String(v.version)
                                        + (v.isSoftDeleted ? ' (soft-deleted)' : '')
                                        + ((subject.versions[subject.versions.length - 1] == v) ? ' (latest)' : ''),
                                }))}
                                isDisabled={subject.versions.length == 0}
                            />
                        </Box>
                    </Label>
                    <Flex height="36px" alignItems="center" ml="4">
                        Schema ID: {schemaLeft.id}
                    </Flex>
                </Flex>
            </GridItem>

            <GridItem w="100%" >
                {/* Version Select / Delete / Recover */}
                <Flex gap="2" alignItems="flex-end">
                    <Label text="Version">
                        <Box width="200px">
                            <SingleSelect
                                value={selectedVersionRight}
                                onChange={value => {
                                    setSelectedVersionRight(value);
                                }}
                                options={subject.versions.map((v) => ({
                                    value: v.version,
                                    label: String(v.version)
                                        + (v.isSoftDeleted ? ' (soft-deleted)' : '')
                                        + ((subject.versions[subject.versions.length - 1] == v) ? ' (latest)' : ''),
                                }))}
                                isDisabled={subject.versions.length == 0}
                            />
                        </Box>
                    </Label>
                    <Flex height="36px" alignItems="center" ml="4">
                        Schema ID: {schemaRight.id}
                    </Flex>
                </Flex>
            </GridItem>

        </Grid>

        {/* Diff View */}
        <KowlDiffEditor height="800px"
            language={schemaTypeToCodeBlockLanguage(schemaLeft.type)}
            original={getFormattedSchemaText(schemaLeft)}
            modified={getFormattedSchemaText(schemaRight)}
            options={{
                readOnly: true,
            }} />
    </Flex>
});

const SchemaReferences = observer((p: { schema: SchemaRegistryVersionedSchema }) => {
    const { schema } = p;

    return <>
        <Text fontSize="lg" fontWeight="bold">References</Text>
        <Text mb="6">
            Schemas that are required by this version. <Link as={ReactRouterLink} to="/home">Learn More</Link>
        </Text>

        {schema.references.length > 0
            ? <UnorderedList>
                {schema.references.map(ref => {
                    return <ListItem key={ref.name + ref.subject + ref.version}>
                        <Link as={ReactRouterLink} to={`/schema-registry/subjects/${encodeURIComponent(ref.subject)}?version=${ref.version}`}>{ref.name}</Link>
                    </ListItem>
                })}
            </UnorderedList>
            : <Text>This schema has no references.</Text>
        }
    </>
})

export default SchemaDetailsView;

