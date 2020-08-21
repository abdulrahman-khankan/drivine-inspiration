MATCH (comment:Comment)-[:WRITTEN_BY]->(user:User{id: $user_id})

RETURN {
  commentId: comment.id,
  text: comment.text
}
