# Install Local OpenClaw Agent Guide

> **A step-by-step guide to install a development OpenClaw agent confined to your local repository workspace.**

This guide creates an isolated AI coding agent that:
- Runs locally on your machine
- Is confined to your specific project
- Has its own gateway (won't conflict with other agents)
- Stores workspace files in your repository

---

## CRITICAL: Understand File Locations

Before installing, understand this crucial distinction:

| Location | Purpose | Contains |
|----------|---------|----------|
| `your-repo/` | **Project work** | Code, contracts, docs, configs |
| `your-repo/.openclaw/workspace/` | **Agent config only** | SOUL.md, MEMORY.md, skills |

**The agent must create all project files in the repo root, NOT in the workspace folder!**

```
✅ CORRECT: your-repo/src/Component.tsx
❌ WRONG:   your-repo/.openclaw/workspace/src/Component.tsx
```

This rule must be explicitly stated in your SOUL.md and AGENTS.md files.

---

## Known Issues on Windows (READ FIRST!)

Before installing, be aware of these Windows-specific issues:

### 1. API Key Config Location
OpenClaw may read from **both** global (`~/.openclaw/`) AND profile (`~/.openclaw-myproject/`) configs. You may need to update the API key in **both** locations.

### 2. PowerShell Syntax
The agent defaults to bash syntax (`&&`), but Windows uses PowerShell (`;`). You must explicitly tell the agent about PowerShell in TOOLS.md.

### 3. Working Directory
The agent starts in `.openclaw/workspace/`, NOT the repo root. You must tell it the full path to your repository.

### 4. File Locking
Windows file locking can cause EPERM errors. Delete any `.tmp` files if you see these errors.

**All solutions are in the Troubleshooting section below.**

---

## Prerequisites

### Required
- **Node.js 22+** - Check with `node --version`
- **npm** or **pnpm** - Package manager
- **OpenRouter API Key** - Get from [openrouter.ai](https://openrouter.ai)

### Optional
- **Git** - For version control
- **Chrome/Edge** - For browser automation features

---

## Step 1: Install OpenClaw CLI

Install the OpenClaw CLI globally:

```powershell
npm install -g clawdbot@latest
```

Verify installation:

```powershell
clawdbot --version
```

Expected output: Version number like `2026.x.x`

---

## Step 2: Create Isolated Profile

Create a new profile to isolate this agent from any existing OpenClaw installations.

**Replace `myproject` with your project name:**

```powershell
openclaw --profile myproject setup --workspace "C:\path\to\your\repo\.openclaw\workspace"
```

**Example:**
```powershell
openclaw --profile nebula setup --workspace "C:\Users\natha\Downloads\repositories\nebula\.openclaw\workspace"
```

This creates:
- Config at: `~/.openclaw-myproject/openclaw.json`
- Workspace at: `your-repo/.openclaw/workspace/`

---

## Step 3: Configure the Agent

Edit the config file at `~/.openclaw-myproject/openclaw.json`:

```json
{
  "meta": {
    "lastTouchedVersion": "2026.1.29",
    "lastTouchedAt": "2026-02-01T00:00:00.000Z"
  },
  "env": {
    "OPENROUTER_API_KEY": "sk-or-v1-YOUR_API_KEY_HERE"
  },
  "auth": {
    "profiles": {
      "openrouter:default": {
        "provider": "openrouter",
        "mode": "api_key"
      }
    }
  },
  "agents": {
    "defaults": {
      "workspace": "C:\\path\\to\\your\\repo\\.openclaw\\workspace",
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
      "token": "your-local-dev-token-2026"
    }
  },
  "hooks": {
    "internal": {
      "enabled": true,
      "entries": {
        "boot-md": {
          "enabled": true
        },
        "session-memory": {
          "enabled": true
        }
      }
    }
  }
}
```

**Important:** 
- Replace `YOUR_API_KEY_HERE` with your OpenRouter API key
- Replace paths with your actual repository path (use `\\` for Windows paths in JSON)
- Choose a unique port (18790, 18791, etc.) that doesn't conflict with other agents
- Set a memorable token for dashboard access

### Alternative Models

| Model | ID | Notes |
|-------|-----|-------|
| Kimi K2 | `openrouter/moonshotai/kimi-k2` | Good balance of speed/quality |
| Claude Sonnet | `openrouter/anthropic/claude-sonnet-4` | High quality |
| GPT-4o | `openrouter/openai/gpt-4o` | OpenAI option |

---

## Step 4: Create Workspace Files

Create the workspace directory structure in your repository:

```
your-repo/
└── .openclaw/
    └── workspace/
        ├── SOUL.md        # Agent identity and mission
        ├── AGENTS.md      # Workflow rules
        ├── TOOLS.md       # Project-specific tools
        ├── MEMORY.md      # Long-term memory
        ├── USER.md        # Info about you
        ├── HEARTBEAT.md   # Periodic task config
        └── skills/        # Custom skills
            └── project-dev/
                └── SKILL.md
```

### Create directories:

**PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "your-repo\.openclaw\workspace\skills\project-dev"
New-Item -ItemType Directory -Force -Path "your-repo\.openclaw\workspace\memory"
```

**Bash/Linux:**
```bash
mkdir -p your-repo/.openclaw/workspace/skills/project-dev
mkdir -p your-repo/.openclaw/workspace/memory
```

---

## Step 5: Create Core Workspace Files

### SOUL.md - Agent Identity

**IMPORTANT:** This template includes ALL the fixes for Windows/PowerShell issues. Copy it completely!

```markdown
# SOUL.md - Project Agent

You are the development agent for [Project Name].

## Who You Are
[Define the agent's identity, mission, and personality]

---

## CRITICAL RULES (READ FIRST!)

### 1. Working Directory & Paths

Your shell starts in: `C:\path\to\your-repo\.openclaw\workspace`
The repo root is: `C:\path\to\your-repo`

**ALWAYS use full paths or navigate first:**

```powershell
# CORRECT: Full path to repo
cd "C:\path\to\your-repo"; git status

# CORRECT: Navigate up from workspace  
cd ..\.. ; git status

# WRONG: Assumes wrong directory
cd projectname  # NO! This doesn't exist relative to workspace
```

### 2. PowerShell Syntax (NOT bash!)

| Bash (WRONG) | PowerShell (CORRECT) |
|--------------|----------------------|
| `cd dir && cmd` | `cd dir; cmd` |
| `cmd1 && cmd2` | `cmd1; cmd2` |
| `export VAR=x` | `$env:VAR = "x"` |
| `ls` | `Get-ChildItem` |
| `cat file` | `Get-Content file` |
| `rm -rf dir` | `Remove-Item -Recurse -Force dir` |

### 3. File Location Rules

| File Type | CORRECT Location | WRONG Location |
|-----------|------------------|----------------|
| Source code | `C:\...\your-repo\src\` | ~~`.openclaw/workspace/`~~ |
| Contracts | `C:\...\your-repo\contracts\` | ~~`.openclaw/workspace/`~~ |
| Docs | `C:\...\your-repo\docs\` | ~~`.openclaw/workspace/`~~ |

### What Belongs in Workspace (here)

**ONLY agent configuration files:**
- SOUL.md, AGENTS.md, TOOLS.md (your config)
- MEMORY.md (your memories)
- memory/ folder (your daily logs)

**NEVER create project code in the workspace folder!**

---

## Core Responsibilities
- Code implementation **in repo root** (use full paths!)
- Testing and verification
- Documentation updates **in repo root**
- Project management

## Technical Stack
- [List your tech stack]

## Working Style
- Be resourceful before asking
- Test changes before marking complete
- Document decisions in memory files
- Use PowerShell syntax, not bash
- Use full paths for file operations

## Boundaries
### Always Safe
- Read/write project files **in repo root**
- Run dev commands (with correct syntax)
- Update documentation **in repo root**

### Ask First
- Major architectural changes
- Production deployments

### Never
- Commit secrets
- Skip testing
- Create project files in .openclaw/workspace/
- Use bash syntax (&&, export, etc.)
```

### AGENTS.md - Workflow Rules

```markdown
# AGENTS.md - Agent Workspace

## Every Session
1. Read SOUL.md - your identity
2. Read TOOLS.md - project config
3. Check memory/ for recent context

## Project Info
- **Name:** [Project Name]
- **Location:** [Path to repo]
- **Stack:** [Your tech stack]

## Key Files
| File | Purpose |
|------|---------|
| [file] | [purpose] |

## Commands
```
[Your project commands]
```

## Memory Protocol
- Store daily notes in memory/YYYY-MM-DD.md
- Update MEMORY.md with important decisions
```

### TOOLS.md - Project Configuration

**IMPORTANT:** Include the environment section to prevent shell syntax errors!

```markdown
# TOOLS.md - Project Tools

---

## CRITICAL: Environment Information

### Operating System
- **OS:** Windows 10/11
- **Shell:** PowerShell (NOT bash/zsh)
- **Repo Root:** `C:\path\to\your-repo`
- **Workspace:** `C:\path\to\your-repo\.openclaw\workspace`

### PowerShell Command Syntax

**You are on Windows PowerShell, NOT bash:**

| Bash (WRONG) | PowerShell (CORRECT) |
|--------------|----------------------|
| `cd dir && command` | `cd dir; command` |
| `command1 && command2` | `command1; command2` |
| `export VAR=value` | `$env:VAR = "value"` |
| `ls` | `Get-ChildItem` or `dir` |
| `cat file` | `Get-Content file` |

### Running Commands

```powershell
# You start in workspace, navigate to repo first:
cd "C:\path\to\your-repo"; git status
cd "C:\path\to\your-repo"; npm run dev
```

---

## Project Structure
```
your-repo/
├── src/
├── [other directories]
└── .openclaw/
    └── workspace/  ← Agent starts here!
```

## Commands
```powershell
# Development (from repo root)
cd "C:\path\to\your-repo"; npm run dev

# Build
cd "C:\path\to\your-repo"; npm run build

# Git (use ; not &&)
cd "C:\path\to\your-repo"; git add .; git commit -m "msg"
```

## Tech Stack
| Technology | Purpose |
|------------|---------|
| [tech] | [purpose] |

## Notes
- Replace `C:\path\to\your-repo` with your actual repo path
- Always use full paths when running commands
```

### USER.md - About You

```markdown
# USER.md - About the User

- **Name:** [Your name]
- **Role:** [Your role]
- **Timezone:** [Your timezone]

## Preferences
- [Your working preferences]

## Communication Style
- [How you like to work with the agent]
```

---

## Step 6: Update .gitignore

Add to your `.gitignore`:

```gitignore
# OpenClaw Agent
# Keep workspace files tracked (defines agent behavior)
# Ignore personal memory and generated files
.openclaw/workspace/memory/
.openclaw/workspace/MEMORY.md
```

---

## Step 7: Start the Gateway

Start your isolated agent gateway:

```powershell
openclaw --profile myproject gateway
```

The gateway will start on your configured port (e.g., 18790).

**Keep this terminal open** or run in background.

---

## Step 8: Verify Installation

Check health:

```powershell
openclaw --profile myproject health
```

Check status:

```powershell
openclaw --profile myproject status
```

Expected: Gateway reachable, agent configured, workspace found.

---

## Step 9: Access the Agent

### Option A: Web Dashboard

Open in browser:
```
http://127.0.0.1:18790/?token=your-local-dev-token-2026
```

### Option B: Terminal UI

```powershell
openclaw --profile myproject tui
```

### Option C: Single Message

```powershell
openclaw --profile myproject agent --message "Hello! What project am I working on?" --session-id main
```

---

## Step 10: Configure Browser (Optional)

For visual testing capabilities:

1. Open dashboard: `http://127.0.0.1:18790/?token=your-token`
2. Go to **Settings** → **Browser**
3. Enable browser
4. Set default profile to `openclaw`
5. Enable `headless` and `no-sandbox` (for Windows)

Test browser:

```powershell
openclaw --profile myproject browser navigate "http://localhost:3000/"
openclaw --profile myproject browser screenshot
```

---

## Quick Reference

### Daily Usage

```powershell
# Start gateway (if not running)
openclaw --profile myproject gateway

# Chat with agent
openclaw --profile myproject tui

# Send single message
openclaw --profile myproject agent --message "your message" --session-id main

# Check status
openclaw --profile myproject status
```

### Key Paths

| Item | Location |
|------|----------|
| Config | `~/.openclaw-myproject/openclaw.json` |
| Workspace | `your-repo/.openclaw/workspace/` |
| Sessions | `~/.openclaw-myproject/agents/main/sessions/` |
| Logs | `/tmp/openclaw/` |

### Gateway Ports

Use different ports for different projects:
- Project A: 18790
- Project B: 18791
- Project C: 18792
- (Production agent typically uses 18789)

---

## Troubleshooting

### CRITICAL: API Key Must Be in BOTH Configs (Windows)

On Windows, OpenClaw may read from **both** the global config AND profile config. If you get "403 Key limit exceeded" errors even with a valid key:

**Check BOTH locations:**
```powershell
# Profile config (your project)
Get-Content "$env:USERPROFILE\.openclaw-myproject\openclaw.json" | Select-String "OPENROUTER"

# Global config (may override!)
Get-Content "$env:USERPROFILE\.openclaw\openclaw.json" | Select-String "OPENROUTER"
```

**Fix: Update BOTH files with your API key:**
```powershell
# Update profile config
openclaw --profile myproject config set env.OPENROUTER_API_KEY "sk-or-v1-YOUR_KEY"

# Also manually update global config if it exists
# Edit: C:\Users\YourName\.openclaw\openclaw.json
```

### Agent Uses Wrong Shell Syntax (PowerShell vs Bash)

**Problem:** Agent runs `cd dir && command` which fails in PowerShell.

**Solution:** Add this to your TOOLS.md and SOUL.md:

```markdown
## CRITICAL: PowerShell Syntax (NOT bash!)

| Bash (WRONG) | PowerShell (CORRECT) |
|--------------|----------------------|
| `cd dir && command` | `cd dir; command` |
| `command1 && command2` | `command1; command2` |
| `export VAR=value` | `$env:VAR = "value"` |
| `ls` | `Get-ChildItem` or `dir` |
| `cat file` | `Get-Content file` |
| `rm -rf dir` | `Remove-Item -Recurse -Force dir` |
```

### Agent Can't Find Repository / Wrong Working Directory

**Problem:** Agent starts in `.openclaw/workspace/` and can't find project files.

**Solution:** Add this to SOUL.md:

```markdown
## CRITICAL: Working Directory

Your shell starts in: `[your-repo]\.openclaw\workspace`
The repo root is: `[your-repo]`

**ALWAYS use full paths or navigate first:**
```powershell
# CORRECT: Use full path
cd "C:\full\path\to\your-repo"; git status

# CORRECT: Navigate up from workspace
cd ..\.. ; git status

# WRONG: Assumes wrong directory
cd projectname  # This folder doesn't exist here!
```
```

### Session Cache Issues After Config Changes

**Problem:** After updating API key or config, agent still fails.

**Solution:** Clear sessions and restart:

```powershell
# Delete session files
Remove-Item "$env:USERPROFILE\.openclaw-myproject\agents\main\sessions\*.jsonl" -Force
Remove-Item "$env:USERPROFILE\.openclaw-myproject\agents\main\sessions\sessions.json" -Force

# Restart gateway
openclaw --profile myproject gateway --force
```

### EPERM Errors on Windows (File Lock Issues)

**Problem:** `Error: EPERM: operation not permitted, rename ... .tmp`

**Solution:** Delete stuck temp files:

```powershell
# Find and delete stuck temp files
Get-ChildItem "$env:USERPROFILE\.openclaw-myproject" -Recurse -Filter "*.tmp" | Remove-Item -Force

# Restart gateway
openclaw --profile myproject gateway --force
```

### Gateway Won't Start

```powershell
# Check if port is in use
netstat -ano | findstr :18790

# Kill any stuck processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# Use different port in config
# Edit gateway.port in openclaw.json
```

### Model Not Found / API Key Issues

```powershell
# Check API key is set
openclaw --profile myproject config get env.OPENROUTER_API_KEY

# Test API key directly (PowerShell)
$headers = @{ "Authorization" = "Bearer YOUR_API_KEY"; "Content-Type" = "application/json" }
Invoke-RestMethod -Uri "https://openrouter.ai/api/v1/auth/key" -Headers $headers

# Check account credits
Invoke-RestMethod -Uri "https://openrouter.ai/api/v1/credits" -Headers $headers
```

### Browser Not Working

1. Ensure browser settings enabled in dashboard
2. Use `--browser-profile openclaw` for managed browser
3. For Windows, enable `no-sandbox` in browser settings
4. Check Chrome/Edge is installed

### Connection Refused

```powershell
# Restart gateway with force
openclaw --profile myproject gateway --force
```

### Agent Creates Files in Wrong Location

**Problem:** Agent creates code in `.openclaw/workspace/` instead of repo root.

**Solution:** Make file location rules VERY explicit in SOUL.md and AGENTS.md:

```markdown
## CRITICAL: File Location Rules

| File Type | CORRECT Location | WRONG Location |
|-----------|------------------|----------------|
| Source code | `your-repo/src/` | ~~`.openclaw/workspace/`~~ |
| Contracts | `your-repo/contracts/` | ~~`.openclaw/workspace/`~~ |
| Docs | `your-repo/docs/` | ~~`.openclaw/workspace/`~~ |

**NEVER create project files in `.openclaw/workspace/`!**
```

---

## Profile Isolation Summary

Using `--profile myproject` ensures:

| Aspect | Isolated Location |
|--------|-------------------|
| Config | `~/.openclaw-myproject/` |
| Sessions | `~/.openclaw-myproject/agents/` |
| Gateway | Separate port (18790+) |
| Workspace | In your repository |

This means you can have:
- Multiple project agents running simultaneously
- No conflicts with production agents
- Project-specific configurations
- Repository-contained workspace files

---

## Next Steps

After installation:

1. **Customize SOUL.md** with your project's specific mission
2. **Update TOOLS.md** with your tech stack and commands
3. **Create skills** in `skills/` for specialized capabilities
4. **Start chatting** and let the agent learn your project

---

*Your local AI development agent is ready to help build your project!*
