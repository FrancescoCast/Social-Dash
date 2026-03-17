import PropTypes from 'prop-types'
import { initials } from '../utils/initials'

export default function Avatar({ name, small = false }) {
  return (
    <div className={`avatar${small ? ' avatar--sm' : ''}`}>
      {initials(name)}
    </div>
  )
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  small: PropTypes.bool,
}