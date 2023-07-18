<?php

// Register REST API endpoint for 'events' post type
function gparency_get_events($request) {
    $args = array(
        'post_type'      => 'events',
        'posts_per_page' => -1,  // Retrieve all posts
    );

    $posts = get_posts($args);
    $data  = array();

    foreach ($posts as $post) {
        $post_data   = array(
            'id'      => $post->ID,
            'title'   => $post->post_title,
            'content' => $post->post_content,
        );

        // Get meta_field values
        $meta_values = get_post_meta($post->ID);

        // Add meta_field values to the post data
        foreach ($meta_values as $meta_key => $meta_value) {
            $post_data[$meta_key] = $meta_value[0];
        }

        $data[] = $post_data;
    }

    return new WP_REST_Response($data, 200);
}

add_action(
    'rest_api_init',
    function () {
        register_rest_route(
            'jetengine/v1',
            '/events',
            array(
                'methods'  => 'GET',
                'callback' => 'gparency_get_events',
            )
        );
    }
);
