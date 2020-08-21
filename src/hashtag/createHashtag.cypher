MERGE (hashtag:Hashtag {id: $id})

ON CREATE SET hashtag.date_created = datetime()

RETURN hashtag
