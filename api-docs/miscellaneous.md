# Miscellaneous API Endpoints

This section covers API endpoints that provide utility functions, access to platform-wide information, or relate to features not fitting neatly into other categories. It also includes endpoints related to planned future functionalities.

---
**Status Key:**
*   **[Current]**: Implemented and available.
*   **[Planned V1.0]**: Planned for Nebula Version 1.0.
*   **[Planned V1.5]**: Planned for Nebula Version 1.5.
*   **[Future Scope]**: Considered for versions beyond V1.5.

## Future Scope & Advanced Features

This section outlines potential future API endpoints based on the "Future Scope / V2.0 Features" and "Advanced Governance Suite" sections of the Nebula Product Requirements Documents (V1.0 and V1.5). These are conceptual and subject to change.

---

### 1. Prediction Markets
**Status:** `[Future Scope]`

Endpoints for creating, participating in, and resolving prediction markets related to proposals or other events.

#### 1.1 Create Prediction Market
*   **Method:** `POST`
*   **Path:** `/prediction-markets`
*   **Description:** Creates a new prediction market.
*   **Request Body (Conceptual):**
    ```json
    {
      "question": "Will Proposal XYZ pass with over 70% approval?",
      "outcomes": ["Yes", "No"],
      "resolutionCriteria": "Based on official DAO vote result for Proposal XYZ",
      "marketCloseTime": "iso_timestamp"
      // ... other market parameters (fees, initial liquidity)
    }
    ```
*   **Responses:** `201 Created`, `400 Bad Request`, etc.

#### 1.2 List Prediction Markets
*   **Method:** `GET`
*   **Path:** `/prediction-markets`
*   **Description:** Lists available or historical prediction markets.
*   **Responses:** `200 OK` with list of markets.

#### 1.3 Place Bet/Trade Shares in Prediction Market
*   **Method:** `POST`
*   **Path:** `/prediction-markets/{marketId}/trade`
*   **Description:** Allows users to buy or sell shares in a prediction market outcome.
*   **Request Body (Conceptual):**
    ```json
    {
      "outcome": "Yes",
      "action": "buy", // "buy", "sell"
      "amount": "100", // Number of shares or amount of currency
      "priceLimit": "0.60" // Optional: Max price for buy, min price for sell
    }
    ```
*   **Responses:** `200 OK`, `400 Bad Request`, etc.

---

### 2. AI Agent Integration
**Status:** `[Future Scope]`

Endpoints for interacting with AI agents that might automate DAO management, analyze proposals, or summarize discussions.

#### 2.1 Trigger AI Analysis on Proposal
*   **Method:** `POST`
*   **Path:** `/ai-agents/analyze-proposal`
*   **Description:** Requests an AI agent to analyze a specific proposal for potential impacts, sentiment, etc.
*   **Request Body:**
    ```json
    {
      "proposalId": "unique_proposal_identifier_string",
      "analysisTypes": ["impact_assessment", "sentiment_summary"]
    }
    ```
*   **Responses:** `202 Accepted` (analysis in progress), `200 OK` (if analysis is quick and returned directly).

---

### 3. Cross-Platform Integration (e.g., X, Bluesky)
**Status:** `[Future Scope]`

Endpoints to facilitate linking Nebula DAO activities (like new proposals or results) to social platforms. This might involve user-authorized connections.

#### 3.1 Link Social Account
*   **Method:** `POST`
*   **Path:** `/integrations/social-link`
*   **Description:** Initiates OAuth flow or similar to link a user's social media account.
*   **Request Body:**
    ```json
    {
      "platform": "twitter", // "twitter", "bluesky"
      // ... platform specific tokens/auth data
    }
    ```
*   **Responses:** `200 OK`, `401 Unauthorized`.

#### 3.2 Post DAO Update to Social Media
*   **Method:** `POST`
*   **Path:** `/integrations/social-post`
*   **Description:** Allows a user (with appropriate DAO permissions) to post an update (e.g., new proposal) to a linked social media account.
*   **Request Body:**
    ```json
    {
      "platform": "twitter",
      "daoId": "unique_dao_identifier_string",
      "proposalId": "unique_proposal_identifier_string", // Optional, if posting about a proposal
      "customMessage": "Check out our new proposal!"
    }
    ```
