<?php

function custom_rest_api_endpoint_search_by_title_and_category($request) {
    // Get the search query parameter from the request.
    $search_query = $request->get_param('search');

    // Get the category parameter from the request and validate as an integer.
    $category_id = absint($request->get_param('category'));

    // Get the page parameter from the request. Default to 1 if not provided.
    $page = max(1, $request->get_param('page'));

    // Get the per_page parameter from the request. Default to 10 if not provided.
    $per_page = max(9, $request->get_param('per_page'));

    // Add a filter to modify the search query.
    add_filter('posts_search', 'custom_search_by_title_only', 500, 2);

    // Prepare the arguments for WP_Query.
    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        's' => $search_query,
        'cat' => $category_id,
        'paged' => $page,
        'posts_per_page' => $per_page,
    );

    $query = new WP_Query($args);

    // Remove the filter we added earlier so it doesn't affect other queries.
    remove_filter('posts_search', 'custom_search_by_title_only', 500);

    // Check if there are posts matching the search query.
    if ($query->have_posts()) {
        // Prepare an empty array to store the results.
        $results = array();

        foreach ($query->posts as $post) {
            // Get the post title, link, and other details for each post.
            $post_title = array('rendered' => get_the_title($post->ID));
            $post_link = get_the_permalink($post->ID);
            $post_date = $post->post_date;
            $featured_media = get_post_thumbnail_id($post->ID);
            $post_categories = wp_get_post_categories($post->ID);

            // Add the post details to the results array.
            $results[] = array(
                'id' => $post->ID,
                'date' => $post_date,
                'title' => $post_title,
                'featured_media' => $featured_media,
                'link' => $post_link,
                'categories' => $post_categories,
            );
        }

        // Return the results in JSON format.
        return rest_ensure_response($results);
    } else {
        // No posts found with the search query.
        return new WP_Error('no_results', 'No posts found with the provided search query.', array('status' => 404));
    }
}

// Custom function to modify the search query to only include post titles.
function custom_search_by_title_only($search, $wp_query) {
    if (!$wp_query->is_search()) {
        return $search;
    }

    global $wpdb;

    $search_term = $wp_query->get('s');

    $search = ' AND (' . $wpdb->posts . '.post_title LIKE \'%' . esc_sql($wpdb->esc_like($search_term)) . '%\')';

    return $search;
}

// Register the REST API endpoint with additional parameters.
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/search/', array(
        'methods' => 'GET',
        'callback' => 'custom_rest_api_endpoint_search_by_title_and_category',
    ));
});
