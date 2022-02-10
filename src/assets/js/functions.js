$(document).ready(function () {
    //initialize tooltip
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });

    //
    // Check Profile > Password open information minlength only
    //
    $('#Phone', '#PhoneNumber').on('keyup', function () {
        $.debounce(400, flagPhoneMinLength());
    });


     //Validate profile form
    $('#Profile').validate({
        rules: {
            Firstname: {
                required: true,
            },
            Lastname: {
                required: true,
            },
            Email: {
                required: true,
            },
            Country: {
                valueNotEquals: "default"
            },
            PhoneNumber: {
                required: true,
                minlength : '10'
            },
            PIN: {
                required: true,
            }
        },
        //validation error messages
        messages: {
            Firstname: {
                required: '',
            },
            Lastname: {
                required: '',
            },
            Email: {
                required: '',
            },
            PhoneNumber: {
                required: '',
            },
            PIN: {
                required: '',
            }
        },
        success: function (error) {
            error.remove();
        }
    });

    //Validate ForgotPassword form
    $('#ForgotPassword').validate({
        rules: {
            Email: {
                required: true,
            },
            Pin: {
                require_from_group: [1, ".pin-2fakey"]
            },
            MFACode: {
                require_from_group: [1, ".pin-2fakey"]
            }
        },
        //validation error messages
        messages: {
            Email: {
                required: '',
            },
            Pin: {
                require_from_group: '<center>Please fill at least 1 of these fields.</center>',
            },
            MFACode: {
                require_from_group: '',
            }
        },
        success: function (error) {
            error.remove();
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "Pin")
                error.insertAfter(".error-message");
            else if (element.attr("name") == "MFACode")
                error.insertAfter(".error-message");
            else
                error.insertAfter(element);
        }
    });


    //client side checks on Document Ready
    ValidateClientForm("#Profile", "#SaveProfileButton");
    ValidateClientForm("#ForgotPassword", "#ForgotPasswordButton");
});

//Tacking changes with modal window
var formChanged = false;

// Variables used to maintain the redirect url when user clicks on "Leave this page" option in Modal div.
var setRedirectUrl = "/";
var redirectPageReference = "";
var redirectPageReferenceUrl = "";

//Get current url
var currentURL = window.location.href;

//Disable Cancel button by default
$("#Cancel").prop('disabled', 'disabled').css('opacity', 0.5);



//
// Track ALL THINGS HERE.
//
//Tracking changes in Profile page
TrackChanges('#Profile', 'change keyup paste', ':input');

//Tracking changes in Update Password page
TrackChanges('#UpdatePassword', 'change keyup paste', ':input');

//Tracking EnableAuthenticator page
TrackChanges('#EnableAuthenticator', 'change keyup paste', ':input');











// Track when user clicks from the left navigation and set the proper redirect url
SetPageURL('#ManageNav li a');

// Track when user clicks from the dropdown and set the proper redirect url
SetPageURL('#logoutFormUpper a');
SetPageURL('#StaffMenu a');

