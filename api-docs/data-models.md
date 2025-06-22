# Data Models (Schemas)

This section describes common data models or schemas used across various Nebula API endpoints, particularly in request and response bodies.

---

## 1. UserProfile
Represents public or semi-public profile information for a user.

*   `userId` (string, read-only): Unique identifier for the user.
*   `displayName` (string): The user's chosen display name.
*   `avatarUrl` (string, optional): URL to the user's avatar image.
*   `bio` (string, optional): A short biography or description.
*   `createdAt` (ISO8601 Timestamp, read-only): When the user profile was created.

**Example:**
```json
{
  "userId": "usr_1a2b3c4d5e",
  "displayName": "CosmicCitizen123",
  "avatarUrl": "https://example.com/avatars/usr_1a2b3c4d5e.png",
  "bio": "Passionate about local governance and space exploration.",
  "createdAt": "2025-01-15T10:00:00Z"
}
```

---

## 2. DAO (Decentralized Autonomous Organization)
Represents a DAO within the Nebula platform.

*   `daoId` (string, read-only): Unique identifier for the DAO.
*   `name` (string): Official name of the DAO.
*   `mission` (string): A brief statement of the DAO's purpose.
*   `geographicBoundary` (GeoJSON Object): Defines the geographic area of the DAO.
    *   `type` (string): e.g., "Polygon", "MultiPolygon".
    *   `coordinates` (array): Array of coordinates defining the shape.
*   `governanceRules` (object): Rules governing the DAO's operations.
    *   `proposalQuorum` (number): Percentage of members needed to make a proposal active (e.g., 0.10 for 10%).
    *   `votingQuorum` (number): Percentage of votes (of those cast or of total membership, TBD) needed for a proposal to pass (e.g., 0.51 for 51%).
    *   `votingPeriod` (string - ISO 8601 Duration): Default duration for how long votes are open (e.g., "P7D" for 7 days).
    *   `membershipPolicy` (string): e.g., "open_with_residency_proof", "invite_only_after_residency_proof".
*   `memberCount` (integer, read-only): Current number of members in the DAO.
*   `treasuryBalance` (string, read-only, optional): Current balance of the DAO's main treasury.
*   `currency` (string, optional): Primary currency of the treasury (e.g., "CHF", "USD").
*   `status` (string, read-only): Current status of the DAO (e.g., "active", "forming", "archived").
*   `createdAt` (ISO8601 Timestamp, read-only): When the DAO was created.
*   `founderUserId` (string, read-only): User ID of the DAO's founder.

**Example (Partial):**
```json
{
  "daoId": "dao_9f8e7d6c",
  "name": "Zurich Lakefront Initiative",
  "mission": "Improving public access and amenities around Lake Zurich.",
  "geographicBoundary": {
    "type": "Polygon",
    "coordinates": [/* ... */]
  },
  "governanceRules": {
    "proposalQuorum": 0.05,
    "votingQuorum": 0.51,
    "votingPeriod": "P14D",
    "membershipPolicy": "open_with_residency_proof"
  },
  "memberCount": 152,
  "status": "active",
  "createdAt": "2025-03-01T12:00:00Z"
}
```

---

## 3. Proposal
Represents a governance proposal within a DAO.

*   `proposalId` (string, read-only): Unique identifier for the proposal.
*   `daoId` (string, read-only): ID of the DAO this proposal belongs to.
*   `proposerId` (string, read-only): User ID of the member who submitted the proposal.
*   `title` (string): The title of the proposal.
*   `description` (string): Detailed explanation of the proposal.
*   `type` (string): Category of the proposal (e.g., "funding", "policy_change", "general_poll").
*   `details` (object, optional): Type-specific details (e.g., amount for funding proposals).
*   `status` (string, read-only): Current status (e.g., "pending_quorum", "active_voting", "closed_passed", "closed_failed", "closed_vetoed").
*   `pollOptions` (array of objects): The choices available for voting.
    *   `optionId` (string): Unique ID for the option (e.g., "agree", "disagree", "custom_option_1").
    *   `text` (string): Human-readable text for the option.
    *   `voteCount` (integer, read-only): Number of votes received for this option.
    *   `suggestedBy` (string, optional, read-only): User ID if this was an added alternative choice.
