# Suitable

**Decentralized dating app** developed during the Sui x BSA hackathon at EPFL - 2nd edition.

---

## Suitable Profile Module

This module defines the core logic for creating and managing user profiles on the Sui blockchain for the dating application. It includes functionality for profile creation, managing likes, and interacting with chat functionality. Exclusive data such as social media links and additional pictures are stored on `Walrus`, and revealed based on certain conditions, while profile metadata is accessible through Sui’s `Display` functionality.

### Module Purpose

The `suitable_profile` module enables users to:
- Create, store, and manage dating profiles.
- Store social information (e.g., pictures, social media links).
- Manage likes and access to exclusive profile data via chats and time-lock encryption.
- Leverage **Sui's display functionality** to show important profile data.

### Main Functions

- `init(otw: SUITABLE_PROFILE, ctx: &mut TxContext)`
  - Initializes the profile module and enables the display of key fields such as owner address, description, and pictures.

- `create_profile(description: String, private_reveal: String, social_media: String, picture_blob: address, private_picture_blob1: address, ..., ctx: &mut TxContext)`
  - Creates a new profile with information like description, social media, and picture blobs (on Walrus).

- `get_reveal(profile: &Profile, chat: &Chat, ctx: &TxContext)`
  - Retrieves private reveal information based on chat conditions.

- `get_private_pictures(profile: &Profile, chat: &Chat, ctx: &TxContext)`
  - Returns private pictures after certain conditions are met.

- `get_social(profile: &Profile, chat: &Chat, ctx: &TxContext)`
  - Retrieves social media links after chat conditions are satisfied.

- `add_like_unlike(profile: &mut Profile, other_profile: address, like: bool, ctx: &TxContext)`
  - Adds a like or dislike status for another user's profile.

---

### Key Structs

- **Profile**: Represents the user's dating profile with fields like description, social media, and private picture blobs.
- **Like**: Records whether a user liked or disliked another profile.

---


