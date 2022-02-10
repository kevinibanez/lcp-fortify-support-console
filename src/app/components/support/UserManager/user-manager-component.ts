import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';



@Component({
    selector: 'UserManager',
    templateUrl: '../UserManager/user-manager-component.html',
    styleUrls: ['../UserManager/user-manager-component.scss']
})

export class FilterUserManager implements OnInit {

    @Input() heading = 'User Manager';
    @Input() SearchKey = '';
    
    constructor() { }

    ngOnInit(): void { }
}