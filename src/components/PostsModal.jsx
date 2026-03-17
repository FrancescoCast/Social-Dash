import PropTypes from 'prop-types'
import { initials } from '../utils/initials'

export default function PostsModal({ user, posts, onClose, onDeletePost }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        <div className="modal__header">
          <div className="modal__user">
            <div className="modal__avatar">{initials(user.name)}</div>
            <div>
              <p className="modal__user-name">{user.name}</p>
              <p className="modal__user-email">{user.email}</p>
            </div>
          </div>
          <div className="modal__header-right">
            <span className="modal__count">{posts.length} post</span>
            <button className="modal__close" onClick={onClose} aria-label="Chiudi">✕</button>
          </div>
        </div>

        <div className="modal__body">
          {posts.length === 0 ? (
            <p className="modal__empty">Nessun post disponibile.</p>
          ) : (
            <ul className="post-list">
              {posts.map(post => (
                <li key={post.id} className="post-item">
                  <div className="post-item__content">
                    <span className="post-item__id">#{post.id}</span>
                    <div>
                      <p className="post-item__title">{post.title}</p>
                      <p className="post-item__body">{post.body}</p>
                    </div>
                  </div>
                  <button
                    className="btn-delete btn-delete--sm"
                    onClick={() => onDeletePost(post.id)}
                    aria-label="Elimina post"
                  >
                    Elimina
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}

PostsModal.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
}