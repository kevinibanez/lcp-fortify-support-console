$(document).ready(function () {
    var dataSrc = [];

    var table = $("#grid").DataTable({
        "searching": true,
        "paging": true,
        "info": true,
        "processing": true, // to show progress bar
        "serverSide": true, // to process server side
        "filter": true, // this is to disable filter (search box)
        "orderMulti": false, // to disable multiple column at once
        "ajax": {
            //"url": "/support/UserManager/LoadJsonData",
            //"url": "/support/UserManager/GetProfileLists",
            "url": "/support/UserManager/GetProfileListsAsync",
            //"type": "GET",
            "type": "POST",
            "datatype": "json",
            "headers": {
                'CSRFToken': "TOKEN"
            }
        },
        "columns": [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            { "data": "name", "name": "Name", "autoWidth": true },
            { "data": "email", "name": "Email", "autoWidth": true },
            { "data": "company", "name": "Company", "autoWidth": true },
            { "data": "phone", "name": "Phone", "autoWidth": true },

        ],

        'initComplete': function () {
            var api = this.api();

            var input = $('.dataTables_filter input').unbind(),
                self = api; //this.api(),
            $searchButton = $('<button class="btn_search">')
                .text('search')
                .click(function () {
                    self.search(input.val()).draw();
                }),
                $clearButton = $('<button class="btn_clear">')
                    .text('clear')
                    .click(function () {
                        input.val('');
                        $searchButton.click();
                    })
            $('.dataTables_filter').append($searchButton, $clearButton);

            // Initialize Bootstrap 3 Typeahead plug-in
            $('.dataTables_filter input[type="search"]', api.table().container())
                .typeahead({
                    //source: dataSource,
                    source: function (query, process) {
                        $.post('/support/UserManager/LoadJsonData', { q: query }, function (data) {
                            return process(data.autocompl);
                        });
                    },
                    minLength:4,
                    /// for auto search on keypress or keyup Or keydown
                    afterSelect: function (data) {
                        api.search(data).draw();
                    }
                });
        }
    });

    // Add event listener for toggling details
    $('#grid tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');

        var row = table.row(tr);

        if (row.child.isShown()) {
            // Toggle - close row
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Toggle - open row
            row.child(format(row.data())).show();
            tr.addClass('shown');

        }
    });

    $('#grid tbody').on('click', 'td > button', function (e) {
        var tr = $('#grid tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // Toggle - close row
            row.child.hide();
            tr.removeClass('shown');
        }
    });

    $('#grid tbody').on('click', 'div > #btnClearDlt', function (e) {

        //var tr = $('#btnClearDlt').parent('div').parent('td').parent('tr').parent('tfoot').parent('table').parent('td').parent('tr').closest('tr');
        var tr = $(this).parent('div').parent('td').parent('tr').parent('tfoot').parent('table').parent('td').parent('tr').closest('tr');

        var row = table.row(tr.prev());
        var row1 = tr.prev().closest('tr');

        if (row.child.isShown()) {

            // Toggle - close row
            row.child.hide();

            row1.removeClass('shown');
        }
    });

    //Get 2FA Code
    $('#grid tbody').on('click', 'div > #btnRecover2FAKey', function (e) {

        var tr = $(this).parent('div').parent('td').parent('tr').parent('tfoot').parent('table').parent('td').parent('tr').closest('tr');
        var row = table.row(tr.prev());
        var emaildata1 = row.data();
        var emaildata = emaildata1.email;

        var url = "";
        var modalWindow = "#2FAModal";

        $.ajax({
            type: 'POST',
            datatype: 'text',
            cache: false,
            url: '/Support/UserManager/GetRecoveryCodeByEmail',
            "headers": {
                'CSRFToken':"TOKEN"
            },
            data: { emailAddr: emaildata },
            success: function (response) {
                $(modalWindow + ' div.demo-container').text(response);
                $(modalWindow).modal('show');
            },
            error: function (response) {
                $(modalWindow).modal('show');
            }
        });
    });

    //Get History
    $('#grid tbody').on('click', 'div > #btnGetHistory', function (e) {
        var emaildata = $('#hemail').val();
        
        $.ajax({
            type: 'POST',
            datatype: 'text',
            url: '/Support/UserManager/GetLoginHistoryList',
            "headers": {
                'CSRFToken': "TOKEN"
            },
            data: { emailAddr: emaildata },
            success: function (response) {
                $('#historyModal div.history-container').text(response);
                $('#historyModal').modal('show');
            },
            error: function (response) {
                $('#historyModal').modal('show');
            }
        });
    });


    /* Formatting function for row details - modify as you need */
    function format(d) {

        //Checking History with undefined values
        var IPAddress = "";
        var Event = "";
        var History = "";
        profileEmail = d.email;

        var NoData = "Not available";
        var Company = d.company ? d.company : NoData;
        
 
        //modification
        if (d.history.length > 0) {
            for (i = 0; i < d.history.length; i++) {
                History += '<tr><td>' + d.history[i].event + '</td><td>' + d.history[i].gatewayIPAddress + '</td><td>LCPCertified</td><td style="display:none;">' + Company + '</td><td>' + d.history[i].isAuthenticated + '</td></tr>';
            }
        } else {
            History = '<tr><td>' + NoData + '</td><td>' + NoData + '</td><td>LCPCertified</td><td style="display:none;">' + NoData + '</td><td>' + NoData + '</td></tr>';
        }

        // `d` is the original data object for the row
        return '<table id="search_details" cellpadding="5" cellspacing="0" border="0" class="details" style="padding-left:50px;width:100%;">' +
            '<tbody>' +
            '<tr>' +
            '<td width="50%"><span class="fieldtitle">First Name</span></td>' +
            '<td width="50%"><span class="fieldtitle">Last Name</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td><span class="fieldtext">' + d.fName + '</span></td>' +
            '<td><span class="fieldtext">' + d.lName + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td><span class="fieldtitle">Email</span></td>' +
            '<td><span class="fieldtitle">Phone Number</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td><span class="fieldtext">' + d.email + '</span></td>' +
            '<td><span class="fieldtext">' + d.phone + '</span></td>' +
            '</tr>' +
            '<tr style="display:none;">' +
            '<td><span class="fieldtitle">Company</span></td>' +
            '<td><span class="fieldtitle">Occupation</span></td>' +
            '</tr>' +
            '<tr style="display:none;">' +
            '<td><span class="fieldtext">' + Company + '</span></td>' +
            '<td><span class="fieldtext">' + d.ocupation + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="2"><span class="fieldtitle">Login Activity</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="2">' +
            '<table width="95%" cellpadding="0" cellspacing="0" border="0" class="details">' +
            '<tr style="border-bottom:1px solid;">' +
            '<td width="25%"><span class="fieldsubtitle">Date - Time</span></td>' +
            '<td width="15%"><span class="fieldsubtitle">IP Address</span></td>' +
            '<td width="20%"><span class="fieldsubtitle">Application</span></td>' +
            '<td width="20%" style="display:none;"><span class="fieldsubtitle">Company</span></td>' +
            '<td width="20%"><span class="fieldsubtitle">Authenticated</span></td>' +
            '</tr>' +
            History +
            '</table>' +
            '</td > ' +
            '</tr>' +
            '</tbody>' +
            '<tfoot class="nodtls">' +
            '<tr>' +
            '<td colspan="5" style="text-align: right;">' +
            '<div class="manage_acct_details" style="float: right;padding-right:50px;">' +
            '<input name="" type="submit" id="btnClearDlt" value="Close Details"  style="margin: 10px;" class="btn_cncl">' +
            '<input name="" type="submit" id="btnRecover2FAKey" value="Recover 2FA Key"  style="margin: 10px;" class="btn_sv" data-toggle="modal" data-target="#2FAModal">' +
            '<input name="" type="submit" id="btnResetPasswordDlt" value="Reset Password"  style="margin: 10px;" class="btn_sv">' +
            '<input type="hidden" id="hemail" value="' + d.email + '" />' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</tfoot>' +
            '</table>';
    }

});
