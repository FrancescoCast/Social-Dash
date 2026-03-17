import PropTypes from 'prop-types'

export default function StatCard({ label, value, suffix }) {
  return (
    <div className="stat-card">
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">
        {value}
        {suffix && <span className="stat-card__suffix">{suffix}</span>}
      </p>
    </div>
  )
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
}