'use client'

import { useState, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BusFront,
  Check,
  Clock3,
  MapPin,
  Menu,
  QrCode,
  ShieldCheck,
  TicketCheck,
  X,
} from 'lucide-react'

const routes = [
  { id: 'pune-solapur', from: 'Pune', to: 'Solapur', time: '4 hr 30 min', price: 1500 },
  { id: 'solapur-pandharpur', from: 'Solapur', to: 'Pandharpur', time: '1 hr 45 min', price: 1800 },
  { id: 'solapur-nashik', from: 'Solapur', to: 'Nashik', time: '6 hr 10 min', price: 2000 },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(routes[0].id)
  const [passenger, setPassenger] = useState('')
  const [previewReady, setPreviewReady] = useState(false)
  const route = routes.find((item) => item.id === selectedRoute) ?? routes[0]

  function createPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPreviewReady(true)
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="BusPass home">
          <span className="brand-mark"><BusFront size={22} strokeWidth={2.4} /></span>
          <span>bus<span className="brand-light">pass</span></span>
        </a>
        <button className="mobile-menu" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#routes" onClick={() => setMenuOpen(false)}>Routes</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a className="nav-cta" href="#apply" onClick={() => setMenuOpen(false)}>Get a bus pass <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR DAILY RIDE, MADE SIMPLE</div>
          <h1>Your route.<br /><span>Your pass.</span><br />All on your phone.</h1>
          <p className="hero-subtitle">Skip the paper pass and the queue. Choose your regular route and keep your bus pass ready whenever you need it.</p>
          <div className="hero-actions">
            <a href="#apply" className="button button-dark">Get started <ArrowRight size={17} /></a>
            <a href="#how-it-works" className="text-link">See how it works <ArrowDown size={15} /></a>
          </div>
          <div className="hero-proof"><span className="proof-avatars"><i>S</i><i>P</i><i>R</i></span><span>Simple monthly travel for everyday commuters</span></div>
        </div>
        <div className="hero-art" aria-label="Digital bus pass preview">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="sun-disc" />
          <div className="pass-card">
            <div className="pass-topline"><span className="pass-brand"><BusFront size={16} /> BUSPASS</span><span className="pass-active"><i /> PREVIEW</span></div>
            <div className="pass-kicker">MONTHLY BUS PASS</div>
            <div className="pass-route">Pune <span>→</span> Solapur</div>
            <div className="pass-divider" />
            <div className="pass-details"><div><small>PASSENGER</small><strong>Your name here</strong></div><div><small>VALIDITY</small><strong>30 days</strong></div></div>
            <div className="pass-bottom"><span><MapPin size={14} /> Maharashtra</span><div className="fake-qr" aria-label="QR code preview"><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /></div></div>
          </div>
          <div className="floating-note"><span className="note-icon"><QrCode size={17} /></span><span><strong>One quick scan</strong><small>Your pass, always with you</small></span></div>
          <div className="art-caption">TRAVEL A LITTLE LIGHTER <span>✳</span></div>
        </div>
        <div className="hero-bottom"><span>BUILT FOR THE WAY YOU MOVE</span><span className="bottom-line" /><span>01 / 03</span></div>
      </section>

      <section className="trust-strip" id="how-it-works">
        <div className="trust-item"><span className="trust-icon"><TicketCheck size={19} /></span><span><strong>One monthly pass</strong><small>For your regular route</small></span></div>
        <div className="trust-item"><span className="trust-icon"><QrCode size={19} /></span><span><strong>Ready-to-scan QR</strong><small>Show it when you board</small></span></div>
        <div className="trust-item"><span className="trust-icon"><Clock3 size={19} /></span><span><strong>30-day validity</strong><small>Travel without daily hassle</small></span></div>
        <div className="trust-item"><span className="trust-icon"><ShieldCheck size={19} /></span><span><strong>Your details, protected</strong><small>Kept with your account</small></span></div>
      </section>

      <section className="routes-section section-wrap" id="routes">
        <div className="section-heading"><div><div className="eyebrow">PICK YOUR REGULAR RIDE</div><h2>Routes that fit<br />your everyday.</h2></div><p>Choose from the available routes and see the monthly pass fare upfront. More routes can be added as the service grows.</p></div>
        <div className="route-grid">
          {routes.map((item, index) => (
            <article className="route-card" key={item.id}>
              <div className="route-card-top"><span className="route-number">0{index + 1}</span><span className="route-badge">MONTHLY PASS</span></div>
              <div className="route-points"><div><i className="point point-start" /><span>{item.from}</span></div><span className="route-connector" /><div><i className="point point-end" /><span>{item.to}</span></div></div>
              <div className="route-card-bottom"><span><Clock3 size={15} /> {item.time}</span><strong>₹{item.price.toLocaleString('en-IN')}<small> / month</small></strong></div>
              <button type="button" className="route-select" onClick={() => { setSelectedRoute(item.id); document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' }) }}>Choose this route <ArrowRight size={16} /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="apply-section" id="apply">
        <div className="apply-inner">
          <div className="apply-copy"><div className="eyebrow eyebrow-light">YOUR NEXT STEP</div><h2>Make your commute<br />one less thing to think about.</h2><p>Start with your passenger details and route. Your pass preview will be ready in a moment.</p><div className="apply-check"><Check size={17} /> No paperwork to carry</div><div className="apply-check"><Check size={17} /> Your route and fare, upfront</div></div>
          <div className="apply-panel">
            {!previewReady ? <>
              <div className="panel-heading"><span className="panel-step">01</span><div><strong>Start your pass</strong><small>Enter details for a preview</small></div></div>
              <form onSubmit={createPreview}>
                <label htmlFor="passenger">Passenger name</label>
                <input id="passenger" name="passenger" autoComplete="name" placeholder="e.g. Asha Patil" required value={passenger} onChange={(event) => setPassenger(event.target.value)} />
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                <label htmlFor="route">Choose your route</label>
                <select id="route" name="route" value={selectedRoute} onChange={(event) => setSelectedRoute(event.target.value)}>
                  {routes.map((item) => <option value={item.id} key={item.id}>{item.from} → {item.to} · ₹{item.price.toLocaleString('en-IN')}/month</option>)}
                </select>
                <button className="button button-dark button-full" type="submit">Create pass preview <ArrowRight size={17} /></button>
                <p className="form-note">Preview only. Your details are not saved or sent anywhere yet.</p>
              </form>
            </> : <div className="preview-result"><span className="success-icon"><Check size={22} /></span><div className="eyebrow">PREVIEW READY</div><h3>Your commute is<br />looking simpler.</h3><div className="result-pass"><span>BUSPASS · MONTHLY</span><strong>{route.from} <i>→</i> {route.to}</strong><div className="result-pass-bottom"><span>{passenger}</span><b>₹{route.price.toLocaleString('en-IN')}<small> / month</small></b></div></div><p>This is a visual preview. Connect the backend to save applications and issue real passes.</p><button className="text-link reset-link" type="button" onClick={() => setPreviewReady(false)}>Edit details <ArrowRight size={15} /></button></div>}
          </div>
        </div>
      </section>

      <footer className="site-footer" id="about"><a className="brand footer-brand" href="#top"><span className="brand-mark"><BusFront size={19} /></span><span>bus<span className="brand-light">pass</span></span></a><span>Simple rides. Smoother days.</span><a href="#top">Back to top ↑</a></footer>
    </main>
  )
}