//Function to track changes for input fields
function TrackChanges(elementID, event, input) {
    //Tracking changes in Profile pages
    $(elementID).on(event, input, function (e) {
        var keycode = e.which;
        if (e.type === 'paste' || e.type === 'change' || (
            (keycode === 46 || keycode === 8) || // delete & backspace
            (keycode > 47 && keycode < 58) || // number keys
            keycode == 32 || keycode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
            (keycode > 64 && keycode < 91) || // letter keys
            (keycode > 95 && keycode < 112) || // numpad keys
            (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
            (keycode > 218 && keycode < 223))) { // [\]' (in order))

            //formChanged = true;

            //enable Cancel button during keystrokes
            $("#Cancel").prop('disabled', false).css('opacity', '');
        }

        //validate on previous and current value
        CheckNewValue("#Cancel", (this).defaultValue, $(this).val());
        CheckNewValue("#SaveProfileButton", (this).defaultValue, $(this).val());
        CheckNewValue("#next", (this).defaultValue, $(this).val());

    });
}

//
// END -- Track ALL Changes Here.
//

$("#PhoneExt").keydown($(this).val(''));
//When leave the page button is clicked then set the proper redirect
$('#Leave').on('click', function (ev) {
    ev.preventDefault();
    if (redirectPageReference == "" && redirectPageReferenceUrl == "") {
        window.location.href = setRedirectUrl;
    }
    else {
        window.location.href = redirectPageReferenceUrl;
    }
});
//Check when Cancel button is clicked
$('#Cancel').on('click', function () {
    //ev.preventDefault(); 
    window.location.reload();
});

//
//limit number of digits for phone
//
$("#PhoneExt").keypress(MaxLength);
$("#PhoneNumber").keypress(MaxLength);
$("#Phone").keypress(MaxLength);
function MaxLength(e) {
    var input = $(this).val();
    var maxLength = $(this).data('maxlength');
    if (input.length >= maxLength) {
        return false;
    }
    //only numbers allowed
    var key = window.event ? e.keyCode : e.which;
    if ((key >= 48 && key <= 57) || key == 8 || key == 0) {
        return true;
    }
    else {
        return false;
    }
}
function flagPhoneMinLength() {
    var phoneNumber = $('#Phone') ? $('#Phone') : $('#PhoneNumber');
    console.log(phoneNumber);
    var label = $('#phoneMin');
    if (!phoneNumber.valid()) {
        label.addClass('show');
    } else {
        label.removeClass('show');
    }
}


//
//Set page url and modal
// !IMPORTANT -- submenu at change_wo_redirect file.
function SetPageURL(parentElement) {
    var pages = [
        { name: "profile", url: "/main/manage/index" },
        { name: "password", url: "/main/manage/ChangePassword" },
        { name: "external logins", url: "/main/manage/ExternalLogins" },
        { name: "two-factor authentication", url: "/main/manage/TwoFactorAuthentication" },
        { name: "configure authenticator app", url: "/main/manage/EnableAuthenticator" },
        { name: "grants", url: "/default/grants" },
        { name: "diagnostics", url: "/default/diagnostics" },
        { name: "Support - User Mgr", url: "/support/usermanager/Index" },
        { name: "Client - Manager", url: "/dev/client/index" }
    ];

    $(parentElement).click(function () {
        //get anchor ref
        var href = this.href;
        //console.log(href);
        var anchorName = $(this).text().toLowerCase().trim();
        var arrPageName = "";

        for (let value of Object.values(pages)) {
  
            arrPageName = value.name.toLowerCase().trim();

            if (anchorName == arrPageName) {
                redirectPageReferenceUrl = value.url;
                break;
            }
        };

        if (currentURL == href || currentURL.includes(redirectPageReferenceUrl)) {
            return false;
        };

        if (formChanged == true) {
            $("#modalWindow").modal("show");
            return false;
        }
    });
}

//
//Validate form client side
function ValidateClientForm(elId, frmButton) {
    //set defaults
    $(frmButton).prop('disabled', 'disabled').css('opacity', 0.5);

    $(elId + ' input').on('keyup blur', function () {

        if (this.type == 'text' || this.type == 'textarea' || this.type == 'password' || this.type == 'email' || this.type == 'tel') {
            if ($(elId).valid()) {
                $(frmButton).prop('disabled', false).css('opacity', '');
            } else {
                $(frmButton).prop('disabled', 'disabled').css('opacity', 0.5);
            }
        }
    });
}

//
//Check current and default input value
function CheckNewValue (elId, previous, current) {
    if (previous == current) {
        $(elId).prop('disabled', 'disabled').css('opacity', 0.5);
        formChanged = false;
        return true;
    } else {
        $(elId).prop('disabled', false).css('opacity', '');
        formChanged = true;
        return false;
    }
}





