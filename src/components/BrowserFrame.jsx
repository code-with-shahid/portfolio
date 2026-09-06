export default function BrowserFrame({ children, label }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        {label ? (
          <span className="ml-2 truncate text-[11px] text-muted">{label}</span>
        ) : null}
      </div>
      {children}
    </div>
  )
}