*   **Responses:** `200 OK`, `400 Bad Request`.

---

### 4. Delegated Voting
**Status:** `[Future Scope]` (Also relevant to Governance API)

Endpoints for managing vote delegation.

#### 4.1 Delegate Voting Power
*   **Method:** `POST`
*   **Path:** `/identity/delegate-vote` or `/users/{userId}/delegations`
*   **Description:** Allows a user to delegate their voting power to another trusted user, potentially scoped by DAO or topic.
*   **Request Body:**
    ```json
    {
      "delegateToUserId": "trusted_user_id",
      "daoId": "unique_dao_identifier_string", // Optional: scope to a specific DAO
      "topic": "environmental_proposals", // Optional: scope to a topic
      "expiresAt": "iso_timestamp" // Optional
    }
    ```
*   **Responses:** `200 OK`, `400 Bad Request`.

#### 4.2 Revoke Delegation
*   **Method:** `POST` or `DELETE`
*   **Path:** `/identity/revoke-delegation` or `/users/{userId}/delegations/{delegationId}`
*   **Description:** Revokes a previously set delegation.
*   **Responses:** `200 OK`.

---

### 5. Advanced Governance Suite Features
**Status:** `[Future Scope]`

Placeholders for features like Proposal Filtration, Automated Voting Assistance, and Advanced Incentives. Some of these might be configurations of existing entities rather than new top-level endpoints.

#### 5.1 Configure Proposal Filtration (Admin/DAO Founder)
*   **Method:** `PUT`
*   **Path:** `/daos/{daoId}/governance/filtration-rules`
*   **Description:** Sets up graduated filtration rules for new proposals in a DAO.
*   **Request Body (Conceptual):**
    ```json
    {
      "stages": [
        { "threshold": 0.05, "audienceSize": 100, "duration": "P3D" }, // 5% consensus from 100 random users in 3 days
        { "threshold": 0.10, "audienceSize": 1000, "duration": "P7D" } // Then 10% from 1000 users
        // ... further stages
      ]
    }
    ```
*   **Responses:** `200 OK`.

#### 5.2 Get Voting Assistance Preferences (User)
*   **Method:** `GET`
*   **Path:** `/identity/voting-assistance` or `/users/{userId}/voting-assistance`
*   **Description:** Retrieves a user's preferences for AI-driven voting assistance.
*   **Responses:** `200 OK`.

#### 5.3 Set Voting Assistance Preferences (User)
*   **Method:** `PUT`
*   **Path:** `/identity/voting-assistance` or `/users/{userId}/voting-assistance`
*   **Description:** Allows a user to configure their AI voting assistance settings.
*   **Request Body (Conceptual):**
    ```json
    {
      "enableAutoVote": false,
      "autoVoteThreshold": 0.8, // e.g., only auto-vote if AI confidence is >80%
      "preferredStanceOnTopics": [
        { "topic": "environmental", "stance": "pro" },
        { "topic": "local_tax_increase", "stance": "con" }
      ]
    }
    ```
*   **Responses:** `200 OK`.

---

### 6. Client Integrity Check Support
**Status:** `[Planned V1.5]` (Non-Functional Requirement support)

#### 6.1 Get Latest Client Manifest/Hash
*   **Method:** `GET`
*   **Path:** `/client/manifest`
*   **Description:** Provides the latest manifest or hash for official client binaries, allowing clients to verify their integrity.
*   **Query Parameters:**
    *   `clientType`: "desktop_electron", "mobile_android", "web_pwa"
    *   `version`: "client_version_string"
*   **Responses:**
    *   `200 OK`:
        ```json
        {
          "clientType": "desktop_electron",
          "version": "1.2.3",
          "manifestHash": "sha256_hash_of_manifest",
          "binaryHashes": {
            "app.asar": "sha256_hash_of_asar",
            "main.js": "sha256_hash_of_main_js"
          },
          "signature": "cryptographic_signature_of_this_response"
        }
        ```
    *   `404 Not Found`: Client type or version not found.
