// Populate mock data
MERGE (photo1: Photo {id: '1'})
ON CREATE SET photo1.date_created = datetime(),
photo1.date_updated = datetime()
ON MATCH SET photo1.date_updated = datetime()
SET photo1.caption = 'caption-1',
photo1.location = point({latitude: 20, longitude: 30}),
photo1.image_path = 'https://picsum.photos/id/1/200/300',
photo1.image_size = 600000

MERGE (photo2: Photo {id: '2'})
ON CREATE SET photo2.date_created = datetime(),
photo2.date_updated = datetime()
ON MATCH SET photo2.date_updated = datetime()
SET photo2.caption = 'caption-2',
photo2.location = point({latitude: 20, longitude: 30}),
photo2.image_path = 'https://picsum.photos/id/2/200/300',
photo2.image_size = 600000

MERGE (photo3: Photo {id: '3'})
ON CREATE SET photo3.date_created = datetime(),
photo3.date_updated = datetime()
ON MATCH SET photo3.date_updated = datetime()
SET photo3.caption = 'caption-3',
photo3.location = point({latitude: 20, longitude: 30}),
photo3.image_path = 'https://picsum.photos/id/3/200/300',
photo3.image_size = 600000

MERGE (photo4: Photo {id: '4'})
ON CREATE SET photo4.date_created = datetime(),
photo4.date_updated = datetime()
ON MATCH SET photo4.date_updated = datetime()
SET photo4.caption = 'caption-4',
photo4.location = point({latitude: 20, longitude: 30}),
photo4.image_path = 'https://picsum.photos/id/4/200/300',
photo4.image_size = 600000

MERGE (photo5: Photo {id: '5'})
ON CREATE SET photo5.date_created = datetime(),
photo5.date_updated = datetime()
ON MATCH SET photo5.date_updated = datetime()
SET photo5.caption = 'caption-5',
photo5.location = point({latitude: 20, longitude: 30}),
photo5.image_path = 'https://picsum.photos/id/5/200/300',
photo5.image_size = 600000

MERGE (photo6: Photo {id: '6'})
ON CREATE SET photo6.date_created = datetime(),
photo6.date_updated = datetime()
ON MATCH SET photo6.date_updated = datetime()
SET photo6.caption = 'caption-6',
photo6.location = point({latitude: 20, longitude: 30}),
photo6.image_path = 'https://picsum.photos/id/6/200/300',
photo6.image_size = 600000

MERGE (photo7: Photo {id: '7'})
ON CREATE SET photo7.date_created = datetime(),
photo7.date_updated = datetime()
ON MATCH SET photo7.date_updated = datetime()
SET photo7.caption = 'caption-7',
photo7.location = point({latitude: 20, longitude: 30}),
photo7.image_path = 'https://picsum.photos/id/7/200/300',
photo7.image_size = 600000

MERGE (photo8: Photo {id: '8'})
ON CREATE SET photo8.date_created = datetime(),
photo8.date_updated = datetime()
ON MATCH SET photo8.date_updated = datetime()
SET photo8.caption = 'caption-8',
photo8.location = point({latitude: 20, longitude: 30}),
photo8.image_path = 'https://picsum.photos/id/8/200/300',
photo8.image_size = 600000

MERGE (photo9: Photo {id: '9'})
ON CREATE SET photo9.date_created = datetime(),
photo9.date_updated = datetime()
ON MATCH SET photo9.date_updated = datetime()
SET photo9.caption = 'caption-9',
photo9.location = point({latitude: 20, longitude: 30}),
photo9.image_path = 'https://picsum.photos/id/9/200/300',
photo9.image_size = 600000

MERGE (photo10: Photo {id: '10'})
ON CREATE SET photo10.date_created = datetime(),
photo10.date_updated = datetime()
ON MATCH SET photo10.date_updated = datetime()
SET photo10.caption = 'caption-10',
photo10.location = point({latitude: 20, longitude: 30}),
photo10.image_path = 'https://picsum.photos/id/10/200/300',
photo10.image_size = 600000



MERGE (user1: User {id: '1'})
ON CREATE SET user1.date_created = datetime(),
user1.date_updated = datetime()
ON MATCH SET user1.date_updated = datetime()
SET user1.username = 'username-1'

MERGE (user2: User {id: '2'})
ON CREATE SET user2.date_created = datetime(),
user2.date_updated = datetime()
ON MATCH SET user2.date_updated = datetime()
SET user2.username = 'username-2'

