import PropTypes from 'prop-types'
import Avatar from './Avatar'

const SORT_OPTIONS = [
  { key: 'name',    label: 'Nome' },
  { key: 'email',   label: 'Email' },
  { key: 'city',    label: 'Città' },
  { key: 'company', label: 'Azienda' },
  { key: 'posts',   label: 'Post' },
]

export default function UsersMobileList({ users, postCounts, longestUserId, onDelete, onViewPosts, sort, onSort }) {
  return (
    <div className="mobile-list">
      <div className="mobile-sort">
        <span className="mobile-sort__label">Ordina per</span>
        <div className="mobile-sort__options">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`mobile-sort__btn${sort.key === opt.key ? ' mobile-sort__btn--active' : ''}`}
              onClick={() => onSort(opt.key)}
            >
              {opt.label}
              {sort.key === opt.key && (
                <span className="mobile-sort__arrow">
                  {sort.dir === 'asc' ? ' ↑' : ' ↓'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mobile-list__header">
        <span className="mobile-list__title">Elenco utenti</span>
        <span className="mobile-list__count">{users.length} utenti</span>
      </div>

      {users.map(u => (
        <div key={u.id} className={`user-card${u.id === longestUserId ? ' highlight' : ''}`}>
          <div className="user-card__top">
            <div className="user-card__info">
              <Avatar name={u.name} />
              <div style={{ minWidth: 0 }}>
                <p className="user-card__name">{u.name}</p>
                <p className="user-card__email">{u.email}</p>
              </div>
            </div>
            <div className="cell-actions">
              <button className="btn-view" onClick={() => onViewPosts(u)}>Post</button>
              <button className="btn-delete" onClick={() => onDelete(u.id)}>Elimina</button>
            </div>
          </div>
          <div className="user-card__meta">
            <div className="user-card__meta-item">
              <p className="user-card__meta-label">Città</p>
              <p className="user-card__meta-value">{u.address.city}</p>
            </div>
            <div className="user-card__meta-item">
              <p className="user-card__meta-label">Azienda</p>
              <p className="user-card__meta-value">{u.company.name}</p>
            </div>
            <div className="user-card__meta-item">
              <p className="user-card__meta-label">Post</p>
              <p className="user-card__meta-value user-card__posts">
                {postCounts[u.id] ?? 0}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

UsersMobileList.propTypes = {
  users: PropTypes.array.isRequired,
  postCounts: PropTypes.object.isRequired,
  longestUserId: PropTypes.number,
  onDelete: PropTypes.func.isRequired,
  onViewPosts: PropTypes.func.isRequired,
  sort: PropTypes.shape({ key: PropTypes.string, dir: PropTypes.string }).isRequired,
  onSort: PropTypes.func.isRequired,
}