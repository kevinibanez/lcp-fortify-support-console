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
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

//
//Validate form client side
//
function ValidateClientForm(elId, frmButton) {
    //// set defaults
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
function CheckNewValue(elId, previous, current) {
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

