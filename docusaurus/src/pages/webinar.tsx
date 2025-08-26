import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './webinar.module.css';

function WebinarHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.flamingoContainer}>
          <div className={styles.flamingoIcon}>🦩</div>
          <div className={styles.headerContent}>
            <Heading as="h1" className="hero__title">
              Copilot Agent for VS Code
            </Heading>
            <p className="hero__subtitle">
              Make coding easier and faster with AI tools—be a flamingo of the coding world!
            </p>
            <div className={styles.buttons}>
              <button
                className="button button--secondary button--lg"
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Your Free Guide! 🦩
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function WebinarFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.section}>
          <Heading as="h2">What You'll Learn:</Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <h3>🎯 Spec Frames</h3>
              <p>Turn your ideas into clear plans—from product → feature → test steps</p>
            </div>
            <div className={styles.feature}>
              <h3>📦 Standards Packs</h3>
              <p>Use ready-made rules for TypeScript, React, Next.js, Jest</p>
            </div>
            <div className={styles.feature}>
              <h3>👀 Tracking Steps</h3>
              <p>Watch your work move from idea to tests</p>
            </div>
            <div className={styles.feature}>
              <h3>⚡ Feature Templates</h3>
              <p>Auto-create templates to build features easily</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <Heading as="h2">Perfect For:</Heading>
          <div className={styles.audienceList}>
            <div className={styles.audienceItem}>
              <span className={styles.flamingoEmoji}>🦩</span>
              <p>Team leaders who want a smart, shared way to work</p>
            </div>
            <div className={styles.audienceItem}>
              <span className={styles.flamingoEmoji}>🦩</span>
              <p>Experienced developers who want less rework</p>
            </div>
            <div className={styles.audienceItem}>
              <span className={styles.flamingoEmoji}>🦩</span>
              <p>AI-curious teams who want real results—not just ideas</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <Heading as="h2">Webinar in 1 Hour:</Heading>
          <div className={styles.agenda}>
            <div className={styles.agendaItem}>
              <span className={styles.stepNumber}>1</span>
              <p>Why old-style plans don't help devs</p>
            </div>
            <div className={styles.agendaItem}>
              <span className={styles.stepNumber}>2</span>
              <p>How to write AI prompts to make specs</p>
            </div>
            <div className={styles.agendaItem}>
              <span className={styles.stepNumber}>3</span>
              <p>How to send specs into TypeScript, React, Next.js, Jest</p>
            </div>
            <div className={styles.agendaItem}>
              <span className={styles.stepNumber}>4</span>
              <p>How specs become code templates</p>
            </div>
            <div className={styles.agendaItem}>
              <span className={styles.stepNumber}>5</span>
              <p>How to link AI to real code</p>
            </div>
            <div className={styles.agendaItem}>
              <span className={styles.stepNumber}>6</span>
              <p>How to automate work with simple tools</p>
            </div>
            <div className={styles.agendaItem}>
              <span className={styles.stepNumber}>7</span>
              <p>Ask questions and plan next steps</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <Heading as="h2">Tools We Use:</Heading>
          <p className={styles.techStack}>
            TypeScript, React, Next.js, Jest, GitHub Copilot
          </p>
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.flamingoHighlight} id="signup">
            <div className={styles.flamingoIcon}>🦩</div>
            <div>
              <Heading as="h2">Free Guide!</Heading>
              <p>Sign up now to get your PDF and learn how to speed up code with AI</p>
              <div className={styles.signupForm}>
                <input 
                  type="email" 
                  placeholder="Enter your email to fly with the flock" 
                  className={styles.emailInput}
                />
                <button className={styles.signupButton}>
                  Get My Guide! 🦩
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <Heading as="h2">Questions?</Heading>
          <p>We'll show you what you need, when it's available, how long it lasts, what's inside, and how we keep your info safe</p>
        </div>

        <div className={styles.instructorSection}>
          <Heading as="h2">Your Helper:</Heading>
          <div className={styles.instructor}>
            <div className={styles.instructorInfo}>
              <h3>Matt Vaughn</h3>
              <p>20+ years of building smart software and teaching how AI can make specs and code work better together</p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Make it fun, simple, and clear. Join us—get the guide, learn from Agent Alchemy. Your info is safe. All rights belong to Agent Alchemy, 2025.</p>
          <div className={styles.flamingoFooter}>
            <span>🦩 Fly bright, code right! 🦩</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Webinar(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Flamingo Coding Webinar - AI Pair Programming"
      description="Learn to make coding easier with AI tools! Join our flamingo-themed webinar on GitHub Copilot and VS Code. Free guide included!">
      <WebinarHeader />
      <main>
        <WebinarFeatures />
      </main>
    </Layout>
  );
}