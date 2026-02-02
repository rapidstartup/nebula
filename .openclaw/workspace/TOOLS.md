# TOOLS.md - Nebula Project Tools & Configuration

Complete tooling reference for all aspects of the Nebula project.

---

## CRITICAL: Environment Information

### Operating System
- **OS:** Windows 10/11
- **Shell:** PowerShell (NOT bash/zsh)
- **Working Directory:** `c:\Users\natha\Downloads\repositories\nebula`

### PowerShell Command Syntax

**IMPORTANT:** This is Windows PowerShell, NOT bash. Use correct syntax:

| Bash (WRONG) | PowerShell (CORRECT) |
|--------------|----------------------|
| `cd dir && command` | `cd dir; command` |
| `command1 && command2` | `command1; command2` |
| `export VAR=value` | `$env:VAR = "value"` |
| `ls` | `Get-ChildItem` or `dir` |
| `cat file` | `Get-Content file` |
| `grep pattern` | `Select-String pattern` |
| `rm -rf dir` | `Remove-Item -Recurse -Force dir` |

### Path Format
- Use backslashes: `c:\Users\natha\Downloads\repositories\nebula`
- Or forward slashes work in most contexts: `c:/Users/natha/Downloads/repositories/nebula`

### Example Commands
```powershell
# Git operations (use ; not &&)
git add .; git commit -m "message"; git push

# Run multiple commands
npm run build; npm run preview

# Check git status
git status

# Navigate (you're already in repo root)
# DON'T do: cd nebula  
# You ARE in nebula already!
```

---

## Development Tools

### Project Structure
```
nebula/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route components  
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript definitions
│   └── assets/         # Static assets
├── api-docs/           # API documentation
├── .openclaw/          # Agent workspace
│   └── workspace/
├── public/             # Static public assets
├── dist/               # Production build output
└── node_modules/       # Dependencies
```

### Commands
```powershell
# Development
npm run dev              # Start dev server (localhost:5173)
npm run build            # Production build → dist/
npm run preview          # Preview production build
npm run lint             # ESLint check

# Package Management
npm install              # Install dependencies
npm update               # Update packages
npm audit                # Security audit
```

### Tech Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| React Router | 6.x | Routing |
| Lucide React | Latest | Icons |

---

## Browser Tools

You have full browser control for testing and verification.

### Navigation
```
browser navigate "http://localhost:5173/"
browser navigate "http://localhost:5173/project-charter"
```

### Visual Verification
```
browser screenshot              # Capture current view
browser screenshot --full-page  # Full page capture
browser snapshot               # Get accessibility tree
```

### Interaction
```
browser click <ref>            # Click element
browser type <ref> "text"      # Type into field
browser hover <ref>            # Hover over element
browser select <ref> "value"   # Select dropdown option
```

### Testing Checklist
- [ ] Desktop viewport (1920x1080)
- [ ] Mobile viewport (375x667)
- [ ] Dark mode appearance
- [ ] Interactive elements work
- [ ] Forms submit correctly
- [ ] Navigation flows properly

---

## Deployment Tools

### Build Process
```powershell
# 1. Clean build
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
npm run build

# 2. Verify output
Get-ChildItem dist

# 3. Preview locally
npm run preview
```

### Build Output
- `dist/index.html` - Entry point
- `dist/assets/` - JS, CSS, images
- All routes handled by SPA routing

### Deployment Targets
| Platform | Status | Notes |
|----------|--------|-------|
| Vercel | Planned | Zero-config for Vite |
| Netlify | Planned | Alternative option |
| Cloudflare Pages | Planned | Edge deployment |
| IPFS | Future | Decentralized hosting |

### Environment Variables
```
# .env.local (local development)
VITE_API_URL=https://api.nebula.rapidstartup.io/v1
VITE_ENV=development

# Production (set in deployment platform)
VITE_API_URL=https://api.nebula.rapidstartup.io/v1
VITE_ENV=production
```

---

## Project Management Tools

### Task Tracking
Use `memory/` files to track:
- Current sprint tasks
- Blockers and dependencies
- Completed work
- Next priorities

