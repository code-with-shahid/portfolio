export default function SectionHeading({
  kicker,
  title,
  children,
  align = 'start',
}) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
      <h2 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
        {title}
      </h2>
      {children ? (
        <p
          className={[
            'mt-4 max-w-md text-sm leading-7 text-muted',
            align === 'center' ? 'mx-auto' : '',
          ].join(' ')}
        >
          {children}
        </p>
      ) : null}
    </div>
  )
}
