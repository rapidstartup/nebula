# DAO Management API

The DAO Management API allows users to create, manage, discover, and join Decentralized Autonomous Organizations (DAOs). These DAOs are typically geographically-based and form the core of community governance on the Nebula platform.

---
**Status Key:**
*   **[Current]**: Implemented and available.
*   **[Planned V1.0]**: Planned for Nebula Version 1.0.
*   **[Planned V1.5]**: Planned for Nebula Version 1.5.
*   **[Future Scope]**: Considered for versions beyond V1.5.

## Endpoints

### 1. Create DAO
**Status:** `[Planned V1.0]`

Corresponds to User Story 2.1 and 2.2. Allows a community organizer to create a new DAO for their neighborhood, defining its name, geographic boundaries, mission, and initial governance rules.

*   **Method:** `POST`
*   **Path:** `/daos`
*   **Description:** Creates a new Decentralized Autonomous Organization.
*   **Request Body:**
    ```json
    {
      "name": "District 4 Community Fund",
      "mission": "To fund local projects and initiatives in District 4.",
      "geographicBoundary": { // GeoJSON format or similar
        "type": "Polygon",
        "coordinates": [
          [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
        ]
      },
      "governanceRules": {
        "proposalQuorum": 0.10, // 10% of members needed to make a proposal active (example)
        "votingQuorum": 0.51, // 51% of votes needed for a proposal to pass
        "votingPeriod": "P7D", // ISO 8601 duration for how long votes are open (e.g., 7 days)
        "membershipPolicy": "open_with_residency_proof" // "open_with_residency_proof", "invite_only_after_residency_proof"
      },
      "founderUserId": "unique_user_identifier_string" // User creating the DAO
    }
    ```
*   **Responses:**
    *   `201 Created`: DAO successfully created.
        ```json
        {
          "daoId": "unique_dao_identifier_string",
          "name": "District 4 Community Fund",
          "status": "active",
          // ... other DAO details including a link to the DAO resource
          "links": [
            { "rel": "self", "href": "/daos/unique_dao_identifier_string" }
          ]
        }
        ```
    *   `400 Bad Request`: Invalid input (e.g., malformed geographic data, invalid rules).
    *   `401 Unauthorized`: User not authenticated or not permitted to create DAOs.
    *   `409 Conflict`: A DAO with similar defining characteristics (e.g., name and region) might already exist.
    *   `500 Internal Server Error`.

---

### 2. List/Browse DAOs
**Status:** `[Planned V1.0]`

Corresponds to User Story 2.3 (partially). Allows users to browse and find DAOs, possibly filtering by geographic area or other criteria.

*   **Method:** `GET`
*   **Path:** `/daos`
*   **Description:** Retrieves a list of DAOs. Can be filtered by location, keywords, etc.
*   **Query Parameters:**
    *   `lat` (number, optional): Latitude for location-based search.
    *   `lon` (number, optional): Longitude for location-based search.
    *   `radius` (number, optional): Search radius in meters for location-based search.
    *   `q` (string, optional): Keyword search for DAO name or mission.
    *   `status` (string, optional): Filter by DAO status (e.g., "active", "forming").
    *   `limit` (integer, optional, default: 20): Number of DAOs to return.
    *   `offset` (integer, optional, default: 0): Offset for pagination.
*   **Responses:**
    *   `200 OK`: A list of DAOs.
        ```json
        {
          "daos": [
            {
              "daoId": "unique_dao_identifier_string_1",
              "name": "Zurich Lakefront Initiative",
              "mission": "Improving public access and amenities around Lake Zurich.",
              "memberCount": 150, // Example additional info
              "geographicFocus": "Zurich Lakefront Area" // Simplified representation
            },
            {
              "daoId": "unique_dao_identifier_string_2",
              "name": "District 4 Community Fund",
              "mission": "To fund local projects and initiatives in District 4.",
              "memberCount": 75,
              "geographicFocus": "District 4"
            }
          ],
          "pagination": {
            "total": 100,
            "limit": 20,
            "offset": 0
          }
        }
        ```
    *   `400 Bad Request`: Invalid filter parameters.
    *   `500 Internal Server Error`.

