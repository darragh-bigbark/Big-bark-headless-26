<?php
/**
 * Plugin Name: BigBark Custom Post Types
 * Description: Registers Episodes and Team Members CPTs with WPGraphQL support for The Big Bark headless site.
 * Version:     1.1.0
 * Author:      The Big Bark
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// ── Register Custom Post Types ────────────────────────────────────────────────

add_action( 'init', 'bigbark_register_cpts' );

function bigbark_register_cpts() {

    // Episodes
    register_post_type( 'episode', [
        'labels'              => [
            'name'               => 'Episodes',
            'singular_name'      => 'Episode',
            'add_new_item'       => 'Add New Episode',
            'edit_item'          => 'Edit Episode',
            'new_item'           => 'New Episode',
            'view_item'          => 'View Episode',
            'search_items'       => 'Search Episodes',
            'not_found'          => 'No episodes found',
            'not_found_in_trash' => 'No episodes found in Trash',
        ],
        'public'              => true,
        'has_archive'         => true,
        'supports'            => [ 'title', 'editor', 'thumbnail', 'excerpt' ],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'episode',
        'graphql_plural_name' => 'episodes',
        'menu_icon'           => 'dashicons-microphone',
        'rewrite'             => [ 'slug' => 'episodes' ],
        'menu_position'       => 5,
    ] );

    // Team Members
    register_post_type( 'team_member', [
        'labels'              => [
            'name'               => 'Team Members',
            'singular_name'      => 'Team Member',
            'add_new_item'       => 'Add New Team Member',
            'edit_item'          => 'Edit Team Member',
        ],
        'public'              => true,
        'supports'            => [ 'title', 'editor', 'thumbnail' ],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'teamMember',
        'graphql_plural_name' => 'teamMembers',
        'menu_icon'           => 'dashicons-groups',
        'rewrite'             => [ 'slug' => 'team' ],
        'menu_position'       => 6,
    ] );
}

// ── Register Meta Fields ──────────────────────────────────────────────────────

add_action( 'init', 'bigbark_register_meta' );

function bigbark_register_meta() {

    // Episode fields
    register_post_meta( 'episode', 'episode_number', [
        'type'         => 'integer',
        'description'  => 'Episode number',
        'single'       => true,
        'show_in_rest' => true,
    ] );
    register_post_meta( 'episode', 'spotify_embed_url', [
        'type'              => 'string',
        'description'       => 'Spotify episode URL (open.spotify.com/episode/...)',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'esc_url_raw',
    ] );
    register_post_meta( 'episode', 'duration', [
        'type'         => 'string',
        'description'  => 'Episode duration (e.g. 45:30)',
        'single'       => true,
        'show_in_rest' => true,
    ] );

    // Team member fields
    register_post_meta( 'team_member', 'role', [
        'type'         => 'string',
        'description'  => 'Team member role/title',
        'single'       => true,
        'show_in_rest' => true,
    ] );
    register_post_meta( 'team_member', 'is_active', [
        'type'         => 'boolean',
        'description'  => 'Whether this team member is currently active',
        'single'       => true,
        'show_in_rest' => true,
        'default'      => true,
    ] );
}

// ── Register WPGraphQL Fields ─────────────────────────────────────────────────
// Requires WPGraphQL plugin (free on wordpress.org)

add_action( 'graphql_register_types', 'bigbark_register_graphql_fields' );

function bigbark_register_graphql_fields() {

    if ( ! function_exists( 'register_graphql_field' ) ) {
        return;
    }

    // Episode fields
    register_graphql_field( 'Episode', 'episodeNumber', [
        'type'        => 'Int',
        'description' => 'Episode number',
        'resolve'     => fn( $post ) => (int) get_post_meta( $post->databaseId, 'episode_number', true ) ?: null,
    ] );

    register_graphql_field( 'Episode', 'spotifyEmbedUrl', [
        'type'        => 'String',
        'description' => 'Spotify episode URL',
        'resolve'     => fn( $post ) => get_post_meta( $post->databaseId, 'spotify_embed_url', true ) ?: null,
    ] );

    register_graphql_field( 'Episode', 'duration', [
        'type'        => 'String',
        'description' => 'Episode duration (e.g. 45:30)',
        'resolve'     => fn( $post ) => get_post_meta( $post->databaseId, 'duration', true ) ?: null,
    ] );

    // Team member fields
    register_graphql_field( 'TeamMember', 'role', [
        'type'        => 'String',
        'description' => 'Team member role/title',
        'resolve'     => fn( $post ) => get_post_meta( $post->databaseId, 'role', true ) ?: null,
    ] );

    register_graphql_field( 'TeamMember', 'isActive', [
        'type'        => 'Boolean',
        'description' => 'Whether this team member is currently active',
        'resolve'     => fn( $post ) => (bool) get_post_meta( $post->databaseId, 'is_active', true ),
    ] );
}

// ── Admin Meta Boxes ──────────────────────────────────────────────────────────

add_action( 'add_meta_boxes', 'bigbark_add_meta_boxes' );

function bigbark_add_meta_boxes() {
    add_meta_box(
        'bigbark_episode_fields',
        'Episode Details',
        'bigbark_episode_meta_box',
        'episode',
        'side',
        'high'
    );
    add_meta_box(
        'bigbark_team_fields',
        'Team Member Details',
        'bigbark_team_meta_box',
        'team_member',
        'side',
        'high'
    );
}

function bigbark_episode_meta_box( $post ) {
    wp_nonce_field( 'bigbark_episode_save', 'bigbark_episode_nonce' );
    $number  = get_post_meta( $post->ID, 'episode_number', true );
    $spotify = get_post_meta( $post->ID, 'spotify_embed_url', true );
    $dur     = get_post_meta( $post->ID, 'duration', true );
    ?>
    <p>
        <label for="episode_number"><strong>Episode Number</strong></label><br>
        <input type="number" id="episode_number" name="episode_number"
               value="<?php echo esc_attr( $number ); ?>" style="width:100%">
    </p>
    <p>
        <label for="spotify_embed_url"><strong>Spotify URL</strong></label><br>
        <input type="url" id="spotify_embed_url" name="spotify_embed_url"
               value="<?php echo esc_attr( $spotify ); ?>" style="width:100%"
               placeholder="https://open.spotify.com/episode/...">
    </p>
    <p>
        <label for="duration"><strong>Duration</strong></label><br>
        <input type="text" id="duration" name="duration"
               value="<?php echo esc_attr( $dur ); ?>" style="width:100%"
               placeholder="e.g. 45:30">
    </p>
    <?php
}

function bigbark_team_meta_box( $post ) {
    wp_nonce_field( 'bigbark_team_save', 'bigbark_team_nonce' );
    $role      = get_post_meta( $post->ID, 'role', true );
    $is_active = get_post_meta( $post->ID, 'is_active', true );
    if ( $is_active === '' ) {
        $is_active = '1'; // default active
    }
    ?>
    <p>
        <label for="role"><strong>Role / Title</strong></label><br>
        <input type="text" id="role" name="role"
               value="<?php echo esc_attr( $role ); ?>" style="width:100%"
               placeholder="e.g. Chief Pawprints Officer">
    </p>
    <p>
        <label>
            <input type="checkbox" name="is_active" value="1"
                <?php checked( $is_active, '1' ); ?>>
            Active team member
        </label><br>
        <small style="color:#666">Uncheck for memorial/legacy members.</small>
    </p>
    <?php
}

// ── Save Meta Box Data ────────────────────────────────────────────────────────

add_action( 'save_post_episode', 'bigbark_save_episode_meta' );

function bigbark_save_episode_meta( $post_id ) {
    if (
        ! isset( $_POST['bigbark_episode_nonce'] ) ||
        ! wp_verify_nonce( $_POST['bigbark_episode_nonce'], 'bigbark_episode_save' ) ||
        defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE
    ) {
        return;
    }

    update_post_meta( $post_id, 'episode_number', absint( $_POST['episode_number'] ?? 0 ) );
    update_post_meta( $post_id, 'spotify_embed_url', esc_url_raw( $_POST['spotify_embed_url'] ?? '' ) );
    update_post_meta( $post_id, 'duration', sanitize_text_field( $_POST['duration'] ?? '' ) );
}

add_action( 'save_post_team_member', 'bigbark_save_team_meta' );

function bigbark_save_team_meta( $post_id ) {
    if (
        ! isset( $_POST['bigbark_team_nonce'] ) ||
        ! wp_verify_nonce( $_POST['bigbark_team_nonce'], 'bigbark_team_save' ) ||
        defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE
    ) {
        return;
    }

    update_post_meta( $post_id, 'role', sanitize_text_field( $_POST['role'] ?? '' ) );
    update_post_meta( $post_id, 'is_active', isset( $_POST['is_active'] ) ? '1' : '0' );
}
