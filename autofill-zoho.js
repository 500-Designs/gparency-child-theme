jQuery(document).ready(function ($) {
    console.log("init autofill zoho.asdasdd..");

    var emailInput = document.getElementById("emailInput");
    var submitButton = document.getElementById("submitButton");
    var modal = document.getElementById("autoFillZohoPopUp");
    var closeButton = document.getElementsByClassName("close")[0];
    var loadingIndicator = document.getElementById("loadingIndicator");

    emailInput.addEventListener("input", function () {
        if (emailInput.checkValidity()) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    });

    submitButton.addEventListener("click", function () {
        if (emailInput.checkValidity()) {
            modal.style.display = "block";
            showForm();
        }
    });

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    function showForm() {
        var email = document.getElementById("emailInput").value;
        var formContainer = document.getElementById("formContainer");
        $('#autoFillZohoPopUp h2').hide();
        formContainer.innerHTML = "";
        loadingIndicator.style.display = "block";

        var f = document.createElement("iframe");
        f.src =
            "https://forms.zohopublic.com/gparency/form/EquityForm/formperma/xbxkHBVsM7UMBFajIiPu2AVmDvojMYZUPAQlsNr0Vkc?zf_rszfm=1&Email=" +
            encodeURIComponent(email);
        f.style.border = "none";
        f.style.height = "858px";
        f.style.width = "100%";

        f.onload = function () {
            loadingIndicator.style.display = "none";
            $('#autoFillZohoPopUp h2').show();
        };

        formContainer.appendChild(f);
    }

});

