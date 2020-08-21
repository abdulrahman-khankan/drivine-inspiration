export class Comment {
  /** Comment ID */
  readonly id: string;
  /** Comment text */
  readonly text: string;

  constructor(id: string, text: string) {
    this.id = id;
    this.text = text;
  }
}
