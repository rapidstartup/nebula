This Product Requirements Document (PRD) outlines the requirements for Nebula Version 2.0, focusing on achieving full decentralization, implementing advanced governance mechanisms, and integrating autonomous AI agents (the "Swarm").

The foundational architecture will transition fully to a distributed ledger model, eliminating the need for a traditional database and maximizing the system's "unstoppable" and auditable nature, directly addressing the narrator's observations regarding security and rushed MVP development.

***

## **Product Requirements Document: Nebula (Version 2.0)**

*   **Version:** 2.0
*   **Date:** June 22, 2025 (Initial V2 Draft)
*   **Last Updated:** February 2, 2026
*   **Author:** Nebula Development Team
*   **Status:** **IN ACTIVE DEVELOPMENT**

---

## **IMPLEMENTATION PROGRESS TRACKER**

### Phase 1: Smart Contract Infrastructure ✅ COMPLETE
| Component | Status | File Location |
|-----------|--------|---------------|
| Hardhat Configuration | ✅ Complete | `hardhat.config.ts` |
| NebulaIdentity Contract | ✅ Complete | `contracts/identity/NebulaIdentity.sol` |
| NebulaDAO Contract | ✅ Complete | `contracts/governance/NebulaDAO.sol` |
| NebulaGovernance Contract | ✅ Complete | `contracts/governance/NebulaGovernance.sol` |
| NebulaTreasury Contract | ✅ Complete | `contracts/treasury/NebulaTreasury.sol` |
| NebulaAgentRegistry Contract | ✅ Complete | `contracts/agents/NebulaAgentRegistry.sol` |
| Deployment Scripts | ✅ Complete | `scripts/deploy.ts` |

### Phase 2: Web3 Frontend Integration ✅ COMPLETE
| Component | Status | File Location |
|-----------|--------|---------------|
| Wagmi Configuration | ✅ Complete | `src/lib/web3/config.ts` |
| Contract ABIs | ✅ Complete | `src/lib/web3/contracts.ts` |
| React Hooks | ✅ Complete | `src/lib/web3/hooks.ts` |
| Web3 Provider Setup | ✅ Complete | `src/App.tsx` |
| Connect Wallet UI | ✅ Complete | `src/components/v2/ConnectWallet.tsx` |
| Identity UI Components | ✅ Complete | `src/components/v2/Identity.tsx` |
| DAO Dashboard UI | ✅ Complete | `src/components/v2/DAODashboard.tsx` |
| V2 Main Dashboard | ✅ Complete | `src/components/v2/V2Dashboard.tsx` |

### Phase 3: Identity System (Epic 5) ✅ COMPLETE
| Requirement | Status | Notes |
|-------------|--------|-------|
| R 5.1: Proof of Personhood | ✅ Complete | UI implemented with biometric flow |
| R 5.2: Secure Info Wallet | ✅ Complete | IPFS integration with encryption |
| R 5.3: Grant/Revoke Access | ✅ Complete | Full access control management |

### Phase 4: DAO Management (Epic 2) ✅ COMPLETE
| Requirement | Status | Notes |
|-------------|--------|-------|
| DAO Creation UI | ✅ Complete | Full creation form with validation |
| Chapter Management | ✅ Complete | Integrated into DAO dashboard |
| Membership Management | ✅ Complete | Join/leave functionality |
| Action Token System | ✅ Complete | Contract ready, UI integrated |
|-------------|--------|-------|
| DAO Creation UI | ⏳ Pending | Contract ready |
| Chapter Management | ⏳ Pending | Contract ready |
| Membership Management | ⏳ Pending | Contract ready |
| Action Token System | ⏳ Pending | Contract ready |

### Phase 5: Governance System (Epic 3, 7) 🔄 IN PROGRESS
| Requirement | Status | Notes |
|-------------|--------|-------|
| R 7.2: Graduated Filtration | ✅ Complete | Full UI with micro-poll → consensus → voting |
| Proposal Creation UI | 🔄 In Progress | Framework ready, form coming next |
| Voting Interface | ✅ Complete | Integrated into governance dashboard |
| R 7.4: Governance-as-Code | 🔄 Partial | GitHub integration framework ready |

### Phase 6: Agent Framework (Epic 6) ✅ COMPLETE
| Requirement | Status | Notes |
|-------------|--------|-------|
| R 6.1: Model Arbiter Layer | ✅ Complete | Universal model interface with cost/performance metrics |
| R 6.2: Agent Ethos (L2) | ✅ Complete | Ethos validation UI + smart contract |
| R 6.3: Agent Registration | ✅ Complete | Full registration form with capabilities |
| R 6.4: Agent Communication | ✅ Complete | Framework implemented, P2P ready |

### Phase 6.5: Treasury Management ✅ COMPLETE
| Component | Status | File Location |
|-----------|--------|---------------|
| Treasury Dashboard UI | ✅ Complete | `src/components/v2/TreasuryDashboard.tsx` |
| Transaction History | ✅ Complete | Integrated with filtering and export |
| Deposit Interface | ✅ Complete | ETH deposits with Web3 integration |
| Balance Management | ✅ Complete | Multi-token support with portfolio view |
| Proposal Integration | ✅ Complete | Links treasury actions to governance |

