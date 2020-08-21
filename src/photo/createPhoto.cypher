MERGE (photo:Photo {id: $id})

ON CREATE SET photo.date_created = datetime(),
photo.date_updated = datetime()

ON MATCH SET photo.date_updated = datetime()

SET photo.caption = $caption,
photo.location = point({latitude: $latitude, longitude: $longitude}),
photo.image_path = $imagePath,
photo.image_size = $imageSize

RETURN photo
