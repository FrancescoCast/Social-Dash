import PropTypes from 'prop-types'
import Avatar from './Avatar'

export default function LongestPostCard({ data }) {
  const { post, user, length } = data
  return (
    <div className="longest-card">
      <p className="longest-card__label">Titolo post più lungo</p>
      <div className="longest-card__inner">
        <Avatar name={user.name} />
        <div className="longest-card__text">
          <p className="longest-card__name">{user.name}</p>
          <p className="longest-card__email">{user.email}</p>
          <p className="longest-card__title">&quot;{post.title}&quot;</p>
          <p className="longest-card__chars">{length} caratteri</p>
        </div>
      </div>
    </div>
  )
}

LongestPostCard.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
}