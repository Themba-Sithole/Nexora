import { useState } from "react";
import { Link } from "react-router";
import { ButtonLink, Icon, SectionHead } from "../components/SiteLayout";
import { projects, services } from "../data";

const hero = "https://images.unsplash.com/photo-1593427995298-cad6731716d8?auto=format&fit=crop&w=2400&q=90";
const siteImage = "https://images.unsplash.com/uploads/14123892966835548e7bd/14369636?auto=format&fit=crop&w=1800&q=85";

function Metrics() {
  return <section className="metrics">{[["15+", "Years of experience"], ["120+", "Projects delivered"], ["35+", "Industry specialists"], ["98%", "Client satisfaction"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>;
}

function HomePage() {
  const [stage, setStage] = useState(0);
  const tech = [
    { label: "Design model", image: "https://images.unsplash.com/photo-1562957982-b1f25317aebd?auto=format&fit=crop&w=1600&q=85", copy: "Spatial decisions and technical requirements are coordinated before site work begins." },
    { label: "Structure", image: siteImage, copy: "Critical structure, interfaces, and sequencing are managed through a controlled build programme." },
    { label: "Completed project", image: projects[0].image, copy: "Quality reviews and documented handover turn coordinated work into an enduring asset." },
  ];

  return (
    <>
      <section className="home-hero">
        <div className="hero-media" style={{ backgroundImage: `url(${hero})` }} />
        <div className="hero-shade" />
        <div className="hero-grid" />
        <div className="hero-copy">
          <p className="eyebrow">ENGINEERING THE FUTURE · SOUTH AFRICA</p>
          <h1><span>WE BUILD</span>WHAT&apos;S NEXT.</h1>
          <p className="hero-lead">From ambitious architectural concepts to enduring structures, we deliver construction solutions engineered for performance, precision, and longevity.</p>
          <div className="hero-actions"><ButtonLink to="/projects">Explore our projects</ButtonLink><ButtonLink to="/services#contact" secondary>Start a project</ButtonLink></div>
        </div>
        <div className="status-panel"><p className="eyebrow">Current project</p><strong>NX-024 / COMMERCIAL</strong><dl><div><dt>Status</dt><dd>In progress</dd></div><div><dt>Delivery</dt><dd>2027</dd></div></dl><i /></div>
        <div className="hero-location">33.9249° S / 18.4241° E<br /><b>CAPE TOWN, SOUTH AFRICA</b></div>
        <div className="hero-edition"><span>EST. 2010</span><span>ENGINEERING / CONSTRUCTION</span><span>EDITION 01</span></div>
        <a className="scroll-cue" href="#metrics"><span />SCROLL TO EXPLORE</a>
      </section>

      <div id="metrics"><Metrics /></div>

      <section className="section projects-featured">
        <SectionHead kicker="SELECTED WORK / 01" title="BUILT TO MAKE AN IMPACT." copy="Every project represents a balance of technical discipline, architectural vision, and uncompromising execution." />
        <div className="featured-grid">
          {projects.slice(0, 3).map((project, index) => <Link to={`/projects?project=${project.id}`} className={`project-card featured-${index + 1}`} key={project.id}>
            <img src={project.image} alt={project.title} />
            <div className="project-index">0{project.id}</div>
            <div className="project-gradient" />
            <div className="project-meta"><span>{project.category} / {project.location}</span><h3>{project.title}</h3><p>{project.status} · {project.year}</p></div>
            <span className="project-arrow"><Icon /></span>
          </Link>)}
        </div>
        <Link className="text-link" to="/projects">View all projects <Icon /></Link>
      </section>

      <section className="section service-section">
        <SectionHead kicker="CAPABILITIES / 02" title="FROM FOUNDATION TO FINISH." />
        <div className="service-grid">
          {services.map((service, index) => <Link to={`/services?service=${index}#services`} className="service-card" key={service.title}>
            <div className="service-image"><img src={service.image} alt="" /></div>
            <span className="service-num">0{index + 1}</span><h3>{service.title}</h3><p>{service.short}</p><Icon />
          </Link>)}
        </div>
      </section>

      <section className="section light-section process-section">
        <SectionHead light kicker="OUR APPROACH / 03" title="BUILT ON A BETTER PROCESS." />
        <div className="process-line">
          {[["Discover", "Understand the vision, site, and objectives."], ["Plan", "Define scope, feasibility, schedule, and strategy."], ["Design", "Coordinate engineering and technical documentation."], ["Construct", "Manage quality, safety, people, and progress."], ["Deliver", "Inspect, document, hand over, and sign off."]].map(([title, copy], index) => <div className="process-step" key={title}><span>0{index + 1}</span><i /><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
      </section>

      <section className="split-feature">
        <div className="split-image"><img src={siteImage} alt="Structural steel framework" /><span>STRUCTURAL COORDINATION<br />REF / NX-QA-118</span></div>
        <div className="split-copy"><p className="eyebrow">WHY NEXORA / 04</p><h2>PRECISION IS NOT OPTIONAL.</h2><p>We build certainty into every stage through clear accountability, structured communication, and rigorous attention to how work is planned and delivered.</p>
          <div className="benefit-list">{["Quality without compromise", "Safety-first operations", "Transparent project management", "Technology-driven coordination"].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong><Icon /></div>)}</div>
        </div>
      </section>

      <section className="section tech-section">
        <SectionHead kicker="CONSTRUCTION INTELLIGENCE / 05" title="BETTER VISIBILITY. BETTER BUILDING." copy="A clear view of design intent, structural progress, and final outcomes supports more informed decisions throughout delivery." />
        <div className="tech-interface">
          <div className="tech-visual"><img key={tech[stage].image} src={tech[stage].image} alt={tech[stage].label} /><div className="scan-line" /><span>MODEL VIEW / 0{stage + 1}</span></div>
          <div className="tech-content">
            <div className="tech-tabs">{tech.map((item, index) => <button className={stage === index ? "active" : ""} onClick={() => setStage(index)} key={item.label}><span>0{index + 1}</span>{item.label}</button>)}</div>
            <p>{tech[stage].copy}</p>
            <ul><li>Digital project coordination</li><li>Construction progress reporting</li><li>Quality control documentation</li><li>Programme and milestone tracking</li></ul>
            <small>SIMULATED MARKETING VISUAL / NOT LIVE PROJECT DATA</small>
          </div>
        </div>
      </section>

      <section className="closing-cta" style={{ backgroundImage: `linear-gradient(90deg, rgba(7,8,10,.9), rgba(7,8,10,.35)), url(${projects[3].image})` }}>
        <p className="eyebrow">YOUR NEXT LANDMARK / 06</p><h2>HAVE A PROJECT<br />IN MIND?</h2><p>Let&apos;s turn your next big idea into something built to last.</p><div><ButtonLink to="/services#contact">Let&apos;s build together</ButtonLink><ButtonLink to="/services" secondary>Explore our capabilities</ButtonLink></div>
      </section>
    </>
  );
}

export default HomePage;
