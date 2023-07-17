<?php

// Register the custom REST endpoint
add_action('rest_api_init', 'register_reading_time_endpoint');
function register_reading_time_endpoint() {
    register_rest_route('reading-time/v1', '/(?P<post_id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_reading_time',
    ));
}

// Callback function to retrieve reading time
function get_reading_time($request) {
    $post_id = $request['post_id'];
    
    // Execute the "Reading Time WP" shortcode
    $shortcode = '[rt_reading_time postfix="minute read" postfix_singular="minute" post_id="' . $post_id . '"]';
    $reading_time = do_shortcode($shortcode);
    
    // Prepare the response
    $response = array(
        'post_id' => $post_id,
        'reading_time' => $reading_time,
    );
    
    // Return the response in JSON format
    return rest_ensure_response($response);
}
