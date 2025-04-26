import './EmptyState.css'

function EmptyState({ message, action, actionText }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📋</div>
      <p>{message}</p>
      {action && (
        <button className="empty-action" onClick={action}>
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState