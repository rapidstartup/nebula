# Identity Management API

The Identity Management API provides endpoints for managing user identities, authentication, and profiles within the Nebula ecosystem. This includes creating self-sovereign identities, verifying residency, and managing personal information through the Info Wallet.

---
**Status Key:**
*   **[Current]**: Implemented and available.
*   **[Planned V1.0]**: Planned for Nebula Version 1.0.
*   **[Planned V1.5]**: Planned for Nebula Version 1.5.
*   **[Future Scope]**: Considered for versions beyond V1.5.

## Endpoints

### 1. Create User Account (Self-Sovereign Identity)
**Status:** `[Planned V1.0]` `[Planned V1.5]` (Sybil-resistance refinement)

Corresponds to User Story 1.1 and 1.2. Allows a new user to create their foundational self-sovereign digital identity. V1.5 emphasizes Sybil-resistance (e.g., biocryptic, state-ID integration).

*   **Method:** `POST`
*   **Path:** `/users`
*   **Description:** Registers a new user and establishes their unique, self-sovereign identity on the Nebula platform. The initial creation might involve selecting an authentication method and setting up recovery mechanisms. The V1.5 version will incorporate advanced Sybil resistance.
*   **Request Body:**
    ```json
    {
      "authenticationMethod": "password", // "password", "web3_wallet", "biocryptic_hash" (V1.5)
      "credentials": {
        // Structure depends on authenticationMethod
        // e.g., for "password":
        // "username": "new_user_id",
        // "password": "strong_password_123"
        // e.g., for "web3_wallet":
        // "walletAddress": "0x...",
        // "signature": "0x..." // Signed message proving ownership
      },
      "profile": { // Optional initial profile info, user-controlled
        "displayName": "Anonymous User"
      }
      // V1.5 might include fields related to biocryptic enrollment or linking state-verified ID
    }
    ```
*   **Responses:**
    *   `201 Created`: Identity successfully created.
        ```json
        {
          "userId": "unique_user_identifier_string",
          "status": "pending_verification" // Or "active" if no further verification needed initially
          // Other relevant identity details, e.g., public keys
        }
        ```
    *   `400 Bad Request`: Invalid input (e.g., weak password, malformed request).
        ```json
        {
          "error": {
            "code": "INVALID_INPUT",
            "message": "Password does not meet security requirements."
          }
        }
        ```
    *   `409 Conflict`: Identity already exists (e.g., username taken, wallet address already registered, Sybil detection triggered in V1.5).
        ```json
        {
          "error": {
            "code": "IDENTITY_EXISTS",
            "message": "An identity with the provided credentials already exists."
          }
        }
        ```
    *   `500 Internal Server Error`: Server-side issue.

---

### 2. Verify Geographic Residency
**Status:** `[Planned V1.0]`

Corresponds to User Story 1.3. Allows a user to submit proof of geographic residency for a specific DAO or region.

*   **Method:** `POST`
*   **Path:** `/identity/verify-residency`
*   **Description:** Initiates the process of verifying the authenticated user's geographic residency. This might involve integrating with a third-party verification service or a community-based vouching system. The `userId` is implicit from the authentication context.
*   **Request Body:**
    ```json
    {
      "regionIdentifier": "zurich_district_4", // e.g., DAO ID, postal code, or specific geographic area code
      "proof": {
        "type": "utility_bill", // "utility_bill", "eid_address_proof", "community_vouch"
        "data": {
          // Structure depends on proof type
          // e.g., for "utility_bill":
          // "documentScan": "base64_encoded_image_or_pdf_string"
          // e.g., for "eid_address_proof":
          // "eidToken": "token_from_eid_system"
        }
      }
    }
    ```
*   **Responses:**
    *   `202 Accepted`: Verification request received and is being processed.
        ```json
        {
          "userId": "unique_user_identifier_string",
          "regionIdentifier": "zurich_district_4",
          "verificationStatus": "pending_review", // "pending_review", "processing"
          "trackingId": "optional_verification_tracking_id"
        }
        ```
    *   `400 Bad Request`: Invalid input (e.g., unsupported proof type, missing data).
    *   `401 Unauthorized`: User not authenticated.
    *   `403 Forbidden`: User not permitted to request verification for this region or identity.
    *   `404 Not Found`: User ID or region identifier not found.
    *   `503 Service Unavailable`: Verification service is temporarily unavailable.

---

### 3. Manage Info Wallet (PII Control)
**Status:** `[Planned V1.5]`

Corresponds to User Story 1.4. Endpoints to manage the "Info Wallet," allowing users to control their Personally Identifiable Information (PII) and grant/revoke access.

#### 3.1 Add/Update Personal Information
*   **Method:** `PUT` or `POST`
*   **Path:** `/identity/info-wallet/data`
*   **Description:** Allows the authenticated user to add or update specific pieces of PII in their secure Info Wallet. Information is encrypted and controlled by the user. `userId` is implicit from authentication.
*   **Request Body:**
    ```json
    {
      "dataItems": [
        {
          "type": "email", // "email", "phone_number", "physical_address"
          "value": "user@example.com", // Encrypted by client before sending, or server-side with user's key
          "label": "Personal Email", // User-defined label
          "accessControls": [ // Optional: Define default access for this item
            // { "daoId": "dao_xyz", "role": "member_basic_info", "granted": true }
          ]
        },
        {
          "type": "physical_address",
          "value": { /* Structured address object, encrypted */ },
          "label": "Home Address"
        }
      ]
    }
    ```
*   **Responses:**
    *   `200 OK`: Information successfully updated/added.
    *   `400 Bad Request`: Invalid data format.
    *   `401 Unauthorized`: User not authenticated.

#### 3.2 Grant Data Access
*   **Method:** `POST`
*   **Path:** `/identity/info-wallet/permissions`
*   **Description:** Allows the authenticated user to grant specific DAOs or services revocable, role-based access to pieces of their PII stored in the Info Wallet. `userId` is implicit.
*   **Request Body:**
    ```json
    {
      "granteeId": "dao_xyz_official_id", // ID of the DAO or service requesting access
      "granteeType": "dao", // "dao", "service"
      "requestedItems": [
        { "type": "email", "purpose": "DAO Communications" },
        { "type": "physical_address", "purpose": "Residency Verification for DAO Membership" }
      ],
      "role": "member_basic_info", // Predefined role or custom permission set
      "duration": "P30D" // Optional: ISO 8601 duration string for temporary access
    }
    ```
*   **Responses:**
    *   `200 OK`: Access granted successfully.
    *   `400 Bad Request`: Invalid request (e.g., item not in wallet, invalid grantee).
    *   `401 Unauthorized`.
    *   `403 Forbidden`: User chooses not to grant access (simulated, actual denial is implicit).

#### 3.3 Revoke Data Access
*   **Method:** `DELETE`
*   **Path:** `/identity/info-wallet/permissions/{permissionId}`
*   **Description:** Allows the authenticated user to revoke a specific, previously granted access permission to their PII using the permission's unique ID. `userId` is implicit.
*   **Path Parameters:**
    *   `permissionId` (string, required): The unique identifier of the permission to revoke.
*   **Responses:**
    *   `200 OK` or `204 No Content`: Access revoked.
    *   `401 Unauthorized`.
    *   `404 Not Found`: Permission not found.

#### 3.4 View Data Access Permissions
*   **Method:** `GET`
*   **Path:** `/identity/info-wallet/permissions`
*   **Description:** Retrieves a list of all current data access permissions granted by the authenticated user. `userId` is implicit.
*   **Responses:**
    *   `200 OK`:
        ```json
        {
          "permissions": [
            {
              "permissionId": "unique_permission_id",
              "granteeId": "dao_xyz_official_id",
              "granteeType": "dao",
              "items": [
                { "type": "email", "label": "Personal Email" }
              ],
              "role": "member_basic_info",
              "grantedAt": "iso_timestamp",
              "expiresAt": "iso_timestamp_or_null"
            }
            // ... other permissions
          ]
        }
        ```
    *   `401 Unauthorized`.