MERGE (user3: User {id: '3'})
ON CREATE SET user3.date_created = datetime(),
user3.date_updated = datetime()
ON MATCH SET user3.date_updated = datetime()
SET user3.username = 'username-3'

MERGE (user4: User {id: '4'})
ON CREATE SET user4.date_created = datetime(),
user4.date_updated = datetime()
ON MATCH SET user4.date_updated = datetime()
SET user4.username = 'username-4'

MERGE (user5: User {id: '5'})
ON CREATE SET user5.date_created = datetime(),
user5.date_updated = datetime()
ON MATCH SET user5.date_updated = datetime()
SET user5.username = 'username-5'




MERGE (comment1: Comment {id: '1'})
ON CREATE SET comment1.date_created = datetime(),
comment1.date_updated = datetime()
ON MATCH SET comment1.date_updated = datetime()
SET comment1.text = 'comment-text-1'

MERGE (comment2: Comment {id: '2'})
ON CREATE SET comment2.date_created = datetime(),
comment2.date_updated = datetime()
ON MATCH SET comment2.date_updated = datetime()
SET comment2.text = 'comment-text-2'

MERGE (comment3: Comment {id: '3'})
ON CREATE SET comment3.date_created = datetime(),
comment3.date_updated = datetime()
ON MATCH SET comment3.date_updated = datetime()
SET comment3.text = 'comment-text-3'

MERGE (comment4: Comment {id: '4'})
ON CREATE SET comment4.date_created = datetime(),
comment4.date_updated = datetime()
ON MATCH SET comment4.date_updated = datetime()
SET comment4.text = 'comment-text-4'

MERGE (comment5: Comment {id: '5'})
ON CREATE SET comment5.date_created = datetime(),
comment5.date_updated = datetime()
ON MATCH SET comment5.date_updated = datetime()
SET comment5.text = 'comment-text-5'

MERGE (comment6: Comment {id: '6'})
ON CREATE SET comment6.date_created = datetime(),
comment6.date_updated = datetime()
ON MATCH SET comment6.date_updated = datetime()
SET comment6.text = 'comment-text-6'

MERGE (comment7: Comment {id: '7'})
ON CREATE SET comment7.date_created = datetime(),
comment7.date_updated = datetime()
ON MATCH SET comment7.date_updated = datetime()
SET comment7.text = 'comment-text-7'

MERGE (comment8: Comment {id: '8'})
ON CREATE SET comment8.date_created = datetime(),
comment8.date_updated = datetime()
ON MATCH SET comment8.date_updated = datetime()
SET comment8.text = 'comment-text-8'

MERGE (comment9: Comment {id: '9'})
ON CREATE SET comment9.date_created = datetime(),
comment9.date_updated = datetime()
ON MATCH SET comment9.date_updated = datetime()
SET comment9.text = 'comment-text-9'

MERGE (comment10: Comment {id: '10'})
ON CREATE SET comment10.date_created = datetime(),
comment10.date_updated = datetime()
ON MATCH SET comment10.date_updated = datetime()
SET comment10.text = 'comment-text-10'




MERGE (hashtag1: Hashtag {id: 'hashtag-1'})
ON CREATE SET hashtag1.date_created = datetime()

MERGE (hashtag2: Hashtag {id: 'hashtag-2'})
ON CREATE SET hashtag2.date_created = datetime()

MERGE (hashtag3: Hashtag {id: 'hashtag-3'})
ON CREATE SET hashtag3.date_created = datetime()

MERGE (hashtag4: Hashtag {id: 'hashtag-4'})
ON CREATE SET hashtag4.date_created = datetime()


MERGE (user1)<-[:POSTED_BY]-(photo1)
MERGE (user5)<-[:POSTED_BY]-(photo2)
MERGE (user4)<-[:POSTED_BY]-(photo3)
MERGE (user5)<-[:POSTED_BY]-(photo4)
MERGE (user1)<-[:POSTED_BY]-(photo5)
MERGE (user3)<-[:POSTED_BY]-(photo6)
MERGE (user2)<-[:POSTED_BY]-(photo7)
MERGE (user4)<-[:POSTED_BY]-(photo8)
MERGE (user5)<-[:POSTED_BY]-(photo9)
MERGE (user1)<-[:POSTED_BY]-(photo10)



