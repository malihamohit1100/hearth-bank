
export default function BalanceCard({
  title,
  amount,
  icon: Icon,
  variant = 'neutral',
  description,
}) {
  return (
    <article className={`balance-card balance-card-${variant}`}>
      <div className="balance-card-top">
        <span className="balance-card-title">{title}</span>
        {Icon && (
          <span className="balance-card-icon">
            <Icon size={20} strokeWidth={1.8} />
          </span>
        )}
      </div>

      <div className="balance-amount">{amount}</div>

      {description && (
        <p className="balance-description">{description}</p>
      )}
    </article>
  );
}
