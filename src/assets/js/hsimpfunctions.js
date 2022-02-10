(function (doc) {
    var passwordInput;

    if (doc.getElementById("NewPassword")) {
        passwordInput = doc.getElementById("NewPassword");
    } else if (doc.getElementById("Password")) {
        passwordInput = doc.getElementById("Password");
    }

    //passwordInput = doc.getElementById("NewPassword"),
        passwordInput,
        timeDiv = doc.getElementById("password-time"),
        checksList = doc.getElementById("password-checks");

    // Code to render the time returned by HSIMP
    var renderTime = function (time, input) {

        if (time == false) {
            timeDiv.innerHTML = "Please enter a new password.";
        }else{
            timeDiv.innerHTML = "It would take " + time + " to crack your password." || "";
        }
    };

    // Code to output the checks returned by HSIMP
    var renderChecks = function (checks, input) {
        checksList.innerHTML = "";

        try {
            //for (var i = 0, l = checks.length; i < l; i++) {
            for (var i = 0, l = 1; i < l; i++) {
                var li = doc.createElement("li"),
                    title = doc.createElement("h2"),
                    message = doc.createElement("p");
           
                    title.innerHTML = checks[i].name;
           
                li.appendChild(title);

                message.innerHTML = checks[i].message;
                //li.appendChild(message);

                checksList.appendChild(li);
                }
        }
        catch (e) { };

    };

    // Setup the HSIMP object
    var attachTo = hsimp({
        options: {
            calculationsPerSecond: 4e10, // 10 billion calculations per second
            good: 315576e8, // 1 billion years
            ok: 31557600 // 1 thousand years
        },
        outputTime: renderTime,
        outputChecks: renderChecks
    });

    // setup custom values for "instantly"/"forever"
    hsimp.setDictionary({
        "instantly": "Immediately",
        "forever": "Aaaaaaaaaaaaaaaages",
    });

    // Run the HSIMP
    attachTo(passwordInput);
}(this.document));

function CheckPassword() {

    var bFlag = true;

    $('#password-checks li').each(function (i) {
        bFlag = false;
    });

    return bFlag;
}

//Non HSIMP functions
function CheckHSIMPLevel(elId) {
    try {
        var bCheck = true;
        //var elId = "#NewPassword";
        var classes = $(elId).attr('class');

        if ($(elId).hasClass('hsimp-level--ok') || $(elId).hasClass('hsimp-level--good')) {
            $('#messages').text(classes);
            bCheck = true;
        } else {
            $('#messages').text(classes);
            bCheck = false;
        }
    } catch (err) {
        //$('#trueOrfalse').text(err.message);
        bCheck = false;
    }

    return bCheck;
}


