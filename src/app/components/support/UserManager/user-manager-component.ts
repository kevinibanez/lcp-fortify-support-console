import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { UserServices } from '../../../services/user-manager-services';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'UserManager',
    templateUrl: '../UserManager/user-manager-component.html',
    styleUrls: ['../UserManager/user-manager-component.scss']
})

@Injectable({ providedIn: 'root' })
export class FilterUserManager implements OnInit {

    @Input() heading = 'User Manager';
    @Input() SearchKey = '';

    userlist: any;

    constructor(private userServices: UserServices, private title: Title) { }

    ngOnInit() {
        this.title.setTitle('User Manager');
        this.userlist = this.userServices.get();
    }
}
