<?php

function enqueue_autofill_zoho_assets() {
    if (has_shortcode(get_post()->post_content, 'autofill-zoho-popup')) {
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

function autofill_zoho_popup_shortcode() {
    // Render the HTML for the shortcode
    $html = '<div id="autoFillZohoEmailForm">';
    $html .= '<input type="email" id="emailInput" name="email" placeholder="Enter your email" required>';
    $html .= '<button id="submitButton" disabled>Get Started</button>';
    $html .= '</div>';

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
