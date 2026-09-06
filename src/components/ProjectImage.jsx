export default function ProjectImage({
  src,
  alt,
  className = '',
  priority = false,
}) {
  if (!src) {
    return (
      <div
        className={[
          'grid aspect-[16/10] place-items-center border border-dashed border-line bg-surface text-center',
          className,
        ].join(' ')}
      >
        <p className="px-6 text-sm text-muted">
          Screenshot placeholder — add a project image to this slot.
        </p>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={1440}
      height={900}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={['h-full w-full object-cover object-top', className].join(' ')}
    />
  )
}
