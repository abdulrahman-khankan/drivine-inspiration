import { Expose } from 'class-transformer';

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
  /** Verification status */
  @Expose({ name: 'is_verified' })
  readonly isVerified: boolean;

  constructor(id: string, username: string, isVerified: boolean) {
    this.id = id;
    this.username = username;
    this.isVerified = isVerified;
  }
}
