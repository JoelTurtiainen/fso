const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByRole('textbox', { name: 'blogTitle' }).fill(title)
  await page.getByRole('textbox', { name: 'blogAuthor' }).fill(author)
  await page.getByRole('textbox', { name: 'blogUrl' }).fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }
