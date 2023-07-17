<?php
function resources_filter_shortcode($atts) {
    $button_text = isset($atts['currentTab']) ? $atts['currentTab'] : 'blog';

    // Get the asset manifest file
    $manifest_path = get_stylesheet_directory() . '/app/build/asset-manifest.json';
    $manifest = file_exists($manifest_path) ? json_decode(file_get_contents($manifest_path), true) : array();

    // Get the CSS and JS file paths from the manifest
    $css_file = isset($manifest['files']['main.css']) ? $manifest['files']['main.css'] : '';
    $js_file = isset($manifest['files']['main.js']) ? $manifest['files']['main.js'] : '';

    // Construct the child theme directory URI
    $child_theme_uri = get_stylesheet_directory_uri();

    // Enqueue CSS file
    if ($css_file) {
        wp_enqueue_style('resources-app-css', $child_theme_uri . '/app/build' . $css_file);
    }

    // Enqueue JS file
    if ($js_file) {
        wp_enqueue_script('resources-app-js', $child_theme_uri . '/app/build' . $js_file, array(), false, true);
    }

    $html = '<div id="resourcesAppRoot">#resourcesAppRoot</div>';

    return $html;
}

add_shortcode('resources-filters', 'resources_filter_shortcode');
