import PropTypes from 'prop-types'

export default function EmailBadge({ email }) {
  const isNet = email.endsWith('.net')
  const isCom = email.endsWith('.com')
  if (!isNet && !isCom) return null
  return (
    <span className={`badge ${isNet ? 'badge--net' : 'badge--com'}`}>
      {isNet ? '.net' : '.com'}
    </span>
  )
}

EmailBadge.propTypes = {
  email: PropTypes.string.isRequired,
}