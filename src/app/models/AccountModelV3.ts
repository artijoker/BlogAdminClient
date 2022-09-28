import {AccountModelV2} from "./AccountModelV2";

export interface AccountModelV3 extends AccountModelV2 {
    roleId: number;
    roleName: number;
    isBanned: boolean;
    isDeleted: boolean;
}
