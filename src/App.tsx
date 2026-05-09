import { ContactForm } from './ContactForm'
import { useSitePreferences } from './context/SitePreferences.tsx'
import {
  getMapEmbedSrc,
  normalizeWhatsAppDigits,
  phoneTelHref,
  siteConfig,
} from './siteConfig'
import { uiCopy } from './strings'
import './App.css'

function App() {
  const { locale, setLocale, theme, toggleTheme } = useSitePreferences()
  const t = uiCopy[locale]

  const telHref = phoneTelHref(siteConfig.phoneRaw)
  const waDigits = normalizeWhatsAppDigits(siteConfig.whatsappRaw)
  const phoneLabel =
    siteConfig.phoneDisplay || siteConfig.phoneRaw || '—'

  return (
    <div className="site">
      <a className="skip-link" href="#main-content">
        {t.skipLink}
      </a>

      <header className="site-header">
        <div className="site-header__row">
          <div className="site-header__brand">
            <a className="logo" href="#top">
              RS Library
            </a>
            <p className="logo-tagline">{t.brandTagline}</p>
          </div>
          <div
            className="site-header__tools"
            role="toolbar"
            aria-label={locale === 'hi' ? 'भाषा और थीम' : 'Language and theme'}
          >
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className={`lang-toggle__btn${locale === 'en' ? ' is-active' : ''}`}
                onClick={() => setLocale('en')}
                aria-pressed={locale === 'en'}
              >
                {t.toolbar.langEn}
              </button>
              <button
                type="button"
                className={`lang-toggle__btn${locale === 'hi' ? ' is-active' : ''}`}
                onClick={() => setLocale('hi')}
                aria-pressed={locale === 'hi'}
              >
                {t.toolbar.langHi}
              </button>
            </div>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark' ? t.toolbar.themeLight : t.toolbar.themeDark
              }
            >
              <span aria-hidden="true">{theme === 'dark' ? '☀' : '☽'}</span>
            </button>
          </div>
        </div>
        <nav className="nav" aria-label="Primary">
          <ul className="nav__list">
            <li>
              <a href="#about">{t.nav.about}</a>
            </li>
            <li>
              <a href="#facilities">{t.nav.amenities}</a>
            </li>
            <li>
              <a href="#visit">{t.nav.visit}</a>
            </li>
            <li>
              <a href="#rules">{t.nav.rules}</a>
            </li>
            <li>
              <a href="#gallery">{t.nav.gallery}</a>
            </li>
            <li>
              <a href="#contact">{t.nav.contact}</a>
            </li>
            <li>
              <a href="#privacy">{t.nav.privacy}</a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__grid">
            <div className="hero__main">
              <p className="hero__eyebrow">{t.hero.eyebrow}</p>
              <h1 id="hero-title" className="hero__title">
                {t.hero.title}
              </h1>
              <p className="hero__lede">{t.hero.lede}</p>
              <ul className="hero__highlights" aria-label="What to expect">
                {t.hero.bullets.map((line) => (
                  <li key={line}>
                    <span className="hero__bullet" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="hero__actions">
                <a className="btn btn--primary" href="#contact">
                  {t.hero.ctaMessage}
                </a>
                <a className="btn btn--outline" href="#facilities">
                  {t.hero.ctaAmenities}
                </a>
              </div>
            </div>
            <aside className="hero__aside" aria-label={t.hero.asideLabel}>
              <div className="fact-card">
                <span className="fact-card__label">{t.hero.factsLabels.model}</span>
                <p className="fact-card__value">{t.hero.facts.model}</p>
              </div>
              <div className="fact-card">
                <span className="fact-card__label">{t.hero.factsLabels.space}</span>
                <p className="fact-card__value">{t.hero.facts.space}</p>
              </div>
              <div className="fact-card">
                <span className="fact-card__label">{t.hero.factsLabels.basics}</span>
                <p className="fact-card__value">{t.hero.facts.basics}</p>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="about"
          className="panel panel--muted"
          aria-labelledby="about-title"
        >
          <div className="panel__inner">
            <h2 id="about-title" className="section-title">
              {t.about.title}
            </h2>
            <p className="lead">{t.about.lead}</p>
            <p>{t.about.body}</p>
          </div>
        </section>

        <section id="facilities" className="panel" aria-labelledby="facilities-title">
          <div className="panel__inner panel__inner--wide">
            <h2 id="facilities-title" className="section-title">
              {t.facilities.title}
            </h2>
            <p className="section-intro">{t.facilities.intro}</p>
            <div className="facility-grid">
              {t.facilities.cards.map((title, i) => (
                <article key={title} className="facility-card">
                  <h3 className="facility-card__title">{title}</h3>
                  <p className="facility-card__text">
                    {t.facilities.cardBodies[i]}
                  </p>
                </article>
              ))}
            </div>
            <p className="panel-note">
              <strong>{t.facilities.noteLead}</strong> {t.facilities.noteRest}
            </p>
          </div>
        </section>

        <section id="visit" className="panel panel--muted" aria-labelledby="visit-title">
          <div className="panel__inner panel__inner--wide">
            <h2 id="visit-title" className="section-title">
              {t.visit.title}
            </h2>
            <p className="section-intro">{t.visit.intro}</p>
            <div className="visit-grid">
              <div className="visit-card">
                <h3 className="visit-card__label">{t.visit.address}</h3>
                <address className="visit-card__body">
                  {siteConfig.addressLines.map((line) => (
                    <span key={line} className="visit-card__line">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <div className="visit-card">
                <h3 className="visit-card__label">{t.visit.hours}</h3>
                <div className="visit-card__body">
                  {siteConfig.hoursLines.map((line) => (
                    <p key={line} className="visit-card__line">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="visit-card visit-card--wide">
                <h3 className="visit-card__label">{t.visit.fees}</h3>
                <p className="visit-card__body">{siteConfig.feeNote}</p>
              </div>
              <div className="visit-card">
                <h3 className="visit-card__label">{t.visit.call}</h3>
                <p className="visit-card__body">
                  {telHref ? (
                    <a href={telHref} className="visit-link">
                      {phoneLabel}
                    </a>
                  ) : (
                    phoneLabel
                  )}
                </p>
              </div>
              <div className="visit-card">
                <h3 className="visit-card__label">{t.visit.whatsapp}</h3>
                <p className="visit-card__body">
                  {waDigits ? (
                    <a
                      href={`https://wa.me/${waDigits}`}
                      className="visit-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    '—'
                  )}
                </p>
              </div>
            </div>
            <div className="map-frame">
              <h3 className="map-frame__title">{t.visit.mapTitle}</h3>
              <p className="map-frame__hint">{t.visit.directionsPlaceholder}</p>
              <div className="map-frame__embed">
                <iframe
                  title={t.visit.mapTitle}
                  src={getMapEmbedSrc()}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="rules" className="panel" aria-labelledby="rules-title">
          <div className="panel__inner">
            <h2 id="rules-title" className="section-title">
              {t.rules.title}
            </h2>
            <p className="lead">{t.rules.intro}</p>
            <ul className="rules-list">
              {t.rules.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="gallery" className="panel panel--muted" aria-labelledby="gallery-title">
          <div className="panel__inner panel__inner--wide">
            <h2 id="gallery-title" className="section-title">
              {t.gallery.title}
            </h2>
            <p className="section-intro">{t.gallery.intro}</p>
            <div className="gallery-grid">
              {t.gallery.captions.map((cap, i) => (
                <figure key={cap} className="gallery-cell">
                  <div
                    className="gallery-cell__placeholder"
                    aria-hidden="true"
                  />
                  <figcaption className="gallery-cell__cap">
                    {cap} · #{i + 1}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="panel panel--contact panel--muted"
          aria-labelledby="contact-title"
        >
          <div className="panel__inner panel__inner--contact">
            <div className="contact-intro">
              <h2 id="contact-title" className="section-title">
                {t.contact.title}
              </h2>
              <p className="lead">{t.contact.lead}</p>
              <p className="contact-intro__fine">{t.contact.fine}</p>
            </div>
            <div className="contact-form-shell">
              <ContactForm />
            </div>
          </div>
        </section>

        <section
          id="privacy"
          className="panel privacy panel--muted"
          aria-labelledby="privacy-title"
        >
          <div className="panel__inner">
            <h2 id="privacy-title" className="section-title">
              {t.privacy.title}
            </h2>
            <p className="privacy-short">{t.privacy.body}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <p className="site-footer__brand">{t.footer.brand}</p>
          <p className="site-footer__legal">
            {t.footer.copyright} {new Date().getFullYear()} RS Library ·{' '}
            <a href="#privacy">{t.footer.privacy}</a>
          </p>
        </div>
      </footer>

      {waDigits ? (
        <a
          className="wa-fab"
          href={`https://wa.me/${waDigits}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.waFab}
        >
          <span className="wa-fab__icon" aria-hidden="true">
            💬
          </span>
          <span className="wa-fab__text">{t.waFab}</span>
        </a>
      ) : null}
    </div>
  )
}

export default App
