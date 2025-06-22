# Governance API

The Governance API provides endpoints for all aspects of the democratic decision-making process within DAOs. This includes creating and viewing proposals, casting votes, and observing real-time polling results.

---
**Status Key:**
*   **[Current]**: Implemented and available.
*   **[Planned V1.0]**: Planned for Nebula Version 1.0.
*   **[Planned V1.5]**: Planned for Nebula Version 1.5.
*   **[Future Scope]**: Considered for versions beyond V1.5.

## Endpoints

### 1. Create Proposal
**Status:** `[Planned V1.0]`

Corresponds to User Story 3.1. Allows a DAO member to create a new proposal on a specific issue.

*   **Method:** `POST`
*   **Path:** `/daos/{daoId}/proposals`
*   **Description:** Submits a new proposal to the specified DAO.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO where the proposal is being made.
*   **Request Body:**
    ```json
    {
      "title": "Fund New Playground Equipment",
      "description": "Proposal to allocate 2000 CHF from the DAO treasury to purchase and install new swings and a slide at the community park.",
      "type": "funding", // "funding", "policy_change", "general_poll"
      "details": { // Type-specific details
        // For "funding"
        // "amount_requested": "2000.00",
        // "currency": "CHF",
        // "recipient_account": "dao_park_project_wallet_id_or_address"
      },
      "pollOptions": [ // Initially, simple Agree/Disagree as per User Story 3.1
        { "optionId": "agree", "text": "Agree" },
        { "optionId": "disagree", "text": "Disagree" }
      ],
      // User Story 3.4: "allow_alternative_choices": true/false could be a flag here
      "allowAlternativeChoices": true, // Default to false if not specified
      "duration": "P14D" // Optional: ISO 8601 duration for voting period, defaults to DAO's setting
    }
    ```
