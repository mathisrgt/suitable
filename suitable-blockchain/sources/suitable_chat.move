module suitable_blockchain::suitable_chat {
    
    // Imports (Libraries)
    use std::string::{String};
    use sui::tx_context::{sender};

    // Imports (Internal)
    // use suitable_blockchain::suitable_profile::Profile;

    // Errors
    const ENotDifferentUser: u64 = 0;
    const ENotAChatUser: u64 = 1;

    // Struct definitions
    public struct Chat has key, store {
        id: UID,                        // Unique identifier for each chat
        user1: address,                 // Address of the sender
        user2: address,                 // Address of the receiver
        all_messages_url: vector<String>,   // All messages sent between the two profiles (Walrus URLs)
        last_messages_url: String,          // Last message update stored and encrypted off-chain on Walrus (URL)
    }
 
    fun init(_ctx: &mut TxContext) {
        
    }

    public entry fun create_chat(other_user: address, messages_init_url: String, ctx: &mut TxContext) {
        assert!(sender(ctx) != other_user, ENotDifferentUser);

        transfer::share_object(Chat { 
            id: object::new(ctx), 
            user1: sender(ctx), 
            user2: other_user, 
            all_messages_url: vector[messages_init_url], 
            last_messages_url: messages_init_url, 
        });
    }

    fun nb_messages(chat: &Chat): u64 {
        vector::length(&chat.all_messages_url)
    }

    public entry fun get_last_messages(chat: &Chat, ctx: &TxContext): String {
        assert!(sender(ctx) == chat.user1 || sender(ctx) == chat.user2, ENotAChatUser);

        chat.last_messages_url
    }

    public(package) fun is_allowed_to_request_reveal(chat: &Chat, ctx: &TxContext): bool {
        assert!(sender(ctx) == chat.user1 || sender(ctx) == chat.user2, ENotAChatUser);
        
        nb_messages(chat) > 10
    }

    public(package) fun is_allowed_to_request_private_pictures(chat: &Chat, ctx: &TxContext): bool {
        assert!(sender(ctx) == chat.user1 || sender(ctx) == chat.user2, ENotAChatUser);
        
        nb_messages(chat) > 20
    }

    public(package) fun is_allowed_to_request_social(chat: &Chat, ctx: &TxContext): bool {
        assert!(sender(ctx) == chat.user1 || sender(ctx) == chat.user2, ENotAChatUser);

        nb_messages(chat) > 30
    }

    public fun send_message(chat: &mut Chat, last_messages_url: String) {
        vector::push_back(&mut chat.all_messages_url, last_messages_url);
        chat.last_messages_url = last_messages_url;
    }
}
