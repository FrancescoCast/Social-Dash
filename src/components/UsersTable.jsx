import PropTypes from 'prop-types'
import Avatar from './Avatar'
import EmailBadge from './EmailBadge'

const COLUMNS = [
  { key: 'name',    label: 'Nome' },
  { key: 'email',   label: 'Email' },
  { key: 'city',    label: 'Città' },
  { key: 'company', label: 'Azienda' },
  { key: 'posts',   label: 'Post', center: true },
]

function SortIcon({ active, dir }) {
  if (!active) return <span className="sort-icon sort-icon--idle">↕</span>
  return <span className="sort-icon sort-icon--active">{dir === 'asc' ? '↑' : '↓'}</span>
}

SortIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  dir: PropTypes.string.isRequired,
}

export default function UsersTable({ users, postCounts, longestUserId, onDelete, onViewPosts, sort, onSort }) {
  return (
    <div className="table-card">
      <div className="table-card__header">
        <span className="table-card__title">Elenco utenti</span>
        <span className="table-card__count">{users.length} utenti</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="users-table">
          <thead>
            <tr>
              {COLUMNS.map(col => (
                <th
                  key={col.key}
                  className="th-sortable"
                  style={{ textAlign: col.center ? 'center' : 'left' }}
                  onClick={() => onSort(col.key)}
                >
                  <span className="th-inner">
                    {col.label}
                    <SortIcon active={sort.key === col.key} dir={sort.dir} />
                  </span>
                </th>
              ))}
              <th aria-label="Azioni"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className={u.id === longestUserId ? 'highlight' : ''}>
                <td>
                  <div className="cell-user">
                    <Avatar name={u.name} small />
                    <div>
                      <p className="cell-user__name">{u.name}</p>
                      <p className="cell-user__username">{u.username}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cell-email">
                    <span>{u.email}</span>
                    <EmailBadge email={u.email} />
                  </div>
                </td>
                <td className="cell-muted">{u.address.city}</td>
                <td className="cell-muted">{u.company.name}</td>
                <td className="cell-posts">{postCounts[u.id] ?? 0}</td>
                <td className="cell-action">
                  <div className="cell-actions">
                    <button className="btn-view" onClick={() => onViewPosts(u)}>
                      Post
                    </button>
                    <button className="btn-delete" onClick={() => onDelete(u.id)}>
                      Elimina
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  postCounts: PropTypes.object.isRequired,
  longestUserId: PropTypes.number,
  onDelete: PropTypes.func.isRequired,
  onViewPosts: PropTypes.func.isRequired,
  sort: PropTypes.shape({ key: PropTypes.string, dir: PropTypes.string }).isRequired,
  onSort: PropTypes.func.isRequired,
}