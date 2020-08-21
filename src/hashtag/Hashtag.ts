export interface HashtagPhoto {
  photoId: string;
}

export class Hashtag {
  /** Hashtag ID */
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
