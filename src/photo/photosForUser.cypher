MATCH (photo:Photo)-[:POSTED_BY]->(user:User{id: $user_id})

RETURN photo