*   **Responses:**
    *   `201 Created`: Proposal successfully created.
        ```json
        {
          "proposalId": "unique_proposal_identifier_string",
          "daoId": "unique_dao_identifier_string",
          "title": "Fund New Playground Equipment",
          "status": "active_voting", // "pending_quorum", "active_voting", "closed"
          "createdAt": "iso_timestamp",
          "closesAt": "iso_timestamp_based_on_duration"
        }
        ```
    *   `400 Bad Request`: Invalid input (e.g., missing title, invalid options).
    *   `401 Unauthorized`: User not authenticated.
    *   `403 Forbidden`: User is not a member of the DAO or does not have proposal creation rights.
    *   `404 Not Found`: DAO not found.
    *   `422 Unprocessable Entity`: Proposal violates DAO governance rules (e.g., insufficient member reputation if that's a rule).

---

### 2. List Proposals
**Status:** `[Planned V1.0]`

Corresponds to User Story 3.2 (partially). Allows users to see a list of proposals for a DAO.

*   **Method:** `GET`
*   **Path:** `/daos/{daoId}/proposals`
*   **Description:** Retrieves a list of proposals for a given DAO. Can be filtered by status (active, closed, etc.).
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
*   **Query Parameters:**
    *   `status` (string, optional): Filter by proposal status (e.g., "active_voting", "closed", "pending_quorum", "passed", "failed").
    *   `limit` (integer, optional, default: 20): Number of proposals to return.
    *   `offset` (integer, optional, default: 0): Offset for pagination.
*   **Responses:**
    *   `200 OK`: A list of proposals.
        ```json
        {
          "proposals": [
            {
              "proposalId": "unique_proposal_identifier_string_1",
              "title": "Fund New Playground Equipment",
              "status": "active_voting",
              "proposerId": "user_xyz",
              "createdAt": "iso_timestamp",
              "closesAt": "iso_timestamp"
            },
            {
              "proposalId": "unique_proposal_identifier_string_2",
              "title": "Amend Community Guidelines re: Park Hours",
              "status": "closed",
              "outcome": "passed", // "passed", "failed", "tied"
              "proposerId": "user_abc",
              "createdAt": "iso_timestamp",
              "closedAt": "iso_timestamp"
            }
          ],
          "pagination": {
            "total": 50,
            "limit": 20,
            "offset": 0
          }
        }
        ```
    *   `401 Unauthorized`: User not authenticated (if DAO is private, otherwise public proposals might be viewable).
    *   `404 Not Found`: DAO not found.

---

### 3. Get Proposal Details
**Status:** `[Planned V1.0]`

Allows users to retrieve detailed information about a specific proposal, including current vote counts (User Story 3.3).

*   **Method:** `GET`
*   **Path:** `/daos/{daoId}/proposals/{proposalId}`
*   **Description:** Retrieves details for a specific proposal, including its current status, description, and vote counts.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
    *   `proposalId` (string, required): The unique identifier of the proposal.
*   **Responses:**
    *   `200 OK`: Detailed information about the proposal.
        ```json
        {
          "proposalId": "unique_proposal_identifier_string",
          "daoId": "unique_dao_identifier_string",
          "title": "Fund New Playground Equipment",
          "description": "Proposal to allocate 2000 CHF...",
          "type": "funding",
          "details": { /* ... */ },
          "proposerId": "user_xyz",
          "status": "active_voting", // "pending_quorum", "active_voting", "closed"
          "createdAt": "iso_timestamp",
          "closesAt": "iso_timestamp",
          "pollOptions": [
            { "optionId": "agree", "text": "Agree", "voteCount": 45 },
            { "optionId": "disagree", "text": "Disagree", "voteCount": 12 },
            { "optionId": "alt_123", "text": "Alternative: Fund swings only (1000 CHF)", "voteCount": 5, "suggestedBy": "user_def" } // Example of an added alternative
          ],
          "currentTurnout": 0.38, // (total votes / eligible voters in DAO)
          "outcome": null // "passed", "failed", "tied" if closed
        }
        ```
    *   `401 Unauthorized`.
    *   `404 Not Found`: DAO or Proposal not found.

---

### 4. Cast Vote
**Status:** `[Planned V1.0]`

Corresponds to User Story 3.2 (partially). Allows a DAO member to cast their vote on an active proposal.

*   **Method:** `POST`
*   **Path:** `/daos/{daoId}/proposals/{proposalId}/vote`
*   **Description:** Submits a vote for the authenticated user on a specific proposal.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
    *   `proposalId` (string, required): The unique identifier of the proposal.
*   **Request Body:**
    ```json
    {
      // "userId": "current_user_id", // Implicit from authentication
      "optionId": "agree" // The ID of the chosen poll option
      // "delegatedVote": false, // For future V2.0 delegated voting
      // "delegatedTo": null
    }
    ```
*   **Responses:**
    *   `200 OK` or `201 Created`: Vote successfully cast.
        ```json
        {
          "proposalId": "unique_proposal_identifier_string",
          "userId": "current_user_id",
          "optionId": "agree",
          "timestamp": "iso_timestamp",
          "message": "Vote successfully recorded."
        }
        ```
    *   `400 Bad Request`: Invalid option ID, or voting period closed.
    *   `401 Unauthorized`: User not authenticated.
    *   `403 Forbidden`: User is not eligible to vote on this proposal (e.g., not a member, already voted).
    *   `404 Not Found`: DAO or Proposal not found.
    *   `409 Conflict`: User has already voted on this proposal.

---

### 5. Suggest Alternative Choice for a Poll
**Status:** `[Planned V1.0]`

Corresponds to User Story 3.4. Allows a DAO member to suggest an alternative choice for a poll if the proposal creator enabled this option.

*   **Method:** `POST`
*   **Path:** `/daos/{daoId}/proposals/{proposalId}/suggest-choice`
*   **Description:** Allows a DAO member to suggest an alternative choice for a proposal's poll. The proposal creator can then approve it to be added to the ballot.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
    *   `proposalId` (string, required): The unique identifier of the proposal.
*   **Request Body:**
    ```json
    {
      "choiceText": "Alternative: Fund swings only (1000 CHF)",
      "rationale": "This offers a lower-cost compromise if the full amount is not supported." // Optional
    }
    ```
*   **Responses:**
    *   `201 Created` or `202 Accepted`: Suggestion submitted for review by the proposal creator.
        ```json
        {
          "suggestionId": "unique_suggestion_id",
          "proposalId": "unique_proposal_identifier_string",
          "suggestedByUserId": "current_user_id",
          "choiceText": "Alternative: Fund swings only (1000 CHF)",
          "status": "pending_approval" // "pending_approval", "approved", "rejected"
        }
        ```
    *   `400 Bad Request`: Invalid input.
    *   `401 Unauthorized`.
    *   `403 Forbidden`: Proposal does not allow alternative choices, user not eligible to suggest, or suggestion period over.
    *   `404 Not Found`: DAO or Proposal not found.

---

### 6. Approve/Reject Suggested Alternative Choice (Proposal Creator Action)
**Status:** `[Planned V1.0]`

Corresponds to User Story 3.4. Allows the proposal creator to manage suggested alternative choices.

*   **Method:** `POST`
*   **Path:** `/daos/{daoId}/proposals/{proposalId}/manage-choice/{suggestionId}`
*   **Description:** Allows the original creator of a proposal to approve or reject a suggested alternative choice. If approved, the choice is added to the poll options.
*   **Path Parameters:**
    *   `daoId` (string, required).
    *   `proposalId` (string, required).
    *   `suggestionId` (string, required): The ID of the suggestion to manage.
*   **Request Body:**
    ```json
    {
      "action": "approve" // "approve", "reject"
    }
    ```
*   **Responses:**
    *   `200 OK`: Action successful. If approved, the proposal's poll options are updated.
        ```json
        {
          "suggestionId": "unique_suggestion_id",
          "status": "approved", // or "rejected"
          "message": "Alternative choice approved and added to the poll."
        }
        ```
    *   `400 Bad Request`.
    *   `401 Unauthorized`.
    *   `403 Forbidden`: Authenticated user is not the creator of the proposal or suggestion already actioned.
    *   `404 Not Found`: DAO, Proposal, or Suggestion not found.
