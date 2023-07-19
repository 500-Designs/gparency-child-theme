<?php

// Register REST API endpoint for 'events' post type
function gparency_get_events($request) {
    // Set a unique cache key based on the request parameters
    $cache_key = 'events_' . md5(serialize($request->get_params()));

    // Try to retrieve the cached response
    $cached_response = get_transient($cache_key);

    if ($cached_response !== false) {
        // If the response is cached, return it
        return $cached_response;
    }

    $args = array(
        'post_type'      => 'events',
        'posts_per_page' => -1,  // Retrieve all posts
    );

    // Get search parameter value
    $search = $request->get_param('search');
    if ($search) {
        $args['s'] = $search; // Apply search parameter
    }

    // Get location parameter value
    $location = $request->get_param('location');
    if ($location) {
        $args['meta_query'][] = array(
            'key'     => 'event-location',
            'value'   => $location,
            'compare' => 'LIKE',
        );
    }

    // Get start-date and end-date parameters values
    $start_date = $request->get_param('start_date');
    $end_date   = $request->get_param('end_date');

    if ($start_date && $end_date) {
        $start_date = strtotime($start_date);
        $end_date = strtotime($end_date);

        $args['meta_query'][] = array(
            'key'     => 'start-date',
            'value'   => array(date('Y-m-d', $start_date), date('Y-m-d', $end_date)),
            'type'    => 'DATE',
            'compare' => 'BETWEEN',
        );
    } elseif ($start_date) {
        $start_date = strtotime($start_date);

        $args['meta_query'][] = array(
            'key'     => 'start-date',
            'value'   => date('Y-m-d', $start_date),
            'type'    => 'DATE',
            'compare' => '==',
        );
    } elseif ($end_date) {
        $end_date = strtotime($end_date);

        $args['meta_query'][] = array(
            'key'     => 'start-date',
            'value'   => date('Y-m-d', $end_date),
            'type'    => 'DATE',
            'compare' => '==',
        );
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

    // Calculate the total number of pages
    $total_pages = ceil($query->found_posts / $args['posts_per_page']);

    // Set the 'X-WP-TotalPages' header
    header('X-WP-TotalPages: ' . $total_pages);

    $response = new WP_REST_Response($data, 200);

    // Cache the response for 1 hour (you can adjust the duration as needed)
    set_transient($cache_key, $response, 15 * 60);

    // Return the response
    return $response;
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
