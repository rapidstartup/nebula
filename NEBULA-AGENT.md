# Nebula OpenClaw Project & Technical Manager Agent

> **An autonomous AI agent for managing the development, deployment, and technical implementation of the Nebula decentralized governance platform.**

---

## Overview

The Nebula Agent is a locally-running AI coding agent powered by [OpenClaw](https://docs.clawd.bot/) that serves as the **Project and Technical Implementation Manager** for the Nebula repository. It has full access to:

- The codebase and all project files
- Browser for testing and visual verification
- Terminal for running commands and scripts
- Memory system for persistent context across sessions

This agent is **completely isolated** from any production OpenClaw instances, running on its own gateway and port.

---

## CRITICAL: File Location Rules

### Where Files Should Be Created

**This is the most important rule for the agent to follow.**

| File Type | Correct Location | WRONG Location |
|-----------|------------------|----------------|
| Source code | `nebula/src/` | ~~`.openclaw/workspace/src/`~~ |
| Contracts | `nebula/contracts/` | ~~`.openclaw/workspace/contracts/`~~ |
| Components | `nebula/src/components/` | ~~`.openclaw/workspace/components/`~~ |
| Documentation | `nebula/docs/` or `nebula/*.md` | ~~`.openclaw/workspace/docs/`~~ |
| API docs | `nebula/api-docs/` | ~~`.openclaw/workspace/api-docs/`~~ |
| Config files | `nebula/` (root) | ~~`.openclaw/workspace/`~~ |
| Package.json | `nebula/package.json` | ~~`.openclaw/workspace/package.json`~~ |

### What Goes in `.openclaw/workspace/`

**ONLY these files belong in the workspace:**

```
.openclaw/workspace/
├── SOUL.md          # Agent identity (config)
├── AGENTS.md        # Workflow rules (config)
├── TOOLS.md         # Project tools reference (config)
├── MEMORY.md        # Agent's curated memories
├── USER.md          # Info about the user
├── HEARTBEAT.md     # Periodic task config
├── memory/          # Daily session logs
│   └── YYYY-MM-DD.md
└── skills/          # Agent skill definitions
    └── nebula-dev/
        └── SKILL.md
```

### What Goes in Repository Root

**ALL project work goes here:**

```
nebula/                      ← PROJECT ROOT (work here!)
├── src/                     # React application code
│   ├── components/          # UI components
│   ├── pages/               # Page components
│   ├── hooks/               # Custom hooks
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
├── contracts/               # Smart contracts (if any)
├── api-docs/                # API documentation
├── public/                  # Static assets
├── docs/                    # Project documentation
├── Version1-prd.md          # PRD documents
├── Version1.5-prd.md
├── Version-2-PRD.md
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Build config
└── .openclaw/               # Agent workspace (config only!)
```

### Rule Summary

```
✅ CORRECT: Create code/docs in nebula/ (repo root)
❌ WRONG:   Create code/docs in .openclaw/workspace/

✅ CORRECT: Update MEMORY.md in .openclaw/workspace/
❌ WRONG:   Create MEMORY.md in repo root
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Nebula Agent Architecture                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │   Gateway    │     │   Workspace  │     │   Browser    │    │
│  │  Port 18790  │────▶│  .openclaw/  │────▶│   Headless   │    │
│  └──────────────┘     │ (config only)│     └──────────────┘    │
│         │             └──────────────┘            │             │
│         │                    │                    │             │
│         ▼                    ▼                    ▼             │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │    Model     │     │  Project     │     │  Screenshot  │    │
│  │   Kimi K2    │     │  Repository  │     │   & Control  │    │
│  │ (OpenRouter) │     │ (work here!) │     │              │    │
│  └──────────────┘     └──────────────┘     └──────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **Gateway** | `ws://127.0.0.1:18790` | WebSocket server handling agent communication |
| **Config** | `~/.openclaw-nebula/openclaw.json` | Agent configuration (model, auth, gateway settings) |
| **Workspace** | `nebula/.openclaw/workspace/` | **Agent config only** - personality, memory, skills |
| **Project** | `nebula/` (repo root) | **All project work** - code, docs, contracts |
| **Sessions** | `~/.openclaw-nebula/agents/main/sessions/` | Conversation history and state |

---

## Quick Start

### Prerequisites

- Node.js 22+
- OpenClaw CLI installed globally: `npm install -g clawdbot@latest`
- OpenRouter API key (stored in `.env.local`)

### Starting the Agent

```powershell
# Start the gateway (runs in background)
openclaw --profile nebula gateway

# Verify it's running
openclaw --profile nebula health
```

### Interacting with the Agent

**Option 1: Web Dashboard**
```
http://127.0.0.1:18790/?token=nebula-local-dev-token-2026
```

**Option 2: Terminal UI (TUI)**
```powershell
openclaw --profile nebula tui
```

**Option 3: Single Message**
```powershell
openclaw --profile nebula agent --message "Your message here" --session-id main
```

---

## Configuration

### Profile Isolation

The Nebula agent uses `--profile nebula` to isolate it from any other OpenClaw installations:

| Profile | Config Location | Port | Purpose |
|---------|-----------------|------|---------|
| (default) | `~/.openclaw/` | 18789 | Production/global agent |
| **nebula** | `~/.openclaw-nebula/` | 18790 | This project's local agent |

### Gateway Configuration

Location: `C:\Users\natha\.openclaw-nebula\openclaw.json`

```json
{
  "env": {
    "OPENROUTER_API_KEY": "sk-or-v1-..."
  },
  "agents": {
    "defaults": {
      "workspace": "c:\\Users\\natha\\Downloads\\repositories\\nebula\\.openclaw\\workspace",
      "model": {
        "primary": "openrouter/moonshotai/kimi-k2"
      }
    }
  },
  "gateway": {
    "port": 18790,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "nebula-local-dev-token-2026"
    }
  }
}
```

### Workspace Files (Agent Config Only)

Location: `nebula/.openclaw/workspace/`

| File | Purpose |
|------|---------|
| `SOUL.md` | Agent identity, mission, and personality |
| `AGENTS.md` | Workflow rules and session behavior |
| `TOOLS.md` | Project-specific tooling and configuration |
| `MEMORY.md` | Long-term curated memories |
| `USER.md` | Information about the user |
| `HEARTBEAT.md` | Periodic task configuration |
| `skills/` | Specialized skills (e.g., `nebula-dev/`) |
| `memory/` | Daily notes and session logs |

**Remember:** These are for agent configuration only. Project code goes in repo root!

---

## Capabilities

### 1. Code Management

The agent can read, write, and modify any file in the repository:

```powershell
# Ask agent to review code
openclaw --profile nebula agent --message "Review the App.tsx file and suggest improvements" --session-id main
```

**Important:** Code should be created in `nebula/src/`, NOT in `.openclaw/workspace/`

### 2. Browser Control

The agent has access to a headless browser for visual testing:

```powershell
# Manual browser commands
openclaw --profile nebula browser navigate "http://localhost:5173/"
openclaw --profile nebula browser screenshot
openclaw --profile nebula browser snapshot  # Get DOM structure
```

**Browser Settings:**
- Profile: `openclaw` (managed browser)
- Mode: Headless with no-sandbox
- Can take screenshots, navigate, click, type, and interact with web pages

### 3. Command Execution

The agent can run shell commands for:
- Starting/stopping dev servers
- Running builds and tests
- Git operations
- Package management

```powershell
# Agent can execute commands like:
# npm run dev
# npm run build
# git status
# git commit -m "message"
```

### 4. Memory & Context

**Short-term:** Session history maintained across messages
**Long-term:** 
- `MEMORY.md` for curated important information (in `.openclaw/workspace/`)
- `memory/YYYY-MM-DD.md` for daily logs (in `.openclaw/workspace/memory/`)

The agent reads these files at the start of each session to maintain context.

---

## Agent Role: Project & Technical Manager

### Responsibilities

1. **Code Implementation**
   - Write and review React/TypeScript code **in `src/`**
   - Implement features from PRD documents
   - Fix bugs and improve code quality

2. **Testing & Verification**
   - Use browser to visually verify changes
   - Run automated tests
   - Check for regressions

3. **Deployment Management**
   - Build production bundles
   - Manage deployment processes
   - Monitor for issues

4. **Documentation**
   - Keep docs up to date **in repo root or `docs/`**
   - Document architectural decisions
   - Update API documentation **in `api-docs/`**

5. **Project Tracking**
   - Reference PRD files for requirements
   - Track implementation progress **in `.openclaw/workspace/MEMORY.md`**
   - Manage technical debt

### Key Project Files

| File | Location | Purpose |
|------|----------|---------|
| `Version1-prd.md` | Repo root | Product Requirements V1.0 |
| `Version1.5-prd.md` | Repo root | Enhanced governance model |
| `Version-2-AGENTS.md` | Repo root | Technical architecture vision |
| `Version-2-PRD.md` | Repo root | V2 product requirements |
| `api-docs/` | Repo root | API documentation |

---

## Common Commands Reference

### Gateway Management

```powershell
# Start gateway
openclaw --profile nebula gateway

# Check health
openclaw --profile nebula health

# Check full status
openclaw --profile nebula status

# View logs
openclaw --profile nebula logs --follow
```

### Agent Interaction

```powershell
# Terminal UI chat
openclaw --profile nebula tui

# Single message
openclaw --profile nebula agent --message "message" --session-id main

# Check sessions
openclaw --profile nebula sessions
```

### Browser Control

```powershell
# Navigate to URL
openclaw --profile nebula browser navigate "http://localhost:5173/"

# Take screenshot
openclaw --profile nebula browser screenshot

# Get page snapshot (accessibility tree)
openclaw --profile nebula browser snapshot

# Click element
openclaw --profile nebula browser click <ref>

# Type text
openclaw --profile nebula browser type <ref> "text"
```

### Development

```powershell
# Start dev server (in separate terminal)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

---

## Troubleshooting

### Agent Creating Files in Wrong Location

**Problem:** Agent creates code in `.openclaw/workspace/` instead of repo root.

**Solution:** 
1. Update `SOUL.md` and `AGENTS.md` to explicitly state file location rules
2. When instructing the agent, specify exact paths:
   - "Create the component in `src/components/`" (not just "create a component")
   - "Add the contract to `contracts/`" (not just "create a contract")
3. Check and move any misplaced files to correct locations

### Gateway Won't Start

```powershell
# Check if port is in use
netstat -ano | findstr :18790

# Force restart
openclaw --profile nebula gateway --force
```

### Browser Not Connecting

1. Ensure browser settings in Control UI:
   - Enabled: `true`
   - Default profile: `openclaw`
   - Headless: `true` (optional)
   - No-sandbox: `true` (for Windows)

2. Test manually:
```powershell
openclaw --profile nebula browser status
openclaw --profile nebula browser start --browser-profile openclaw
```

### Model Errors

Check OpenRouter API key is set:
```powershell
openclaw --profile nebula config get env.OPENROUTER_API_KEY
```

### Session Issues

Reset sessions if needed:
```powershell
openclaw --profile nebula reset --scope sessions
```

---

## Security Notes

- **Gateway Token:** `nebula-local-dev-token-2026` (local development only)
- **API Keys:** Stored in config, not in repository
- **Network:** Binds to loopback only (127.0.0.1)
- **Isolation:** Completely separate from any production agents

---

## File Structure

```
nebula/                          ← ALL PROJECT WORK GOES HERE
├── src/                         # React application
│   ├── components/              # UI components
│   ├── pages/                   # Page components
│   ├── hooks/                   # Custom hooks
│   ├── types/                   # TypeScript types
│   └── utils/                   # Utilities
├── contracts/                   # Smart contracts (if any)
├── api-docs/                    # API documentation
├── docs/                        # Project documentation
├── public/                      # Static assets
├── Version1-prd.md              # Product requirements
├── Version1.5-prd.md            # Enhanced PRD
├── Version-2-AGENTS.md          # Technical architecture
├── Version-2-PRD.md             # V2 requirements
├── NEBULA-AGENT.md              # This file
├── INSTALL-LOCAL-AGENT.md       # Installation guide
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Build config
│
└── .openclaw/                   ← AGENT CONFIG ONLY
    └── workspace/
        ├── SOUL.md              # Agent identity
        ├── AGENTS.md            # Workflow rules
        ├── TOOLS.md             # Project tools ref
        ├── MEMORY.md            # Agent memories
        ├── USER.md              # User info
        ├── HEARTBEAT.md         # Periodic tasks
        ├── memory/              # Daily logs
        └── skills/              # Skill definitions
```

---

## Getting Help

- **OpenClaw Docs:** https://docs.clawd.bot/
- **Dashboard:** http://127.0.0.1:18790/?token=nebula-local-dev-token-2026
- **CLI Help:** `openclaw --profile nebula --help`

---

*The Nebula Agent is your autonomous partner in building the future of decentralized democratic governance.*

**Remember:** Code in repo root, config in `.openclaw/workspace/`!
