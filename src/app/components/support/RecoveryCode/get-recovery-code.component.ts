

import { SupportViewModel } from '../../../models/SupportViewModel';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'RecoveryCode',
    templateUrl: './get-recovery-code.component.html',
    styleUrls: ['./get-recovery-code.component.scss']
})


export class GetRecoveryToken implements OnInit {
    supportViewModel: SupportViewModel = new SupportViewModel();
    @Input() heading = 'Recovery Code';

    code(): string {
        return '123456789';
    }

    constructor() { }
    ngOnInit(): void {

    }
}