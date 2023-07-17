<?php

/**
 * Custom WP REST API endpoint to retrieve the ID of the first image in a post.
 */
function get_first_image_endpoint() {
    register_rest_route('get-first-image/v1', '/(?P<post_id>\d+)', array(
        'methods'  => 'GET',
        'callback' => 'get_first_image_callback',
    ));
}
add_action('rest_api_init', 'get_first_image_endpoint');

/**
 * Callback function for the custom REST API endpoint.
 *
 * @param WP_REST_Request $request The REST API request object.
 * @return WP_REST_Response The REST API response.
 */
function get_first_image_callback($request) {
    $post_id = $request->get_param('post_id');

    if (empty($post_id)) {
        return new WP_REST_Response(array('error' => 'Invalid post ID'), 400);
    }

    $post = get_post($post_id);

    if (!$post) {
        return new WP_REST_Response(array('error' => 'Post not found'), 404);
    }

    $first_image_id = false;

    // Find the first image attachment in the post content.
    $pattern = '/<img[^>]+src=[\'"]([^\'"]+)[\'"][^>]*>/';
    preg_match($pattern, $post->post_content, $matches);

    if (isset($matches[1])) {
        $image_url = $matches[1];
        $attachment = get_page_by_path(basename($image_url), OBJECT, 'attachment');
        if ($attachment) {
            $first_image_id = $attachment->ID;
        }
    }

    return new WP_REST_Response($first_image_id);
}
