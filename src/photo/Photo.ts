import { Expose } from 'class-transformer';

export interface PhotoLike {
  userId: string;
  username: string;
}

export interface PhotoComment {
  commentId: string;
  text: string;
}

export class Photo {
  /** Photo ID */
  readonly id: string;
  /** Photo caption */
  readonly caption: string;
  /** Path to image on server */
  @Expose({ name: 'image_path' })
  readonly imagePath: string;
  /** Image height */
  readonly height: number;
  /** Image width */
  readonly width: number;
  /** When was this image created? */
  @Expose({ name: 'date_created' })
  readonly dateCreated: string;


  // TODO: add an optional SET location in the creation script
  /** Photo location */
  readonly location?: {
    /** Latitude value for location */
    latitude: number;
    /** Longitude value location */
    longitude: number;
  };

  constructor(
    id: string,
    caption: string,
    imagePath: string,
    height: number,
    width: number,
    dateCreated: string,
    location: { latitude: number; longitude: number }
  ) {
    this.id = id;
    this.caption = caption;
    this.imagePath = imagePath;
    this.height = height;
    this.width = width;
    this.dateCreated = dateCreated;
    this.location = location;
  }
}
