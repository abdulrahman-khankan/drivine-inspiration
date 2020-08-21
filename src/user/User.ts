export interface UserLike {
  userId: string;
  username: string;
}

export interface UserComment {
  commentId: string;
  text: string;
}

export class User {
  /** User ID */
  readonly id: string;
  /** User username */
  readonly username: string;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}
