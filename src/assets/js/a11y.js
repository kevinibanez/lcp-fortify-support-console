//
//dependancies: jquery
//
//var pages = [
//    { name: "profile", url: "/main/manage/index" },
//    { name: "password", url: "/main/manage/ChangePassword" },
//    { name: "external logins", url: "/main/manage/ExternalLogins" },
//    { name: "two-factor authentication", url: "/main/manage/TwoFactorAuthentication" },
//    { name: "configure authenticator app", url: "/main/manage/EnableAuthenticator" },
//    { name: "grants", url: "/default/grants" },
//    { name: "diagnostics", url: "/default/diagnostics" },
//    { name: "Support - User Mgr", url: "/support/usermanager/Index" },
//    { name: "Marketing Tools", url: "/marketing/loginpage/Index" }
//];

var pathname = window.location.pathname; // Returns path only (/path/example.html)
var url = window.location.href;     // Returns full URL (https://example.com/path/example.html)
var origin = window.location.origin;   // Returns base URL (https://example.com)

//
// RESET && START FROM BEGINING
//
function escToStart() {
    if ($('#backdrop').hasClass('show')) { toggleHam(); }
}



$('.nav-title').keypress(function (e) {
    if (e.keyCode == 13) { $('.nav-title').click(); }
});
$('.nav-title').click(function () {
    toggleHam();
    if ($('#backdrop').hasClass('show')) { $('#lcpSidenav a')[0].focus(); }
    
});


//
// SKIP TO MAIN CONTENT
//
$("#skip2Content").keypress(function (e) {
    if (e.keyCode == 13) { $('#skip2Content').click(); }
});
$('#skip2Content').click(function () {
    let path = window.location.pathname;
    console.log('hit the navigation', path);
    switch (path) {
        //
        // Conditionals that do not first handle <a> can be defined.
        //
        default:
            $('main a')[0].focus();
            break;
    }
});

//
// SKIP TO NAVIGATION
//
$("#skip2Nav").keypress(function (e) {
    if (e.keyCode == 13) { $('#skip2Nav').click(); }
});
$('#skip2Nav').click(function () {
    toggleHam();
    $('#lcpSidenav a')[0].focus();
});

