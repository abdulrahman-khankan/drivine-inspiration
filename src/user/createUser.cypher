MERGE (user:User {id: $id})

ON CREATE SET user.date_created = datetime(),
user.date_updated = datetime()

ON MATCH SET user.date_updated = datetime()

SET user.username = $username

RETURN user
