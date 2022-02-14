import { ChangeDetectionStrategy, Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { SupportViewModel, Root } from '../../../models/SupportViewModel';
import { UserServices } from '../../../services/user-manager-services';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'UserManager',
    templateUrl: '../UserManager/user-manager-component.html',
    styleUrls: ['../UserManager/user-manager-component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

@Injectable({ providedIn: 'root' })
export class FilterUserManager implements OnInit {
    supportViewModel: SupportViewModel = new SupportViewModel();
    root: Root = new Root();
    @Input() SearchKey = this.supportViewModel.SearchKey;
    @Input() PageNo = this.supportViewModel.PageNo;
    @Input() RecsPerPage = this.supportViewModel.RecsPerPage;
    @Output() onUserSelected = new EventEmitter<any>();

    constructor(private userServices: UserServices, private title: Title) { }

    ngOnInit() {
        this.title.setTitle('User Manager');
        this.supportViewModel.SearchKey = this.SearchKey;
        this.userServices.get().push();
    }
}
