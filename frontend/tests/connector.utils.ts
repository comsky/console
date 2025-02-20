import { Page, test, expect } from '@playwright/test';
import { ACCESS_KEY, S3_BUCKET_NAME, SECRET_ACCESS_KEY } from './connector.spec';

export const createConnector = async(page: Page, { connectorName }: {connectorName: string}) => {
    return await test.step('Delete connector', async () => {
        await page.goto('/connect-clusters')
        await page
            .getByRole('button', {name: 'Create connector', exact: true})
            .click();

        await page.getByTestId('search-field-input').fill('s3');
        await page.getByText('S3', {exact: true}).click();

        await page.getByLabel('AWS access key ID*').fill(ACCESS_KEY);
        await page.getByLabel('AWS secret access key*').fill(SECRET_ACCESS_KEY);
        await page.getByLabel('AWS S3 bucket name*').fill(S3_BUCKET_NAME);

        const connectorInput = page.getByLabel('Connector name*')
        await connectorInput.scrollIntoViewIfNeeded();
        await connectorInput.clear();
        await connectorInput.fill(connectorName);
        await expect(connectorInput).toHaveValue(connectorName, {
            timeout: 2000
        });
        await connectorInput.blur();

        await page.waitForTimeout(1000)

        await expect(page.getByRole('button', {name: 'Next'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Next'})).toBeEnabled();
        await page.getByRole('button', {name: 'Next'}).click();


        await expect(page.getByRole('button', {name: 'Create'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Create'})).toBeEnabled();
        await page.getByRole('button', {name: 'Create'}).click();
    });
}

export const deleteConnector = async (page: Page, { connectorName }: { connectorName: string }) => {
    return await test.step('Delete connector', async () => {
        await page.goto(`/connect-clusters/example-connect-cluster/${connectorName}`)

        await page.getByRole('button', { name: 'Delete' }).click();

        await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Yes' })).toBeEnabled();

        await page.getByRole('button', { name: 'Yes' }).click();

        await expect(page.getByText('Deleted connector')).toBeVisible();
    });
};
