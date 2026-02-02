# Nebula Project Management Skill

A comprehensive skill for managing all aspects of the Nebula decentralized governance platform.

---

## Skill Overview

This skill enables you to act as:
- **Head Developer** - Full-stack implementation
- **Product Owner** - Requirements and prioritization
- **Project Manager** - Planning and tracking
- **Deployment Manager** - Build and release
- **DAO Facilitator** - Governance design

---

## Head Developer Capabilities

### React Component Development

**Standard Component Template:**
```typescript
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ComponentNameProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  description,
  icon: Icon,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-slate-900 rounded-xl p-6 border border-purple-500/20 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="w-6 h-6 text-purple-400" />}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      {description && (
        <p className="text-gray-300 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
};
```

**Page Template:**
```typescript
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export const PageName: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />
      
      {/* Hero */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Page Title
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Page description.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Content here */}
        </div>
      </section>

      <Footer />
    </div>
  );
};
```

### Cosmic Theme System

**Background Classes:**
```css
bg-gray-950        /* Deepest - page background */
bg-slate-900       /* Primary - cards, sections */
bg-slate-800       /* Elevated - hover states */
bg-gradient-to-br from-purple-900/20 to-cyan-900/20  /* Nebula effect */
```

**Text Classes:**
```css
text-white         /* Primary headings */
text-gray-100      /* Secondary headings */
text-gray-300      /* Body text */
text-gray-400      /* Muted text */
text-purple-400    /* Accent/links */
text-cyan-400      /* Highlights */
```

**Interactive Elements:**
```css
/* Primary Button */
bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors

/* Secondary Button */
border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 px-6 py-3 rounded-lg transition-colors

/* Card Hover */
hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all
```

### TypeScript Patterns

**Interface Definition:**
```typescript
// src/types/dao.ts
export interface DAO {
  id: string;
  name: string;
  description: string;
  location: GeoLocation;
  members: number;
  proposals: Proposal[];
  treasury: Treasury;
  created_at: string;
  updated_at: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  radius_km: number;
  region_name: string;
}
```

**Custom Hook:**
```typescript
// src/hooks/useDAO.ts
import { useState, useEffect } from 'react';
import { DAO } from '../types/dao';

export const useDAO = (daoId: string) => {
  const [dao, setDao] = useState<DAO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fetch logic here
  }, [daoId]);

  return { dao, loading, error };
};
```

---

## Product Owner Capabilities

### PRD Management

**Feature Specification Format:**
```markdown
## Feature: [Name]

### User Story
As a [user type], I want [goal] so that [benefit].

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### Technical Notes
- Implementation approach
- Dependencies
- Risks

### Priority
[High/Medium/Low] - [Rationale]
```

### User Personas Reference

**Anna - Engaged Citizen (Zurich)**
- Age: 35, Urban Planner
- Needs: Transparent local governance, proposal voting
- Pain: Slow municipal processes, lack of feedback

**Ben - Community Organizer (Austin)**
- Age: 45, Small Business Owner
- Needs: Rally neighbors, pool funds, prove consensus
- Pain: Bureaucracy, difficulty proving support

**Maria - Curious Newcomer**
- Age: 22, University Student
- Needs: Simple onboarding, clear explanations
- Pain: Web3 jargon, fear of mistakes

### Feature Prioritization Matrix

| Priority | Criteria |
|----------|----------|
| P0 - Critical | Core functionality, security, blocking issues |
| P1 - High | Key user journeys, pilot requirements |
| P2 - Medium | Enhanced UX, nice-to-have features |
| P3 - Low | Future scope, experimental features |

---

## Project Manager Capabilities

### Sprint Planning Template

```markdown
# Sprint [Number]: [Date Range]

## Goals
1. Primary goal
2. Secondary goal

## Tasks

### Must Complete
- [ ] Task 1 (Est: Xh)
- [ ] Task 2 (Est: Xh)

### Should Complete
- [ ] Task 3 (Est: Xh)

### Could Complete
- [ ] Task 4 (Est: Xh)

## Risks
- Risk 1: [Mitigation]

## Dependencies
- Dependency 1: [Status]
```

### Progress Tracking

