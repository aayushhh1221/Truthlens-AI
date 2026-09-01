import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Play, Users, Fingerprint, Database, Shield, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SystemStatusCard } from '../components/verification/SystemStatusCard';
import { VerificationDashboard } from '../components/verification/VerificationDashboard';
import { AgentPipeline } from '../components/agents/AgentPipeline';
import { RecentAnalyses } from '../components/verification/RecentAnalyses';

// Animated shield SVG for hero
const HeroShield: React.FC = () => (
  <svg
    width="210"
    height="230"
    viewBox="0 0 210 230"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="hero-shield-svg"
    aria-hidden="true"
  >
    {/* Outer ring */}
    <ellipse cx="105" cy="140" rx="95" ry="15" fill="rgba(20,85,160,0.06)" />

    {/* Shield body */}
    <path
      d="M105 8L18 42V105C18 159 55 205 105 221C155 205 192 159 192 105V42L105 8Z"
      fill="#EAF2FF"
      stroke="#0B2A5B"
      strokeWidth="3"
    />
    <path
      d="M105 22L30 52V105C30 153 63 195 105 209C147 195 180 153 180 105V52L105 22Z"
      fill="white"
      stroke="#D8E0EA"
      strokeWidth="1.5"
    />
    {/* Inner fill */}
    <path
      d="M105 22L30 52V105C30 153 63 195 105 209C147 195 180 153 180 105V52L105 22Z"
      fill="url(#shieldGrad)"
    />
    <defs>
      <linearGradient id="shieldGrad" x1="105" y1="22" x2="105" y2="209" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#EAF2FF" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
    </defs>

    {/* Checkmark */}
    <path
      d="M68 108L92 132L142 82"
      stroke="#1D63C8"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Lens circle */}
    <circle cx="105" cy="107" r="38" stroke="#0B2A5B" strokeWidth="2" fill="none" opacity="0.2" />
    <circle cx="105" cy="107" r="52" stroke="#1455A0" strokeWidth="1" fill="none" opacity="0.10" strokeDasharray="4 4" />

    {/* Dots around shield */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <circle
        key={i}
        cx={105 + 75 * Math.cos((angle - 90) * Math.PI / 180)}
        cy={107 + 75 * Math.sin((angle - 90) * Math.PI / 180)}
        r="3"
        fill="#1D63C8"
        opacity="0.25"
      />
    ))}

    {/* Connection lines */}
    {[30, 90, 150, 210, 270, 330].map((angle, i) => (
      <line
        key={i}
        x1={105}
        y1={107}
        x2={105 + 68 * Math.cos((angle - 90) * Math.PI / 180)}
        y2={107 + 68 * Math.sin((angle - 90) * Math.PI / 180)}
        stroke="#1455A0"
        strokeWidth="0.8"
        opacity="0.12"
      />
    ))}
  </svg>
);