MERGE (user1)<-[like1:LIKED_BY]-(photo1)
ON CREATE SET like1.date_created = datetime()
MERGE (user2)<-[like2:LIKED_BY]-(photo1)
ON CREATE SET like2.date_created = datetime()
MERGE (user3)<-[like3:LIKED_BY]-(photo1)
ON CREATE SET like3.date_created = datetime()
MERGE (user4)<-[like4:LIKED_BY]-(photo1)
ON CREATE SET like4.date_created = datetime()
MERGE (user5)<-[like5:LIKED_BY]-(photo1)
ON CREATE SET like5.date_created = datetime()
MERGE (user3)<-[like6:LIKED_BY]-(photo2)
ON CREATE SET like6.date_created = datetime()
MERGE (user2)<-[like7:LIKED_BY]-(photo2)
ON CREATE SET like7.date_created = datetime()
MERGE (user4)<-[like8:LIKED_BY]-(photo2)
ON CREATE SET like8.date_created = datetime()
MERGE (user5)<-[like9:LIKED_BY]-(photo2)
ON CREATE SET like9.date_created = datetime()
MERGE (user4)<-[like10:LIKED_BY]-(photo3)
ON CREATE SET like10.date_created = datetime()
MERGE (user5)<-[like11:LIKED_BY]-(photo4)
ON CREATE SET like11.date_created = datetime()
MERGE (user2)<-[like12:LIKED_BY]-(photo4)
ON CREATE SET like12.date_created = datetime()
MERGE (user3)<-[like13:LIKED_BY]-(photo5)
ON CREATE SET like13.date_created = datetime()
MERGE (user4)<-[like14:LIKED_BY]-(photo5)
ON CREATE SET like14.date_created = datetime()
MERGE (user4)<-[like15:LIKED_BY]-(photo6)
ON CREATE SET like15.date_created = datetime()
MERGE (user4)<-[like16:LIKED_BY]-(photo7)
ON CREATE SET like16.date_created = datetime()
MERGE (user4)<-[like17:LIKED_BY]-(photo8)
ON CREATE SET like17.date_created = datetime()
MERGE (user4)<-[like18:LIKED_BY]-(photo9)
ON CREATE SET like18.date_created = datetime()
MERGE (user4)<-[like19:LIKED_BY]-(photo10)
ON CREATE SET like19.date_created = datetime()


MERGE (comment1)-[:BELONGS_TO]->(photo1)
MERGE (comment2)-[:BELONGS_TO]->(photo2)
MERGE (comment3)-[:BELONGS_TO]->(photo2)
MERGE (comment4)-[:BELONGS_TO]->(photo4)
MERGE (comment5)-[:BELONGS_TO]->(photo5)
MERGE (comment6)-[:BELONGS_TO]->(photo7)
MERGE (comment7)-[:BELONGS_TO]->(photo7)
MERGE (comment8)-[:BELONGS_TO]->(photo7)
MERGE (comment9)-[:BELONGS_TO]->(photo6)
MERGE (comment10)-[:BELONGS_TO]->(photo3)

MERGE (user2)<-[:WRITTEN_BY]-(comment1)
MERGE (user3)<-[:WRITTEN_BY]-(comment2)
MERGE (user2)<-[:WRITTEN_BY]-(comment3)
MERGE (user5)<-[:WRITTEN_BY]-(comment4)
MERGE (user5)<-[:WRITTEN_BY]-(comment5)
MERGE (user3)<-[:WRITTEN_BY]-(comment6)
MERGE (user2)<-[:WRITTEN_BY]-(comment7)
MERGE (user2)<-[:WRITTEN_BY]-(comment8)
MERGE (user5)<-[:WRITTEN_BY]-(comment9)
MERGE (user3)<-[:WRITTEN_BY]-(comment10)


MERGE (hashtag1)<-[:CONTAINS_TAG]-(photo1)
MERGE (hashtag3)<-[:CONTAINS_TAG]-(photo1)
MERGE (hashtag4)<-[:CONTAINS_TAG]-(photo1)
MERGE (hashtag3)<-[:CONTAINS_TAG]-(photo2)
MERGE (hashtag1)<-[:CONTAINS_TAG]-(photo3)
MERGE (hashtag4)<-[:CONTAINS_TAG]-(photo3)
MERGE (hashtag1)<-[:CONTAINS_TAG]-(photo4)
MERGE (hashtag2)<-[:CONTAINS_TAG]-(photo4)
MERGE (hashtag3)<-[:CONTAINS_TAG]-(photo5)
MERGE (hashtag4)<-[:CONTAINS_TAG]-(photo6)
MERGE (hashtag1)<-[:CONTAINS_TAG]-(photo8)
MERGE (hashtag3)<-[:CONTAINS_TAG]-(photo8)
MERGE (hashtag4)<-[:CONTAINS_TAG]-(photo10)
MERGE (hashtag2)<-[:CONTAINS_TAG]-(photo10)
