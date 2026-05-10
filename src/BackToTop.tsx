import { useEffect, useState } from 'react'

type Props = { label: string }

export function BackToTop({ label }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      aria-label={label}
    >
      <span aria-hidden="true">↑</span>
    </button>
  )
}
