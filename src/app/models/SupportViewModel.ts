import { Guid } from "guid-typescript";
///
//< Work in Progress> still
///
export class SupportViewModel {
  SearchKey?: string = "";
  BtnAction: string = "";
  RecsPerPage: number = 10;
  PageNo: number = 1;
  Orderby: string = "";
  IsAssending: boolean = false;
  ErrorMessage?: string;
  RecordCount?: number;
  Users: Array<UserRecordVM> = [];
}

export class UserRecordVM {
  Id?: string = Guid.create().toString();
  UserName: string = "";
  Show: boolean = false;
  Name: string = "";
  Email: string = "";
  EmailValidated: boolean = false;
  Phone: string = "";
  Company: string = "";
  Country: string = "";
  TfaIsEnabled: boolean = false;
  User: Array<ApplicationUser> = new Array<ApplicationUser>();
}


export class ApplicationUser {
  Id: string = Guid.create().toString();
  UserName: string = "";
  Email: string = "";
  EmailValidated: boolean = false;
  Phone: string = "";
  TfaIsEnabled: boolean = false;
  FirstName?: string = "";
  LastName: string = "";
  PrimaryIdentifierNumber?: string = "";
  PhoneExtension?: string = "";
  DateUpdated?: string = "";
  Orgs: Array<Org> = new Array<Org>();
  History: Array<HistoryRec> = new Array<HistoryRec>();
}

export class HistoryRec {
  Event: string = "";
  GatewayIPAddress: string = "";
  IsAuthenticated: boolean = false;
}
export class Org {
  OrgCode: string = "";
  OrgName: string = "";
  OrgStatus: string = "";
  OrgType: number = 0;
}



export class Login {
  Event: string = "";
  IsAuthenticated: boolean = false;
  GatewayIPAddress: string = "";
}

export class User {
  Id: string = Guid.create().toString();
  UserName: string = "";
  Email: string = "";
  EmailConfirmed: boolean = false;
  PhoneNumber: string = "";
  TwoFactorEnabled: boolean = false;
  LockoutEnabled: boolean = false;
  AccessFailedCount: number = 0;
  FirstName: string = "";
  LastName: string = "";
  PrimaryIdentifierNumber: string = "";
  PhoneExtension: string = "";
  DateUpdated: string = "";
  Orgs: Array<Org> = new Array<Org>();
  Logins: Array<Login> = new Array<Login>();
}


export class Root {
  Users: Array<User> = [];
  Count: number = 0;
}

