export interface IComment {
    id: number;
    text: string;
    sent: Date;
    accountId: number;
    postId: number;
}