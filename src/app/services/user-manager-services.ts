import { Injectable } from '@angular/core';

import { SupportViewModel, UserRecordVM } from '../models/SupportViewModel';



@Injectable({
    providedIn: 'root'
})
export class UserServices {
    userList: Array<SupportViewModel> = ([
        { Users: Array<UserRecordVM>(), SearchKey: '', BtnAction: '', RecsPerPage: 10, PageNo: 1, Orderby: 'name', IsAssending: true, ErrorMessage: '', RecordCount: 0 },

    ]);

    constructor() { }
    get() {
        return this.userList;
    }
} 