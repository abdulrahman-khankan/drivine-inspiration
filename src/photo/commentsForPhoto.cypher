MATCH (photo:Photo {id: $photo_id})<-[:BELONGS_TO]-(comment:Comment)

RETURN {
  commentId: comment.id,
  text: comment.text
}
