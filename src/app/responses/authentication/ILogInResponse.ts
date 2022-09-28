import { IResponse } from "../IResponse";
import {AccountModelV3} from "../../models/AccountModelV3";

export interface ILogInResponse extends IResponse<AccountModelV3> {
    token: string;
}
