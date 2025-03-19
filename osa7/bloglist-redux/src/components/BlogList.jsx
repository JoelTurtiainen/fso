import { useDispatch, useSelector } from 'react-redux'
import styles from '../style.module.css'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  if (blogs.length < 1) {
    return 'no blogs'
  }

  return (
    <ul className={styles.nostyle}>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <li key={blog.id} className={styles.blog}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default BlogList