```markdown
## Daily Standup: [Date]

### Completed Yesterday
- Item 1
- Item 2

### Today's Focus
- Item 1
- Item 2

### Blockers
- Blocker 1 (if any)
```

### Milestone Tracking

| Milestone | Target Date | Status | Notes |
|-----------|-------------|--------|-------|
| V1.0 MVP | Q2 2025 | In Progress | Swiss pilot |
| V1.5 Governance | Q3 2025 | Planned | Enhanced voting |
| V2.0 Full DAO | Q4 2025 | Planned | Smart contracts |

---

## Deployment Manager Capabilities

### Build Process

```powershell
# 1. Pre-build checks
npm run lint
npm run test  # When tests exist

# 2. Production build
npm run build

# 3. Verify output
Get-ChildItem dist -Recurse | Measure-Object -Property Length -Sum

# 4. Local preview
npm run preview
```

### Deployment Checklist

```markdown
## Pre-Deployment
- [ ] All tests pass
- [ ] Lint errors resolved
- [ ] Build completes successfully
- [ ] Preview tested locally
- [ ] Environment variables configured

## Deployment
- [ ] Deploy to staging
- [ ] Smoke test staging
- [ ] Deploy to production
- [ ] Verify production

## Post-Deployment
- [ ] Monitor for errors
- [ ] Check performance metrics
- [ ] Update documentation
- [ ] Notify stakeholders
```

### Environment Configuration

| Environment | URL | Purpose |
|-------------|-----|---------|
| Local | localhost:5173 | Development |
| Preview | [PR-specific] | Review |
| Staging | staging.nebula... | Pre-production |
| Production | nebula.rapidstartup.io | Live |

---

## DAO Facilitator Capabilities

### Governance Patterns

**Proposal Lifecycle:**
```
Draft → Submitted → Discussion → Voting → Passed/Rejected → Executed
```

**Voting Mechanisms:**
| Type | Use Case |
|------|----------|
| Simple Majority | Standard decisions |
| Supermajority (2/3) | Constitutional changes |
| Quadratic Voting | Resource allocation |
| Conviction Voting | Continuous decisions |

### Swiss Canton Model

**Key Principles:**
1. **Subsidiarity** - Decisions at lowest appropriate level
2. **Direct Democracy** - Citizens vote on issues directly
3. **Transparency** - Public deliberation and records
4. **Consensus Building** - Discussion before voting

**Implementation Notes:**
- Geographic boundaries define DAO membership
- Residency verification for voting rights
- Multi-language support (German, French, Italian, English)
- Integration with existing civic processes

### Decentralization Patterns

**Data Sovereignty:**
```
User Data → User's Control
- Identity: Self-sovereign (wallet-based)
- Votes: Verifiable but private (ZK proofs)
- Content: IPFS with user keys
```

**Consensus Mechanisms:**
```
Proposal Consensus:
1. Author submits proposal
2. Community discusses (forum/wiki)
3. Formal vote with quorum
4. Execution if passed
5. Results recorded immutably
```

---

## Quality Standards

### Code Quality
- TypeScript strict mode
- ESLint rules followed
- Consistent formatting
- Meaningful variable names
- Comments for complex logic

### Accessibility
- Semantic HTML structure
- ARIA labels for interactions
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

### Performance
- Lazy loading for routes
- Image optimization
- Bundle size monitoring
- Core Web Vitals targets

### Security
- Input sanitization
- No secrets in code
- HTTPS enforcement
- CSP headers
- Regular dependency updates

---

## Quick Reference

### Common File Locations
| Type | Location |
|------|----------|
| Components | `src/components/` |
| Pages | `src/pages/` |
| Types | `src/types/` |
| Hooks | `src/hooks/` |
| Utils | `src/utils/` |
| API Docs | `api-docs/` |
| PRDs | Root directory |

### Common Commands
```powershell
npm run dev      # Development
npm run build    # Production build
npm run lint     # Code check
npm run preview  # Preview build
```

### Key Contacts
- Project Lead: Nathan Shearer (@LifeOnAutoSite)
- Vision: David Shapiro (@DaveShapi)

---

*This skill enables comprehensive project management for the Nebula decentralized governance platform.*