### PRD Documents
| Document | Location | Purpose |
|----------|----------|---------|
| V1.0 PRD | `/Version1-prd.md` | Core requirements |
| V1.5 PRD | `/Version1.5-prd.md` | Enhanced governance |
| V2.0 PRD | `/Version-2-PRD.md` | Future features |
| Architecture | `/Version-2-AGENTS.md` | Technical vision |

### Progress Tracking Format
```markdown
## Sprint: [Date Range]

### Completed
- [x] Feature/task description

### In Progress  
- [ ] Feature/task description (XX% complete)

### Blocked
- [ ] Feature/task description
  - Blocker: [description]

### Next Up
- [ ] Feature/task description
```

---

## DAO & Governance Tools

### Core Concepts
| Concept | Implementation |
|---------|----------------|
| Geographic DAOs | Location-based communities |
| Proposals | Community-submitted initiatives |
| Voting | Transparent, verifiable ballots |
| Treasury | Community-controlled funds |
| Wiki | Consensus-edited knowledge base |

### Decentralized Architecture

**Current (V1):**
- Frontend-only React app
- Git-based documentation
- API documentation ready

**Planned (V2):**
- Wallet-based authentication (SIWE)
- IPFS content storage
- Smart contracts for governance
- Zero-knowledge proofs for privacy

### Swiss Canton Model Reference
- Direct democracy with referendums
- Principle of subsidiarity
- Transparent decision-making
- Community-driven governance

---

## Design System

### Cosmic Theme Colors
```css
/* Backgrounds */
--bg-deep: #030712;      /* gray-950 */
--bg-primary: #0f172a;   /* slate-900 */
--bg-elevated: #1e293b;  /* slate-800 */

/* Accents */
--purple: #8B5CF6;       /* Primary */
--cyan: #06B6D4;         /* Accent */
--gold: #F59E0B;         /* Highlight */

/* Text */
--text-primary: #ffffff;
--text-secondary: #d1d5db;  /* gray-300 */
--text-muted: #9ca3af;      /* gray-400 */
```

### Tailwind Classes
```
/* Card */
bg-slate-900 rounded-xl p-6 border border-purple-500/20

/* Button Primary */
bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg

/* Button Secondary */
border border-purple-500/30 text-purple-400 hover:bg-purple-500/10

/* Gradient Background */
bg-gradient-to-br from-purple-900/20 to-cyan-900/20
```

### Typography
- Headings: `font-bold text-white`
- Body: `text-gray-300`
- Small: `text-sm text-gray-400`
- Links: `text-purple-400 hover:text-purple-300`

---

## API Documentation

### Base URL
```
https://api.nebula.rapidstartup.io/v1
```

### Endpoint Categories
| Category | File | Status |
|----------|------|--------|
| Identity | `api-docs/identity.md` | Documented |
| DAO | `api-docs/dao.md` | Documented |
| Governance | `api-docs/governance.md` | Documented |
| Treasury | `api-docs/treasury.md` | Documented |
| Wiki | `api-docs/wiki.md` | Documented |

### Documentation Format
```markdown
## Endpoint Name

**Method:** GET | POST | PUT | DELETE
**Path:** /v1/resource/:id
**Status:** [Current] | [Planned V1.0] | [Planned V1.5]

### Request
| Parameter | Type | Required | Description |

### Response
{ JSON example }
```

---

## Git Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes

### Commit Message Format
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Scope: component name, page name, or general area
```

### Example Commits
```
feat(voting): add proposal submission form
fix(navigation): correct mobile menu behavior
docs(api): update treasury endpoints
refactor(components): extract shared card component
```

---

## Security Checklist

- [ ] No secrets in code
- [ ] Input validation on all forms
- [ ] HTTPS for external calls
- [ ] Proper error handling (no stack traces exposed)
- [ ] Accessibility labels (prevents XSS via screen readers)
- [ ] Content Security Policy headers (deployment)

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3.0s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Bundle Size (gzipped) | < 200KB |

---

*Add project-specific notes below as you learn the codebase.*
