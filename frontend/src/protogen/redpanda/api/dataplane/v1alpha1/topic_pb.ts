// @generated by protoc-gen-es v1.4.0 with parameter "target=ts,import_extension="
// @generated from file redpanda/api/dataplane/v1alpha1/topic.proto (package redpanda.api.dataplane.v1alpha1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.Topic
 */
export class Topic extends Message<Topic> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: bool is_internal = 2;
   */
  isInternal = false;

  /**
   * @generated from field: int32 partition_count = 3;
   */
  partitionCount = 0;

  /**
   * @generated from field: int32 replication_factor = 4;
   */
  replicationFactor = 0;

  /**
   * configurations is omitted in ListTopics.
   *
   * redpanda.api.common.v1alpha1.ErrorStatus x = 7;
   *
   * @generated from field: repeated redpanda.api.dataplane.v1alpha1.Topic.Configuration configuration = 5;
   */
  configuration: Topic_Configuration[] = [];

  constructor(data?: PartialMessage<Topic>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.Topic";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "is_internal", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "partition_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "replication_factor", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "configuration", kind: "message", T: Topic_Configuration, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Topic {
    return new Topic().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Topic {
    return new Topic().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Topic {
    return new Topic().fromJsonString(jsonString, options);
  }

  static equals(a: Topic | PlainMessage<Topic> | undefined, b: Topic | PlainMessage<Topic> | undefined): boolean {
    return proto3.util.equals(Topic, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.Topic.Configuration
 */
export class Topic_Configuration extends Message<Topic_Configuration> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string type = 2;
   */
  type = "";

  /**
   * @generated from field: string value = 3;
   */
  value = "";

  /**
   * Enum ?
   *
   * @generated from field: redpanda.api.dataplane.v1alpha1.Topic.Configuration.Source source = 4;
   */
  source = Topic_Configuration_Source.UNSPECIFIED;

  /**
   * @generated from field: bool is_read_only = 5;
   */
  isReadOnly = false;

  /**
   * @generated from field: bool is_sensitive = 6;
   */
  isSensitive = false;

  /**
   * @generated from field: repeated redpanda.api.dataplane.v1alpha1.Topic.Configuration.ConfigSynonym config_synonyms = 7;
   */
  configSynonyms: Topic_Configuration_ConfigSynonym[] = [];

  /**
   * @generated from field: string documentation = 8;
   */
  documentation = "";

  constructor(data?: PartialMessage<Topic_Configuration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.Topic.Configuration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "source", kind: "enum", T: proto3.getEnumType(Topic_Configuration_Source) },
    { no: 5, name: "is_read_only", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "is_sensitive", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 7, name: "config_synonyms", kind: "message", T: Topic_Configuration_ConfigSynonym, repeated: true },
    { no: 8, name: "documentation", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Topic_Configuration {
    return new Topic_Configuration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Topic_Configuration {
    return new Topic_Configuration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Topic_Configuration {
    return new Topic_Configuration().fromJsonString(jsonString, options);
  }

  static equals(a: Topic_Configuration | PlainMessage<Topic_Configuration> | undefined, b: Topic_Configuration | PlainMessage<Topic_Configuration> | undefined): boolean {
    return proto3.util.equals(Topic_Configuration, a, b);
  }
}

/**
 * @generated from enum redpanda.api.dataplane.v1alpha1.Topic.Configuration.Source
 */
export enum Topic_Configuration_Source {
  /**
   * @generated from enum value: SOURCE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: SOURCE_DYNAMIC_TOPIC_CONFIG = 1;
   */
  DYNAMIC_TOPIC_CONFIG = 1,

  /**
   * @generated from enum value: SOURCE_DYNAMIC_BROKER_CONFIG = 2;
   */
  DYNAMIC_BROKER_CONFIG = 2,

  /**
   * @generated from enum value: SOURCE_DYNAMIC_DEFAULT_BROKER_CONFIG = 3;
   */
  DYNAMIC_DEFAULT_BROKER_CONFIG = 3,

  /**
   * @generated from enum value: SOURCE_STATIC_BROKER_CONFIG = 4;
   */
  STATIC_BROKER_CONFIG = 4,

  /**
   * @generated from enum value: SOURCE_DEFAULT_CONFIG = 5;
   */
  DEFAULT_CONFIG = 5,

  /**
   * @generated from enum value: SOURCE_DYNAMIC_BROKER_LOGGER_CONFIG = 6;
   */
  DYNAMIC_BROKER_LOGGER_CONFIG = 6,
}
// Retrieve enum metadata with: proto3.getEnumType(Topic_Configuration_Source)
proto3.util.setEnumType(Topic_Configuration_Source, "redpanda.api.dataplane.v1alpha1.Topic.Configuration.Source", [
  { no: 0, name: "SOURCE_UNSPECIFIED" },
  { no: 1, name: "SOURCE_DYNAMIC_TOPIC_CONFIG" },
  { no: 2, name: "SOURCE_DYNAMIC_BROKER_CONFIG" },
  { no: 3, name: "SOURCE_DYNAMIC_DEFAULT_BROKER_CONFIG" },
  { no: 4, name: "SOURCE_STATIC_BROKER_CONFIG" },
  { no: 5, name: "SOURCE_DEFAULT_CONFIG" },
  { no: 6, name: "SOURCE_DYNAMIC_BROKER_LOGGER_CONFIG" },
]);

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.Topic.Configuration.ConfigSynonym
 */
export class Topic_Configuration_ConfigSynonym extends Message<Topic_Configuration_ConfigSynonym> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string value = 2;
   */
  value = "";

  /**
   * Enum?
   *
   * @generated from field: redpanda.api.dataplane.v1alpha1.Topic.Configuration.Source source = 3;
   */
  source = Topic_Configuration_Source.UNSPECIFIED;

  constructor(data?: PartialMessage<Topic_Configuration_ConfigSynonym>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.Topic.Configuration.ConfigSynonym";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "source", kind: "enum", T: proto3.getEnumType(Topic_Configuration_Source) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Topic_Configuration_ConfigSynonym {
    return new Topic_Configuration_ConfigSynonym().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Topic_Configuration_ConfigSynonym {
    return new Topic_Configuration_ConfigSynonym().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Topic_Configuration_ConfigSynonym {
    return new Topic_Configuration_ConfigSynonym().fromJsonString(jsonString, options);
  }

  static equals(a: Topic_Configuration_ConfigSynonym | PlainMessage<Topic_Configuration_ConfigSynonym> | undefined, b: Topic_Configuration_ConfigSynonym | PlainMessage<Topic_Configuration_ConfigSynonym> | undefined): boolean {
    return proto3.util.equals(Topic_Configuration_ConfigSynonym, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.CreateTopicRequest
 */
export class CreateTopicRequest extends Message<CreateTopicRequest> {
  /**
   * TBD if we want to use separate message for Topic in CreateTopic.
   *
   * @generated from field: redpanda.api.dataplane.v1alpha1.Topic topic = 1;
   */
  topic?: Topic;

  constructor(data?: PartialMessage<CreateTopicRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.CreateTopicRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "topic", kind: "message", T: Topic },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateTopicRequest {
    return new CreateTopicRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateTopicRequest {
    return new CreateTopicRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateTopicRequest {
    return new CreateTopicRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateTopicRequest | PlainMessage<CreateTopicRequest> | undefined, b: CreateTopicRequest | PlainMessage<CreateTopicRequest> | undefined): boolean {
    return proto3.util.equals(CreateTopicRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.CreateTopicResponse
 */
export class CreateTopicResponse extends Message<CreateTopicResponse> {
  /**
   * @generated from field: redpanda.api.dataplane.v1alpha1.Topic topic = 1;
   */
  topic?: Topic;

  constructor(data?: PartialMessage<CreateTopicResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.CreateTopicResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "topic", kind: "message", T: Topic },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateTopicResponse {
    return new CreateTopicResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateTopicResponse {
    return new CreateTopicResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateTopicResponse {
    return new CreateTopicResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateTopicResponse | PlainMessage<CreateTopicResponse> | undefined, b: CreateTopicResponse | PlainMessage<CreateTopicResponse> | undefined): boolean {
    return proto3.util.equals(CreateTopicResponse, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.ListTopicsRequest
 */
export class ListTopicsRequest extends Message<ListTopicsRequest> {
  /**
   * @generated from field: redpanda.api.dataplane.v1alpha1.ListTopicsRequest.Filter filter = 1;
   */
  filter?: ListTopicsRequest_Filter;

  /**
   * @generated from field: int32 page_size = 2;
   */
  pageSize = 0;

  /**
   * Value of the next_page_token field returned by the previous response. If not provided, the system assumes the first page is requested.
   *
   * @generated from field: string page_token = 3;
   */
  pageToken = "";

  constructor(data?: PartialMessage<ListTopicsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.ListTopicsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "filter", kind: "message", T: ListTopicsRequest_Filter },
    { no: 2, name: "page_size", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTopicsRequest {
    return new ListTopicsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTopicsRequest {
    return new ListTopicsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTopicsRequest {
    return new ListTopicsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListTopicsRequest | PlainMessage<ListTopicsRequest> | undefined, b: ListTopicsRequest | PlainMessage<ListTopicsRequest> | undefined): boolean {
    return proto3.util.equals(ListTopicsRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.ListTopicsRequest.Filter
 */
export class ListTopicsRequest_Filter extends Message<ListTopicsRequest_Filter> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  constructor(data?: PartialMessage<ListTopicsRequest_Filter>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.ListTopicsRequest.Filter";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTopicsRequest_Filter {
    return new ListTopicsRequest_Filter().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTopicsRequest_Filter {
    return new ListTopicsRequest_Filter().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTopicsRequest_Filter {
    return new ListTopicsRequest_Filter().fromJsonString(jsonString, options);
  }

  static equals(a: ListTopicsRequest_Filter | PlainMessage<ListTopicsRequest_Filter> | undefined, b: ListTopicsRequest_Filter | PlainMessage<ListTopicsRequest_Filter> | undefined): boolean {
    return proto3.util.equals(ListTopicsRequest_Filter, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.ListTopicsResponse
 */
export class ListTopicsResponse extends Message<ListTopicsResponse> {
  /**
   * @generated from field: repeated redpanda.api.dataplane.v1alpha1.Topic topics = 1;
   */
  topics: Topic[] = [];

  /**
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken = "";

  constructor(data?: PartialMessage<ListTopicsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.ListTopicsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "topics", kind: "message", T: Topic, repeated: true },
    { no: 2, name: "next_page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTopicsResponse {
    return new ListTopicsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTopicsResponse {
    return new ListTopicsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTopicsResponse {
    return new ListTopicsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListTopicsResponse | PlainMessage<ListTopicsResponse> | undefined, b: ListTopicsResponse | PlainMessage<ListTopicsResponse> | undefined): boolean {
    return proto3.util.equals(ListTopicsResponse, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.DeleteTopicRequest
 */
export class DeleteTopicRequest extends Message<DeleteTopicRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  constructor(data?: PartialMessage<DeleteTopicRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.DeleteTopicRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTopicRequest {
    return new DeleteTopicRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTopicRequest {
    return new DeleteTopicRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTopicRequest {
    return new DeleteTopicRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteTopicRequest | PlainMessage<DeleteTopicRequest> | undefined, b: DeleteTopicRequest | PlainMessage<DeleteTopicRequest> | undefined): boolean {
    return proto3.util.equals(DeleteTopicRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.DeleteTopicResponse
 */
export class DeleteTopicResponse extends Message<DeleteTopicResponse> {
  constructor(data?: PartialMessage<DeleteTopicResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.DeleteTopicResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTopicResponse {
    return new DeleteTopicResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTopicResponse {
    return new DeleteTopicResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTopicResponse {
    return new DeleteTopicResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteTopicResponse | PlainMessage<DeleteTopicResponse> | undefined, b: DeleteTopicResponse | PlainMessage<DeleteTopicResponse> | undefined): boolean {
    return proto3.util.equals(DeleteTopicResponse, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.GetTopicConfigurationRequest
 */
export class GetTopicConfigurationRequest extends Message<GetTopicConfigurationRequest> {
  /**
   * @generated from field: string topic_name = 1;
   */
  topicName = "";

  constructor(data?: PartialMessage<GetTopicConfigurationRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.GetTopicConfigurationRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "topic_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTopicConfigurationRequest {
    return new GetTopicConfigurationRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTopicConfigurationRequest {
    return new GetTopicConfigurationRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTopicConfigurationRequest {
    return new GetTopicConfigurationRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetTopicConfigurationRequest | PlainMessage<GetTopicConfigurationRequest> | undefined, b: GetTopicConfigurationRequest | PlainMessage<GetTopicConfigurationRequest> | undefined): boolean {
    return proto3.util.equals(GetTopicConfigurationRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.GetTopicConfigurationResponse
 */
export class GetTopicConfigurationResponse extends Message<GetTopicConfigurationResponse> {
  /**
   * @generated from field: repeated redpanda.api.dataplane.v1alpha1.Topic.Configuration configuration = 1;
   */
  configuration: Topic_Configuration[] = [];

  constructor(data?: PartialMessage<GetTopicConfigurationResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.GetTopicConfigurationResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "configuration", kind: "message", T: Topic_Configuration, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTopicConfigurationResponse {
    return new GetTopicConfigurationResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTopicConfigurationResponse {
    return new GetTopicConfigurationResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTopicConfigurationResponse {
    return new GetTopicConfigurationResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetTopicConfigurationResponse | PlainMessage<GetTopicConfigurationResponse> | undefined, b: GetTopicConfigurationResponse | PlainMessage<GetTopicConfigurationResponse> | undefined): boolean {
    return proto3.util.equals(GetTopicConfigurationResponse, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.UpdateTopicConfigurationRequest
 */
export class UpdateTopicConfigurationRequest extends Message<UpdateTopicConfigurationRequest> {
  /**
   * @generated from field: string topic_name = 1;
   */
  topicName = "";

  /**
   * @generated from field: repeated redpanda.api.dataplane.v1alpha1.UpdateTopicConfigurationRequest.UpdateConfiguration configuration = 2;
   */
  configuration: UpdateTopicConfigurationRequest_UpdateConfiguration[] = [];

  constructor(data?: PartialMessage<UpdateTopicConfigurationRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.UpdateTopicConfigurationRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "topic_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "configuration", kind: "message", T: UpdateTopicConfigurationRequest_UpdateConfiguration, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateTopicConfigurationRequest {
    return new UpdateTopicConfigurationRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateTopicConfigurationRequest {
    return new UpdateTopicConfigurationRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateTopicConfigurationRequest {
    return new UpdateTopicConfigurationRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateTopicConfigurationRequest | PlainMessage<UpdateTopicConfigurationRequest> | undefined, b: UpdateTopicConfigurationRequest | PlainMessage<UpdateTopicConfigurationRequest> | undefined): boolean {
    return proto3.util.equals(UpdateTopicConfigurationRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.UpdateTopicConfigurationRequest.UpdateConfiguration
 */
export class UpdateTopicConfigurationRequest_UpdateConfiguration extends Message<UpdateTopicConfigurationRequest_UpdateConfiguration> {
  /**
   * @generated from field: string key = 1;
   */
  key = "";

  /**
   * @generated from field: string value = 2;
   */
  value = "";

  /**
   * @generated from field: redpanda.api.dataplane.v1alpha1.UpdateTopicConfigurationRequest.UpdateConfiguration.Operation operation = 3;
   */
  operation = UpdateTopicConfigurationRequest_UpdateConfiguration_Operation.UNSPECIFIED;

  constructor(data?: PartialMessage<UpdateTopicConfigurationRequest_UpdateConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.UpdateTopicConfigurationRequest.UpdateConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "operation", kind: "enum", T: proto3.getEnumType(UpdateTopicConfigurationRequest_UpdateConfiguration_Operation) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateTopicConfigurationRequest_UpdateConfiguration {
    return new UpdateTopicConfigurationRequest_UpdateConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateTopicConfigurationRequest_UpdateConfiguration {
    return new UpdateTopicConfigurationRequest_UpdateConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateTopicConfigurationRequest_UpdateConfiguration {
    return new UpdateTopicConfigurationRequest_UpdateConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateTopicConfigurationRequest_UpdateConfiguration | PlainMessage<UpdateTopicConfigurationRequest_UpdateConfiguration> | undefined, b: UpdateTopicConfigurationRequest_UpdateConfiguration | PlainMessage<UpdateTopicConfigurationRequest_UpdateConfiguration> | undefined): boolean {
    return proto3.util.equals(UpdateTopicConfigurationRequest_UpdateConfiguration, a, b);
  }
}

/**
 * @generated from enum redpanda.api.dataplane.v1alpha1.UpdateTopicConfigurationRequest.UpdateConfiguration.Operation
 */
export enum UpdateTopicConfigurationRequest_UpdateConfiguration_Operation {
  /**
   * @generated from enum value: OPERATION_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: OPERATION_SET = 1;
   */
  SET = 1,

  /**
   * @generated from enum value: OPERATION_DELETE = 2;
   */
  DELETE = 2,

  /**
   * @generated from enum value: OPERATION_APPEND = 3;
   */
  APPEND = 3,

  /**
   * @generated from enum value: OPERATION_SUBTRACT = 4;
   */
  SUBTRACT = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(UpdateTopicConfigurationRequest_UpdateConfiguration_Operation)
proto3.util.setEnumType(UpdateTopicConfigurationRequest_UpdateConfiguration_Operation, "redpanda.api.dataplane.v1alpha1.UpdateTopicConfigurationRequest.UpdateConfiguration.Operation", [
  { no: 0, name: "OPERATION_UNSPECIFIED" },
  { no: 1, name: "OPERATION_SET" },
  { no: 2, name: "OPERATION_DELETE" },
  { no: 3, name: "OPERATION_APPEND" },
  { no: 4, name: "OPERATION_SUBTRACT" },
]);

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.UpdateTopicConfigurationResponse
 */
export class UpdateTopicConfigurationResponse extends Message<UpdateTopicConfigurationResponse> {
  /**
   * Topic's complete set of configurations after this partial patch has been applied.
   *
   * @generated from field: repeated redpanda.api.dataplane.v1alpha1.Topic.Configuration configuration = 1;
   */
  configuration: Topic_Configuration[] = [];

  constructor(data?: PartialMessage<UpdateTopicConfigurationResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.UpdateTopicConfigurationResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "configuration", kind: "message", T: Topic_Configuration, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateTopicConfigurationResponse {
    return new UpdateTopicConfigurationResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateTopicConfigurationResponse {
    return new UpdateTopicConfigurationResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateTopicConfigurationResponse {
    return new UpdateTopicConfigurationResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateTopicConfigurationResponse | PlainMessage<UpdateTopicConfigurationResponse> | undefined, b: UpdateTopicConfigurationResponse | PlainMessage<UpdateTopicConfigurationResponse> | undefined): boolean {
    return proto3.util.equals(UpdateTopicConfigurationResponse, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.SetTopicConfigurationRequest
 */
export class SetTopicConfigurationRequest extends Message<SetTopicConfigurationRequest> {
  /**
   * @generated from field: string topic_name = 1;
   */
  topicName = "";

  /**
   * @generated from field: repeated redpanda.api.dataplane.v1alpha1.SetTopicConfigurationRequest.SetConfiguration configuration = 2;
   */
  configuration: SetTopicConfigurationRequest_SetConfiguration[] = [];

  constructor(data?: PartialMessage<SetTopicConfigurationRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.SetTopicConfigurationRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "topic_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "configuration", kind: "message", T: SetTopicConfigurationRequest_SetConfiguration, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SetTopicConfigurationRequest {
    return new SetTopicConfigurationRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SetTopicConfigurationRequest {
    return new SetTopicConfigurationRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SetTopicConfigurationRequest {
    return new SetTopicConfigurationRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SetTopicConfigurationRequest | PlainMessage<SetTopicConfigurationRequest> | undefined, b: SetTopicConfigurationRequest | PlainMessage<SetTopicConfigurationRequest> | undefined): boolean {
    return proto3.util.equals(SetTopicConfigurationRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.SetTopicConfigurationRequest.SetConfiguration
 */
export class SetTopicConfigurationRequest_SetConfiguration extends Message<SetTopicConfigurationRequest_SetConfiguration> {
  /**
   * @generated from field: string key = 1;
   */
  key = "";

  /**
   * @generated from field: string value = 2;
   */
  value = "";

  constructor(data?: PartialMessage<SetTopicConfigurationRequest_SetConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.SetTopicConfigurationRequest.SetConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SetTopicConfigurationRequest_SetConfiguration {
    return new SetTopicConfigurationRequest_SetConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SetTopicConfigurationRequest_SetConfiguration {
    return new SetTopicConfigurationRequest_SetConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SetTopicConfigurationRequest_SetConfiguration {
    return new SetTopicConfigurationRequest_SetConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: SetTopicConfigurationRequest_SetConfiguration | PlainMessage<SetTopicConfigurationRequest_SetConfiguration> | undefined, b: SetTopicConfigurationRequest_SetConfiguration | PlainMessage<SetTopicConfigurationRequest_SetConfiguration> | undefined): boolean {
    return proto3.util.equals(SetTopicConfigurationRequest_SetConfiguration, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.SetTopicConfigurationResponse
 */
export class SetTopicConfigurationResponse extends Message<SetTopicConfigurationResponse> {
  /**
   * @generated from field: repeated redpanda.api.dataplane.v1alpha1.Topic.Configuration configuration = 1;
   */
  configuration: Topic_Configuration[] = [];

  constructor(data?: PartialMessage<SetTopicConfigurationResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.SetTopicConfigurationResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "configuration", kind: "message", T: Topic_Configuration, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SetTopicConfigurationResponse {
    return new SetTopicConfigurationResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SetTopicConfigurationResponse {
    return new SetTopicConfigurationResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SetTopicConfigurationResponse {
    return new SetTopicConfigurationResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SetTopicConfigurationResponse | PlainMessage<SetTopicConfigurationResponse> | undefined, b: SetTopicConfigurationResponse | PlainMessage<SetTopicConfigurationResponse> | undefined): boolean {
    return proto3.util.equals(SetTopicConfigurationResponse, a, b);
  }
}