const Footer: React.FC<{ onWatchDemo: () => void }> = ({ onWatchDemo }) => (
  <footer className="footer" role="contentinfo">
    <div className="footer-inner">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-area">
            <img
              src="/emblem-of-india.svg"
              alt="State Emblem of India"
              style={{ width: '28px', height: '40px', objectFit: 'contain' }}
            />
            <div>
              <div className="footer-product-name">TruthLens AI 2.0</div>
              <div className="footer-tagline">AI-Powered Verification &amp; Forensic Analysis Platform</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--c-text-muted)', lineHeight: 1.6, marginTop: '8px' }}>
            SIH 2026 · PS 26059 · Prototype
          </p>

        </div>

        <div>
          <div className="footer-col-title">About</div>
          <div className="footer-link-list">
            <a href="/about">About TruthLens AI</a>
            <a href="/about#how-it-works">How It Works</a>
            <a href="/about#technology">Technology</a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Resources</div>
          <div className="footer-link-list">
            <a href="#">User Guide</a>
            <a href="#">API Documentation</a>
            <a href="#">Research Papers</a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Policies</div>
          <div className="footer-link-list">
            <a href="#">Privacy Policy</a>
            <a href="#">Data Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>

        <div className="stay-connected">
          <div className="footer-col-title">Stay Connected</div>
          <p>For updates and announcements</p>
          <div className="social-links">
            <a href="#" className="social-btn" aria-label="Follow on X (Twitter)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="social-btn" aria-label="Connect on LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <button
              type="button"
              className="social-btn"
              onClick={onWatchDemo}
              aria-label="Watch video demonstration on YouTube"
              style={{ background: 'transparent', cursor: 'pointer', border: '1px solid var(--c-border)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
              </svg>
            </button>
          </div>
        </div>
      </div>


      <div className="footer-bottom">
        <div className="footer-links-row">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Accessibility Statement</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="footer-copyright">© 2026 Government of India. All rights reserved.</div>
        <div className="footer-proto-notice">This is a SIH 2026 Prototype. Not for Operational Use.</div>
      </div>
    </div>
  </footer>
);

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <main id="main-content" tabIndex={-1}>
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-bg-pattern" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-label">
              <span className="hero-label-dot" aria-hidden="true" />
              <span>{t('home.heroLabel')}</span>
            </div>

            <h1 className="hero-h1" id="hero-heading">
              {t('home.heroH1')}<br />
              <span className="blue">{t('home.heroH1Highlight')}</span>
            </h1>

            <p className="hero-desc">
              {t('home.heroDesc')}
            </p>

            <div className="hero-actions">
              <button
                className="btn-primary"
                onClick={() => navigate('/detection')}
                aria-label="Start analyzing content"
              >
                <Search size={15} aria-hidden="true" />
                {t('home.startAnalyzing')}
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowDemoModal(true)}
                aria-label="Watch video demonstration"
              >
                <Play size={15} aria-hidden="true" />
                {t('home.watchDemo')}
              </button>
            </div>
          </div>


          {/* Hero Visual */}
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-shield-wrap">
              <HeroShield />
            </div>
            {/* Abstract world dots */}
            <div className="hero-world-map">
              <svg width="380" height="240" viewBox="0 0 380 240" fill="none">
                {Array.from({ length: 180 }, (_, i) => (
                  <circle
                    key={i}
                    cx={10 + (i % 30) * 12}
                    cy={10 + Math.floor(i / 30) * 28}
                    r="1.8"
                    fill="#1455A0"
                    opacity={Math.random() > 0.6 ? 0.6 : 0.2}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* System Status */}
          <SystemStatusCard />
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="section" aria-label="Verification overview">
        <div className="container">
          <div className="home-dashboard-grid">
            <VerificationDashboard />
            <AgentPipeline />
            <RecentAnalyses />
          </div>
        </div>
      </section>

      {/* Capabilities Strip */}
      <section className="capabilities-strip" aria-label="Platform capabilities">
        <div className="capabilities-grid">
          {[
            { value: '6', label: t('home.capAgents'), sub: t('home.capAgentsSub'), icon: Users },
            { value: '12+', label: t('home.capSignals'), sub: t('home.capSignalsSub'), icon: Fingerprint },
            { value: 'RAG', label: t('home.capRAG'), sub: t('home.capRAGSub'), icon: Database },
            { value: '3', label: t('home.capModes'), sub: t('home.capModesSub'), icon: Shield },
          ].map(({ value, label, sub, icon: Icon }) => (
            <div key={label} className="capability-item">
              <div className="cap-icon" aria-hidden="true">
                <Icon size={20} />
              </div>
              <div className="cap-text">
                <div className="cap-value">{value}</div>
                <div className="cap-label">{label}</div>
                <div className="cap-sub">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <Footer onWatchDemo={() => setShowDemoModal(true)} />


      {/* Video Demonstration Modal */}
      {showDemoModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TruthLens AI Video Demonstration"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(11, 42, 91, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowDemoModal(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '860px',
              background: '#0B2A5B',
              borderRadius: 'var(--r-lg)',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
                <Play size={16} color="var(--c-accent)" />
                TruthLens AI 2.0 — System Demonstration Video
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                aria-label="Close demonstration video"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 'var(--r-sm)',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Responsive 16:9 Video Container */}
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000000' }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                src="https://www.youtube-nocookie.com/embed/Xtpba5MQr2U?autoplay=1&rel=0"
                title="TruthLens AI 2.0 Demonstration Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};


export default HomePage;
