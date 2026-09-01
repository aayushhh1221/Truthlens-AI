import React from 'react';
import { Search, Globe, CheckSquare, AlertTriangle, BookOpen, Gavel, FileText, Image } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const agents = [

  { num: '01', icon: Search, name: 'Claim Extractor', desc: 'Identifies and isolates discrete, verifiable factual assertions from multimodal input. Produces structured claim objects for downstream agents.' },
  { num: '02', icon: Globe, name: 'Evidence Finder', desc: 'Performs RAG over Wikipedia and open web search. Ranks retrieved passages by relevance and passes provenance metadata to the Fact Checker.' },
  { num: '03', icon: CheckSquare, name: 'Fact Checker', desc: 'Compares each claim against retrieved evidence. Produces per-claim verdicts: Supported, Contradicted, or Unverified.' },
  { num: '04', icon: AlertTriangle, name: 'Risk Assessor', desc: 'Integrates forensic signals from text and image analysis tracks with fact-checking results. Produces calibrated fake score, risk level, and confidence.' },
  { num: '05', icon: BookOpen, name: 'Explainability Agent', desc: 'Builds a traceable reasoning chain grounded in the structured outputs of all preceding agents. Produces a human-readable, step-by-step explanation of the verdict.' },
  { num: '06', icon: Gavel, name: 'Final Judge', desc: 'Synthesises all upstream outputs to produce the final verdict, trust score, and confidence rating. Ensures no black-box result.' },
];

const forensicTracks = [
  {
    label: 'Text Forensics',
    icon: FileText,
    tools: [
      { name: 'VADER', desc: 'Valence Aware Dictionary for sEntiment Reasoning — sentence-level sentiment scoring.' },
      { name: 'TextStat', desc: 'Readability metrics including Flesch, Flesch-Kincaid, and Gunning Fog indices.' },
      { name: 'spaCy', desc: 'Named Entity Recognition, Part-of-Speech tagging, and stylistic anomaly detection.' },
    ],
  },
  {
    label: 'Image Forensics',
    icon: Image,
    tools: [
      { name: 'ELA', desc: 'Error Level Analysis — detects inconsistent JPEG compression indicating manipulation.' },
      { name: 'EXIF Metadata', desc: 'Extracts and audits camera metadata, timestamps, and software fingerprints.' },
      { name: 'Noise Pattern Analysis', desc: 'Detects pixel-level noise inconsistencies that indicate image splicing.' },
    ],
  },
];

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="page-header-band">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <a href="/">{t('nav.home')}</a>
            <span className="breadcrumb-sep">/</span>
            <span aria-current="page">{t('nav.about')}</span>
          </div>
          <h1 className="page-header-title">{t('about.title')}</h1>
          <p className="page-header-sub">{t('about.sub')}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="card about-section">
            <h2>{t('about.whatIs')}</h2>

            <p>
              TruthLens AI 2.0 is a multimodal misinformation, deepfake, and document-forgery verification
              platform developed for SIH 2026 (Problem Statement 26059). It is designed as a production-grade
              forensic verification system, not a generic LLM-based fact checker.

            </p>
            <p>
              The platform integrates a six-agent AI pipeline with dedicated text and image forensic tracks,
              calibrated trust/risk scoring, and an explainability system that traces every verdict back
              to specific evidence and pipeline outputs.
            </p>
            <div style={{ background: 'var(--c-warning-bg)', border: '1px solid #e9d098', borderRadius: 'var(--r-md)', padding: '12px 16px', marginTop: '12px' }}>
              <strong style={{ fontSize: '13px', color: 'var(--c-warning)' }}>⚠ Prototype Notice:</strong>
              <span style={{ fontSize: '13px', color: 'var(--c-warning)', marginLeft: '6px' }}>
                This is a SIH 2026 prototype. It is not an official Government of India service unless
                formally authorised by the appropriate authority.
              </span>
            </div>
          </div>

          {/* Six-Agent Architecture */}
          <div className="about-section" style={{ marginTop: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--c-navy)', marginBottom: '16px' }}>
              Six-Agent Architecture
            </h2>
            <div className="about-arch-grid">
              {agents.map(({ num, icon: Icon, name, desc }) => (
                <div key={num} className="arch-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--c-light-blue)', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} color="var(--c-blue)" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="arch-num">Agent {num}</div>
                      <div className="arch-name">{name}</div>
                    </div>
                  </div>
                  <div className="arch-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Forensic Tracks */}
          <div className="about-section" style={{ marginTop: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--c-navy)', marginBottom: '16px' }}>
              Forensic Analysis
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {forensicTracks.map(({ label, icon: Icon, tools }) => (
                <div key={label} className="card">
                  <div className="card-header">
                    <Icon size={15} color="var(--c-blue)" aria-hidden="true" />
                    <div className="card-title">{label}</div>
                  </div>
                  {tools.map(({ name, desc }) => (
                    <div key={name} style={{ padding: '10px 0', borderBottom: '1px solid var(--c-divider)' }}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--c-navy)', marginBottom: '3px' }}>{name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--c-text-secondary)', lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Retrieval */}
          <div className="card about-section" style={{ marginTop: '28px' }}>
            <h2>Evidence Retrieval (RAG)</h2>
            <p>
              The Evidence Finder agent uses Retrieval-Augmented Generation (RAG) to retrieve evidence
              from Wikipedia and open web search. Retrieved passages are ranked by relevance and passed
              with full provenance metadata — including source URL, retrieval timestamp, and claim match —
              to the Fact Checker agent.
            </p>
            <p>
              TruthLens does not hallucinate evidence. All evidence citations are grounded in actual
              retrieved documents.
            </p>
          </div>

          {/* Explainability */}
          <div className="card about-section" style={{ marginTop: '20px' }}>
            <h2>Explainability &amp; Traceability</h2>
            <p>
              Every TruthLens verdict is accompanied by a traceable reasoning chain. The Explainability Agent
              produces a step-by-step account of how the final verdict was reached, grounded in the
              structured outputs of the Claim Extractor, Evidence Finder, Fact Checker, and Risk Assessor.
            </p>
            <p>
              This is a core TruthLens differentiator: every verdict can be inspected stage by stage,
              with claim-level evidence and forensic signal contributions visible to the user.
            </p>
          </div>

          {/* Research */}
          <div className="card about-section" style={{ marginTop: '20px' }}>
            <h2>Research Foundation</h2>
            <p>
              TruthLens AI 2.0 addresses four identified gaps in existing misinformation detection systems:
            </p>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                ['Claim-level decomposition', 'Claim Extractor + Fact Checker decompose content into discrete verifiable assertions rather than treating the entire input as one binary verdict.'],
                ['Native forensic integration', 'Text and image forensic tracks feed the Risk Assessor directly, grounding the risk score in real forensic signals.'],
                ['Calibrated trust output', 'The system produces a calibrated fake score, risk level, and final confidence — not a single arbitrary percentage.'],
                ['Explanation traceability', 'A dedicated Explainability Agent produces a structured, step-by-step reasoning chain grounded in pipeline outputs.'],
              ].map(([gap, desc]) => (
                <div key={gap} style={{ background: 'var(--c-surface)', border: '1px solid var(--c-divider)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--c-navy)', marginBottom: '3px' }}>{gap}</div>
                  <div style={{ fontSize: '12px', color: 'var(--c-text-secondary)', lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
