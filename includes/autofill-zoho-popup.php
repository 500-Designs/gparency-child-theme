<?php

function enqueue_autofill_zoho_assets() {
    $shortcode_exists = false;

    // Check if shortcode exists in post content
    if (has_shortcode(get_post()->post_content, 'autofill-zoho-popup')) {
        $shortcode_exists = true;
    }

    // Check if current page is an archive page and Elementor is active
    if (is_archive() && class_exists('Elementor\Plugin')) {
        $elementor = Elementor\Plugin::instance();
        $shortcode_exists = true;
    }

    if ($shortcode_exists) {
        wp_enqueue_style(
            'autofill-zoho-styles',
            get_stylesheet_directory_uri() . '/autofill-zoho.css'
        );

        // Enqueue the script with a higher priority
        add_action('wp_enqueue_scripts', 'enqueue_autofill_zoho_script', 9999);
    }
}
add_action('wp_enqueue_scripts', 'enqueue_autofill_zoho_assets');



function enqueue_autofill_zoho_script() {
    wp_enqueue_script(
        'autofill-zoho-script',
        get_stylesheet_directory_uri() . '/autofill-zoho.js',
        array('jquery'),
        '1.0',
        true
    );
}

function autofill_zoho_popup_shortcode($atts) {
    // Extract the 'button' parameter
    $button_text = isset($atts['button']) ? $atts['button'] : 'Get Started';

    // Render the HTML for the shortcode
    $html = '<form id="autoFillZohoEmailForm">
                <label for="emailInput" style="display: none";>Email:</label>
                <input type="email" id="emailInput" name="email" required placeholder="Enter your email">
                <button type="submit" id="submitButton">' . esc_html($button_text) . '</button>
            </form>
            ';

    // pop-up code
    $html .= '
        <div id="autoFillZohoPopUp" class="modal">
            <div class="modal-content">
                <span class="close"></span>
                <div id="loadingIndicator" class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                
                <h2>Become LP Investors</h2>
                <div id="formContainer">
                </div>
            </div>
        </div>';


    return $html;
}

add_shortcode('autofill-zoho-popup', 'autofill_zoho_popup_shortcode');
