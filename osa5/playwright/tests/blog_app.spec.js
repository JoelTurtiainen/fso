const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')



describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
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

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, { title: 'Test Blog Title', author: 'P. Wrightington', url: 'google.com' })
      await page.getByRole('button', { name: 'show' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText(/^likes 1/)).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await createBlog(page, { title: 'Test Blog Title', author: 'P. Wrightington', url: 'google.com' })
      await page.getByRole('button', { name: 'show' }).click()
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('Removed blog Test Blog Title')).toBeVisible()
    })

    test('blog remove button is only visible for the blog owner', async ({ page, request }) => {
      await request.post('/api/users', {
        data: {
          name: 'C. Wellington',
          username: 'wellington',
          password: 'abc123'
        }
      })

      await createBlog(page, { title: 'Test Blog Title', author: 'P. Wrightington', url: 'google.com' })
      await expect(page.getByText(/^Test Blog Title/).last()).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'wellington', 'abc123')
      await page.getByRole('button', { name: 'show' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeHidden()
    })
  })
})
