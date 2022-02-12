import { Injectable } from '@angular/core';

import { SupportViewModel, Root } from '../models/SupportViewModel';



@Injectable({
    providedIn: 'root'
})
export class UserServices {
    userList: Array<SupportViewModel> = ([
        {
            SearchKey: 'Bob', BtnAction: '', RecsPerPage: 10, PageNo: 1, Orderby: '', IsAssending: false, ErrorMessage: '', RecordCount: 0,
            Users: [{
                Id: "83F7D262-04DB-40D6-B585-164C6205C508", UserName: '', Show: false, Name: "", Email: "", EmailValidated: true, Phone: "0000000000", TfaIsEnabled: false, Company: "", Country: "",
                User: [{
                    Id: "", UserName: "", Email: "", EmailValidated: false, Phone: "0000000000", TfaIsEnabled: false, FirstName: "BOB", LastName: "MONDAY", PrimaryIdentifierNumber: "12121212", PhoneExtension: "", DateUpdated: "2021-02-24T17:26:44.4460150",
                    Orgs: [{ OrgCode: "qalcpv2", OrgName: "QA LCP V2", OrgStatus: "active", OrgType: 0 }],
                    History: [{ Event: "", GatewayIPAddress: "", IsAuthenticated: false }]
                }]
            }]
        },
    ]);

    userlist2: Array<Root> = ([
        {
        Users: [{
            Id: "83F7D262-04DB-40D6-B585-164C6205C508", UserName: 'another@contraco-monkey.com', Email: 'another@contraco-monkey.com', EmailConfirmed: true, PhoneNumber: "0000000000", TwoFactorEnabled: false, LockoutEnabled: false, AccessFailedCount: 0, FirstName: "BOB", LastName: "MONDAY", PrimaryIdentifierNumber: "12121212", PhoneExtension: "", DateUpdated: "2021-02-24T17:26:44.4460150",
            Orgs: [{ OrgCode: "qalcpv2", OrgName: "QA LCP V2", OrgStatus: "active", OrgType: 0 },
            { OrgCode: "dotca1", OrgName: "CALTRANS", OrgStatus: "active", OrgType: 2 }],
            Logins: [{ Event: "2022-02-02T21:05:37.6072401", IsAuthenticated: true, "GatewayIPAddress": "98.153.116.42" },
            { Event: "2022-02-02T16:09:13.5706664", IsAuthenticated: true, GatewayIPAddress: "68.119.137.185" }]
            }], Count: 1
        },
    ]);



    constructor() { }
    get() {
        return this.userlist2;
    }
} 