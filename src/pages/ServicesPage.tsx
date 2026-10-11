import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ButtonLink, Icon, SectionHead } from "../components/SiteLayout";
import { services } from "../data";

const projectTypes = ["Commercial", "Residential", "Industrial", "Civil & Infrastructure", "Renovation", "Other"];
const faqs = [
  ["What types of construction projects do you handle?", "Our illustrative service range covers commercial, residential, civil and infrastructure, industrial, renovation, and refurbishment projects. Final scope is confirmed through consultation."],
  ["Can you work with an existing architect or design team?", "Yes. The delivery approach is structured to coordinate with appointed architects, consultants, and specialist teams throughout planning and construction."],
  ["How do you determine a project's budget?", "Budgets are shaped by project scope, site conditions, materials, programme, consultant inputs, and procurement strategy. Early definition improves cost clarity."],
  ["Do you handle renovations and extensions?", "Yes. The sample service offering includes building upgrades, extensions, alterations, interior modernisation, and refurbishment coordination."],
  ["How is project progress communicated?", "A communication rhythm can include programme updates, progress reports, site meetings, decision logs, and documented quality reviews, tailored to the project."],
  ["How do I request a construction consultation?", "Complete the project enquiry below with the information you currently have. This prototype simulates submission and can later be connected to a real contact workflow."],
];

type FormData = Record<string, string | boolean>;
const initialData: FormData = { type: "", projectName: "", location: "", budget: "", timing: "", size: "", description: "", service: "", name: "", company: "", email: "", phone: "", contact: "", additional: "", consent: false };

function EnquiryForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const update = (key: string, value: string | boolean) => setData(current => ({ ...current, [key]: value }));
  const next = () => {
    if (step === 1 && !data.type) return setError("Select a project type to continue.");
    if (step === 2 && (!data.location || !data.budget || !data.timing || !data.description || !data.service)) return setError("Complete the required project details to continue.");
    setError(""); setStep(s => Math.min(3, s + 1));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email));
    if (!data.name || !validEmail || !data.phone || !data.contact || !data.consent) return setError("Complete all required contact fields, use a valid email, and accept the privacy notice.");
    setError(""); setLoading(true);
    window.setTimeout(() => { setLoading(false); setReference(`NX-DEMO-${Date.now().toString().slice(-6)}`); }, 900);
  };

  if (reference) return <div className="form-success"><span>✓</span><p className="eyebrow">SIMULATED SUBMISSION COMPLETE</p><h3>YOUR PROJECT ENQUIRY IS IN.</h3><p>Thank you for considering Nexora Construction. Your project information has been captured in this demo experience.</p><strong>REFERENCE / {reference}</strong><small>This prototype has not emailed or stored your information. Connect a backend before publishing.</small><button onClick={() => { setReference(""); setStep(1); setData(initialData); }}>Start another enquiry</button></div>;

  return <form className="enquiry-form" onSubmit={submit} noValidate>
    <div className="form-progress">{[1, 2, 3].map(i => <div className={step >= i ? "active" : ""} key={i}><span>0{i}</span><i /></div>)}</div>
    <p className="eyebrow">STEP 0{step} / {step === 1 ? "PROJECT TYPE" : step === 2 ? "PROJECT DETAILS" : "CONTACT INFORMATION"}</p>
    {step === 1 && <div className="form-step"><h3>What are we building together?</h3><div className="type-grid">{projectTypes.map((type, i) => <button type="button" className={data.type === type ? "active" : ""} onClick={() => update("type", type)} key={type}><span>0{i + 1}</span><strong>{type}</strong><small>Select project category</small></button>)}</div></div>}
    {step === 2 && <div className="form-step"><h3>Tell us about the project.</h3><div className="field-grid">
      <Field label="Project name (optional)" value={data.projectName as string} onChange={v => update("projectName", v)} />
      <Field label="Project location or suburb *" value={data.location as string} onChange={v => update("location", v)} />
      <SelectField label="Estimated budget *" value={data.budget as string} onChange={v => update("budget", v)} options={["Under R250,000", "R250,000–R1 million", "R1 million–R5 million", "R5 million–R20 million", "R20 million+", "Not sure yet"]} />
      <SelectField label="Expected start date *" value={data.timing as string} onChange={v => update("timing", v)} options={["As soon as possible", "Within 3 months", "Within 6 months", "Within 12 months", "Planning for the future", "Not sure yet"]} />
      <Field label="Approximate floor area (optional)" value={data.size as string} onChange={v => update("size", v)} />
      <SelectField label="Preferred service *" value={data.service as string} onChange={v => update("service", v)} options={services.map(s => s.title)} />
      <label className="full"><span>Project description *</span><textarea value={data.description as string} onChange={e => update("description", e.target.value)} placeholder="Share the goals, context, and what you know so far." /></label>
    </div></div>}
    {step === 3 && <div className="form-step"><h3>How should we reach you?</h3><div className="field-grid">
      <Field label="Full name *" value={data.name as string} onChange={v => update("name", v)} />
      <Field label="Company name (optional)" value={data.company as string} onChange={v => update("company", v)} />
      <Field label="Email address *" type="email" value={data.email as string} onChange={v => update("email", v)} />
      <Field label="Phone number *" type="tel" value={data.phone as string} onChange={v => update("phone", v)} />
      <SelectField label="Preferred contact method *" value={data.contact as string} onChange={v => update("contact", v)} options={["Email", "Phone call", "WhatsApp"]} />
      <label className="full"><span>Additional information (optional)</span><textarea value={data.additional as string} onChange={e => update("additional", e.target.value)} /></label>
      <label className="check full"><input type="checkbox" checked={data.consent as boolean} onChange={e => update("consent", e.target.checked)} /><span>I consent to this demo processing my information according to the privacy notice. *</span></label>
    </div></div>}
    {error && <p className="form-error" role="alert">{error}</p>}
    <div className="form-actions">{step > 1 && <button type="button" className="button button-secondary" onClick={() => { setError(""); setStep(s => s - 1); }}>← Back</button>}{step < 3 ? <button type="button" className="button" onClick={next}>Continue <Icon /></button> : <button className="button" disabled={loading}>{loading ? "Submitting demo..." : "Submit enquiry"} {!loading && <Icon />}</button>}</div>
  </form>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return <label><span>{label}</span><input type={type} value={value} onChange={e => onChange(e.target.value)} /></label>;
}
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return <label><span>{label}</span><select value={value} onChange={e => onChange(e.target.value)}><option value="">Select an option</option>{options.map(o => <option key={o}>{o}</option>)}</select></label>;
}

