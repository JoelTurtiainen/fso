const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    //await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'P. Wrightington',
        username: 'playwright',
        password: '12345'
      }
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    const locator = page.getByRole('button', { name: 'login' })
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('user can log in', async ({ page }) => {
      await loginWith(page, 'playwright', '12345')
      await expect(page.getByText('P. Wrightington logged in')).toBeVisible()
    })

    test('login fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'playwright', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'playwright', '12345')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, { title: 'Test Blog Title', author: 'P. Wrightington', url: 'google.com' })
      await expect(page.getByText(/^Test Blog Title/).last()).toBeVisible()
    })

    //test('a blog can be liked', async ({ page }) => {
    //  const locator = page.getByTestId('blogListing')
    //  console.log(locator)
    //})
  })
})
