# suitable
Decentralised dating app developed during the Sui x BSA hackathon at EPFL - 2nd edition



## Suitable Profile Module

This module defines the core logic for creating and managing user profiles on the Sui blockchain for the dating application. It includes functionality for profile creation, managing likes, and interacting with chat functionality (via the messaging module). The profile also contains exclusive information, such as social media and additional picture blobs, which can be revealed based on certain conditions and are stored in Walrus, and will be encrypted for privacy purposes.

### Module Purpose

The `suitable_profile` module enables users to:
- Create, store, and manage dating profiles.
- Store social information (e.g., pictures, social media links) securely on-chain.
- Manage interactions such as likes and access to exclusive data via chats.

### Main Functions
- `init(otw: SUITABLE_PROFILE, ctx: &mut TxContext)`
- `create_profile(description: String, private_reveal: String, ...)`
- `get_reveal(profile: &Profile, chat: &Chat, ctx: &TxContext)`
- `get_private_pictures(profile: &Profile, chat: &Chat, ctx: &TxContext)`
- `get_social(profile: &Profile, chat: &Chat, ctx: &TxContext)`
- `add_like_status(profile: &mut Profile, other_profile: address, like: bool, ctx: &TxContext)`

### Key Structs
- **Profile**: Represents the user’s dating profile with fields like description, social media, and private picture blobs.
- **Like**: Records whether a user liked or disliked another profile.
