MATCH (photo:Photo)-[:CONTAINS_TAG]->(hashtag:Hashtag{id: $hashtag_id})

RETURN {
  photoId: photo.id
}
