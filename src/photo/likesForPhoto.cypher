MATCH (photo:Photo {id: $photo_id})-[:LIKED_BY]->(user:User)

RETURN {
  userId: user.id,
  username: user.username
}
