# SuitableLove: A New Era of Meaningful Dating
**Decentralized dating app** developed during the Sui x BSA hackathon at EPFL - 2nd edition.

# Table of Contents

- [SuitableLove: A New Era of Meaningful Dating](#suitablelove-a-new-era-of-meaningful-dating)
  - [Introduction](#introduction)
  - [Problem Statement](#problem-statement)
  - [Solution](#solution)
  - [Added Value](#added-value)
  - [Technology Implemented](#technology-implemented)
  - [Web3 Utility](#web3-utility)
  - [Product](#product)
    - [Suitable Profile Module](#suitable-profile-module)
      - [Module Purpose](#module-purpose)
      - [Main Functions](#main-functions)
      - [Key Structs](#key-structs)
    - [Suitable Chat Module](#suitable-chat-module)
      - [Module Purpose](#module-purpose-1)
      - [Main Functions](#main-functions-1)
      - [Key Structs](#key-structs-1)
  - [Getting Started](#getting-started)


## Links
- **Demo Video**: [Watch here](https://www.youtube.com/watch?v=C0ZitbaNFbU)  
- **Front-End**: [Visit SuitableLove Front-End](https://suitable-front-end.vercel.app)

## Introduction

**SuitableLove** is a blockchain-powered dating platform that aims to create deep, authentic relationships by gamifying and incentivizing meaningful interactions. Designed to counter the superficiality of modern dating apps, SuitableLove offers users a unique experience with free unlimited access, secure profiles, and gradual information reveal to promote genuine connections.

## Problem Statement

Traditional dating apps have several core issues:

- **Superficiality of Connections**: Most users make quick decisions based almost entirely on appearance, leading to shallow, fleeting connections.
- **Limitations for Free Users**: Platforms like Tinder impose strict limits on free users, pushing them towards paid features like extra swipes or visibility.
- **Lack of Trust and Privacy Concerns**: Bots, fake profiles, and weak identity verification erode user trust, while personal data is often poorly managed or exploited.

## Solution

**SuitableLove** introduces a new dating experience built on Web3 and blockchain technology:

- **Gradual Profile Reveal**: Users can engage in meaningful conversations before unlocking more detailed information, ensuring that connections are based on real interaction rather than quick judgments.
- **Gamified Engagement**: Users are rewarded for consistent, quality interactions through tokens, incentivizing deeper conversations and longer-lasting connections.
- **Secure and Verified Users**: All users undergo identity verification through **zkLogin (Zero-Knowledge Login)**, ensuring that interactions are genuine, with zero tolerance for bots or fake profiles.

![Suitable diagram](https://github.com/user-attachments/assets/53abf21e-1101-46b7-b4b1-9af2f3c41d1d)


## Added Value

While Tinder and similar apps restrict free users and focus heavily on appearance-based matching, SuitableLove:

- **Provides Free, Unlimited Access**: No paid swipes or hidden costs, allowing all users to enjoy the full experience without coercive monetization.
- **Monetizes through Positive Engagement**: Users earn tokens (Sui) through meaningful interactions, turning dating into a rewarding experience.
- **Promotes Trust and Privacy**: zkLogin and decentralized data storage (using FHE and time-lock encryption) ensure privacy, with user data stored securely and revealed gradually, giving users full control over their information.

## Technology Needed

- **zkLogin (Zero-Knowledge Login)**: Enables secure, seamless identity verification without compromising user privacy. Users can prove their humanity without revealing personal details.
- **Proof of Humanity**: Ensures all profiles are genuine, creating a trustworthy environment for dating.
- **Time-Lock Encryption**: Gradually unlocks user profile details over time, ensuring that deeper information is only revealed after meaningful interactions.
- **Sui Blockchain Integration**: Tokens (Sui) reward users for engagement, while SuiNS is used to provide a SocialFi layer for decentralized incentives.
- **Sponsored Transactions for Onboarding**: Facilitates a smooth onboarding process by covering transaction fees for new users, allowing them to engage with the platform without any upfront costs or barriers.
- **Walrus Storage**: A decentralized storage solution for securely storing user data, such as social media links and additional pictures. It ensures that personal information is stored efficiently and accessed based on predefined conditions.

## Web3 Utility

Web3 enables a new layer of trust, security, and engagement for Suitable.love. By utilizing blockchain-based identity verification and encrypted data storage, the platform provides a level of security and privacy not possible with traditional Web2 apps. Additionally, Web3's decentralized token system offers a fair and engaging way to incentivize user behavior without relying on paid subscriptions or restrictive monetization tactics.

**SuitableLove** is not just another dating app; it's a reimagined platform that puts the user first, ensuring authentic connections and rewarding meaningful engagement through the power of Web3.


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


#### Key Structs

- **Profile**: Represents the user's dating profile with fields like description, social media, and private picture blobs.
- **Like**: Records whether a user liked or disliked another profile.


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


#### Key Structs

- **Chat**: Represents a chat session between two users, storing the user addresses, all messages (as URLs), and the last message URL.

---

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd suitable

