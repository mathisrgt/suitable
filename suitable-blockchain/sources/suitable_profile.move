module suitable_blockchain::suitable_profile {

    // Imports (Libraries)
    use sui::tx_context::{sender};
    use std::string::{utf8, String};
    use sui::package;
    use sui::display;

    // Imports (Internal)
    // use suitable_blockchain::suitable_chat::{Chat, send_message};

    // Errors
    // const ENotEnough: u64 = 0;

    // Struct definitions
    public struct Like has store {
        profile: address,
        liked: bool,
    }

    public struct Profile has key, store {
        id: UID,
        owner_address: address,

        description: String,
        private_reveal: String,
        social_media: String,
        
        picture_blob: address,                
        private_pictures_blobs: vector<address>,
        likes: vector<Like>,
    }

    public struct SUITABLE_PROFILE has drop {}

    // Functions
    fun init(otw: SUITABLE_PROFILE, ctx: &mut TxContext) {
        let keys = vector[
            utf8(b"owner_address"),
            utf8(b"description"),
            utf8(b"private_reveal"),
            utf8(b"social_media"),
            utf8(b"picture_url"),
            utf8(b"private_picture_blob"),
        ];

        let values = vector[
            utf8(b"{owner_address}"),
            utf8(b"{description}"),
            utf8(b"{picture_url}"),
            utf8(b"{social_media}"),
            utf8(b"{private_reveal}"),
            utf8(b"{private_picture_blobs}"),
        ];

        let publisher = package::claim(otw, ctx);

        let mut display = display::new_with_fields<Profile>(
            &publisher, keys, values, ctx
        );

        display::update_version(&mut display);

        transfer::public_transfer(publisher, sender(ctx));
        transfer::public_transfer(display, sender(ctx));
    }

    public entry fun create_profile(description: String, private_reveal: String, social_media: String, picture_blob: address, ctx: &mut TxContext) {
        transfer::transfer(Profile {
            id: object::new(ctx),
            owner_address: sender(ctx),
            description,
            private_reveal,
            social_media,
            picture_blob,
            private_pictures_blobs: vector[],
            likes: vector[],
        }, sender(ctx));
    }

    // public fun get_display_object<Profile>(profile: UID, ctx: &mut TxContext): display::Display<Profile> {
    //     let publisher = package::get_publisher(profile, ctx);

    //     let display = display::get::<Profile>(&publisher, ctx);
        
    //     display
    // }

    public entry fun add_like_status(profile: &mut Profile, other_profile: address, like: bool) {
        let status = Like { profile: other_profile, liked: like };
        vector::push_back(&mut profile.likes, status);
    }

    // public entry fun send_message(chat: &mut Chat, to: ID, walrus_url: String, ctx: &mut TxContext): Message {
    //     let id = object::new(ctx);
    //     let clock = Clock::new();
    //     let timestamp = clock.timestamp_ms();
    
    //     Message {
    //         id,
    //         from,
    //         to,
    //         walrus_url,
    //         timestamp
    //     }
    // }
}
