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
  Users!: Array<UserRecordVM>;
}

export class UserRecordVM {
  Id?: Guid;
  UserName: string = "";
  Show: boolean = false;
  Name: string = "";
  Email: string = "";
  EmailValidated: boolean = false;
  Phone: string = "";
  Company: string = "";
  Country: string = "";
  TfaIsEnabled: string = "";
  History: Array<HistoryRec> = new Array<HistoryRec>();

}


export class HistoryRec {
  Event: Date = new Date();
  GatewayIPAddress: string = "";
  IsAuthenticated: boolean = false;
}






