MATCH (photo:Photo)-[like:LIKED_BY]->(user:User{id: $user_id})

RETURN {
  photoId: photo.id,
  likedAt: like.date_created
}
