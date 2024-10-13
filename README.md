# Suitable

**Decentralized dating app** developed during the Sui x BSA hackathon at EPFL - 2nd edition.

---

## Table of contents

1. [Summary](#summary)
2. [Problems](#problems)
3. [Solutions](#solutions)
4. [Product](#product)
   - [Features](#features)
   - [Key Modules](#key-modules)
     - [Suitable Profile Module](#suitable-profile-module)
     - [Suitable Chat Module](#suitable-chat-module)
   - [Future Developments](#future-developments)
5. [Getting Started](#getting-started)
6. [Contributing](#contributing)
7. [License](#license)

---

## Summary




---

## Problems



---

## Solutions


---

## Product

### Suitable Profile Module

This module defines the core logic for creating and managing user profiles on the Sui blockchain for the dating application. It includes functionality for profile creation, managing likes, and interacting with chat functionality. Exclusive data such as social media links and additional pictures are stored on `Walrus`, and revealed based on certain conditions, while profile metadata is accessible through Sui’s `Display` functionality.

#### Module Purpose

The `suitable_profile` module enables users to:
- Create, store, and manage dating profiles.
- Store social information (e.g., pictures, social media links).
- Manage likes and access to exclusive profile data via chats and time-lock encryption.
- Leverage **Sui's display functionality** to show important profile data.

#### Main Functions

- `init(otw: SUITABLE_PROFILE, ctx: &mut TxContext)`
- `create_profile(description: String, private_reveal: String, social_media: String, picture_blob: address, private_picture_blob1: address, ..., ctx: &mut TxContext)`
- `get_reveal(profile: &Profile, chat: &Chat, ctx: &TxContext)`
- `get_private_pictures(profile: &Profile, chat: &Chat, ctx: &TxContext)`
- `get_social(profile: &Profile, chat: &Chat, ctx: &TxContext)`
- `add_like_unlike(profile: &mut Profile, other_profile: address, like: bool, ctx: &TxContext)`

---

#### Key Structs

- **Profile**: Represents the user's dating profile with fields like description, social media, and private picture blobs.
- **Like**: Records whether a user liked or disliked another profile.

---

### Suitable Chat Module

The `suitable_chat` module handles the core communication between users within the Suitable app. It provides the ability to create chats, exchange messages, and verify if certain conditions have been met for unlocking additional profile information (like additional pictures or social media links).

### Module Purpose

The `suitable_chat` module enables users to:
- Create and manage chat sessions between two users.
- Send and store messages on `Walrus`.

#### Main Functions

- `init(_ctx: &mut TxContext)`
- `create_chat(other_user: address, messages_init_url: String, ctx: &mut TxContext)`
- `nb_messages(chat: &Chat)`
- `get_last_messages(chat: &Chat, ctx: &TxContext)`
- `is_allowed_to_request_reveal(chat: &Chat, ctx: &TxContext)`
- `is_allowed_to_request_private_pictures(chat: &Chat, ctx: &TxContext)`
- `is_allowed_to_request_social(chat: &Chat, ctx: &TxContext)`
- `send_message(chat: &mut Chat, last_messages_url: String)`

---

#### Key Structs

- **Chat**: Represents a chat session between two users, storing the user addresses, all messages (as URLs), and the last message URL.

---

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd suitable

