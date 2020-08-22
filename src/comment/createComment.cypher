MATCH (photo:Photo {id: $photoId})

MERGE (comment:Comment {id: $comment.id})
ON CREATE SET comment.date_created = datetime()
SET comment.date_updated = datetime(),
    comment.text = $comment.text

MERGE (user:User {id: $user.id})
ON CREATE SET user.date_created = datetime(),
              user.date_updated = datetime(),
              user.username = $user.userUsername,
              user.is_verified = $user.isVerified

MERGE (comment)-[:WRITTEN_BY]->(user)
MERGE (comment)-[:BELONGS_TO]->(photo)

RETURN comment
