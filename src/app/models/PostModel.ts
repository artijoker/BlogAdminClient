import {PostStatus} from "../PostStatus";

export interface PostModel {
    id: number;
    title: string;
    anons: string;
    fullText: string;
    lastChange: Date;
    status: string;
    accountId: number;
    categoryId: number;
    accountLogin: string;
    categoryName: string;
}
