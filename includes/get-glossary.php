<?php

// Register REST API endpoint for 'glossary' post type
function gparency_get_glossary($request) {
    // Set a unique cache key based on the request parameters
    $cache_key = 'glossary_' . md5(serialize($request->get_params()));

    // Try to retrieve the cached response
    $cached_response = get_transient($cache_key);

    if ($cached_response !== false) {
        // If the response is cached, return it
        return $cached_response;
    }

    $args = array(
        'post_type'      => 'glossary',
        'orderby'        => 'title',
        'posts_per_page' => -1,  // Retrieve all posts
        'order'          => 'ASC'
    );

    // Get search parameter value
    $search = $request->get_param('search');
    if ($search) {
        $args['s'] = $search; // Apply search parameter
    }

    // Get per_page parameter value
    $per_page = $request->get_param('per_page');
    if ($per_page && is_numeric($per_page)) {
        $args['posts_per_page'] = intval($per_page); // Set the desired number of posts per page
    } else {
        $args['posts_per_page'] = -1; // Set a default number of posts per page if per_page is not provided or is invalid
    }

    // Get page parameter value
    $page = $request->get_param('page');
    if ($page && is_numeric($page)) {
        $args['paged'] = intval($page); // Set the desired page number
    } else {
        $args['paged'] = 1; // Set the default page number to 1 if page is not provided or is invalid
    }

    // Perform the query
    $query = new WP_Query($args);
    $posts = $query->get_posts();
    $data  = array();
    $letters = array(); // Array to store first letters

    // Check if the "starts_with_letter" parameter is set
    $starts_with_letter = $request->get_param('starts_with_letter');
    if ($starts_with_letter && is_numeric($starts_with_letter)) {
        // Get first letters only
        foreach ($posts as $post) {
            // Get the first letter from the title and add it to the array
            $first_letter = substr($post->post_title, 0, 1);
            if (!in_array($first_letter, $letters)) {
                $letters[] = $first_letter;
            }
        }
        $response = new WP_REST_Response($letters, 200);
    } elseif ($starts_with_letter) {
        // Get posts starting with a certain letter
        foreach ($posts as $post) {
            $first_letter = substr($post->post_title, 0, 1);
            if (strtolower($first_letter) === strtolower($starts_with_letter)) {
                $post_data = array(
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
        }
        $response = new WP_REST_Response($data, 200);
    } else {
        foreach ($posts as $post) {
            $post_data = array(
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
        $response = new WP_REST_Response($data, 200);
    }

    // Calculate the total number of pages
    $total_pages = ceil($query->found_posts / $args['posts_per_page']);

    // Set the 'X-WP-TotalPages' header
    $response->header('X-WP-TotalPages', $total_pages);

    // Cache the response for 1 hour (you can adjust the duration as needed)
    set_transient($cache_key, $response, 60 * 60);

    // Return the response
    return $response;
}

add_action(
    'rest_api_init',
    function () {
        register_rest_route(
            'jetengine/v1',
            '/glossary',
            array(
                'methods'  => 'GET',
                'callback' => 'gparency_get_glossary',
            )
        );
    }
);
