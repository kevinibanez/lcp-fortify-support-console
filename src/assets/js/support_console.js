//
// Local Variables to Use in the methods.
//
var debounce, listCurrent, listTotal;
var tag, element, historyEl, orgEl;
var storage, nextPage, prevPage, currentPage, totalPages;
//
// for api call.
var countNumber = 50;
var skipNumber = 0;
var sortString = 'UserName';
var historyNumber = 5;
var searchString = '';
// ---------------------------------------------------------------------------
// -----------------------   API Calls   -------------------------------------
// ---------------------------------------------------------------------------
//
// Call the Endpoint
$(document).ready(function () {
    //
    // Configure Previous Settings.
    fetchSupportSettings();
    //
    $("#perPage").on('change', function (e) {
        //console.log((this.value));
        countNumber = this.value;
        skipNumber = 0;
        $("#perPage").val(this.value);
        updateSupportSettings('count', this.value);
        if (searchString.length) {
            console.log(countNumber, skipNumber, sortString, historyNumber, searchString);
            callSupportAPI(countNumber, skipNumber, sortString, historyNumber, searchString);
        }
    });
    $('#pageTo').on('change', function (e) { goToUsersPage(this.value); });
    $('#goStart').on('click', function (e) { goToUsersStart(); });
    $("#goPrev1, #goPrev2").on('click', function (e) { goToUsersPrev(); });
    $("#goNext1, #goNext2").on('click', function (e) { goToUsersNext(); });
    $('#goEnd').on('click', function (e) { goToUsersEnd(); });
    $('#SearchKey').on('keyup', function (e) {
        clearTimeout(debounce);
        debounce = setTimeout(function () {
            searchString = $('#SearchKey').val();
            console.log(searchString);
            if (searchString.length < 4) {
                if (!$('#loading_search').hasClass('hide')) { $('#loading_search').addClass('hide'); }
                openSnackBar('🔍 4 characters to search');
            }
            else {
                console.log('callSupportAPI(', countNumber, skipNumber, sortString, historyNumber, searchString, ')');
                callSupportAPI(countNumber, skipNumber, sortString, historyNumber, searchString);
            }
        }, 1000);
    });
});
function callSupportAPI(count, skip, sortBy, history, search) {
    useSearchValues();
    fetch('../../support/usermanager/GetFilteredUsersForSupportAsync/' + count + '/' + skip + '/' + sortBy + '/' + history + '/' + search,
        {
            method: 'GET',
        })
        .then(response => response.json()) 
        .then(data => {
            console.log(JSON.stringify(data));
            listCurrent = data.Users;
            listTotal = data.Count ? data.Count : 0;
            updatePagiPages();
            showResultsCount();
            if (listCurrent.length > 0) {
                displayUsers(listCurrent);
            } else {
                
            }
        })
        .catch(function (error) {
            hideResults();
            openSnackBar('🛑 ERROR - No Users Returned');
            console.log('--------------- CATCH callSupportAPI() ----------------');
            console.log(error);
            console.log('--------------------------------------');
            console.log('--------------------------------------');
        })
        ;
}
function reverifyEmail(index, userName) {
    fetch('../../support/usermanager/confirmemail/user/' + userName, { method: 'POST',})
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data));
        if (data.result && data.result == 'Sent') {
            openSnackBar('📧 Email Notification Sent');
            $('#confirm-email_' + index).attr('disabled', true).css('opacity', 1.0);
            $('#confirm-email_' + index).html('<b class="accent"><i class="fa fa-check" aria-hidden="true"></i> Confirmation Email Sent</b> ');
        } else {
            openSnackBar('❌ Email Not Sent. Reverify and try again');
        }
    })
    .catch(function (error) {
        openSnackBar('Did NOT resend email confirmation... 🤔');
        console.log('--------------- CATCH reverifyEmail() ----------------');
        console.log(error);
        console.log('--------------------------------------');
        console.log('--------------------------------------');
    })
    ;
};
function passwordReset(index, userName) {
    fetch('../../support/usermanager/resetpassword/user/' + userName, { method: 'POST', })
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data));
        if (data && data == true) {  // success
            openSnackBar('📧 Password Reset Sent');
            $('#reset-password_' + index).attr('disabled', true).css('opacity', 1.0);
            $('#reset-password_' + index).html('<b class="accent"><i class="fa fa-check" aria-hidden="true"></i> Password Email Sent</b> ');
        } else {
            openSnackBar('❌ Password Email Not Sent. Reverify and try again');
        }
    })
    .catch(function (error) {
        openSnackBar('Did NOT resend password email... 🤔');
        console.log('--------------- CATCH passwordReset() ----------------');
        console.log(error);
        console.log('--------------------------------------');
        console.log('--------------------------------------');
    })
    ;
};
function twoFARecovery(index, id) {
    fetch('../../support/usermanager/getrecoverycode/key/' + id, { method: 'GET'})
    .then(response => response.text())
    .then(data => {
        console.log(data);
        //
        // Show the workflow that the message has been reset by populating the button.
        $('#twoFA-recovery_' + index).attr('disabled', true).css('opacity', 1.0);
        $('#twoFA-recovery_' + index).html('<b class="primary"><i class="fa fa-key" aria-hidden="true"></i> ' + data + '</b> ');
    })
    .catch(function (error) {
        openSnackBar('Did NOT Return 2FA key 🤔');
        console.log('--------------- CATCH twoFARecovery() ----------------');
        console.log(error);
        console.log('--------------------------------------');
        console.log('--------------------------------------');
    })
    ;
}
function enableAcct(index, userName) {
    openSnackBar('🚧 Under Developement. We are working 🌞 and 🌙');

    //
    // CREATE a new fetch to grab the id OR userName to unlock the account.
    //

    //openSnackBar('Account has now been Unlocked. Verify with ' + userName + ' they can access the system.');
    console.log(index, userName);
}
// ---------------------------------------------------------------------------
// -----------------------   UX Experience   ---------------------------------
// ---------------------------------------------------------------------------
function openSnackBar(msg) {
    var snackbarContainer = document.querySelector('#toastie');
    var data = {
        message: msg,
        actionHandler: function (event) { console.log(event); closeSnackBar(); },
        actionText: 'OK',
        timeout: 4000,
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
function closeSnackBar() {
    var snackbarContainer = document.querySelector('#toastie');
    snackbarContainer.classList.remove('mdl-snackbar--active');
}
function useSearchValues() {
    //
    // Start the Loading Animation.
    $('#loading_search').removeClass('hide');
    //
    // Empty The Current List
    $('#usersList').html('');
}
function hideResults() {
    $('#userCounted').addClass('hide');
    $('#userActions').addClass('hide');
    $('#loading_search').addClass('hide');
    $('#pagination').addClass('hide');
}
function showResultsCount() {
    if (listCurrent.length > 0) {
        $('#userCounted').removeClass('hide');
        $('#userActions').removeClass('hide');
        $('#search-results-number').html(listTotal);
        $('#countTotal').html(listTotal);
        $('#pagination').removeClass('hide');
    } else {
        hideResults();
    }
}
function tuneIntoEverything() {
    $('.expand-action').on('click', function () {
        //
        // Find Index
        var $index = $(this).find('i').attr('id');
        $index = $index.substring(11);
        //
        // Check to See if Data has been populated already, if not fill data.
        if ($('#expand_' + $index).hasClass('populated')) { toggleDetails($index); }
        else { displayUserDetails($index, listCurrent[$index]); toggleDetails($index); }
    });
}
function tuneIntoDetails(index) {
    $('#confirm-email_' + index).on('click', function () {
        var userName = $(this).attr('data-user');
        console.log('confirm-email clicked : ' + userName);
        reverifyEmail(index, userName);
    });
    $('#twoFA-recovery_' + index).on('click', function () {
        var userId = $(this).attr('data-id');
        console.log('twoFA-recovery clicked : ' + index, userId);
        twoFARecovery(index, userId);
    });
    $('#reset-password_' + index).on('click', function () {
        var userName = $(this).attr('data-user');
        console.log('reset-password clicked : ' + userName);
        passwordReset(index, userName);
    });
    $('#unlock-account_' + index).on('click', function () {
        var userName = $(this).attr('data-user');
        console.log('unlock-account clicked : ' + userName);
        enableAcct(index, userName);
    });
}
function toggleDetails(index) {
    // console.log(index, event);
    let icon = document.getElementById('expandIcon_' + index);
    let content = document.getElementById('expand_' + index);
    if (content && icon.classList.contains('fa-angle-right')) {
        // let switchIcon = document.querySelectorAll('.fa-angle-down');
        let remove = document.querySelectorAll('.active');
        // console.log(remove);
        //
        // Remove any prexisting expansions.
        //[].forEach.call(switchIcon, function (el) {
        //    el.className = 'fa fa-angle-right';
        //});
        //[].forEach.call(remove, function (el) {
        //    el.classList.remove("active");
        //});
        content.classList.add('active');
        icon.className = 'fa fa-angle-down';

    } else {
        content.classList.remove('active');
        icon.className = 'fa fa-angle-right';
    }
}
function displayUsers(list) {
    tag = document.getElementById('usersList');
    //console.log(tag);
    for (i = 0; i < list.length; i++) {
        element = '<div class="expand-container"><div class="expand-heading">';
        element += '<a class="expand-action" tabindex="0" title="expand to see details"><i aria-hidden="true" class="fa fa-angle-right" id="expandIcon_' + i + '"></i></a>';
        element += '<div class="expand-context"><div class="expand-context-title"><span class="expand-context-title-label"></span><span class="expand-context-title-desc">';
        element += list[i].User.UserName + '</span></div ><div class="expand-context-info">';
        //
        // check for name : either first of last will do. 
        //
        if (list[i].User.FirstName != undefined || list[i].User.LastName != undefined) {
            element += '<span class="expand-context-info-label">Name: </span><span class="expand-context-info-desc">';
            element += list[i].User.FirstName != undefined ? list[i].User.FirstName + ' ' : '';
            element += list[i].User.LastName != undefined ? list[i].User.LastName + ' ' : '';
            element += ', </span>';
        }

        element += list[i].User.Email != undefined ? '<span class="expand-context-info-label">Email: </span><span class="expand-context-info-desc">' + list[i].User.Email + ', </span>' : '';
        element += list[i].User.PhoneNumber != undefined ? '<span class="expand-context-info-label">Phone: </span><span class="expand-context-info-desc">' + list[i].User.PhoneNumber + '</span>' : '';
        element += '</div><div class="expand-context-info">';
        element += list[i].User.EmailConfirmed == true ? '<span class="expand-context-booleans"><b class="accent"><span class="material-icons">email</span></b> Email Confirmed</span>' : '<a class="expand-context-booleans" title="Click Here to Resend Email Confirmation"><span class="material-icons warning">email</span> Email Not Confirmed</a>';
        element += list[i].User.TwoFactorEnabled == true ? '<span class="expand-context-booleans"><b class="light-primary"><span class="material-icons">vpn_key</span></b> Two Factor Enabled </span>' : '<span class="expand-context-booleans divider"><span class="material-icons">vpn_key</span> Two Factor Disabled </span>';
        element += list[i].User.LockoutEnabled == true ? '<a class="expand-context-booleans" title="Locked Out"><span class="material-icons danger">app_blocking</span > Locked Out</a>' : '<span class="expand-context-booleans divider" tabindex="0" title="Account Enabled"><span class="material-icons">app_blocking</span > Account Enabled</span>';
        element += '</div >';
        element += '</div ></div ><div id="expand_' + i + '" class="horizontal-expand"></div></div >';
        $('#usersList').append(element);
    }
    tuneIntoEverything();
    setTimeout(function () { $('#loading_search').addClass('hide'); }, 600);
}
function displayUserDetails(index, item) {
    element = '<div class="row"><div class="col-12 col-md-6 col-lg-3"><h5>User</h5>';
    element += item.User.UserName != undefined ? '<div class="expand-list">Username: <b>' + item.User.UserName + '</b></div>' : '<div class="expand-list">Username: <b></b></div>';
    element += item.User.prefix != undefined ? '<div class="expand-list">Prefix: <b>' + item.User.prefix + '</b></div>' : '<div class="expand-list">Prefix: <b></b></div>';
    element += item.User.FirstName != undefined ? '<div class="expand-list">First Name: <b>' + item.User.FirstName + '</b></div>' : '<div class="expand-list">First Name:</div>';
    element += item.User.LastName != undefined ? '<div class="expand-list">Last Name: <b>' + item.User.LastName + '</b></div>' : '<div class="expand-list">Last Name: <b></b></div>';
    element += item.User.suffix != undefined ? '<div class="expand-list">Suffix: <b>' + item.User.suffix + '</b></div>' : '<div class="expand-list">Suffix: <b></b></div>';
    element += item.User.Email != undefined ? '<div class="expand-list">Email: <b>' + item.User.Email + '</b></div>' : '<div class="expand-list">Email: <b></b></div>';
    element += item.User.PhoneNumber != undefined ? '<div class="expand-list">Phone Number: <b>' + item.User.PhoneNumber + '</b></div>' : '<div class="expand-list">Phone Number: <b></b></div>';
    element += item.User.PhoneExtension != undefined ? '<div class="expand-list">Phone Extension: <b>' + item.User.PhoneExtension + '</b></div>' : '<div class="expand-list">Phone Extension: <b></b></div>';
    element += item.User.CompanyName != undefined ? '<div class="expand-list">Company Name: <b>' + item.User.CompanyName + '</b></div>' : '<div class="expand-list">Company Name: <b></b></div>';
    element += item.User.PrimaryIdentifierNumber != undefined ? '<div class="expand-list">PIN: <b>' + item.User.PrimaryIdentifierNumber + '</b></div>' : '<div class="expand-list">Primary Identification Number: <b></b></div>';
    element += '</div>';
    element += '<div class="col-12 col-md-6 col-lg-3"><h5>Login History</h5>';
    element += displayHistory(item);
    element += '</div>';   
    element += '<div class="col-12 col-md-6 col-lg-3"><h5>Organizations</h5>';
    element += displayOrgs(item);     
    element += '</div>';  
    element += '<div class="col-12 col-md-6 col-lg-3"><h5>Actions</h5>';
    element += item.User.LockoutEnabled == true ? '<button id="unlock-account_' + index + '" class="btn btn-block btn-outline-info margin-5-0" data-user="' + item.User.UserName + '"><b class="accent"><i class="fa fa-unlock-alt" aria-hidden="true"></i></b> Unlock Account </button>' : '';
    element += item.User.EmailConfirmed != true ? '<button id="confirm-email_' + index + '" class="btn btn-block btn-outline-info margin-5-0" data-user="' + item.User.UserName + '"><b class="warning"><i class="fa fa-envelope" aria-hidden="true"></i></b> Resend Verification </button>' : '';
    //element += '<button id="confirm-email_' + index + '" class="btn btn-block btn-outline-info margin-5-0" data-user="' + item.User.UserName + '"><b class="warning"><i class="fa fa-envelope" aria-hidden="true"></i></b> Resend Verification </button>';   // To allow Everyone to True to check.
    element += item.User.TwoFactorEnabled == true ? '<button id="twoFA-recovery_' + index + '" class="btn btn-block btn-outline-info margin-5-0 " data-id="' + item.User.Id + '"><b class="primary"><i class="fa fa-key" aria-hidden="true"></i></b> 2FA Recovery</button>' : '';
    element += '<button id="reset-password_' + index + '" class="btn btn-block btn-outline-info margin-5-0" data-user="' + item.User.UserName + '"><b class="primary"><i class="fa fa-repeat" aria-hidden="true"></i></b> Reset Password</button>';
    element += '</div></div >';
    $('#expand_' + index).append(element);
    $('#expand_' + index).addClass('populated');
    tuneIntoDetails(index);
}
function displayOrgs(item) {
    //console.log('displayOrgs(item)' + JSON.stringify(item));
    orgEl = '';
    if (item.User.Orgs) {
        for (let org of item.User.Orgs) {
            orgEl += '<div class="expand-org">';
            switch (org.OrgStatus) {
                case 'active':
                    orgEl += '<span id="' + item.User.UserName + '_' + org.OrgCode + '_green" class="expand-org-status accent-back"><i class="fa fa-star" aria-hidden="true"></i></span>';
                    break;
                case 'Not started':
                    orgEl += '<span id="' + item.User.UserName + '_' + org.OrgCode + '_orange" class="expand-org-status orange-back"><i class="fa fa-star-half-o" aria-hidden="true"></i></span>';
                    break;
                case 'Expired':
                    orgEl += '<span id="' + item.User.UserName + '_' + org.OrgCode + '_grey" class="expand-org-status divider-back"><i class="fa fa-star-o" aria-hidden="true"></i></span>';
                    break;
                default:
                    orgEl += '<span id="' + item.User.UserName + '_' + org.OrgCode + '_blank" class="expand-org-status divider-back"><i class="fa" aria-hidden="true"></i></span>';
                    break;
            }
            orgEl += '<div class="expand-org-desc">';
            orgEl += '<div class="expand-org-name"><b>' + org.OrgName + '</b></div>';
            orgEl += '<div class="expand-org-code"> Code : <b>' + org.OrgCode + '</b></div>';
            orgEl += '</div></div>';
        }
    }
    return orgEl;
}
function displayHistory( ) {
    historyEl = '';
    if (item.User.Logins) {
        for (let hist of item.User.Logins) {
            historyEl += '<div class="login-history">';
            historyEl += hist.IsAuthenticated == true ? '<div class="login-history-status"><span class="material-icons accent">verified_user</span></div>' : '<div class="login-history-status"><span class="material-icons danger">lock</span></div>';
            historyEl += '<div class="login-history-datetime">';
            historyEl += redate(hist.Event);
            historyEl += hist.GatewayIPAddress ? '<div class="login-history-ip"> IP Address : <b>' + hist.GatewayIPAddress + '</b></div >' : '';
            historyEl += '</div >';
            historyEl += '</div >';
        } 
    }
    return historyEl;
}
function redate(dateTime) {
    let date = dateTime.substring(0,10);
    let time = dateTime.substring(11, 16);
    let ampm = parseInt(time.substring(0, 2));
    //console.log(ampm);
    if (ampm > 12) {
        let change = ampm - 12;
        time = time.replace(ampm.toString(), change.toString()) + ' pm';
    } else if (ampm < 1) {
        time = time.replace('00:', '12:') + ' am';
    } else {
        time = time.substring(1) + ' am';
    }
    let display = '<span class="login-history-date">' + date + ', </span><span class="login-history-time">' + time + '</span>';
    return display;
}
// ---------------------------------------------------------------------------
// -----------------------   Pagination   ------------------------------------
// ---------------------------------------------------------------------------
function defaultSupportSettings() {
    localStorage.removeItem('support-pagi');
    let data = {
        count: 50,
        skip: 0,
        sortString: 'UserName',
        historyNumber: 5,
        searchString: '',
        // currentPage: 0, // used for GoTo sections.
        // totalPages: 0, // based on usersPerPage and totalUsers.
        // fetchedUsers: 0, // based on api pulls. should we pull again?
        // totalUsers: 0, // total count.
        // usersPerPage: 0 // dropdown value.
    };
    localStorage.setItem('support-pagi', JSON.stringify(data));
}
function fetchSupportSettings() {
    let checkLocal = localStorage.getItem('support-pagi');
    if (checkLocal != null) {
        storage = JSON.parse(checkLocal);
        countNumber = storage.count;
        $("#perPage").val(countNumber);
    } else {
        defaultSupportSettings();
    }
}
function updateSupportSettings(type, value) {
    switch (type) {
        case 'count':
            let checkLocal = JSON.parse(localStorage.getItem('support-pagi'));
            if (checkLocal != null) {
                checkLocal.count = value;
                localStorage.removeItem('support-pagi');
            }
            localStorage.setItem('support-pagi', JSON.stringify(checkLocal));
            break;

        default:
            //
            // Saved for other variables to save.
            //
            break;
    }
}
function updatePagiPages() {
    //
    // Get Begin, Range, and Total (Pages).
    //
    let begin = parseInt(skipNumber) + 1;
    let range = parseInt(skipNumber) + parseInt(countNumber);
    totalPages = Math.ceil(parseInt(listTotal) / parseInt(countNumber));
    $('#search-results-number').html(listTotal);
    $('#countBegin').html(begin);
    if (range >= listTotal) { $('#countEnd').html(listTotal);
    } else { $('#countEnd').html(range); }

    //
    // Determine PageTo
    $('#pageTo').prop('disabled', false);
    let goToPage = parseInt(listTotal) - parseInt(countNumber);
    console.log(goToPage);
    if (goToPage >= 0) { // determines more than one page.
        $('#pageTo').html('');        
        console.log(totalPages);
        for (i = 0; i < totalPages; i++) {
            let option = '<option value="' + (parseInt(countNumber) * i) + '">Page ' + (i + 1) + '</option>';
            $('#pageTo').append(option);
        }
        $('#pageTo option[value="' + skipNumber + '"]').prop('selected', true);
    } else { // Count is greater than Total: Set only 1 page and disable select.
        $('#pageTo').html('<option>Page 1</option>');
        $('#pageTo').prop('disabled', true);
    }
    //
    // Determine Next
    if (listTotal > range) {
        $('#goNext1').prop('disabled', false);
        $('#goNext2').prop('disabled', false);
    } else {
        $('#goNext1').prop('disabled', true);
        $('#goNext2').prop('disabled', true);
    }
    //
    // Determine Prev
    if ( skipNumber == 0) {
        $('#goPrev1').prop('disabled', true);
        $('#goPrev2').prop('disabled', true);
    } else {
        $('#goPrev1').prop('disabled', false);
        $('#goPrev2').prop('disabled', false);
    }
    //
    // Determine Start
    if (listCurrent.length > 0 && skipNumber == "0") {
        $('#goStart').prop('disabled', true);
    } else {
        $('#goStart').prop('disabled', false);
    }
    //
    // Determine End
    if ((range >= listTotal)) {
        $('#goEnd').prop('disabled', true);
    } else {
        $('#goEnd').prop('disabled', false);
    }
}
function goToUsersNext() {
    let nextPage = parseInt(skipNumber) + parseInt(countNumber);
    skipNumber = nextPage.toString();
    console.log(countNumber, skipNumber, sortString, historyNumber, searchString);
    callSupportAPI(countNumber, skipNumber, sortString, historyNumber, searchString);
}
function goToUsersPrev() {
    let prevPage = parseInt(skipNumber) - parseInt(countNumber);
    skipNumber = prevPage < 0 ? '0' : prevPage.toString();
    console.log(countNumber, skipNumber, sortString, historyNumber, searchString);
    callSupportAPI(countNumber, skipNumber, sortString, historyNumber, searchString);
}
function goToUsersStart() {
    skipNumber = "0";
    console.log(countNumber, skipNumber, sortString, historyNumber, searchString);
    callSupportAPI(countNumber, skipNumber, sortString, historyNumber, searchString);
}
function goToUsersEnd() {
    let lastPage = (totalPages - 1) * parseInt(countNumber);
    skipNumber = lastPage;
    console.log(countNumber, skipNumber, sortString, historyNumber, searchString);
    callSupportAPI(countNumber, skipNumber, sortString, historyNumber, searchString);
}
function goToUsersPage(value) {
    skipNumber = value;
    console.log(countNumber, skipNumber, sortString, historyNumber, searchString);
    callSupportAPI(countNumber, skipNumber, sortString, historyNumber, searchString);
    updatePagiPages();
}

