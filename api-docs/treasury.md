# Treasury Management API

The Treasury Management API provides endpoints for interacting with DAO treasuries. This includes viewing public ledgers of income and expenditures, and potentially facilitating contributions to DAO treasuries (though specifics of monetary transactions are part of the broader economic model).

---
**Status Key:**
*   **[Current]**: Implemented and available.
*   **[Planned V1.0]**: Planned for Nebula Version 1.0.
*   **[Planned V1.5]**: Planned for Nebula Version 1.5.
*   **[Future Scope]**: Considered for versions beyond V1.5.

## Endpoints

### 1. View DAO Treasury Ledger
**Status:** `[Planned V1.0]`

Corresponds to User Story 4.1. Allows a DAO member (or the public, depending on DAO settings) to view a public ledger of their DAO's treasury, showing all incoming funds and every expenditure approved by a vote.

*   **Method:** `GET`
*   **Path:** `/daos/{daoId}/treasury/ledger`
*   **Description:** Retrieves the transaction ledger for the specified DAO's treasury.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
*   **Query Parameters:**
    *   `type` (string, optional): Filter by transaction type (e.g., "deposit", "withdrawal", "internal_transfer", "action_token_grant").
    *   `startDate` (date, optional): Filter transactions from this date.
    *   `endDate` (date, optional): Filter transactions up to this date.
    *   `limit` (integer, optional, default: 50): Number of transactions to return.
    *   `offset` (integer, optional, default: 0): Offset for pagination.
*   **Responses:**
    *   `200 OK`: A list of treasury transactions.
        ```json
        {
          "daoId": "unique_dao_identifier_string",
          "currency": "CHF", // Primary currency of the treasury
          "balance": "12345.67",
          "actionTokenBalance": "5000", // Example if action tokens are per-DAO
          "transactions": [
            {
              "transactionId": "txn_123abc",
              "timestamp": "iso_timestamp",
              "type": "deposit", // "deposit", "withdrawal", "action_token_allocation"
              "amount": "500.00",
              "currency": "CHF",
              "description": "Initial funding from community drive.",
              "relatedProposalId": null,
              "fromAddress": "external_source_identifier_or_address",
              "toAddress": "dao_treasury_address"
            },
            {
              "transactionId": "txn_456def",
              "timestamp": "iso_timestamp",
              "type": "withdrawal",
              "amount": "2000.00",
              "currency": "CHF",
              "description": "Funding for playground equipment.",
              "relatedProposalId": "proposal_xyz789",
              "fromAddress": "dao_treasury_address",
              "toAddress": "playground_project_wallet"
            },
            {
              "transactionId": "txn_789ghi",
              "timestamp": "iso_timestamp",
              "type": "action_token_grant", // Part of Section 6.5 Economic Model
              "amount": "100", // Number of action tokens
              "description": "Monthly action token allocation to member.",
              "userId": "user_abc123" // Target user for action tokens
            }
          ],
          "pagination": {
            "total": 25,
            "limit": 50,
            "offset": 0
          }
        }
        ```
    *   `401 Unauthorized`: User not authenticated (if treasury is private).
    *   `403 Forbidden`: User not authorized to view this DAO's treasury.
    *   `404 Not Found`: DAO not found.

---

### 2. Get DAO Treasury Overview
**Status:** `[Planned V1.0]`

Provides a summary of the DAO's treasury, including current balance.

*   **Method:** `GET`
*   **Path:** `/daos/{daoId}/treasury`
*   **Description:** Retrieves a summary overview of the DAO's treasury.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
*   **Responses:**
    *   `200 OK`: Treasury overview.
        ```json
        {
          "daoId": "unique_dao_identifier_string",
          "name": "District 4 Community Fund",
          "currency": "CHF",
          "currentBalance": "12345.67",
          "totalInflows": "25000.00", // Over a defined period or lifetime
          "totalOutflows": "12654.33", // Over a defined period or lifetime
          "actionTokenSupply": "100000", // Total possible action tokens for this DAO, if applicable
          "actionTokensInCirculation": "45000", // Action tokens currently held by members
          "lastTransactionDate": "iso_timestamp"
        }
        ```
    *   `401 Unauthorized`.
    *   `403 Forbidden`.
    *   `404 Not Found`.

---
### 3. Fund DAO Treasury (Fiat On-Ramp Placeholder)
**Status:** `[Future Scope]`

Placeholder for future fiat on-ramp integration. Allows users to contribute to a DAO's treasury using traditional currency.

*   **Method:** `POST`
*   **Path:** `/daos/{daoId}/treasury/deposit`
*   **Description:** Initiates a deposit into the DAO's treasury. This would likely involve redirecting to a payment processor or using an integrated service.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
*   **Request Body:**
    ```json
    {
      "amount": "100.00",
      "currency": "CHF", // e.g., "USD", "EUR", "CHF"
      "paymentMethodToken": "token_from_payment_provider" // Or other payment details
    }
    ```
*   **Responses:**
    *   `202 Accepted`: Deposit request is being processed.
        ```json
        {
          "transactionId": "temp_txn_id_for_tracking",
          "status": "pending_confirmation",
          "message": "Your deposit is being processed. You will be notified upon completion."
          // May include a redirect URL for payment provider
        }
        ```
    *   `400 Bad Request`: Invalid amount, currency, or payment method.
    *   `401 Unauthorized`.
    *   `404 Not Found`: DAO not found.
    *   `503 Service Unavailable`: Payment provider integration issue.

---
### 4. Manage Action Tokens (Conceptual)
**Status:** `[Planned V1.5]` (Part of Economic Model)

Endpoints related to the "Action Token" system. These might be more administrative or automated system actions rather than direct user calls for individual tokens. Core governance functions (voting, proposing) are free via these tokens.

#### 4.1 Get User Action Token Balance
*   **Method:** `GET`
*   **Path:** `/identity/action-tokens` (for authenticated user)
*   **Alternative Path (Admin):** `/users/{userId}/action-tokens`
*   **Description:** Retrieves the current action token balance for the authenticated user. Can also be used by an admin to retrieve balance for a specific user. Tokens might be global or scoped per DAO.
*   **Path Parameters (for Admin path):**
    *   `userId` (string, required): The user's identifier.
*   **Query Parameters (if applicable):**
    *   `daoId` (string, optional): If action tokens are scoped per DAO, specify DAO ID to get balance for that DAO.
*   **Responses:**
    *   `200 OK`:
        ```json
        {
          "userId": "unique_user_identifier_string", // Will be the authenticated user's ID or the one from path
          // "daoId": "unique_dao_identifier_string", // If scoped and requested
          "balance": 78, // Number of action tokens
          "lastReplenishedAt": "iso_timestamp"
        }
        ```
    *   `401 Unauthorized`.
    *   `404 Not Found`: User not found (if using admin path).

*(Further endpoints for action token replenishment (likely automated system process) or administrative adjustments would be defined here if they were user-facing APIs. The PRD implies these are more of a system mechanism to ensure free participation in core activities.)*
