interface UserBase {
  id: string;
  username: string;
  is_verified: boolean;
}

interface Counter {
  count: number;
}

interface LikeableEdge {
  edge_liked_by: Counter;
}

interface Paginated {
  page_info: {
    has_next_page: boolean;
    end_cursor: string | null;
  };
}

export interface MediaLikes extends Paginated, Counter {
  edges: { node: UserBase }[];
}

interface EdgeComment extends LikeableEdge {
  id: string;
  text: string;
  owner: UserBase;
}

export interface MediaComments extends Paginated, Counter {
  edges: { node: EdgeComment }[];
}

interface PhotoEdgeNode extends LikeableEdge {
  id: string;
  shortcode: string;
  taken_at_timestamp: number;
  is_video: boolean;
  display_url: string;
  dimensions: {
    height: number;
    width: number;
  };
  edge_media_to_caption: {
    edges: {
      node: {
        text: string;
      };
    }[];
  };
  comments_disabled: boolean;
  edge_media_to_comment: Counter;
  owner: {
    id: string;
  };
}

export interface HashtagSearchResults {
  hashtag: {
    name: string;
    edge_hashtag_to_media: Paginated &
      Counter & {
        edges: { node: PhotoEdgeNode }[];
      };
  };
}

export interface Followers extends Counter, Paginated {
  data: UserBase[];
}

export interface UserProfile extends UserBase {
  full_name: string;
  edge_followed_by: Counter;
  edge_follow: Counter;
}

export interface InstagramClient {
  /** Login in the account, this method returns user (true when username is valid) and authenticated (true when login was successful) */
  login: ({ username, password }?: { username: string; password: string }) => Promise<any>;
  /** Get user by username, this method not require authentication for public profiles. */
  getUserByUsername: ({
    username
  }: {
    /** The username of the profile */
    username: string;
  }) => Promise<UserProfile>;
  /** Get followers for given userId. Be aware that the response gets slightly altered for easier usage. */
  getFollowers: ({
    userId,
    first,
    after
  }: {
    /** The user id */
    userId: string;
    /** Amount of followers to request. Default is 20 */
    first?: number;
    /** Optional end_cursor for pagination. */
    after?: string;
  }) => Promise<Followers>;
  /** Get photos for hashtag. */
  getPhotosByHashtag: ({
    hashtag,
    first,
    after
  }: {
    /** Hashtag to search by */
    hashtag: string;
    /** Number of records to return */
    first?: number;
    /** The query cursor for pagination */
    after?: string;
  }) => Promise<HashtagSearchResults>;

  /** This will return the media likes. */
  getMediaLikes: ({
    shortcode,
    first,
    after
  }: {
    /** The shortcode media like this: https://www.instagram.com/p/B-00000000/, only put shortcode like this : B-000000000 */
    shortcode: string;
    /**  A number of records to return max is 49 */
    first?: number;
    /** The query cursor for pagination */
    after?: string;
  }) => Promise<MediaLikes>;
  /** This will return the media comments. */
  getMediaComments: ({
    shortcode,
    first,
    after
  }: {
    /** The shortcode media like this: https://www.instagram.com/p/B-00000000/, only put shortcode like this : B-000000000 */
    shortcode: string;
    /**  A number of records to return max is 49 */
    first?: number;
    /** The query cursor for pagination */
    after?: string;
  }) => Promise<MediaComments>;
}

export interface User {
  id: string;
  username: string;
  isVerified: boolean;
}

export interface Photo {
  id: string;
  ownerId: string;
  imagePath: string;
  caption: string;
  likesCount: number;
  commentCount: number;
  commentsDisabled: boolean;
  isVideo: boolean;
  dateCreated: string;
  height: number;
  width: number;
}

export function mapEdgeNodeToPhoto(edge: { node: PhotoEdgeNode }): Photo {
  const photo = edge.node;

  return <Photo>{
    id: photo.shortcode,
    ownerId: photo.owner.id,
    imagePath: photo.display_url,
    caption: photo.edge_media_to_caption.edges.length ? photo.edge_media_to_caption.edges[0].node.text : '',
    likesCount: photo.edge_liked_by.count,
    commentCount: photo.edge_media_to_comment.count,
    isVideo: photo.is_video,
    dateCreated: new Date(photo.taken_at_timestamp * 1000).toISOString(),
    height: photo.dimensions.height,
    width: photo.dimensions.width
  };
}
export interface Comment {
  id: string;
  writtenBy: User;
  text: string;
}

export function mapMediaCommentToComment(edge: { node: EdgeComment }): Comment {
  const node = edge.node;
  return <Comment>{
    id: node.id,
    writtenBy: {
      id: node.owner.id,
      username: node.owner.username,
      isVerified: node.owner.is_verified
    },
    text: node.text
  };
}

export interface Like {
  id: string;
  username: string;
  isVerified: boolean;
}

export function mapMediaLikeToLike(edge: { node: UserBase }): Like {
  const node = edge.node;
  return <Like>{
    id: node.id,
    username: node.username,
    isVerified: node.is_verified
  };
}
