import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";

export function Icon({ name = "arrow" }: { name?: "arrow" | "menu" | "close" | "up" }) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    menu: <path d="M4 8h16M4 16h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    up: <path d="m6 14 6-6 6 6" />,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Nexora home">
      <span className="logo-mark"><i /><i /><i /></span>
      <span>NEXORA<small>CONSTRUCTION</small></span>
    </Link>
  );
}

const links = [
  ["/", "Home"],
  ["/projects", "Projects"],
  ["/services", "Services"],
  ["/services#contact", "Contact"],
];

export function SiteLayout() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setMenu(false);
    if (location.hash) {
      let attempts = 0;
      const findTarget = () => {
        const target = document.querySelector(location.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        } else if (attempts++ < 12) {
          window.setTimeout(findTarget, 50);
        }
      };
      findTarget();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(100, (window.scrollY / distance) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menu);
    return () => document.body.classList.remove("menu-open");
  }, [menu]);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const timer = window.setTimeout(() => {
      const elements = document.querySelectorAll("main section:not(.home-hero):not(.page-hero), main .metrics");
      observer = new IntersectionObserver(
        entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")),
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
      );
      elements.forEach(element => {
        element.classList.add("reveal-ready");
        observer?.observe(element);
      });
    }, 100);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [location.pathname]);

  return (
    <div>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([to, label]) => (
            <NavLink key={label} to={to} end={to === "/"}>{label}</NavLink>
          ))}
        </nav>
        <Link className="button button-small desktop-cta" to="/services#contact">Start a project <Icon /></Link>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation">
          <Icon name={menu ? "close" : "menu"} />
        </button>
        <span className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      </header>
      <div className={`mobile-menu ${menu ? "open" : ""}`} aria-hidden={!menu}>
        <p className="eyebrow">NAVIGATION / 01—04</p>
        {links.map(([to, label], index) => (
          <Link to={to} key={label}><span>0{index + 1}</span>{label}</Link>
        ))}
        <p className="mobile-contact">CAPE TOWN, SOUTH AFRICA<br />hello@nexoraconstruction.co.za</p>
      </div>
      <main key={location.pathname} className="page-enter"><Outlet /></main>
      <Footer />
      <button className={`back-top ${scrolled ? "visible" : ""}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><Icon name="up" /></button>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-wordmark" aria-hidden="true">NEXORA</div>
      <div className="footer-top">
        <div><Logo /><p>Construction shaped by clear thinking, disciplined execution, and lasting value.</p></div>
        <div><p className="eyebrow">Navigate</p><Link to="/">Home</Link><Link to="/projects">Projects</Link><Link to="/services">Services</Link></div>
        <div><p className="eyebrow">Capabilities</p><Link to="/services">Commercial</Link><Link to="/services">Residential</Link><Link to="/services">Civil & Infrastructure</Link></div>
        <div><p className="eyebrow">Contact</p><a href="mailto:hello@nexoraconstruction.co.za">hello@nexoraconstruction.co.za</a><a href="tel:+27000000000">+27 XX XXX XXXX</a><span>Cape Town, South Africa</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} NEXORA CONSTRUCTION</span><span>LINKEDIN / INSTAGRAM / PRIVACY</span><span>BUILT FOR WHAT'S NEXT</span></div>
    </footer>
  );
}

export function SectionHead({ kicker, title, copy, light = false }: { kicker: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`section-head ${light ? "light" : ""}`}><p className="eyebrow">{kicker}</p><div><h2>{title}</h2>{copy && <p>{copy}</p>}</div></div>;
}

export function ButtonLink({ to, children, secondary = false }: { to: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link className={`button ${secondary ? "button-secondary" : ""}`} to={to}>{children}<Icon /></Link>;
}