function ServicesPage() {
  const [params] = useSearchParams();
  const requestedService = Math.min(services.length - 1, Math.max(0, Number(params.get("service")) || 0));
  const [active, setActive] = useState(requestedService);
  const [faq, setFaq] = useState(0);
  useEffect(() => setActive(requestedService), [requestedService]);
  return <>
    <section className="page-hero services-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(6,7,9,.92), rgba(6,7,9,.3)), url(${services[2].image})` }}>
      <div><p className="eyebrow">CAPABILITIES / SERVICES</p><h1>ENGINEERED WITH<br />INTENTION.</h1><p>Integrated construction solutions for ambitious projects, from early planning to final handover.</p><div className="hero-actions"><a href="#contact" className="button">Request a consultation <Icon /></a><a href="#services" className="button button-secondary">Explore our services</a></div></div>
      <div className="services-hero-facts"><span>04<br /><small>CORE CAPABILITIES</small></span><span>05<br /><small>DELIVERY STAGES</small></span><span>01<br /><small>ACCOUNTABLE TEAM</small></span></div>
    </section>
    <section className="section service-selector-section" id="services"><SectionHead kicker="WHAT WE BUILD / 01" title="CAPABILITY WITH PURPOSE." copy="An illustrative service offering designed to be adapted to Nexora’s verified business capabilities." />
      <div className="service-selector"><div className="selector-tabs">{services.map((s, i) => <button className={active === i ? "active" : ""} onClick={() => setActive(i)} key={s.title}><span>0{i + 1}</span>{s.title}</button>)}</div>
        <div className="selector-panel"><img src={services[active].image} alt={services[active].title} /><div><p className="eyebrow">SERVICE 0{active + 1}</p><h3>{services[active].title}</h3><p>{services[active].description}</p><ul>{services[active].capabilities.map(c => <li key={c}>{c}</li>)}</ul><a href="#contact" className="text-link">Discuss this service <Icon /></a></div></div></div>
    </section>
    <section className="section methodology"><SectionHead kicker="DELIVERY / 02" title="CLARITY AT EVERY STAGE." /><div>{[["Consultation", "Understand requirements, budget expectations, site, and objectives."], ["Project definition", "Clarify scope, constraints, timelines, and responsibilities."], ["Planning & coordination", "Align design, materials, resources, and scheduling."], ["Execution & oversight", "Manage activities, quality checks, communication, and progress."], ["Completion & handover", "Coordinate inspections, snag lists, documentation, and handover."]].map(([t, c], i) => <article key={t}><span>0{i + 1}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <section className="section light-section principles"><SectionHead light kicker="OUR PRINCIPLES / 03" title={"BUILT ON TRUST.\nDELIVERED WITH PRECISION."} /><div>{["Clear communication", "Quality-focused execution", "Safety and responsibility", "Structured project management"].map((p, i) => <article key={p}><span>0{i + 1}</span><h3>{p}</h3><p>Disciplined systems, practical thinking, and visible accountability at every project stage.</p></article>)}</div></section>
    <section className="contact-section" id="contact"><div className="contact-panel"><p className="eyebrow">PROJECT ENQUIRIES / 04</p><h2>LET&apos;S TALK ABOUT YOUR NEXT BUILD.</h2><p>Share what you know so far. The form is a local prototype and will not send or store information.</p><dl><div><dt>Email</dt><dd><a href="mailto:hello@nexoraconstruction.co.za">hello@nexoraconstruction.co.za</a></dd></div><div><dt>Phone</dt><dd><a href="tel:+27000000000">+27 XX XXX XXXX</a></dd></div><div><dt>Location</dt><dd>Cape Town, Western Cape</dd></div><div><dt>Hours</dt><dd>Mon—Fri / 08:00—17:00</dd></div></dl></div><EnquiryForm /></section>
    <section className="section faq-section"><SectionHead kicker="FAQ / 05" title="BEFORE WE BEGIN." /><div className="faq-list">{faqs.map(([q, a], i) => <div className={faq === i ? "open" : ""} key={q}><button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}><span>0{i + 1}</span><strong>{q}</strong><b>{faq === i ? "−" : "+"}</b></button><p>{a}</p></div>)}</div></section>
    <section className="portfolio-cta"><p className="eyebrow">THE FIRST STEP / 06</p><h2>LET&apos;S BUILD SOMETHING THAT LASTS.</h2><p>Every great structure begins with a conversation.</p><ButtonLink to="/services#contact">Start your enquiry</ButtonLink></section>
  </>;
}

export default ServicesPage;
