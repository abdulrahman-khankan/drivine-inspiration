MERGE (comment:Comment {id: $id})

ON CREATE SET comment.date_created = datetime(),
comment.date_updated = datetime()

ON MATCH SET comment.date_updated = datetime()

SET comment.text = $text

RETURN comment
