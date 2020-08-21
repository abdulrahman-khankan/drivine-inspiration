MATCH (photo:Photo)-[:CONTAINS_TAG]->(hashtag:Hashtag{id: $hashtagId})

RETURN photo
