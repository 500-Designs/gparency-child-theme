<?php

// Register REST API endpoint for 'people' post type
function gparency_get_people( $request ) {
    $args = array(
        'post_type' => 'people',
        'posts_per_page' => -1,  // Retrieve all posts
    );

    $posts = get_posts( $args );
    $data = array();

    foreach( $posts as $post ) {
        $post_data = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => $post->post_content,
        );

        $data[] = $post_data;
    }

    return new WP_REST_Response( $data, 200 );
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'gparency/v1', '/people', array(
        'methods' => 'GET',
        'callback' => 'gparency_get_people',
    ));
});

// Register REST API endpoint for single 'people' post
function gparency_get_single_people( $request ) {
    // Get the id from the request
    $id = $request['id'];

    $post = get_post( $id );

    if( $post ) {
        // Get all meta fields for this post
        $meta_fields = get_post_meta( $post->ID );

        // Get the URLs of all sizes of the featured image
        $featured_image_sizes = array();
        foreach ( get_intermediate_image_sizes() as $size_name ) {
            $featured_image_sizes[$size_name] = get_the_post_thumbnail_url( $post->ID, $size_name );
        }

        $post_data = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => $post->post_content,
            'meta_fields' => $meta_fields,
            'featured_images' => $featured_image_sizes,
        );

        return new WP_REST_Response( $post_data, 200 );
    } else {
        return new WP_Error( 'no_post', 'No post found with ID: ' . $id, array( 'status' => 404 ) );
    }
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'gparency/v1', '/people/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'gparency_get_single_people',
    ));
});