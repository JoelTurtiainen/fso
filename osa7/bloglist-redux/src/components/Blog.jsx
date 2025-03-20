import PropTypes from 'prop-types'
import styles from '../style.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const Blog = ({ blog, isOwner }) => {
  const [newComment, setNewComment] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const updateHandler = async (blogObject) => {
    // Only used for updating likes at the moment
    try {
      dispatch(likeBlog(blogObject.id))
      dispatch(setNotification(`liked blog '${blogObject.title}'`))
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeHandler = async (blogObject) => {
    if (!confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`))
      return
    let msg

    try {
      dispatch(removeBlog(blogObject.id, user))
      msg = `Removed blog ${blogObject.title} by ${blogObject.author}`
    } catch ({ status }) {
      if (status === 401 && user.username === blogObject.user.username) {
        msg = 'Token Expired'
      } else if (status === 401) {
        msg = 'Could not delete the blog, Are you the author?'
      } else {
        msg = 'Uh oh'
      }
    }
    dispatch(setNotification(msg))
  }

  const submitComment = (e) => {
    e.preventDefault()
    try {
      dispatch(commentBlog({ id: blog.id, newComment }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <article>
      <div>
        <h2 className="display-5 mb-1">
          {blog.title}
          <span className="lead"> {blog.author}</span>
        </h2>
      </div>
      <ul className={styles.nostyle}>
        <li>
          <a href={blog.url}>{blog.url}</a>
        </li>
        <li>
          {`likes ${blog.likes} `}
          <Button
            size="sm"
            variant="primary"
            onClick={() => updateHandler(blog)}
          >
            like
          </Button>
        </li>
        <li>
          {blog.user.name}
          {isOwner && (
            <Button
              size="sm"
              variant="danger"
              onClick={() => removeHandler(blog, user)}
            >
              remove
            </Button>
          )}
        </li>
      </ul>
      <h3>comments</h3>
      <Form onSubmit={submitComment}>
        <Row className="align-items-center">
          <Col>
            <Form.Control
              type="text"
              name="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Col>
          <Col>
            <Button type="submit">add comment</Button>
          </Col>
        </Row>
      </Form>
      {blog.comments && (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}
    </article>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func,
  removeBlog: PropTypes.func,
  isOwner: PropTypes.bool,
}

export default Blog
