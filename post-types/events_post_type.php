
<?php

function create_event_post_type() {
    $args = array(
        'public' => true,
        'label'  => 'Events',
        'supports' => array('title', 'editor')
    );
    register_post_type('event', $args);
}
add_action('init', 'create_event_post_type');

function events_custom_box() {
    add_meta_box(
        'events_box_id',           
        'Event Details',          
        'events_custom_box_html', 
        'event'                    
    );
}
add_action('add_meta_boxes', 'events_custom_box');

function events_custom_box_html($post) {
    wp_nonce_field(basename(__FILE__), "meta-box-nonce");
    $start_date = get_post_meta($post->ID, '_start_date', true);
    $end_date = get_post_meta($post->ID, '_end_date', true);
    $location = get_post_meta($post->ID, '_location', true);
    ?>
    <label for="start_date">Start Date:</label>
    <input type="date" id="start_date" name="start_date" value="<?= $start_date ?>">

    <label for="end_date">End Date:</label>
    <input type="date" id="end_date" name="end_date" value="<?= $end_date ?>">

    <label for="location">Location:</label>
    <input type="text" id="location" name="location" value="<?= $location ?>">
    <?php
}

function save_event_meta($post_id) {
    if (!isset($_POST["meta-box-nonce"]) || !wp_verify_nonce($_POST["meta-box-nonce"], basename(__FILE__))) {
        return $post_id;
    }

    if(!current_user_can('edit_post', $post_id)) {
        return $post_id;
    }

    if(defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    if (array_key_exists('start_date', $_POST)) {
        update_post_meta(
            $post_id,
            '_start_date',
            $_POST['start_date']
        );
    }

    if (array_key_exists('end_date', $_POST)) {
        update_post_meta(
            $post_id,
            '_end_date',
            $_POST['end_date']
        );
    }

    if (array_key_exists('location', $_POST)) {
        update_post_meta(
            $post_id,
            '_location',
            $_POST['location']
        );
    }
}
add_action('save_post', 'save_event_meta');
