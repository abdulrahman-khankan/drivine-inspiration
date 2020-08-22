MERGE (user:User {id: $id})

ON CREATE SET user.date_created = datetime()

SET user.date_updated = datetime(),
    user.username = $username,
    user.is_verified = $isVerified

RETURN user
