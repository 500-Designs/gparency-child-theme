<?php

// Register a custom REST API endpoint
function custom_get_first_image_endpoint() {
    register_rest_route('custom/v1', '/first-image/(?P<id>\d+)', array(
        'methods'  => 'GET',
        'callback' => 'custom_get_first_image',
    ));
}
add_action('rest_api_init', 'custom_get_first_image_endpoint');

// Callback function to retrieve the first image of a post
// Callback function to retrieve the ID of the first image of a post
function custom_get_first_image($request) {
    $post_id = $request->get_param('id'); // Get the post ID

    // Check if the post ID is valid
    if (empty($post_id) || !is_numeric($post_id)) {
        return new WP_Error('invalid_post_id', 'Invalid post ID.', array('status' => 400));
    }

    // Get the post content
    $content = get_post_field('post_content', $post_id);

    // Find the first image in the post content
    preg_match('/<img.+wp-image-(\d+)[^>]*>/i', $content, $matches);

    if (!empty($matches)) {
        $image_id = $matches[1]; // Get the ID of the first image

        // Return the image ID
        return array(
            'image_id' => $image_id,
        );
    } else {
        // No image found
        return array(
            'message' => 'No image found.',
        );
    }
}