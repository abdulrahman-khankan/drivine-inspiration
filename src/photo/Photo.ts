import { Expose } from 'class-transformer';

export class Photo {
  /** Primary ID that preferably auto increments (if supported in chosen DB) */
  readonly id: string;
  /** Photo caption */
  readonly caption: string;
  /** Photo location */
  readonly location: {
    /** Latitude value for location */
    latitude: number;
    /** Longitude value location */
    longitude: number;
  };
  /** Path to image on server */
  @Expose({ name: 'image_path' })
  readonly imagePath: string;
  /** Image size on server */
  @Expose({ name: 'image_size' })
  readonly imageSize: number;
  /** When was this image created? */
  @Expose({ name: 'date_created' })
  readonly dateCreated: number;
  /** Last time this image was updated? */
  @Expose({ name: 'date_updated' })
  readonly dateUpdated: number;

  constructor(
    id: string,
    caption: string,
    location: { latitude: number; longitude: number },
    imagePath: string,
    imageSize: number
  ) {
    this.id = id;
    this.caption = caption;
    this.location = location;
    this.imagePath = imagePath;
    this.imageSize = imageSize;
  }
}
