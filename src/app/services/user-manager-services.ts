import { Injectable } from '@angular/core';

import { SupportViewModel, UserRecordVM } from '../models/SupportViewModel';



@Injectable({
    providedIn: 'root'
})
export class UserServices {
    userList: Array<SupportViewModel> = ([
        // { Users: [{ Id: 83F7D262-04DB-40D6-B585-164C6205C508, UserName: 'ADMIN@JUSTDELETE.ME', Email: "ADMIN@JUSTDELETE.ME", EmailConfirmed: true, PhoneNumber: "0000000000", TwoFactorEnabled: false, LockoutEnabled: false, AccessFailedCount: 0, FirstName: "MONKEY", LastName: "ADMIN@JUSTDELETE.ME", PrimaryIdentifierNumber: "12121212", PhoneExtension: "", DateUpdated: "2021-02-24T17:26:44.4460150", Orgs: [{ OrgCode: "qalcpv2", OrgName: "QA LCP V2", OrgStatus: "active", OrgType: 0 }], Logins: [{ Event: "2021-04-12T16:37:20.8419867", IsAuthenticated: true, GatewayIPAddress: "71.80.171.173" }, { Event: "2021-04-06T16:50:05.1425793", IsAuthenticated: true, GatewayIPAddress: "::1" }}]},
    ]);


    constructor() { }
    get() {
        return this.userList;
    }
} 