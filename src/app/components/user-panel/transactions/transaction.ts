import { Author, Post } from "../../skills/post";

export class Transaction {
  id: String;

  requestedAt: String;

  approvedByAuthorAt: String;

  approvedByRequesterAt: String;

  deliveredByAuthorAt: String;

  deliveredByRequesterAt: String;

  agreedSkillHours: String = "0";

  status: String;

  user: Author;

  post: Post;
}


export enum TransactionState {
  REQUESTED,
  APPROVED,
  ACTIVE,
  DELIVERED
}