*   `allowAlternativeChoices` (boolean): Whether members can suggest new choices for the poll.
*   `createdAt` (ISO8601 Timestamp, read-only): When the proposal was created.
*   `opensAt` (ISO8601 Timestamp, read-only, optional): When voting officially opens (if different from creation).
*   `closesAt` (ISO8601 Timestamp, read-only): When voting closes.
*   `currentTurnout` (number, read-only, optional): Percentage of eligible voters who have participated.
*   `outcome` (string, read-only, optional): Final result if closed (e.g., "passed", "failed", "tied").

**Example (Partial):**
```json
{
  "proposalId": "prop_6a7b8c",
  "daoId": "dao_9f8e7d6c",
  "proposerId": "usr_1a2b3c4d5e",
  "title": "Install New Benches along Lakefront Path",
  "description": "Allocate 1500 CHF to install 5 new park benches.",
  "type": "funding",
  "status": "active_voting",
  "pollOptions": [
    { "optionId": "agree", "text": "Agree - Fund the Benches", "voteCount": 78 },
    { "optionId": "disagree", "text": "Disagree - Do Not Fund", "voteCount": 22 }
  ],
  "closesAt": "2025-07-15T23:59:59Z"
}
```

---

## 4. TreasuryTransaction
Represents a single transaction in a DAO's treasury ledger.

*   `transactionId` (string, read-only): Unique identifier for the transaction.
*   `timestamp` (ISO8601 Timestamp, read-only): Time the transaction was recorded.
*   `type` (string): Type of transaction (e.g., "deposit", "withdrawal", "internal_transfer", "action_token_grant", "fee_payment").
*   `amount` (string): The amount transacted. For action tokens, this is the count.
*   `currency` (string, optional): Currency of the amount (e.g., "CHF"). Not applicable for action tokens.
*   `description` (string): A brief description of the transaction.
*   `relatedProposalId` (string, optional): ID of the governance proposal that authorized this transaction, if applicable.
*   `fromAddress` (string, optional): Source address/identifier (e.g., external wallet, user ID for action tokens).
*   `toAddress` (string, optional): Destination address/identifier (e.g., DAO treasury, recipient wallet, user ID for action tokens).
*   `userId` (string, optional): User ID related to the transaction (e.g., recipient of action tokens).

**Example:**
```json
{
  "transactionId": "txn_8f9e0d",
  "timestamp": "2025-07-20T14:30:00Z",
  "type": "withdrawal",
  "amount": "1500.00",
  "currency": "CHF",
  "description": "Payment for new park benches.",
  "relatedProposalId": "prop_6a7b8c",
  "fromAddress": "dao_9f8e7d6c_treasury_main",
  "toAddress": "vendor_bench_supplier_wallet"
}
```

---

## 5. WikiPage
Represents a page in a DAO's wiki.

*   `pageSlug` (string): Unique, URL-friendly identifier for the page.
*   `title` (string): Human-readable title of the page.
*   `content` (string): The main content of the page (e.g., Markdown, HTML).
*   `version` (string, read-only): Current version identifier of the page.
*   `lastModifiedAt` (ISO8601 Timestamp, read-only): When the page was last modified.
*   `lastModifiedBy` (string, read-only): User ID of the last editor.
*   `daoId` (string, read-only): ID of the DAO this wiki page belongs to.

**Example:**
```json
{
  "pageSlug": "meeting-minutes-2025-07",
  "title": "Meeting Minutes - July 2025",
  "content": "# July 2025 DAO Meeting\n\n## Attendees\n- Alice\n- Bob...",
  "version": "v1.2",
  "lastModifiedAt": "2025-07-28T10:00:00Z",
  "lastModifiedBy": "usr_5x6y7z",
  "daoId": "dao_9f8e7d6c"
}
```

---
*More data models can be added here as they are identified or become necessary.*
