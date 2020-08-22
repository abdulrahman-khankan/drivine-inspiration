MATCH (photo:Photo {id: $photoId})
MERGE (user:User {id: $id})

ON CREATE SET user.date_created = datetime(),
              user.date_updated = datetime(),
              user.username = $username,
              user.is_verified = $isVerified

MERGE (user)<-[like:LIKED_BY]-(photo)

RETURN user
