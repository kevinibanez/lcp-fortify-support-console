

import { SupportViewModel } from '../../../models/SupportViewModel';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'RecoveryCode',
    templateUrl: './get-recovery-code.component.html',
    styleUrls: ['./get-recovery-code.component.scss']
})


export class GetRecoveryToken implements OnInit {
    @Input() code: any;
    @Input() heading = 'Recovery Code';
    @Input() SearchKey = '';//SupportViewModel.SearchKey;
    @Input() PageNo = '';//SupportViewModel.SearchValue;
    @Input() RecsPerPage = '';
    
    constructor() { }
    ngOnInit(): void {

    }
}