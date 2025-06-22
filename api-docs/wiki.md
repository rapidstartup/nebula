# Wiki Management API

The Wiki Management API allows for interaction with the collaborative, wiki-style knowledge bases associated with each DAO. This includes retrieving wiki content and participating in the consensus-based editing process.

---
**Status Key:**
*   **[Current]**: Implemented and available.
*   **[Planned V1.0]**: Planned for Nebula Version 1.0.
*   **[Planned V1.5]**: Planned for Nebula Version 1.5.
*   **[Future Scope]**: Considered for versions beyond V1.5.

## Endpoints

### 1. Get Wiki Page
**Status:** `[Planned V1.0]`

Corresponds to User Story 4.2 (partially). Allows users to retrieve the content of a specific wiki page within a DAO.

*   **Method:** `GET`
*   **Path:** `/daos/{daoId}/wiki/pages/{pageSlug}`
*   **Description:** Retrieves the current version of a wiki page for the specified DAO.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
    *   `pageSlug` (string, required): The unique slug or identifier for the wiki page (e.g., "community-guidelines", "funding-procedures").
*   **Query Parameters:**
    *   `version` (string, optional): Retrieve a specific version of the page. Defaults to the latest approved version.
*   **Responses:**
    *   `200 OK`: The content of the wiki page.
        ```json
        {
          "daoId": "unique_dao_identifier_string",
          "pageSlug": "community-guidelines",
          "title": "Community Guidelines",
          "content": "Markdown content of the wiki page...", // Or HTML, depending on storage
          "version": "v3.1",
          "lastModifiedAt": "iso_timestamp",
          "lastModifiedBy": "user_editor_id"
        }
        ```
    *   `401 Unauthorized` (if wiki is private).
    *   `404 Not Found`: DAO or Wiki Page not found.

---

### 2. List Wiki Pages
**Status:** `[Planned V1.0]`

Corresponds to User Story 4.2 (partially). Allows users to list all available wiki pages for a DAO.

*   **Method:** `GET`
*   **Path:** `/daos/{daoId}/wiki/pages`
*   **Description:** Retrieves a list of all wiki pages for the specified DAO.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
*   **Query Parameters:**
    *   `limit` (integer, optional, default: 20): Number of pages to return.
    *   `offset` (integer, optional, default: 0): Offset for pagination.
*   **Responses:**
    *   `200 OK`: A list of wiki pages.
        ```json
        {
          "daoId": "unique_dao_identifier_string",
          "pages": [
            {
              "pageSlug": "community-guidelines",
              "title": "Community Guidelines",
              "lastModifiedAt": "iso_timestamp"
            },
            {
              "pageSlug": "funding-procedures",
              "title": "Funding Procedures",
              "lastModifiedAt": "iso_timestamp"
            }
          ],
          "pagination": {
            "total": 15,
            "limit": 20,
            "offset": 0
          }
        }
        ```
    *   `401 Unauthorized` (if wiki is private).
    *   `404 Not Found`: DAO not found.

---

### 3. Propose Wiki Page Edit (or New Page)
**Status:** `[Planned V1.0]`

Corresponds to User Story 4.3. Allows a DAO member to propose an edit to an existing wiki page or suggest a new wiki page. This proposal would then typically go through a community voting process (which might leverage the Governance API or a simplified version).

*   **Method:** `POST`
*   **Path:** `/daos/{daoId}/wiki/proposals` (or `/daos/{daoId}/wiki/pages/{pageSlug}/propose-edit`)
*   **Description:** Submits a proposed change (edit or new page) to the DAO's wiki. This creates a "wiki proposal" that can be voted on.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
    *   `pageSlug` (string, optional, if editing existing): The slug of the page to edit.
*   **Request Body:**
    ```json
    {
      "type": "edit", // "edit", "new_page"
      "pageSlug": "community-guidelines", // Required for "edit", proposed for "new_page" if not auto-generated
      "title": "Updated Community Guidelines", // Required for "new_page", optional for "edit"
      "proposedContent": "New Markdown content with suggested changes...",
      "summaryOfChanges": "Clarified section on respectful communication and added link to moderation policy.",
      "proposerUserId": "current_user_id" // Implicit from auth
    }
    ```
*   **Responses:**
    *   `202 Accepted`: Edit proposal submitted and is pending review/voting.
        ```json
        {
          "wikiProposalId": "unique_wiki_proposal_id",
          "daoId": "unique_dao_identifier_string",
          "pageSlug": "community-guidelines",
          "status": "pending_vote", // "pending_vote", "approved", "rejected"
          "proposedBy": "current_user_id",
          "createdAt": "iso_timestamp"
          // Could include a link to a governance proposal if integrated that way
        }
        ```
    *   `400 Bad Request`: Invalid input.
    *   `401 Unauthorized`.
    *   `403 Forbidden`: User not permitted to propose wiki changes in this DAO.
    *   `404 Not Found`: DAO or `pageSlug` (for edits) not found.
    *   `409 Conflict`: An edit proposal for this page by this user is already active.

---

### 4. List Wiki Edit Proposals
**Status:** `[Planned V1.0]`

Allows users to see pending or past wiki edit proposals.

*   **Method:** `GET`
*   **Path:** `/daos/{daoId}/wiki/proposals`
*   **Description:** Retrieves a list of wiki edit proposals for the DAO.
*   **Path Parameters:**
    *   `daoId` (string, required).
*   **Query Parameters:**
    *   `status` (string, optional): Filter by status (e.g., "pending_vote", "approved", "rejected").
    *   `pageSlug` (string, optional): Filter by specific wiki page.
    *   `proposerId` (string, optional): Filter by proposer.
*   **Responses:**
    *   `200 OK`: List of wiki proposals.
        ```json
        {
          "wikiProposals": [
            {
              "wikiProposalId": "unique_wiki_proposal_id",
              "pageSlug": "community-guidelines",
              "titleProposed": "Updated Community Guidelines",
              "status": "pending_vote",
              "proposedBy": "user_abc",
              "createdAt": "iso_timestamp"
            }
          ],
          "pagination": { /* ... */ }
        }
        ```
    *   `401 Unauthorized`.
    *   `404 Not Found`.

---

### 5. Vote on Wiki Edit Proposal
**Status:** `[Planned V1.0]`

Corresponds to User Story 4.3. Allows DAO members to vote on a proposed wiki edit. This might be a simplified voting mechanism specific to wiki edits or could integrate with the main Governance API proposal system. For now, assuming a dedicated endpoint.

*   **Method:** `POST`
*   **Path:** `/daos/{daoId}/wiki/proposals/{wikiProposalId}/vote`
*   **Description:** Casts a vote on a specific wiki edit proposal.
*   **Path Parameters:**
    *   `daoId` (string, required).
    *   `wikiProposalId` (string, required).
*   **Request Body:**
    ```json
    {
      "vote": "approve" // "approve", "reject"
    }
    ```
*   **Responses:**
    *   `200 OK`: Vote recorded.
        ```json
        {
          "wikiProposalId": "unique_wiki_proposal_id",
          "vote": "approve",
          "message": "Vote recorded successfully."
        }
        ```
    *   `400 Bad Request`: Invalid vote option, voting period closed.
    *   `401 Unauthorized`.
    *   `403 Forbidden`: User not eligible to vote or already voted.
    *   `404 Not Found`: DAO or Wiki Proposal not found.
    *   `409 Conflict`: User has already voted.

*(Note: The actual approval and merging of a wiki edit proposal into the main wiki page content would be a subsequent step, likely automated, once a vote passes. This might trigger a new version of the page.)*
