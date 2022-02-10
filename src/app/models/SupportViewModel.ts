import { Guid } from "guid-typescript";

///
//< Work in Progress> still
///
export interface SupportViewModel {
  SearchKey?: string;
  BtnAction: string;
  RecsPerPage: number;
  PageNo: number;
  Orderby: string;
  IsAssending: boolean;
  ErrorMessage: string;
  RecordCount: number;
  Users: Array<UserRecordVM>;
}

export interface UserRecordVM {
  Id?: Guid;
  UserName: string;
  Show: boolean;
  Name: string;
  Email: string;
  EmailValidated: boolean;
  Phone: string;
  Company: string;
  Country: string;
  TfaIsEnabled: string;
  History: Array<HistoryRec>;

}


export interface HistoryRec {
  Event: Date;
  GatewayIPAddress: string;
  IsAuthenticated: boolean;
}






