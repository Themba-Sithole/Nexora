import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ButtonLink, Icon, SectionHead } from "../components/SiteLayout";
import { Project, projects } from "../data";

const categories = ["All Projects", "Commercial", "Residential", "Industrial", "Civil & Infrastructure", "Renovation"];

function ProjectOverlay({ project, onClose, onMove }: { project: Project; onClose: () => void; onMove: (dir: number) => void }) {
  const [galleryImage, setGalleryImage] = useState<string | null>(null);
  const gallery = [project.image, projects[(project.id + 2) % projects.length].image];
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") galleryImage ? setGalleryImage(null) : onClose();
      if (!galleryImage && event.key === "ArrowLeft") onMove(-1);
      if (!galleryImage && event.key === "ArrowRight") onMove(1);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", key);
    return () => { document.body.classList.remove("modal-open"); window.removeEventListener("keydown", key); };
  }, [galleryImage, onClose, onMove]);
  return <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${project.title} project details`}>
    <button className="modal-close" onClick={onClose} aria-label="Close project details"><Icon name="close" /></button>
    <div className="modal-hero"><img src={project.image} alt={project.title} /><span className="modal-count">NX / 00{project.id}</span><div><p className="eyebrow">PROJECT 00{project.id} / {project.category}</p><h2>{project.title}</h2><p>{project.location} · {project.status} · {project.year}</p></div></div>
    <div className="modal-body"><div><p className="eyebrow">Overview</p><p className="modal-lead">{project.description}</p><p>{project.scope}</p></div><div><p className="eyebrow">Example project facts</p>{project.facts.map(f => <span key={f}>{f}</span>)}</div></div>
    <div className="modal-gallery">{gallery.map((image, index) => <button onClick={() => setGalleryImage(image)} key={image} aria-label={`Open gallery image ${index + 1}`}><img src={image} alt={`${project.title} view ${index + 1}`} /><span>VIEW 0{index + 1} ↗</span></button>)}</div>
    <div className="modal-nav"><button onClick={() => onMove(-1)}>← Previous project</button><ButtonLink to="/services#contact">Discuss a similar project</ButtonLink><button onClick={() => onMove(1)}>Next project →</button></div>
    {galleryImage && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Expanded project image"><button onClick={() => setGalleryImage(null)} aria-label="Close expanded image"><Icon name="close" /></button><img src={galleryImage} alt={`${project.title} expanded view`} /></div>}
  </div>;
}

function ProjectsPage() {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState("All Projects");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Featured");
  const selected = projects.find(p => p.id === Number(params.get("project")));
  const filtered = useMemo(() => {
    const result = projects.filter(p => (category === "All Projects" || p.category === category) && `${p.title} ${p.category} ${p.location}`.toLowerCase().includes(search.toLowerCase()));
    return [...result].sort((a, b) => sort === "Newest" ? b.year - a.year : sort === "Oldest" ? a.year - b.year : a.id - b.id);
  }, [category, search, sort]);
  const open = (id: number) => setParams({ project: String(id) });
  const close = () => setParams({});
  const move = (dir: number) => {
    if (!selected) return;
    const next = (selected.id - 1 + dir + projects.length) % projects.length;
    open(projects[next].id);
  };
  const clear = () => { setCategory("All Projects"); setSearch(""); setSort("Featured"); };

  return <>
    <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(6,7,9,.92), rgba(6,7,9,.25)), url(${projects[6].image})` }}>
      <div><p className="eyebrow">OUR WORK / PROJECT PORTFOLIO</p><h1>REAL PROJECTS.<br />LASTING IMPACT.</h1><p>Explore the buildings, spaces, and infrastructure we bring to life through technical expertise and considered execution.</p></div><span className="portfolio-index">PORTFOLIO INDEX<br /><b>001—008</b></span>
    </section>
    <section className="portfolio section">
      <div className="filter-bar">
        <div className="filter-categories">{categories.map(item => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="filter-tools"><label><span>Search portfolio</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Project, category, location" /></label><label><span>Sort by</span><select value={sort} onChange={e => setSort(e.target.value)}><option>Featured</option><option>Newest</option><option>Oldest</option></select></label></div>
        <div className="result-line"><span>{String(filtered.length).padStart(2, "0")} RESULTS</span><button onClick={clear}>Clear filters ×</button></div>
      </div>
      <div className="portfolio-grid">{filtered.map((project, index) => <button className={`portfolio-card card-${index % 5}`} onClick={() => open(project.id)} key={project.id}>
        <div><img src={project.image} alt={project.title} /><span className="card-scrim" /><span className="project-arrow"><Icon /></span><span className="view-project">View case study</span></div>
        <p>NX-{String(project.id).padStart(3, "0")} / {project.category}</p><h3>{project.title}</h3><span>{project.location} · {project.status} {project.year}</span>
      </button>)}</div>
      {!filtered.length && <div className="empty-state"><h3>No matching projects.</h3><p>Adjust your category or search phrase to explore the full sample portfolio.</p><button onClick={clear}>Reset filters</button></div>}
    </section>
    <section className="section light-section lifecycle"><SectionHead light kicker="PROJECT DELIVERY / 02" title="ONE CONTROLLED JOURNEY." copy="Nexora’s process creates clarity from initial consultation through completion and handover." /><div>{["Concept", "Planning", "Construction", "Quality review", "Handover"].map((item, i) => <span key={item}><b>0{i + 1}</b>{item}</span>)}</div></section>
    <section className="portfolio-cta"><p className="eyebrow">BEGIN / 03</p><h2>YOUR NEXT PROJECT STARTS HERE.</h2><p>Tell us what you&apos;re planning. We&apos;ll help you explore the right construction approach.</p><ButtonLink to="/services#contact">Start a project</ButtonLink></section>
    {selected && <ProjectOverlay project={selected} onClose={close} onMove={move} />}
  </>;
}

export default ProjectsPage;
