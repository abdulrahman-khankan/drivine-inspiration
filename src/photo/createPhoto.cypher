MERGE (photo:Photo {id: $id})

ON CREATE SET photo.date_created = datetime($dateCreated)

SET photo.caption = $caption,
    photo.image_path = $imagePath,
    photo.height = $height,
    photo.width = $width

RETURN photo
