import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('');

    // Sign up  
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill('test@ek.dk');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Test');
    await page.getByRole('textbox', { name: 'Repeat password' }).fill('Test');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByRole('button', { name: '×' }).click();

    // Log in
    await page.getByRole('link', { name: 'log in' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill('test@ek.dk');
    await page.getByRole('textbox', { name: 'Password' }).fill('Test');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Add products to the cart
    await page.getByRole('article').filter({ hasText: 'men\'s clothingMens Casual Premium Slim Fit T-ShirtsSlim-fitting style, contrast' }).getByRole('button').click();
    await page.getByRole('article').filter({ hasText: 'electronicsSanDisk SSD PLUS' }).getByRole('spinbutton').fill('2');
    await page.getByRole('article').filter({ hasText: 'electronicsSanDisk SSD PLUS' }).getByRole('button').click();
    
    // Changing product quantity in the cart
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('row', { name: 'SanDisk SSD PLUS 1TB Internal' }).getByRole('spinbutton').fill('3');
    
    // Check out
    await page.getByRole('button', { name: 'Check Out' }).click();  
    await page.getByRole('group', { name: 'Delivery address' }).getByLabel('Address').fill('Guldbergsgade 29N');
    await page.getByRole('group', { name: 'Delivery address' }).getByLabel('Postal code').fill('2200');
    await page.getByRole('group', { name: 'Delivery address' }).getByLabel('City').fill('Copenhagen');
    await page.getByRole('checkbox', { name: 'Same as delivery address' }).check();
    await page.getByRole('textbox', { name: 'Name on card' }).fill('Pernille L. Hansen');
    await page.getByRole('textbox', { name: 'Expiration' }).fill('2027-12');
    await page.getByRole('textbox', { name: 'CVV' }).fill('666');
    await page.getByRole('button', { name: 'Place Purchase' }).click();
    
    // Check that the cart is empty
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('#alert section p')).toHaveText('The cart is empty. Please add some products to the cart.');
    await page.getByRole('button', { name: '×' }).click();

    // Log out
    await page.getByRole('link', { name: 'Log out' }).click();
    await expect(page.locator('#optLogin a')).toHaveText('Log in');
});