---

### 3. Get DAO Details
**Status:** `[Planned V1.0]`

Allows users to retrieve detailed information about a specific DAO.

*   **Method:** `GET`
*   **Path:** `/daos/{daoId}`
*   **Description:** Retrieves details for a specific DAO by its ID.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO.
*   **Responses:**
    *   `200 OK`: Detailed information about the DAO.
        ```json
        {
          "daoId": "unique_dao_identifier_string",
          "name": "District 4 Community Fund",
          "mission": "To fund local projects and initiatives in District 4.",
          "geographicBoundary": { /* GeoJSON object */ },
          "governanceRules": {
            "proposalQuorum": 0.10,
            "votingQuorum": 0.51,
            "votingPeriod": "P7D",
            "membershipPolicy": "open_with_residency_proof"
          },
          "memberCount": 75,
          "treasuryBalance": "12500.00", // Example, currency assumed or specified
          "currency": "CHF", // Example
          "createdAt": "iso_timestamp",
          "founderUserId": "unique_user_identifier_string",
          "status": "active"
        }
        ```
    *   `404 Not Found`: DAO with the specified ID does not exist.
    *   `500 Internal Server Error`.

---

### 4. Request to Join DAO
**Status:** `[Planned V1.0]`

Corresponds to User Story 2.3 (partially). Allows a user to request membership in a specific DAO.

*   **Method:** `POST`
*   **Path:** `/daos/{daoId}/join` or `/daos/{daoId}/members`
*   **Description:** Submits a request for the authenticated user to join the specified DAO. Depending on the DAO's `membershipPolicy`, this might require prior residency verification.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO to join.
*   **Request Body:** (Potentially empty if user's identity and verified residency are already known by the system, or could include specific attestations)
    ```json
    {
      // "userId": "unique_user_identifier_string", // Implicit from authentication
      "messageToModerators": "Interested in contributing to local park improvements." // Optional
    }
    ```
*   **Responses:**
    *   `200 OK` or `202 Accepted`: Request to join submitted. Status might be `pending_approval` or `joined` if auto-approved.
        ```json
        {
          "daoId": "unique_dao_identifier_string",
          "userId": "current_user_id",
          "membershipStatus": "pending_approval" // "joined", "pending_approval", "requires_residency_verification"
        }
        ```
    *   `400 Bad Request`: User does not meet prerequisites (e.g., residency not verified for a DAO that requires it).
        ```json
        {
          "error": {
            "code": "RESIDENCY_VERIFICATION_REQUIRED",
            "message": "User must verify residency in the DAO's geographic area before joining."
          }
        }
        ```
    *   `401 Unauthorized`: User not authenticated.
    *   `403 Forbidden`: User is banned from this DAO or does not meet other criteria.
    *   `404 Not Found`: DAO with the specified ID does not exist.
    *   `409 Conflict`: User is already a member or has a pending request.
    *   `500 Internal Server Error`.

---

### 5. Leave DAO
**Status:** `[Planned V1.0]` (Implied for DAO management)

Allows a member to leave a DAO.

*   **Method:** `POST` or `DELETE`
*   **Path:** `/daos/{daoId}/leave` or `/daos/{daoId}/members/{userId}` (if admin-initiated)
*   **Description:** Allows the authenticated user to resign their membership from the specified DAO.
*   **Path Parameters:**
    *   `daoId` (string, required): The unique identifier of the DAO to leave.
*   **Responses:**
    *   `200 OK` or `204 No Content`: Successfully left the DAO.
    *   `401 Unauthorized`: User not authenticated.
    *   `403 Forbidden`: User is not a member of this DAO.
    *   `404 Not Found`: DAO with the specified ID does not exist.
    *   `500 Internal Server Error`.