### Phase 7: Deployment ✅ COMPLETE
| Task | Status | Network |
|------|--------|---------|
| V2 Frontend Complete | ✅ Complete | React/Vite |
| Smart Contracts Ready | ✅ Complete | All contracts compiled |
| Local Deployment | ✅ Complete | localhost:8545 - All 5 contracts deployed |
| Frontend Integration | ✅ Complete | Web3 hooks working with deployed contracts |
| Sepolia Testnet Deploy | 🔄 In Progress | Ethereum Sepolia (currently deploying) |
| Polygon Amoy Deploy | 🔄 Ready | Polygon Amoy (deployment script ready) |
| Swiss Pilot Production | 🔄 Ready | All components production-ready |

### 🎉 Successfully Deployed Contract Addresses (localhost)
- **NebulaIdentity**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **NebulaDAO**: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- **NebulaGovernance**: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`
- **NebulaTreasury**: `0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9`
- **NebulaAgentRegistry**: `0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9`

---

### **1. Core Architectural Mandate (Decentralization & Security)**

To address the inherent security flaws and centralization concerns noted in early platforms like OpenClaw/MoltBook, Nebula V2.0 adopts a **Governance-as-Code (GaC)** and **Zero-Trust** paradigm across all layers.

| Principle | Technical Implementation (Nebula OS) | Justification (Addressing Narrator's Critique) |
| :--- | :--- | :--- |
| **Data Persistence (No DB)** | All critical DAO state data (Membership, Governance Rules, Treasury Ledger) is stored via **Smart Contracts** on a Distributed Ledger (Blockchain). Large, static content (Wiki, GeoJSON) is stored on **IPFS/Decentralized Storage** with only the immutable content hash recorded on the ledger. | Ensures transparency (Epic 4.1) and immutability. All data interactions are transactional and auditable, solving the "database security" issue. |
| **Identity (Sybil-Resistance)** | Use of **Decentralized Identifiers (DIDs)** and **Verifiable Credentials (VCs)** for Proof of Personhood (PoP) and Residency verification. Each principal (human or agent) is identified by a unique, cryptographic key pair, not a username/password. | Directly solves the "anonymous randos" problem by mandating verifiable identity (Epic 1.2). |
| **Agent Communication (L3)** | **All** agent interactions (OpenClaw, Llama, Gemini) must be routed through Nebula's official **Model Arbiter Layer** and recorded on the DAO's immutable transaction log. | Provides a canonical record of the "agent swarm's" actions, enabling retrospective analysis and accountability, solving the "agent swarm" visibility problem. |
| **Code as Governance (GaC)** | The DAO's Constitution (Governance Rules, Policies) is stored as modular, executable code (`sol.md` and related smart contracts). Any change to the DAO's operation requires a **Git Pull Request (PR)** approved by member consensus. | Direct implementation of "Code is the Company," ensuring the rules are transparent and executable, addressing the difficulty of centralized policy change. |

***

### **2. Functional Requirements (V2.0)**

#### **Epic 5: Self-Sovereign Identity & PII Control**

| User Story / Requirement | Description | API Impact / Notes |
| :--- | :--- | :--- |
| **R 5.1: Proof of Personhood (PoP)** | Implement the Sybil-resistant identity flow (biocryptic hash or state-ID linkage) to ensure every DAO voting member is verifiably unique. | **Identity API:** New endpoint `/users/verify-uniqueness`. The verification result issues a non-transferable PoP Verifiable Credential (VC). |
| **R 5.2: Secure Info Wallet (Epic 1.4)** | Encrypted PII (personal email, address) must be stored in the user's Info Wallet, controllable via their private key. | **Identity API:** `/identity/info-wallet/data` (PUT/POST/GET). Requires strong client-side encryption modules. |
| **R 5.3: Grant/Revoke Access** | Users must be able to grant specific DAOs or services (e.g., the residency verification agent) access to defined VCs from their Info Wallet and revoke that access at any time. | **Identity API:** `/identity/info-wallet/permissions` (POST/DELETE). This implements the Principle-Agent relationship. |

#### **Epic 6: Autonomous Agent Framework & Alignment (L2)**

| User Story / Requirement | Description | API Impact / Notes |
| :--- | :--- | :--- |
| **R 6.1: Model Arbiter Layer (L1/L2)** | The Nebula Agent O/S must include a universal interface allowing agents to interchange models (GPT, Llama, Gemini). This layer handles model selection based on cost, speed, and reliability. | **New Internal Service:** `Nebula-Arbiter-Service`. Handles requests from agents and routes them to the cheapest/best LLM provider. Agents only interface with the Arbiter API, not raw LLMs. |
| **R 6.2: Agent Ethos (L2 Alignment)** | Every active agent requires a core "Ethos Module" (the Pre-frontal Cortex) that checks all intended actions against the simple, legible heuristics (Reduce Suffering, Increase Prosperity, Increase Understanding). | **Agent Framework Core:** All agent Planning and Action phases must be wrapped by the Ethos validation function. Actions are only executed if Ethos returns `True`. If `False`, the action is recorded and routed to a Human-in-the-Loop (HITL) queue. |
| **R 6.3: Agent Registration** | Agents must be registered with the platform, possessing DIDs/VCs that define their capabilities (e.g., "This agent can use Curl," "This agent can execute shell commands"). | **Identity API:** New endpoint `/agents/register`. Registration issues an Agent DID, restricting its tools/capabilities based on its VC. |
| **R 6.4: Agent-to-Agent Communication** | Agents must be able to securely communicate with each other using the DAO's shared, immutable log (the MoltBook equivalent), or encrypted P2P channels for real-time task coordination. | **Governance API:** Agents can submit proposals, vote, and comment. **New Endpoint:** `/agents/p2p-exchange` for secure, off-chain coordination, with a cryptographic hash of the interaction summary recorded on the ledger. |

#### **Epic 7: Advanced Governance & Incentives (L3)**

| User Story / Requirement | Description | API Impact / Notes |
| :--- | :--- | :--- |
| **R 7.1: Action Token Implementation** | Finalize the "Action Token" system (Economic Model 6.5). Users and registered agents are allocated a non-monetary token that is required to perform core governance functions (propose, vote, join). Tokens must self-replenish on a fixed schedule (e.g., weekly). | **Treasury API:** `/identity/action-tokens`. This is primarily smart contract logic (Mint/Burn/Transfer/Replenish functions). Zero cost is achieved by requiring a token that the system ensures all verified principals possess. |
| **R 7.2: Graduated Proposal Filtration** | Implement a graduated filtration system to prevent spamming and voter fatigue, as proposed in the V1.5 future scope. Proposals must pass increasing levels of consensus from random subgroups before advancing to a full DAO vote. | **Governance API:** Changes to `/daos/{daoId}/proposals` processing logic. Introduces proposal states: `Draft -> Micro-Poll -> Consensus-Building -> Active-Voting`. |
| **R 7.3: Automated Voting Assistance (AVAS)** | Implement the API backbone for Automated Voting Assistance. Users can set alignment preferences (e.g., "pro-environment," "anti-tax") and grant an agent the *limited* ability to recommend or auto-vote based on these preferences. | **Misc API:** New endpoints for setting/retrieving preferences (`/identity/voting-assistance`). The AVAS agent interacts directly with the Governance API's `/vote` endpoint using the user's delegated VC. |
| **R 7.4: Governance-as-Code Implementation** | The DAO must execute actions (e.g., withdrawing treasury funds, changing quorum rules) only after a passing vote merges a PR containing the corresponding executable smart contract code or configuration file. | **New Internal Integration:** GitHub/Gitea Webhook integration. A successful vote resolution (`closed_passed` status on Governance API) triggers the execution of a CI/CD pipeline, merging and deploying the code change. |

***

### **3. Non-Functional Requirements (V2.0 Security Deep Dive)**

| Requirement | Implementation Focus | Technical Details |
| :--- | :--- | :--- |
| **NF-R 3.1: Zero Trust / RBAC for Agents (L3)** | Enforce strict Role-Based Access Control on all DAO resources (Treasury, Governance, Wiki). Agents only receive the minimum necessary cryptographic keys and short-lived tokens required for their registered role. | Use **Ephemeral Keys** tied to Agent DIDs. Smart Contracts validate the VCs against the requested action (`CALL`) and resource *before* execution. For example, an "Analysis Agent" cannot access the Treasury (`Withdrawal` function). |
| **NF-R 3.2: Byzantine Fault Tolerance (BFT)** | The core consensus (voting) mechanism must be BFT-capable, guaranteeing that even if a fraction of agents or principals (the Byzantine Generals) are compromised, the system state remains consistent and correct. | Rely on the underlying blockchain's consensus mechanism (e.g., Proof-of-Stake derivative with strong finality) for core state. Governance modules must verify finality before executing GaC actions. |
| **NF-R 3.3: Client Integrity Verification** | Mandate that all Nebula clients (Web, Mobile, Desktop) verify their running code base against the immutable hash stored in the GaC repository upon startup. | The client fetches the current canonical manifest hash via a secure API endpoint (`/client/manifest`) and compares it against a local hash of its own binaries. Failure to match prevents access to critical functions, mitigating the risk of compromised clients engaging in malfeasance. |
| **NF-R 3.4: Mesh Network Resilience** | Design API endpoints (Epic 6.4) to prioritize lightweight data exchange and caching, ensuring that core proposal/voting status can be synchronized over low-bandwidth, decentralized P2P networks (e.g., LibP2P or IPFS pub/sub) in the event of widespread Internet disruption. | Implement IPFS or equivalent protocols for redundancy. The API must be adaptable to expose a gateway for P2P network status updates. |