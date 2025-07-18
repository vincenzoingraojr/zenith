import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type Affiliation = {
  __typename?: 'Affiliation';
  affiliationId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  organizationId: Scalars['Int']['output'];
  status: Scalars['Boolean']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type Article = {
  __typename?: 'Article';
  author: User;
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  cover: ArticleCover;
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  draft: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  isEdited: Scalars['Boolean']['output'];
  itemId: Scalars['String']['output'];
  lang: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topics?: Maybe<Array<Scalars['JSONObject']['output']>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ArticleCover = {
  __typename?: 'ArticleCover';
  alt: Scalars['String']['output'];
  src: Scalars['String']['output'];
};

export type BirthDate = {
  __typename?: 'BirthDate';
  date: Scalars['String']['output'];
  monthAndDayVisibility: Scalars['String']['output'];
  yearVisibility: Scalars['String']['output'];
};

export type Block = {
  __typename?: 'Block';
  blockedId: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  origin: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type Bookmark = {
  __typename?: 'Bookmark';
  authorId: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  itemId: Scalars['Int']['output'];
  itemType: Scalars['String']['output'];
  origin: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Chat = {
  __typename?: 'Chat';
  chatId: Scalars['String']['output'];
  chatImage?: Maybe<Scalars['String']['output']>;
  chatTitle?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  creatorId: Scalars['Int']['output'];
  events?: Maybe<Array<Event>>;
  id: Scalars['Int']['output'];
  messages?: Maybe<Array<Message>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  users: Array<ChatUser>;
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  chat?: Maybe<Chat>;
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean']['output'];
  status?: Maybe<Scalars['String']['output']>;
};

export type ChatUser = {
  __typename?: 'ChatUser';
  chat: Chat;
  createdAt: Scalars['String']['output'];
  hiddenMessagesIds?: Maybe<Array<Scalars['Int']['output']>>;
  id: Scalars['Int']['output'];
  inside: Scalars['Boolean']['output'];
  joinedChat: Scalars['String']['output'];
  lastExit?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type Event = {
  __typename?: 'Event';
  authorId: Scalars['Int']['output'];
  chat: Chat;
  createdAt: Scalars['String']['output'];
  eventMessage: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  itemId: Scalars['String']['output'];
  resourceId?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type FeedItemStats = {
  __typename?: 'FeedItemStats';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  itemId: Scalars['String']['output'];
  itemType: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  views: Scalars['Int']['output'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['String']['output'];
  follower: User;
  id: Scalars['Int']['output'];
  origin: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type IdentityVerification = {
  __typename?: 'IdentityVerification';
  verified: VerificationStatus;
  verifiedSince?: Maybe<Scalars['String']['output']>;
};

export type LandingUser = {
  __typename?: 'LandingUser';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  itemOpened: Scalars['Boolean']['output'];
  itemType: Scalars['String']['output'];
  likedItemId: Scalars['String']['output'];
  origin: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type MediaItem = {
  __typename?: 'MediaItem';
  alt: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  post: Post;
  src: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Message = {
  __typename?: 'Message';
  authorId: Scalars['Int']['output'];
  chat: Chat;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  hashtags?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['Int']['output'];
  isEdited: Scalars['Boolean']['output'];
  isReplyToId?: Maybe<Scalars['Int']['output']>;
  itemId: Scalars['String']['output'];
  media: MessageMedia;
  mentions?: Maybe<Array<Scalars['String']['output']>>;
  messageItem: MessageItem;
  status: MessageStatus;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type MessageItem = {
  __typename?: 'MessageItem';
  id?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type MessageMedia = {
  __typename?: 'MessageMedia';
  src?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type MessageNotification = {
  __typename?: 'MessageNotification';
  chatId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  notificationId: Scalars['String']['output'];
  notificationType: Scalars['String']['output'];
  recipientId: Scalars['Int']['output'];
  resourceId: Scalars['Int']['output'];
  resourceType: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  viewed: Scalars['Boolean']['output'];
};

/** Message or Event type */
export type MessageOrEvent = Event | Message;

/** Possible message status values */
export enum MessageStatus {
  Sent = 'SENT',
  Viewed = 'VIEWED'
}

export type Mutation = {
  __typename?: 'Mutation';
  addLandingUser: UserResponse;
  addNewUsersToGroup: ChatResponse;
  authSendVerificationEmail: UserResponse;
  blockUser?: Maybe<Block>;
  changePassword: UserResponse;
  changeUserRole: Scalars['Boolean']['output'];
  changeUsername: UserResponse;
  createAffiliation?: Maybe<Affiliation>;
  createBookmark?: Maybe<Bookmark>;
  createChatOrGroup: ChatResponse;
  createDeviceToken: Scalars['Boolean']['output'];
  createOrganization: UserResponse;
  createPost: PostResponse;
  createReport: ReportResponse;
  createRepost?: Maybe<Repost>;
  createSession?: Maybe<Session>;
  deactivateAccount: Scalars['Boolean']['output'];
  deleteAccountData: Scalars['Boolean']['output'];
  deleteDeviceToken: Scalars['Boolean']['output'];
  deleteDeviceTokens: Scalars['Boolean']['output'];
  deleteMeFromGroup: Scalars['Boolean']['output'];
  deleteMessageForEveryone: Scalars['Boolean']['output'];
  deleteMessageForMe: Scalars['Boolean']['output'];
  deleteOrAbandonChatOrGroup: Scalars['Boolean']['output'];
  deleteOtherSessions: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  deleteRepost: Scalars['Boolean']['output'];
  deleteSession: Scalars['Boolean']['output'];
  editBirthDate: UserResponse;
  editEmailAddress: UserResponse;
  editGroupInfo: ChatResponse;
  editHideBlockedAccountsSetting?: Maybe<Scalars['Boolean']['output']>;
  editHideSensitiveContentSetting?: Maybe<Scalars['Boolean']['output']>;
  editIncomingMessages: UserResponse;
  editMessage: Scalars['Boolean']['output'];
  editPost: PostResponse;
  editProfile: UserResponse;
  editTwoFactorAuth: UserResponse;
  findUserBeforeLogIn: UserResponse;
  followUser?: Maybe<Follow>;
  likePost?: Maybe<Like>;
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  manageAffiliation?: Maybe<Affiliation>;
  notAuthModifyPassword: UserResponse;
  reactivateAccount: UserResponse;
  removeAffiliation: Scalars['Boolean']['output'];
  removeBookmark: Scalars['Boolean']['output'];
  removeLike: Scalars['Boolean']['output'];
  removeUserFromGroup: Scalars['Boolean']['output'];
  requestIdentityVerification: UserResponse;
  requestVerification: UserResponse;
  resendOTP: Scalars['Boolean']['output'];
  revokeMention: PostResponse;
  sendMessage?: Maybe<Message>;
  sendRecoveryEmail: UserResponse;
  signup: UserResponse;
  unblockUser: Scalars['Boolean']['output'];
  unfollowUser: Scalars['Boolean']['output'];
  updateGender: UserResponse;
  verifyEmailAddress: UserResponse;
  verifyOTP: UserResponse;
  viewFeedItem?: Maybe<ViewLog>;
  viewMessage?: Maybe<Message>;
  viewMessageNotifications: Scalars['Boolean']['output'];
  viewNotification: Scalars['Boolean']['output'];
};


export type MutationAddLandingUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationAddNewUsersToGroupArgs = {
  chatId: Scalars['String']['input'];
  userIds: Array<Scalars['Int']['input']>;
};


export type MutationBlockUserArgs = {
  origin: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationChangeUserRoleArgs = {
  chatId: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};


export type MutationChangeUsernameArgs = {
  username: Scalars['String']['input'];
};


export type MutationCreateAffiliationArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateBookmarkArgs = {
  itemId: Scalars['String']['input'];
  origin: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationCreateChatOrGroupArgs = {
  chatImage?: InputMaybe<Scalars['String']['input']>;
  chatTitle?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  userIds: Array<Scalars['Int']['input']>;
};


export type MutationCreateDeviceTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateOrganizationArgs = {
  birthDate: Scalars['DateTimeISO']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String']['input'];
  isReplyToId?: InputMaybe<Scalars['Int']['input']>;
  isReplyToType?: InputMaybe<Scalars['String']['input']>;
  media: Scalars['String']['input'];
  quotedPostId?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};


export type MutationCreateReportArgs = {
  additionalContentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  additionalContentType?: InputMaybe<Scalars['String']['input']>;
  categoryId: Scalars['Int']['input'];
  contentId: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateRepostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationCreateSessionArgs = {
  clientName: Scalars['String']['input'];
  clientOS: Scalars['String']['input'];
  clientType: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationDeleteAccountDataArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteDeviceTokenArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteMeFromGroupArgs = {
  chatId: Scalars['String']['input'];
};


export type MutationDeleteMessageForEveryoneArgs = {
  chatId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
};


export type MutationDeleteMessageForMeArgs = {
  chatId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
};


export type MutationDeleteOrAbandonChatOrGroupArgs = {
  chatId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationDeleteRepostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationDeleteSessionArgs = {
  sessionId: Scalars['String']['input'];
};


export type MutationEditBirthDateArgs = {
  birthDate: Scalars['DateTimeISO']['input'];
  monthAndDayVisibility: Scalars['String']['input'];
  yearVisibility: Scalars['String']['input'];
};


export type MutationEditEmailAddressArgs = {
  confirmEmail: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationEditGroupInfoArgs = {
  chatId: Scalars['String']['input'];
  chatImage: Scalars['String']['input'];
  chatTitle: Scalars['String']['input'];
};


export type MutationEditIncomingMessagesArgs = {
  incomingMessages: Scalars['String']['input'];
};


export type MutationEditMessageArgs = {
  chatId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  deleteMedia?: InputMaybe<Scalars['Boolean']['input']>;
  media?: InputMaybe<Scalars['String']['input']>;
  messageId: Scalars['String']['input'];
};


export type MutationEditPostArgs = {
  content: Scalars['String']['input'];
  media: Scalars['String']['input'];
  postId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationEditProfileArgs = {
  bio: Scalars['String']['input'];
  name: Scalars['String']['input'];
  profileBanner: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
  website: Scalars['String']['input'];
};


export type MutationFindUserBeforeLogInArgs = {
  input: Scalars['String']['input'];
};


export type MutationFollowUserArgs = {
  origin: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationLikePostArgs = {
  itemId: Scalars['String']['input'];
  itemOpened: Scalars['Boolean']['input'];
  itemType: Scalars['String']['input'];
  origin: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  clientName: Scalars['String']['input'];
  clientOS: Scalars['String']['input'];
  clientType: Scalars['String']['input'];
  input: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationManageAffiliationArgs = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  affiliationId: Scalars['String']['input'];
};


export type MutationNotAuthModifyPasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationReactivateAccountArgs = {
  input: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveAffiliationArgs = {
  affiliationId: Scalars['String']['input'];
};


export type MutationRemoveBookmarkArgs = {
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationRemoveLikeArgs = {
  itemId: Scalars['String']['input'];
  itemType: Scalars['String']['input'];
};


export type MutationRemoveUserFromGroupArgs = {
  chatId: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationRequestIdentityVerificationArgs = {
  birthOrCreationDate: Scalars['DateTimeISO']['input'];
  country: Scalars['String']['input'];
  documents: Scalars['String']['input'];
  entityIdentifier: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationRequestVerificationArgs = {
  documents: Scalars['String']['input'];
};


export type MutationResendOtpArgs = {
  input: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRevokeMentionArgs = {
  postId: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  chatPreview?: InputMaybe<Scalars['Boolean']['input']>;
  content: Scalars['String']['input'];
  isReplyToId?: InputMaybe<Scalars['Int']['input']>;
  item?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationSendRecoveryEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  birthDate: Scalars['DateTimeISO']['input'];
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUnblockUserArgs = {
  blockedId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUnfollowUserArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateGenderArgs = {
  gender: Scalars['String']['input'];
};


export type MutationVerifyEmailAddressArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyOtpArgs = {
  clientName?: InputMaybe<Scalars['String']['input']>;
  clientOS?: InputMaybe<Scalars['String']['input']>;
  clientType?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['String']['input']>;
  isLogin: Scalars['Boolean']['input'];
  otp: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationViewFeedItemArgs = {
  itemId: Scalars['String']['input'];
  itemOpened: Scalars['Boolean']['input'];
  origin: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationViewMessageArgs = {
  chatId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
};


export type MutationViewMessageNotificationsArgs = {
  chatId: Scalars['String']['input'];
};


export type MutationViewNotificationArgs = {
  notificationId: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  notificationId: Scalars['String']['output'];
  notificationType: Scalars['String']['output'];
  recipientId: Scalars['Int']['output'];
  resourceId: Scalars['Int']['output'];
  resourceType: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  viewed: Scalars['Boolean']['output'];
};

export type PaginatedAffiliations = {
  __typename?: 'PaginatedAffiliations';
  affiliations: Array<Affiliation>;
  hasMore: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedBlockActions = {
  __typename?: 'PaginatedBlockActions';
  blockActions: Array<Block>;
  hasMore: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedBookmarks = {
  __typename?: 'PaginatedBookmarks';
  bookmarks: Array<Bookmark>;
  hasMore: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedChatItems = {
  __typename?: 'PaginatedChatItems';
  chatItems: Array<MessageOrEvent>;
  hasMore: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedFollowRelations = {
  __typename?: 'PaginatedFollowRelations';
  followRelations: Array<Follow>;
  hasMore: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedLikes = {
  __typename?: 'PaginatedLikes';
  hasMore: Scalars['Boolean']['output'];
  likes: Array<Like>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedNotifications = {
  __typename?: 'PaginatedNotifications';
  nextCursor?: Maybe<Scalars['String']['output']>;
  notifications: Array<Notification>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean']['output'];
  posts: Array<Post>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedReposts = {
  __typename?: 'PaginatedReposts';
  hasMore: Scalars['Boolean']['output'];
  reposts: Array<Repost>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  hasMore: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  users: Array<User>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  hashtags: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isEdited: Scalars['Boolean']['output'];
  isReplyToId?: Maybe<Scalars['Int']['output']>;
  isReplyToType?: Maybe<Scalars['String']['output']>;
  itemId: Scalars['String']['output'];
  lang: Scalars['String']['output'];
  media?: Maybe<Array<MediaItem>>;
  quotedPostId?: Maybe<Scalars['Int']['output']>;
  topics?: Maybe<Array<Scalars['JSONObject']['output']>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PostMentions = {
  __typename?: 'PostMentions';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  mentions: Array<Scalars['String']['output']>;
  postId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean']['output'];
  post?: Maybe<Post>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String']['output'];
  profileBanner: Scalars['String']['output'];
  profilePicture: Scalars['String']['output'];
  website: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  affiliates: PaginatedAffiliations;
  allUnseenMessageNotifications?: Maybe<Array<MessageNotification>>;
  blockedUsers: PaginatedBlockActions;
  chatUsers?: Maybe<Array<User>>;
  chats?: Maybe<Array<Chat>>;
  currentSession?: Maybe<Session>;
  findAffiliationByUserId?: Maybe<Affiliation>;
  findAffiliationRequest?: Maybe<Affiliation>;
  findChat?: Maybe<Chat>;
  findMessage?: Maybe<Message>;
  findMessageById?: Maybe<Message>;
  findPost?: Maybe<Post>;
  findPostById?: Maybe<Post>;
  findSession?: Maybe<Session>;
  findUser?: Maybe<User>;
  findUserById?: Maybe<User>;
  findUserDeviceTokenById?: Maybe<UserDeviceToken>;
  findUserDeviceTokenBySessionId?: Maybe<UserDeviceToken>;
  findUserDeviceTokenByToken?: Maybe<UserDeviceToken>;
  findUserDeviceTokensByUserId?: Maybe<Array<UserDeviceToken>>;
  getBookmarks: PaginatedBookmarks;
  getFeedItemStats?: Maybe<FeedItemStats>;
  getFollowers: PaginatedFollowRelations;
  getFollowing: PaginatedFollowRelations;
  getLikedPosts: PaginatedLikes;
  getPostLikes: PaginatedLikes;
  getPostMentions?: Maybe<PostMentions>;
  getReposts: PaginatedReposts;
  hasThisUserAsAffiliate: Scalars['Boolean']['output'];
  hasUserBlockedMe?: Maybe<Block>;
  isAffiliatedTo?: Maybe<User>;
  isBookmarked?: Maybe<Bookmark>;
  isFollowedByMe?: Maybe<Follow>;
  isPostLikedByMe?: Maybe<Like>;
  isRepostedByUser?: Maybe<Repost>;
  isUserBlockedByMe?: Maybe<Block>;
  isUserFollowingMe?: Maybe<Follow>;
  landingUsers: Array<LandingUser>;
  latestMessageOrEvent?: Maybe<MessageOrEvent>;
  me?: Maybe<User>;
  messagesAndEvents: PaginatedChatItems;
  notificationFeed: PaginatedNotifications;
  otherSessions?: Maybe<Array<Session>>;
  postComments: PaginatedPosts;
  postFeed: PaginatedPosts;
  postMedia?: Maybe<Array<MediaItem>>;
  reportOptions?: Maybe<Array<ReportOption>>;
  search: SearchResult;
  topics?: Maybe<Array<Topic>>;
  unseenMessageNotifications?: Maybe<Array<MessageNotification>>;
  unseenNotifications: Array<Notification>;
  userComments: PaginatedPosts;
  userPostFeed: PaginatedPosts;
  usersToMention?: Maybe<Array<User>>;
  usersToMessage: PaginatedUsers;
};


export type QueryAffiliatesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryBlockedUsersArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryChatUsersArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAffiliationByUserIdArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindAffiliationRequestArgs = {
  affiliationId: Scalars['String']['input'];
};


export type QueryFindChatArgs = {
  chatId: Scalars['String']['input'];
};


export type QueryFindMessageArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  messageId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindMessageByIdArgs = {
  chatId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindPostArgs = {
  postId: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindPostByIdArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindSessionArgs = {
  sessionId: Scalars['String']['input'];
};


export type QueryFindUserArgs = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  username: Scalars['String']['input'];
};


export type QueryFindUserByIdArgs = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindUserDeviceTokenByIdArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindUserDeviceTokenBySessionIdArgs = {
  sessionId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindUserDeviceTokenByTokenArgs = {
  token: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindUserDeviceTokensByUserIdArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetBookmarksArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryGetFeedItemStatsArgs = {
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type QueryGetFollowersArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryGetFollowingArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryGetLikedPostsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryGetPostLikesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  itemId: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


export type QueryGetPostMentionsArgs = {
  postId: Scalars['String']['input'];
};


export type QueryGetRepostsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  postId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryHasThisUserAsAffiliateArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryHasUserBlockedMeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsAffiliatedToArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsBookmarkedArgs = {
  itemId?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};


export type QueryIsFollowedByMeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsPostLikedByMeArgs = {
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type QueryIsRepostedByUserArgs = {
  postId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsUserBlockedByMeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsUserFollowingMeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLatestMessageOrEventArgs = {
  chatId: Scalars['String']['input'];
};


export type QueryMessagesAndEventsArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryNotificationFeedArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryPostCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


export type QueryPostFeedArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryPostMediaArgs = {
  postId: Scalars['String']['input'];
};


export type QueryReportOptionsArgs = {
  type: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  keyword: Scalars['String']['input'];
  postsLimit?: Scalars['Int']['input'];
  postsOffset?: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  usersLimit?: Scalars['Int']['input'];
  usersOffset?: Scalars['Int']['input'];
};


export type QueryUnseenMessageNotificationsArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserPostFeedArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersToMentionArgs = {
  limit: Scalars['Int']['input'];
  query: Scalars['String']['input'];
};


export type QueryUsersToMessageArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};

export type Report = {
  __typename?: 'Report';
  additionalContentIds?: Maybe<Array<Scalars['Int']['output']>>;
  additionalContentType?: Maybe<Scalars['String']['output']>;
  authorId?: Maybe<Scalars['Int']['output']>;
  categoryId: Scalars['Int']['output'];
  contentId: Scalars['String']['output'];
  contentType: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  outcome?: Maybe<Scalars['String']['output']>;
  reportId: Scalars['String']['output'];
  status: ReportStatus;
  subCategoryId?: Maybe<Scalars['Int']['output']>;
  uniqueIdentifier: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ReportOption = {
  __typename?: 'ReportOption';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  subcategories?: Maybe<Array<SubCategoryOption>>;
  title: Scalars['String']['output'];
};

export type ReportResponse = {
  __typename?: 'ReportResponse';
  ok: Scalars['Boolean']['output'];
  report?: Maybe<Report>;
  status?: Maybe<Scalars['String']['output']>;
};

/** Possible status of a report */
export enum ReportStatus {
  Closed = 'CLOSED',
  Open = 'OPEN',
  Reopened = 'REOPENED',
  Resolved = 'RESOLVED',
  UnderReview = 'UNDER_REVIEW'
}

export type Repost = {
  __typename?: 'Repost';
  authorId: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  postId: Scalars['Int']['output'];
  repostId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  hasMorePosts: Scalars['Boolean']['output'];
  hasMoreUsers: Scalars['Boolean']['output'];
  posts?: Maybe<Array<Post>>;
  users?: Maybe<Array<User>>;
};

export type SearchSettings = {
  __typename?: 'SearchSettings';
  hideBlockedAccounts: Scalars['Boolean']['output'];
  hideSensitiveContent: Scalars['Boolean']['output'];
};

export type Session = {
  __typename?: 'Session';
  clientName: Scalars['String']['output'];
  clientOS: Scalars['String']['output'];
  clientType: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deviceLocation: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  sessionId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type Settings = {
  __typename?: 'Settings';
  incomingMessages: Scalars['String']['output'];
  twoFactorAuth: Scalars['Boolean']['output'];
};

export type SubCategoryOption = {
  __typename?: 'SubCategoryOption';
  categoryId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  addedChatUsers: Array<User>;
  deletedChatUser: User;
  deletedMessageNotification: MessageNotification;
  deletedMessageOrEvent: MessageOrEvent;
  deletedNotification: Notification;
  editedChat: Chat;
  editedChatUser: ChatUser;
  editedMessage: Message;
  editedPost: Post;
  newChat: Chat;
  newMessageNotification: MessageNotification;
  newMessageOrEvent: MessageOrEvent;
  newNotification: Notification;
};


export type SubscriptionAddedChatUsersArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionDeletedChatUserArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionDeletedMessageNotificationArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionDeletedMessageOrEventArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionDeletedNotificationArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionEditedChatArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionEditedChatUserArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionEditedMessageArgs = {
  messageId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionEditedPostArgs = {
  postId: Scalars['String']['input'];
};


export type SubscriptionNewChatArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionNewMessageNotificationArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionNewMessageOrEventArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionNewNotificationArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type Topic = {
  __typename?: 'Topic';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  articles?: Maybe<Array<Article>>;
  birthDate: BirthDate;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  followers?: Maybe<Array<Follow>>;
  following?: Maybe<Array<Follow>>;
  gender: Scalars['String']['output'];
  hiddenPosts: Array<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  identity: IdentityVerification;
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  profile: Profile;
  searchSettings: SearchSettings;
  sessions?: Maybe<Array<Session>>;
  topics?: Maybe<Array<Scalars['JSONObject']['output']>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userSettings: Settings;
  username: Scalars['String']['output'];
  verification: Verification;
};

export type UserDeviceToken = {
  __typename?: 'UserDeviceToken';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  sessionId: Scalars['String']['output'];
  token: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean']['output'];
  status?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Verification = {
  __typename?: 'Verification';
  verified: VerificationStatus;
  verifiedSince?: Maybe<Scalars['String']['output']>;
};

/** Possible verification request status values */
export enum VerificationStatus {
  Failed = 'FAILED',
  UnderReview = 'UNDER_REVIEW',
  Verified = 'VERIFIED'
}

export type ViewLog = {
  __typename?: 'ViewLog';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isAuth: Scalars['Boolean']['output'];
  itemId: Scalars['String']['output'];
  itemOpened: Scalars['Boolean']['output'];
  itemType: Scalars['String']['output'];
  origin: Scalars['String']['output'];
  uniqueIdentifier: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId?: Maybe<Scalars['Int']['output']>;
};

export type UsersToMessageQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type UsersToMessageQuery = { __typename?: 'Query', usersToMessage: { __typename?: 'PaginatedUsers', hasMore: boolean, users: Array<{ __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }> } };

export type CreateDeviceTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type CreateDeviceTokenMutation = { __typename?: 'Mutation', createDeviceToken: boolean };

export type DeletedNotificationSubscriptionVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeletedNotificationSubscription = { __typename?: 'Subscription', deletedNotification: { __typename?: 'Notification', id: number, notificationId: string, creatorId: number, recipientId: number, resourceId: number, resourceType: string, notificationType: string, content: string, viewed: boolean, createdAt: string, updatedAt: string } };

export type NewNotificationSubscriptionVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NewNotificationSubscription = { __typename?: 'Subscription', newNotification: { __typename?: 'Notification', id: number, notificationId: string, creatorId: number, recipientId: number, resourceId: number, resourceType: string, notificationType: string, content: string, viewed: boolean, createdAt: string, updatedAt: string } };

export type NotificationFeedQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
}>;


export type NotificationFeedQuery = { __typename?: 'Query', notificationFeed: { __typename?: 'PaginatedNotifications', nextCursor?: string | null, notifications: Array<{ __typename?: 'Notification', id: number, notificationId: string, creatorId: number, recipientId: number, resourceId: number, resourceType: string, notificationType: string, content: string, viewed: boolean, createdAt: string, updatedAt: string }> } };

export type UnseenNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnseenNotificationsQuery = { __typename?: 'Query', unseenNotifications: Array<{ __typename?: 'Notification', id: number, notificationId: string, creatorId: number, recipientId: number, resourceId: number, resourceType: string, notificationType: string, content: string, viewed: boolean, createdAt: string, updatedAt: string }> };

export type ViewNotificationMutationVariables = Exact<{
  notificationId: Scalars['String']['input'];
}>;


export type ViewNotificationMutation = { __typename?: 'Mutation', viewNotification: boolean };

export type CreateBookmarkMutationVariables = Exact<{
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  origin: Scalars['String']['input'];
}>;


export type CreateBookmarkMutation = { __typename?: 'Mutation', createBookmark?: { __typename?: 'Bookmark', id: number, itemId: number, itemType: string, origin: string, authorId: number, createdAt: string, updatedAt: string } | null };

export type CreatePostMutationVariables = Exact<{
  type: Scalars['String']['input'];
  content: Scalars['String']['input'];
  media: Scalars['String']['input'];
  isReplyToId?: InputMaybe<Scalars['Int']['input']>;
  isReplyToType?: InputMaybe<Scalars['String']['input']>;
  quotedPostId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', ok: boolean, status?: string | null, post?: { __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateRepostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type CreateRepostMutation = { __typename?: 'Mutation', createRepost?: { __typename?: 'Repost', id: number, repostId: string, postId: number, authorId: number, createdAt: string, updatedAt: string } | null };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type DeleteRepostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type DeleteRepostMutation = { __typename?: 'Mutation', deleteRepost: boolean };

export type EditPostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  content: Scalars['String']['input'];
  media: Scalars['String']['input'];
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'PostResponse', ok: boolean, status?: string | null, post?: { __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type EditedPostSubscriptionVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type EditedPostSubscription = { __typename?: 'Subscription', editedPost: { __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null } };

export type FindPostQueryVariables = Exact<{
  postId: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindPostQuery = { __typename?: 'Query', findPost?: { __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null } | null };

export type FindPostByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindPostByIdQuery = { __typename?: 'Query', findPostById?: { __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null } | null };

export type GetFeedItemStatsQueryVariables = Exact<{
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
}>;


export type GetFeedItemStatsQuery = { __typename?: 'Query', getFeedItemStats?: { __typename?: 'FeedItemStats', views: number } | null };

export type GetPostLikesQueryVariables = Exact<{
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostLikesQuery = { __typename?: 'Query', getPostLikes: { __typename?: 'PaginatedLikes', hasMore: boolean, totalCount?: number | null, likes: Array<{ __typename?: 'Like', id: number, userId: number, likedItemId: string, itemOpened: boolean, itemType: string, origin: string, createdAt: string, updatedAt: string }> } };

export type GetPostMentionsQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type GetPostMentionsQuery = { __typename?: 'Query', getPostMentions?: { __typename?: 'PostMentions', mentions: Array<string> } | null };

export type GetRepostsQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetRepostsQuery = { __typename?: 'Query', getReposts: { __typename?: 'PaginatedReposts', hasMore: boolean, totalCount?: number | null, reposts: Array<{ __typename?: 'Repost', id: number, repostId: string, postId: number, authorId: number, createdAt: string, updatedAt: string }> } };

export type IsBookmarkedQueryVariables = Exact<{
  itemId?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
}>;


export type IsBookmarkedQuery = { __typename?: 'Query', isBookmarked?: { __typename?: 'Bookmark', id: number, itemId: number, itemType: string, origin: string, authorId: number, createdAt: string, updatedAt: string } | null };

export type IsPostLikedByMeQueryVariables = Exact<{
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
}>;


export type IsPostLikedByMeQuery = { __typename?: 'Query', isPostLikedByMe?: { __typename?: 'Like', id: number, userId: number, likedItemId: string, itemOpened: boolean, itemType: string, origin: string, createdAt: string, updatedAt: string } | null };

export type IsRepostedByUserQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IsRepostedByUserQuery = { __typename?: 'Query', isRepostedByUser?: { __typename?: 'Repost', id: number, repostId: string, postId: number, authorId: number, createdAt: string, updatedAt: string } | null };

export type LikePostMutationVariables = Exact<{
  itemId: Scalars['String']['input'];
  origin: Scalars['String']['input'];
  itemOpened: Scalars['Boolean']['input'];
  itemType: Scalars['String']['input'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost?: { __typename?: 'Like', id: number, userId: number, likedItemId: string, itemOpened: boolean, itemType: string, origin: string, createdAt: string, updatedAt: string } | null };

export type PostCommentsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostCommentsQuery = { __typename?: 'Query', postComments: { __typename?: 'PaginatedPosts', hasMore: boolean, totalCount?: number | null, posts: Array<{ __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null }> } };

export type PostFeedQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostFeedQuery = { __typename?: 'Query', postFeed: { __typename?: 'PaginatedPosts', hasMore: boolean, totalCount?: number | null, posts: Array<{ __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null }> } };

export type RemoveBookmarkMutationVariables = Exact<{
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
}>;


export type RemoveBookmarkMutation = { __typename?: 'Mutation', removeBookmark: boolean };

export type RemoveLikeMutationVariables = Exact<{
  itemId: Scalars['String']['input'];
  itemType: Scalars['String']['input'];
}>;


export type RemoveLikeMutation = { __typename?: 'Mutation', removeLike: boolean };

export type RevokeMentionMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type RevokeMentionMutation = { __typename?: 'Mutation', revokeMention: { __typename?: 'PostResponse', ok: boolean, status?: string | null } };

export type ViewFeedItemMutationVariables = Exact<{
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  itemOpened: Scalars['Boolean']['input'];
  origin: Scalars['String']['input'];
}>;


export type ViewFeedItemMutation = { __typename?: 'Mutation', viewFeedItem?: { __typename?: 'ViewLog', id: number, itemId: string, uniqueIdentifier: string, userId?: number | null, isAuth: boolean, itemOpened: boolean, itemType: string, origin: string, createdAt: string, updatedAt: string } | null };

export type CreateReportMutationVariables = Exact<{
  contentId: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  categoryId: Scalars['Int']['input'];
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
  additionalContentIds?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  additionalContentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport: { __typename?: 'ReportResponse', status?: string | null, ok: boolean } };

export type ReportOptionsQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;


export type ReportOptionsQuery = { __typename?: 'Query', reportOptions?: Array<{ __typename?: 'ReportOption', id: number, title: string, description: string, subcategories?: Array<{ __typename?: 'SubCategoryOption', categoryId: number, id: number, title: string, description?: string | null }> | null }> | null };

export type SearchQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
  type: Scalars['String']['input'];
  postsLimit: Scalars['Int']['input'];
  postsOffset: Scalars['Int']['input'];
  usersLimit: Scalars['Int']['input'];
  usersOffset: Scalars['Int']['input'];
}>;


export type SearchQuery = { __typename?: 'Query', search: { __typename?: 'SearchResult', hasMorePosts: boolean, hasMoreUsers: boolean, posts?: Array<{ __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null }> | null, users?: Array<{ __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }> | null } };

export type BlockUserMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
  origin: Scalars['String']['input'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser?: { __typename?: 'Block', id: number, blockedId: number, userId: number, origin: string, createdAt: string, updatedAt: string } | null };

export type FindUserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } | null };

export type FindUserBeforeLogInMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type FindUserBeforeLogInMutation = { __typename?: 'Mutation', findUserBeforeLogIn: { __typename?: 'UserResponse', status?: string | null, ok: boolean, user?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type FindUserByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindUserByIdQuery = { __typename?: 'Query', findUserById?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } | null };

export type FollowUserMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
  origin: Scalars['String']['input'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'Follow', id: number, origin: string, createdAt: string, updatedAt: string, follower: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, user: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } } | null };

export type GetFollowersQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFollowersQuery = { __typename?: 'Query', getFollowers: { __typename?: 'PaginatedFollowRelations', hasMore: boolean, totalCount?: number | null, followRelations: Array<{ __typename?: 'Follow', id: number, origin: string, createdAt: string, updatedAt: string, follower: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, user: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } }> } };

export type HasThisUserAsAffiliateQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type HasThisUserAsAffiliateQuery = { __typename?: 'Query', hasThisUserAsAffiliate: boolean };

export type HasUserBlockedMeQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type HasUserBlockedMeQuery = { __typename?: 'Query', hasUserBlockedMe?: { __typename?: 'Block', id: number, blockedId: number, userId: number, origin: string, createdAt: string, updatedAt: string } | null };

export type IsAffiliatedToQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IsAffiliatedToQuery = { __typename?: 'Query', isAffiliatedTo?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } | null };

export type IsFollowedByMeQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IsFollowedByMeQuery = { __typename?: 'Query', isFollowedByMe?: { __typename?: 'Follow', id: number, origin: string, createdAt: string, updatedAt: string, follower: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, user: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } } | null };

export type IsUserBlockedByMeQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IsUserBlockedByMeQuery = { __typename?: 'Query', isUserBlockedByMe?: { __typename?: 'Block', id: number, blockedId: number, userId: number, origin: string, createdAt: string, updatedAt: string } | null };

export type LoginMutationVariables = Exact<{
  input: Scalars['String']['input'];
  password: Scalars['String']['input'];
  clientOS: Scalars['String']['input'];
  clientType: Scalars['String']['input'];
  clientName: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', accessToken?: string | null, status?: string | null, ok: boolean, user?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } | null };

export type NotAuthModifyPasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type NotAuthModifyPasswordMutation = { __typename?: 'Mutation', notAuthModifyPassword: { __typename?: 'UserResponse', status?: string | null, ok: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ReactivateAccountMutationVariables = Exact<{
  input: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ReactivateAccountMutation = { __typename?: 'Mutation', reactivateAccount: { __typename?: 'UserResponse', status?: string | null, ok: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ResendOtpMutationVariables = Exact<{
  input: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResendOtpMutation = { __typename?: 'Mutation', resendOTP: boolean };

export type SendRecoveryEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendRecoveryEmailMutation = { __typename?: 'Mutation', sendRecoveryEmail: { __typename?: 'UserResponse', status?: string | null, ok: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  birthDate: Scalars['DateTimeISO']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserResponse', status?: string | null, ok: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UnblockUserMutationVariables = Exact<{
  blockedId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UnblockUserMutation = { __typename?: 'Mutation', unblockUser: boolean };

export type UnfollowUserMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: boolean };

export type UsersToMentionQueryVariables = Exact<{
  query: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
}>;


export type UsersToMentionQuery = { __typename?: 'Query', usersToMention?: Array<{ __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }> | null };

export type VerifyEmailAddressMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyEmailAddressMutation = { __typename?: 'Mutation', verifyEmailAddress: { __typename?: 'UserResponse', status?: string | null, ok: boolean } };

export type VerifyOtpMutationVariables = Exact<{
  otp: Scalars['String']['input'];
  input?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  isLogin: Scalars['Boolean']['input'];
  clientOS?: InputMaybe<Scalars['String']['input']>;
  clientType?: InputMaybe<Scalars['String']['input']>;
  clientName?: InputMaybe<Scalars['String']['input']>;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOTP: { __typename?: 'UserResponse', status?: string | null, accessToken?: string | null, ok: boolean, user?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } | null } };


export const UsersToMessageDocument = gql`
    query UsersToMessage($limit: Int!, $cursor: String) {
  usersToMessage(limit: $limit, cursor: $cursor) {
    users {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    hasMore
  }
}
    `;

/**
 * __useUsersToMessageQuery__
 *
 * To run a query within a React component, call `useUsersToMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersToMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersToMessageQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUsersToMessageQuery(baseOptions: ApolloReactHooks.QueryHookOptions<UsersToMessageQuery, UsersToMessageQueryVariables> & ({ variables: UsersToMessageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UsersToMessageQuery, UsersToMessageQueryVariables>(UsersToMessageDocument, options);
      }
export function useUsersToMessageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersToMessageQuery, UsersToMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UsersToMessageQuery, UsersToMessageQueryVariables>(UsersToMessageDocument, options);
        }
export function useUsersToMessageSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UsersToMessageQuery, UsersToMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UsersToMessageQuery, UsersToMessageQueryVariables>(UsersToMessageDocument, options);
        }
export type UsersToMessageQueryHookResult = ReturnType<typeof useUsersToMessageQuery>;
export type UsersToMessageLazyQueryHookResult = ReturnType<typeof useUsersToMessageLazyQuery>;
export type UsersToMessageSuspenseQueryHookResult = ReturnType<typeof useUsersToMessageSuspenseQuery>;
export type UsersToMessageQueryResult = Apollo.QueryResult<UsersToMessageQuery, UsersToMessageQueryVariables>;
export const CreateDeviceTokenDocument = gql`
    mutation CreateDeviceToken($token: String!) {
  createDeviceToken(token: $token)
}
    `;
export type CreateDeviceTokenMutationFn = Apollo.MutationFunction<CreateDeviceTokenMutation, CreateDeviceTokenMutationVariables>;

/**
 * __useCreateDeviceTokenMutation__
 *
 * To run a mutation, you first call `useCreateDeviceTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeviceTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeviceTokenMutation, { data, loading, error }] = useCreateDeviceTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCreateDeviceTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDeviceTokenMutation, CreateDeviceTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateDeviceTokenMutation, CreateDeviceTokenMutationVariables>(CreateDeviceTokenDocument, options);
      }
export type CreateDeviceTokenMutationHookResult = ReturnType<typeof useCreateDeviceTokenMutation>;
export type CreateDeviceTokenMutationResult = Apollo.MutationResult<CreateDeviceTokenMutation>;
export type CreateDeviceTokenMutationOptions = Apollo.BaseMutationOptions<CreateDeviceTokenMutation, CreateDeviceTokenMutationVariables>;
export const DeletedNotificationDocument = gql`
    subscription DeletedNotification($userId: Int) {
  deletedNotification(userId: $userId) {
    id
    notificationId
    creatorId
    recipientId
    resourceId
    resourceType
    notificationType
    content
    viewed
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useDeletedNotificationSubscription__
 *
 * To run a query within a React component, call `useDeletedNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeletedNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeletedNotificationSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeletedNotificationSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DeletedNotificationSubscription, DeletedNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<DeletedNotificationSubscription, DeletedNotificationSubscriptionVariables>(DeletedNotificationDocument, options);
      }
export type DeletedNotificationSubscriptionHookResult = ReturnType<typeof useDeletedNotificationSubscription>;
export type DeletedNotificationSubscriptionResult = Apollo.SubscriptionResult<DeletedNotificationSubscription>;
export const NewNotificationDocument = gql`
    subscription NewNotification($userId: Int) {
  newNotification(userId: $userId) {
    id
    notificationId
    creatorId
    recipientId
    resourceId
    resourceType
    notificationType
    content
    viewed
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useNewNotificationSubscription__
 *
 * To run a query within a React component, call `useNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewNotificationSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewNotificationSubscription, NewNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NewNotificationSubscription, NewNotificationSubscriptionVariables>(NewNotificationDocument, options);
      }
export type NewNotificationSubscriptionHookResult = ReturnType<typeof useNewNotificationSubscription>;
export type NewNotificationSubscriptionResult = Apollo.SubscriptionResult<NewNotificationSubscription>;
export const NotificationFeedDocument = gql`
    query NotificationFeed($cursor: String, $limit: Int!) {
  notificationFeed(cursor: $cursor, limit: $limit) {
    notifications {
      id
      notificationId
      creatorId
      recipientId
      resourceId
      resourceType
      notificationType
      content
      viewed
      createdAt
      updatedAt
    }
    nextCursor
  }
}
    `;

/**
 * __useNotificationFeedQuery__
 *
 * To run a query within a React component, call `useNotificationFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationFeedQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useNotificationFeedQuery(baseOptions: ApolloReactHooks.QueryHookOptions<NotificationFeedQuery, NotificationFeedQueryVariables> & ({ variables: NotificationFeedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<NotificationFeedQuery, NotificationFeedQueryVariables>(NotificationFeedDocument, options);
      }
export function useNotificationFeedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NotificationFeedQuery, NotificationFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<NotificationFeedQuery, NotificationFeedQueryVariables>(NotificationFeedDocument, options);
        }
export function useNotificationFeedSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<NotificationFeedQuery, NotificationFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<NotificationFeedQuery, NotificationFeedQueryVariables>(NotificationFeedDocument, options);
        }
export type NotificationFeedQueryHookResult = ReturnType<typeof useNotificationFeedQuery>;
export type NotificationFeedLazyQueryHookResult = ReturnType<typeof useNotificationFeedLazyQuery>;
export type NotificationFeedSuspenseQueryHookResult = ReturnType<typeof useNotificationFeedSuspenseQuery>;
export type NotificationFeedQueryResult = Apollo.QueryResult<NotificationFeedQuery, NotificationFeedQueryVariables>;
export const UnseenNotificationsDocument = gql`
    query UnseenNotifications {
  unseenNotifications {
    id
    notificationId
    creatorId
    recipientId
    resourceId
    resourceType
    notificationType
    content
    viewed
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useUnseenNotificationsQuery__
 *
 * To run a query within a React component, call `useUnseenNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnseenNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnseenNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnseenNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UnseenNotificationsQuery, UnseenNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UnseenNotificationsQuery, UnseenNotificationsQueryVariables>(UnseenNotificationsDocument, options);
      }
export function useUnseenNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UnseenNotificationsQuery, UnseenNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UnseenNotificationsQuery, UnseenNotificationsQueryVariables>(UnseenNotificationsDocument, options);
        }
export function useUnseenNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UnseenNotificationsQuery, UnseenNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UnseenNotificationsQuery, UnseenNotificationsQueryVariables>(UnseenNotificationsDocument, options);
        }
export type UnseenNotificationsQueryHookResult = ReturnType<typeof useUnseenNotificationsQuery>;
export type UnseenNotificationsLazyQueryHookResult = ReturnType<typeof useUnseenNotificationsLazyQuery>;
export type UnseenNotificationsSuspenseQueryHookResult = ReturnType<typeof useUnseenNotificationsSuspenseQuery>;
export type UnseenNotificationsQueryResult = Apollo.QueryResult<UnseenNotificationsQuery, UnseenNotificationsQueryVariables>;
export const ViewNotificationDocument = gql`
    mutation ViewNotification($notificationId: String!) {
  viewNotification(notificationId: $notificationId)
}
    `;
export type ViewNotificationMutationFn = Apollo.MutationFunction<ViewNotificationMutation, ViewNotificationMutationVariables>;

/**
 * __useViewNotificationMutation__
 *
 * To run a mutation, you first call `useViewNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewNotificationMutation, { data, loading, error }] = useViewNotificationMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useViewNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ViewNotificationMutation, ViewNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ViewNotificationMutation, ViewNotificationMutationVariables>(ViewNotificationDocument, options);
      }
export type ViewNotificationMutationHookResult = ReturnType<typeof useViewNotificationMutation>;
export type ViewNotificationMutationResult = Apollo.MutationResult<ViewNotificationMutation>;
export type ViewNotificationMutationOptions = Apollo.BaseMutationOptions<ViewNotificationMutation, ViewNotificationMutationVariables>;
export const CreateBookmarkDocument = gql`
    mutation CreateBookmark($itemId: String!, $type: String!, $origin: String!) {
  createBookmark(itemId: $itemId, type: $type, origin: $origin) {
    id
    itemId
    itemType
    origin
    authorId
    createdAt
    updatedAt
  }
}
    `;
export type CreateBookmarkMutationFn = Apollo.MutationFunction<CreateBookmarkMutation, CreateBookmarkMutationVariables>;

/**
 * __useCreateBookmarkMutation__
 *
 * To run a mutation, you first call `useCreateBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookmarkMutation, { data, loading, error }] = useCreateBookmarkMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      type: // value for 'type'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useCreateBookmarkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateBookmarkMutation, CreateBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateBookmarkMutation, CreateBookmarkMutationVariables>(CreateBookmarkDocument, options);
      }
export type CreateBookmarkMutationHookResult = ReturnType<typeof useCreateBookmarkMutation>;
export type CreateBookmarkMutationResult = Apollo.MutationResult<CreateBookmarkMutation>;
export type CreateBookmarkMutationOptions = Apollo.BaseMutationOptions<CreateBookmarkMutation, CreateBookmarkMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($type: String!, $content: String!, $media: String!, $isReplyToId: Int, $isReplyToType: String, $quotedPostId: Int) {
  createPost(
    type: $type
    content: $content
    media: $media
    isReplyToId: $isReplyToId
    isReplyToType: $isReplyToType
    quotedPostId: $quotedPostId
  ) {
    post {
      id
      itemId
      authorId
      type
      content
      isEdited
      lang
      topics
      author {
        id
        name
        username
        email
        type
        gender
        birthDate {
          date
          monthAndDayVisibility
          yearVisibility
        }
        emailVerified
        profile {
          profilePicture
          profileBanner
          bio
          website
        }
        userSettings {
          incomingMessages
          twoFactorAuth
        }
        searchSettings {
          hideSensitiveContent
          hideBlockedAccounts
        }
        createdAt
        updatedAt
        hiddenPosts
        identity {
          verified
          verifiedSince
        }
        verification {
          verified
          verifiedSince
        }
      }
      isReplyToId
      isReplyToType
      quotedPostId
      media {
        id
        type
        src
        alt
      }
      hashtags
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
    ok
    status
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      type: // value for 'type'
 *      content: // value for 'content'
 *      media: // value for 'media'
 *      isReplyToId: // value for 'isReplyToId'
 *      isReplyToType: // value for 'isReplyToType'
 *      quotedPostId: // value for 'quotedPostId'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateRepostDocument = gql`
    mutation CreateRepost($postId: String!) {
  createRepost(postId: $postId) {
    id
    repostId
    postId
    authorId
    createdAt
    updatedAt
  }
}
    `;
export type CreateRepostMutationFn = Apollo.MutationFunction<CreateRepostMutation, CreateRepostMutationVariables>;

/**
 * __useCreateRepostMutation__
 *
 * To run a mutation, you first call `useCreateRepostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRepostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRepostMutation, { data, loading, error }] = useCreateRepostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateRepostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRepostMutation, CreateRepostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateRepostMutation, CreateRepostMutationVariables>(CreateRepostDocument, options);
      }
export type CreateRepostMutationHookResult = ReturnType<typeof useCreateRepostMutation>;
export type CreateRepostMutationResult = Apollo.MutationResult<CreateRepostMutation>;
export type CreateRepostMutationOptions = Apollo.BaseMutationOptions<CreateRepostMutation, CreateRepostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteRepostDocument = gql`
    mutation DeleteRepost($postId: Int!) {
  deleteRepost(postId: $postId)
}
    `;
export type DeleteRepostMutationFn = Apollo.MutationFunction<DeleteRepostMutation, DeleteRepostMutationVariables>;

/**
 * __useDeleteRepostMutation__
 *
 * To run a mutation, you first call `useDeleteRepostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRepostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRepostMutation, { data, loading, error }] = useDeleteRepostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeleteRepostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRepostMutation, DeleteRepostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteRepostMutation, DeleteRepostMutationVariables>(DeleteRepostDocument, options);
      }
export type DeleteRepostMutationHookResult = ReturnType<typeof useDeleteRepostMutation>;
export type DeleteRepostMutationResult = Apollo.MutationResult<DeleteRepostMutation>;
export type DeleteRepostMutationOptions = Apollo.BaseMutationOptions<DeleteRepostMutation, DeleteRepostMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($postId: String!, $type: String!, $content: String!, $media: String!) {
  editPost(postId: $postId, type: $type, content: $content, media: $media) {
    post {
      id
      itemId
      authorId
      type
      content
      isEdited
      lang
      topics
      author {
        id
        name
        username
        email
        type
        gender
        birthDate {
          date
          monthAndDayVisibility
          yearVisibility
        }
        emailVerified
        profile {
          profilePicture
          profileBanner
          bio
          website
        }
        userSettings {
          incomingMessages
          twoFactorAuth
        }
        searchSettings {
          hideSensitiveContent
          hideBlockedAccounts
        }
        createdAt
        updatedAt
        hiddenPosts
        identity {
          verified
          verifiedSince
        }
        verification {
          verified
          verifiedSince
        }
      }
      isReplyToId
      isReplyToType
      quotedPostId
      media {
        id
        type
        src
        alt
      }
      hashtags
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
    ok
    status
  }
}
    `;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      type: // value for 'type'
 *      content: // value for 'content'
 *      media: // value for 'media'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const EditedPostDocument = gql`
    subscription EditedPost($postId: String!) {
  editedPost(postId: $postId) {
    id
    itemId
    authorId
    type
    content
    isEdited
    lang
    topics
    author {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    isReplyToId
    isReplyToType
    quotedPostId
    media {
      id
      type
      src
      alt
    }
    hashtags
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useEditedPostSubscription__
 *
 * To run a query within a React component, call `useEditedPostSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEditedPostSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditedPostSubscription({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useEditedPostSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<EditedPostSubscription, EditedPostSubscriptionVariables> & ({ variables: EditedPostSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<EditedPostSubscription, EditedPostSubscriptionVariables>(EditedPostDocument, options);
      }
export type EditedPostSubscriptionHookResult = ReturnType<typeof useEditedPostSubscription>;
export type EditedPostSubscriptionResult = Apollo.SubscriptionResult<EditedPostSubscription>;
export const FindPostDocument = gql`
    query FindPost($postId: String!, $username: String) {
  findPost(postId: $postId, username: $username) {
    id
    itemId
    authorId
    type
    content
    isEdited
    lang
    topics
    author {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    isReplyToId
    isReplyToType
    quotedPostId
    media {
      id
      type
      src
      alt
    }
    hashtags
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFindPostQuery__
 *
 * To run a query within a React component, call `useFindPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFindPostQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FindPostQuery, FindPostQueryVariables> & ({ variables: FindPostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindPostQuery, FindPostQueryVariables>(FindPostDocument, options);
      }
export function useFindPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindPostQuery, FindPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindPostQuery, FindPostQueryVariables>(FindPostDocument, options);
        }
export function useFindPostSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindPostQuery, FindPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindPostQuery, FindPostQueryVariables>(FindPostDocument, options);
        }
export type FindPostQueryHookResult = ReturnType<typeof useFindPostQuery>;
export type FindPostLazyQueryHookResult = ReturnType<typeof useFindPostLazyQuery>;
export type FindPostSuspenseQueryHookResult = ReturnType<typeof useFindPostSuspenseQuery>;
export type FindPostQueryResult = Apollo.QueryResult<FindPostQuery, FindPostQueryVariables>;
export const FindPostByIdDocument = gql`
    query FindPostById($id: Int) {
  findPostById(id: $id) {
    id
    itemId
    authorId
    type
    content
    isEdited
    lang
    topics
    author {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    isReplyToId
    isReplyToType
    quotedPostId
    media {
      id
      type
      src
      alt
    }
    hashtags
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFindPostByIdQuery__
 *
 * To run a query within a React component, call `useFindPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindPostByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
      }
export function useFindPostByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
        }
export function useFindPostByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
        }
export type FindPostByIdQueryHookResult = ReturnType<typeof useFindPostByIdQuery>;
export type FindPostByIdLazyQueryHookResult = ReturnType<typeof useFindPostByIdLazyQuery>;
export type FindPostByIdSuspenseQueryHookResult = ReturnType<typeof useFindPostByIdSuspenseQuery>;
export type FindPostByIdQueryResult = Apollo.QueryResult<FindPostByIdQuery, FindPostByIdQueryVariables>;
export const GetFeedItemStatsDocument = gql`
    query GetFeedItemStats($itemId: String!, $type: String!) {
  getFeedItemStats(itemId: $itemId, type: $type) {
    views
  }
}
    `;

/**
 * __useGetFeedItemStatsQuery__
 *
 * To run a query within a React component, call `useGetFeedItemStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedItemStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedItemStatsQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetFeedItemStatsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetFeedItemStatsQuery, GetFeedItemStatsQueryVariables> & ({ variables: GetFeedItemStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetFeedItemStatsQuery, GetFeedItemStatsQueryVariables>(GetFeedItemStatsDocument, options);
      }
export function useGetFeedItemStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFeedItemStatsQuery, GetFeedItemStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetFeedItemStatsQuery, GetFeedItemStatsQueryVariables>(GetFeedItemStatsDocument, options);
        }
export function useGetFeedItemStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetFeedItemStatsQuery, GetFeedItemStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetFeedItemStatsQuery, GetFeedItemStatsQueryVariables>(GetFeedItemStatsDocument, options);
        }
export type GetFeedItemStatsQueryHookResult = ReturnType<typeof useGetFeedItemStatsQuery>;
export type GetFeedItemStatsLazyQueryHookResult = ReturnType<typeof useGetFeedItemStatsLazyQuery>;
export type GetFeedItemStatsSuspenseQueryHookResult = ReturnType<typeof useGetFeedItemStatsSuspenseQuery>;
export type GetFeedItemStatsQueryResult = Apollo.QueryResult<GetFeedItemStatsQuery, GetFeedItemStatsQueryVariables>;
export const GetPostLikesDocument = gql`
    query GetPostLikes($itemId: String!, $type: String!, $limit: Int!, $cursor: String) {
  getPostLikes(itemId: $itemId, type: $type, limit: $limit, cursor: $cursor) {
    likes {
      id
      userId
      likedItemId
      itemOpened
      itemType
      origin
      createdAt
      updatedAt
    }
    hasMore
    totalCount
  }
}
    `;

/**
 * __useGetPostLikesQuery__
 *
 * To run a query within a React component, call `useGetPostLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostLikesQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      type: // value for 'type'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetPostLikesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPostLikesQuery, GetPostLikesQueryVariables> & ({ variables: GetPostLikesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPostLikesQuery, GetPostLikesQueryVariables>(GetPostLikesDocument, options);
      }
export function useGetPostLikesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostLikesQuery, GetPostLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPostLikesQuery, GetPostLikesQueryVariables>(GetPostLikesDocument, options);
        }
export function useGetPostLikesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPostLikesQuery, GetPostLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPostLikesQuery, GetPostLikesQueryVariables>(GetPostLikesDocument, options);
        }
export type GetPostLikesQueryHookResult = ReturnType<typeof useGetPostLikesQuery>;
export type GetPostLikesLazyQueryHookResult = ReturnType<typeof useGetPostLikesLazyQuery>;
export type GetPostLikesSuspenseQueryHookResult = ReturnType<typeof useGetPostLikesSuspenseQuery>;
export type GetPostLikesQueryResult = Apollo.QueryResult<GetPostLikesQuery, GetPostLikesQueryVariables>;
export const GetPostMentionsDocument = gql`
    query GetPostMentions($postId: String!) {
  getPostMentions(postId: $postId) {
    mentions
  }
}
    `;

/**
 * __useGetPostMentionsQuery__
 *
 * To run a query within a React component, call `useGetPostMentionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostMentionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostMentionsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostMentionsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPostMentionsQuery, GetPostMentionsQueryVariables> & ({ variables: GetPostMentionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPostMentionsQuery, GetPostMentionsQueryVariables>(GetPostMentionsDocument, options);
      }
export function useGetPostMentionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostMentionsQuery, GetPostMentionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPostMentionsQuery, GetPostMentionsQueryVariables>(GetPostMentionsDocument, options);
        }
export function useGetPostMentionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPostMentionsQuery, GetPostMentionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPostMentionsQuery, GetPostMentionsQueryVariables>(GetPostMentionsDocument, options);
        }
export type GetPostMentionsQueryHookResult = ReturnType<typeof useGetPostMentionsQuery>;
export type GetPostMentionsLazyQueryHookResult = ReturnType<typeof useGetPostMentionsLazyQuery>;
export type GetPostMentionsSuspenseQueryHookResult = ReturnType<typeof useGetPostMentionsSuspenseQuery>;
export type GetPostMentionsQueryResult = Apollo.QueryResult<GetPostMentionsQuery, GetPostMentionsQueryVariables>;
export const GetRepostsDocument = gql`
    query GetReposts($postId: Int, $limit: Int!, $cursor: String) {
  getReposts(postId: $postId, limit: $limit, cursor: $cursor) {
    reposts {
      id
      repostId
      postId
      authorId
      createdAt
      updatedAt
    }
    hasMore
    totalCount
  }
}
    `;

/**
 * __useGetRepostsQuery__
 *
 * To run a query within a React component, call `useGetRepostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepostsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetRepostsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetRepostsQuery, GetRepostsQueryVariables> & ({ variables: GetRepostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRepostsQuery, GetRepostsQueryVariables>(GetRepostsDocument, options);
      }
export function useGetRepostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRepostsQuery, GetRepostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRepostsQuery, GetRepostsQueryVariables>(GetRepostsDocument, options);
        }
export function useGetRepostsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetRepostsQuery, GetRepostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetRepostsQuery, GetRepostsQueryVariables>(GetRepostsDocument, options);
        }
export type GetRepostsQueryHookResult = ReturnType<typeof useGetRepostsQuery>;
export type GetRepostsLazyQueryHookResult = ReturnType<typeof useGetRepostsLazyQuery>;
export type GetRepostsSuspenseQueryHookResult = ReturnType<typeof useGetRepostsSuspenseQuery>;
export type GetRepostsQueryResult = Apollo.QueryResult<GetRepostsQuery, GetRepostsQueryVariables>;
export const IsBookmarkedDocument = gql`
    query IsBookmarked($itemId: Int, $type: String!) {
  isBookmarked(itemId: $itemId, type: $type) {
    id
    itemId
    itemType
    origin
    authorId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useIsBookmarkedQuery__
 *
 * To run a query within a React component, call `useIsBookmarkedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsBookmarkedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsBookmarkedQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useIsBookmarkedQuery(baseOptions: ApolloReactHooks.QueryHookOptions<IsBookmarkedQuery, IsBookmarkedQueryVariables> & ({ variables: IsBookmarkedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsBookmarkedQuery, IsBookmarkedQueryVariables>(IsBookmarkedDocument, options);
      }
export function useIsBookmarkedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsBookmarkedQuery, IsBookmarkedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsBookmarkedQuery, IsBookmarkedQueryVariables>(IsBookmarkedDocument, options);
        }
export function useIsBookmarkedSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<IsBookmarkedQuery, IsBookmarkedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<IsBookmarkedQuery, IsBookmarkedQueryVariables>(IsBookmarkedDocument, options);
        }
export type IsBookmarkedQueryHookResult = ReturnType<typeof useIsBookmarkedQuery>;
export type IsBookmarkedLazyQueryHookResult = ReturnType<typeof useIsBookmarkedLazyQuery>;
export type IsBookmarkedSuspenseQueryHookResult = ReturnType<typeof useIsBookmarkedSuspenseQuery>;
export type IsBookmarkedQueryResult = Apollo.QueryResult<IsBookmarkedQuery, IsBookmarkedQueryVariables>;
export const IsPostLikedByMeDocument = gql`
    query IsPostLikedByMe($itemId: String!, $type: String!) {
  isPostLikedByMe(itemId: $itemId, type: $type) {
    id
    userId
    likedItemId
    itemOpened
    itemType
    origin
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useIsPostLikedByMeQuery__
 *
 * To run a query within a React component, call `useIsPostLikedByMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsPostLikedByMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsPostLikedByMeQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useIsPostLikedByMeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables> & ({ variables: IsPostLikedByMeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>(IsPostLikedByMeDocument, options);
      }
export function useIsPostLikedByMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>(IsPostLikedByMeDocument, options);
        }
export function useIsPostLikedByMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>(IsPostLikedByMeDocument, options);
        }
export type IsPostLikedByMeQueryHookResult = ReturnType<typeof useIsPostLikedByMeQuery>;
export type IsPostLikedByMeLazyQueryHookResult = ReturnType<typeof useIsPostLikedByMeLazyQuery>;
export type IsPostLikedByMeSuspenseQueryHookResult = ReturnType<typeof useIsPostLikedByMeSuspenseQuery>;
export type IsPostLikedByMeQueryResult = Apollo.QueryResult<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>;
export const IsRepostedByUserDocument = gql`
    query IsRepostedByUser($postId: Int, $userId: Int) {
  isRepostedByUser(postId: $postId, userId: $userId) {
    id
    repostId
    postId
    authorId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useIsRepostedByUserQuery__
 *
 * To run a query within a React component, call `useIsRepostedByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsRepostedByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsRepostedByUserQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useIsRepostedByUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>(IsRepostedByUserDocument, options);
      }
export function useIsRepostedByUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>(IsRepostedByUserDocument, options);
        }
export function useIsRepostedByUserSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>(IsRepostedByUserDocument, options);
        }
export type IsRepostedByUserQueryHookResult = ReturnType<typeof useIsRepostedByUserQuery>;
export type IsRepostedByUserLazyQueryHookResult = ReturnType<typeof useIsRepostedByUserLazyQuery>;
export type IsRepostedByUserSuspenseQueryHookResult = ReturnType<typeof useIsRepostedByUserSuspenseQuery>;
export type IsRepostedByUserQueryResult = Apollo.QueryResult<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>;
export const LikePostDocument = gql`
    mutation LikePost($itemId: String!, $origin: String!, $itemOpened: Boolean!, $itemType: String!) {
  likePost(
    itemId: $itemId
    origin: $origin
    itemOpened: $itemOpened
    itemType: $itemType
  ) {
    id
    userId
    likedItemId
    itemOpened
    itemType
    origin
    createdAt
    updatedAt
  }
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      origin: // value for 'origin'
 *      itemOpened: // value for 'itemOpened'
 *      itemType: // value for 'itemType'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const PostCommentsDocument = gql`
    query PostComments($id: Int, $type: String!, $limit: Int!, $cursor: String) {
  postComments(id: $id, type: $type, limit: $limit, cursor: $cursor) {
    posts {
      id
      itemId
      authorId
      type
      content
      isEdited
      lang
      topics
      author {
        id
        name
        username
        email
        type
        gender
        birthDate {
          date
          monthAndDayVisibility
          yearVisibility
        }
        emailVerified
        profile {
          profilePicture
          profileBanner
          bio
          website
        }
        userSettings {
          incomingMessages
          twoFactorAuth
        }
        searchSettings {
          hideSensitiveContent
          hideBlockedAccounts
        }
        createdAt
        updatedAt
        hiddenPosts
        identity {
          verified
          verifiedSince
        }
        verification {
          verified
          verifiedSince
        }
      }
      isReplyToId
      isReplyToType
      quotedPostId
      media {
        id
        type
        src
        alt
      }
      hashtags
      createdAt
      updatedAt
    }
    hasMore
    totalCount
  }
}
    `;

/**
 * __usePostCommentsQuery__
 *
 * To run a query within a React component, call `usePostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCommentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostCommentsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables> & ({ variables: PostCommentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
      }
export function usePostCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
        }
export function usePostCommentsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
        }
export type PostCommentsQueryHookResult = ReturnType<typeof usePostCommentsQuery>;
export type PostCommentsLazyQueryHookResult = ReturnType<typeof usePostCommentsLazyQuery>;
export type PostCommentsSuspenseQueryHookResult = ReturnType<typeof usePostCommentsSuspenseQuery>;
export type PostCommentsQueryResult = Apollo.QueryResult<PostCommentsQuery, PostCommentsQueryVariables>;
export const PostFeedDocument = gql`
    query PostFeed($limit: Int!, $cursor: String) {
  postFeed(limit: $limit, cursor: $cursor) {
    posts {
      id
      itemId
      authorId
      type
      content
      isEdited
      lang
      topics
      author {
        id
        name
        username
        email
        type
        gender
        birthDate {
          date
          monthAndDayVisibility
          yearVisibility
        }
        emailVerified
        profile {
          profilePicture
          profileBanner
          bio
          website
        }
        userSettings {
          incomingMessages
          twoFactorAuth
        }
        searchSettings {
          hideSensitiveContent
          hideBlockedAccounts
        }
        createdAt
        updatedAt
        hiddenPosts
        identity {
          verified
          verifiedSince
        }
        verification {
          verified
          verifiedSince
        }
      }
      isReplyToId
      isReplyToType
      quotedPostId
      media {
        id
        type
        src
        alt
      }
      hashtags
      createdAt
      updatedAt
    }
    hasMore
    totalCount
  }
}
    `;

/**
 * __usePostFeedQuery__
 *
 * To run a query within a React component, call `usePostFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostFeedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostFeedQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PostFeedQuery, PostFeedQueryVariables> & ({ variables: PostFeedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PostFeedQuery, PostFeedQueryVariables>(PostFeedDocument, options);
      }
export function usePostFeedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostFeedQuery, PostFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PostFeedQuery, PostFeedQueryVariables>(PostFeedDocument, options);
        }
export function usePostFeedSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PostFeedQuery, PostFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PostFeedQuery, PostFeedQueryVariables>(PostFeedDocument, options);
        }
export type PostFeedQueryHookResult = ReturnType<typeof usePostFeedQuery>;
export type PostFeedLazyQueryHookResult = ReturnType<typeof usePostFeedLazyQuery>;
export type PostFeedSuspenseQueryHookResult = ReturnType<typeof usePostFeedSuspenseQuery>;
export type PostFeedQueryResult = Apollo.QueryResult<PostFeedQuery, PostFeedQueryVariables>;
export const RemoveBookmarkDocument = gql`
    mutation RemoveBookmark($itemId: String!, $type: String!) {
  removeBookmark(itemId: $itemId, type: $type)
}
    `;
export type RemoveBookmarkMutationFn = Apollo.MutationFunction<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;

/**
 * __useRemoveBookmarkMutation__
 *
 * To run a mutation, you first call `useRemoveBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBookmarkMutation, { data, loading, error }] = useRemoveBookmarkMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useRemoveBookmarkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>(RemoveBookmarkDocument, options);
      }
export type RemoveBookmarkMutationHookResult = ReturnType<typeof useRemoveBookmarkMutation>;
export type RemoveBookmarkMutationResult = Apollo.MutationResult<RemoveBookmarkMutation>;
export type RemoveBookmarkMutationOptions = Apollo.BaseMutationOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;
export const RemoveLikeDocument = gql`
    mutation RemoveLike($itemId: String!, $itemType: String!) {
  removeLike(itemId: $itemId, itemType: $itemType)
}
    `;
export type RemoveLikeMutationFn = Apollo.MutationFunction<RemoveLikeMutation, RemoveLikeMutationVariables>;

/**
 * __useRemoveLikeMutation__
 *
 * To run a mutation, you first call `useRemoveLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLikeMutation, { data, loading, error }] = useRemoveLikeMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      itemType: // value for 'itemType'
 *   },
 * });
 */
export function useRemoveLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveLikeMutation, RemoveLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(RemoveLikeDocument, options);
      }
export type RemoveLikeMutationHookResult = ReturnType<typeof useRemoveLikeMutation>;
export type RemoveLikeMutationResult = Apollo.MutationResult<RemoveLikeMutation>;
export type RemoveLikeMutationOptions = Apollo.BaseMutationOptions<RemoveLikeMutation, RemoveLikeMutationVariables>;
export const RevokeMentionDocument = gql`
    mutation RevokeMention($postId: String!) {
  revokeMention(postId: $postId) {
    ok
    status
  }
}
    `;
export type RevokeMentionMutationFn = Apollo.MutationFunction<RevokeMentionMutation, RevokeMentionMutationVariables>;

/**
 * __useRevokeMentionMutation__
 *
 * To run a mutation, you first call `useRevokeMentionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeMentionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeMentionMutation, { data, loading, error }] = useRevokeMentionMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRevokeMentionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RevokeMentionMutation, RevokeMentionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RevokeMentionMutation, RevokeMentionMutationVariables>(RevokeMentionDocument, options);
      }
export type RevokeMentionMutationHookResult = ReturnType<typeof useRevokeMentionMutation>;
export type RevokeMentionMutationResult = Apollo.MutationResult<RevokeMentionMutation>;
export type RevokeMentionMutationOptions = Apollo.BaseMutationOptions<RevokeMentionMutation, RevokeMentionMutationVariables>;
export const ViewFeedItemDocument = gql`
    mutation ViewFeedItem($itemId: String!, $type: String!, $itemOpened: Boolean!, $origin: String!) {
  viewFeedItem(
    itemId: $itemId
    type: $type
    itemOpened: $itemOpened
    origin: $origin
  ) {
    id
    itemId
    uniqueIdentifier
    userId
    isAuth
    itemOpened
    itemType
    origin
    createdAt
    updatedAt
  }
}
    `;
export type ViewFeedItemMutationFn = Apollo.MutationFunction<ViewFeedItemMutation, ViewFeedItemMutationVariables>;

/**
 * __useViewFeedItemMutation__
 *
 * To run a mutation, you first call `useViewFeedItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewFeedItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewFeedItemMutation, { data, loading, error }] = useViewFeedItemMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      type: // value for 'type'
 *      itemOpened: // value for 'itemOpened'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useViewFeedItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ViewFeedItemMutation, ViewFeedItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ViewFeedItemMutation, ViewFeedItemMutationVariables>(ViewFeedItemDocument, options);
      }
export type ViewFeedItemMutationHookResult = ReturnType<typeof useViewFeedItemMutation>;
export type ViewFeedItemMutationResult = Apollo.MutationResult<ViewFeedItemMutation>;
export type ViewFeedItemMutationOptions = Apollo.BaseMutationOptions<ViewFeedItemMutation, ViewFeedItemMutationVariables>;
export const CreateReportDocument = gql`
    mutation CreateReport($contentId: String!, $contentType: String!, $categoryId: Int!, $subCategoryId: Int, $additionalContentIds: [Int!], $additionalContentType: String) {
  createReport(
    contentId: $contentId
    contentType: $contentType
    categoryId: $categoryId
    subCategoryId: $subCategoryId
    additionalContentIds: $additionalContentIds
    additionalContentType: $additionalContentType
  ) {
    status
    ok
  }
}
    `;
export type CreateReportMutationFn = Apollo.MutationFunction<CreateReportMutation, CreateReportMutationVariables>;

/**
 * __useCreateReportMutation__
 *
 * To run a mutation, you first call `useCreateReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportMutation, { data, loading, error }] = useCreateReportMutation({
 *   variables: {
 *      contentId: // value for 'contentId'
 *      contentType: // value for 'contentType'
 *      categoryId: // value for 'categoryId'
 *      subCategoryId: // value for 'subCategoryId'
 *      additionalContentIds: // value for 'additionalContentIds'
 *      additionalContentType: // value for 'additionalContentType'
 *   },
 * });
 */
export function useCreateReportMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateReportMutation, CreateReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument, options);
      }
export type CreateReportMutationHookResult = ReturnType<typeof useCreateReportMutation>;
export type CreateReportMutationResult = Apollo.MutationResult<CreateReportMutation>;
export type CreateReportMutationOptions = Apollo.BaseMutationOptions<CreateReportMutation, CreateReportMutationVariables>;
export const ReportOptionsDocument = gql`
    query ReportOptions($type: String!) {
  reportOptions(type: $type) {
    id
    title
    description
    subcategories {
      categoryId
      id
      title
      description
    }
  }
}
    `;

/**
 * __useReportOptionsQuery__
 *
 * To run a query within a React component, call `useReportOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportOptionsQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useReportOptionsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ReportOptionsQuery, ReportOptionsQueryVariables> & ({ variables: ReportOptionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ReportOptionsQuery, ReportOptionsQueryVariables>(ReportOptionsDocument, options);
      }
export function useReportOptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReportOptionsQuery, ReportOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ReportOptionsQuery, ReportOptionsQueryVariables>(ReportOptionsDocument, options);
        }
export function useReportOptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ReportOptionsQuery, ReportOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ReportOptionsQuery, ReportOptionsQueryVariables>(ReportOptionsDocument, options);
        }
export type ReportOptionsQueryHookResult = ReturnType<typeof useReportOptionsQuery>;
export type ReportOptionsLazyQueryHookResult = ReturnType<typeof useReportOptionsLazyQuery>;
export type ReportOptionsSuspenseQueryHookResult = ReturnType<typeof useReportOptionsSuspenseQuery>;
export type ReportOptionsQueryResult = Apollo.QueryResult<ReportOptionsQuery, ReportOptionsQueryVariables>;
export const SearchDocument = gql`
    query Search($keyword: String!, $type: String!, $postsLimit: Int!, $postsOffset: Int!, $usersLimit: Int!, $usersOffset: Int!) {
  search(
    keyword: $keyword
    type: $type
    postsLimit: $postsLimit
    postsOffset: $postsOffset
    usersLimit: $usersLimit
    usersOffset: $usersOffset
  ) {
    posts {
      id
      itemId
      authorId
      type
      content
      isEdited
      lang
      topics
      author {
        id
        name
        username
        email
        type
        gender
        birthDate {
          date
          monthAndDayVisibility
          yearVisibility
        }
        emailVerified
        profile {
          profilePicture
          profileBanner
          bio
          website
        }
        userSettings {
          incomingMessages
          twoFactorAuth
        }
        searchSettings {
          hideSensitiveContent
          hideBlockedAccounts
        }
        createdAt
        updatedAt
        hiddenPosts
        identity {
          verified
          verifiedSince
        }
        verification {
          verified
          verifiedSince
        }
      }
      isReplyToId
      isReplyToType
      quotedPostId
      media {
        id
        type
        src
        alt
      }
      hashtags
      createdAt
      updatedAt
    }
    users {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    hasMorePosts
    hasMoreUsers
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      type: // value for 'type'
 *      postsLimit: // value for 'postsLimit'
 *      postsOffset: // value for 'postsOffset'
 *      usersLimit: // value for 'usersLimit'
 *      usersOffset: // value for 'usersOffset'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SearchQuery, SearchQueryVariables> & ({ variables: SearchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export function useSearchSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchSuspenseQueryHookResult = ReturnType<typeof useSearchSuspenseQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const BlockUserDocument = gql`
    mutation BlockUser($userId: Int, $origin: String!) {
  blockUser(userId: $userId, origin: $origin) {
    id
    blockedId
    userId
    origin
    createdAt
    updatedAt
  }
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const FindUserDocument = gql`
    query FindUser($username: String!) {
  findUser(username: $username) {
    id
    name
    username
    email
    type
    gender
    birthDate {
      date
      monthAndDayVisibility
      yearVisibility
    }
    emailVerified
    profile {
      profilePicture
      profileBanner
      bio
      website
    }
    userSettings {
      incomingMessages
      twoFactorAuth
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    createdAt
    updatedAt
    hiddenPosts
    identity {
      verified
      verifiedSince
    }
    verification {
      verified
      verifiedSince
    }
  }
}
    `;

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFindUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FindUserQuery, FindUserQueryVariables> & ({ variables: FindUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
      }
export function useFindUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
        }
export function useFindUserSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
        }
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<typeof useFindUserLazyQuery>;
export type FindUserSuspenseQueryHookResult = ReturnType<typeof useFindUserSuspenseQuery>;
export type FindUserQueryResult = Apollo.QueryResult<FindUserQuery, FindUserQueryVariables>;
export const FindUserBeforeLogInDocument = gql`
    mutation FindUserBeforeLogIn($input: String!) {
  findUserBeforeLogIn(input: $input) {
    user {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    status
    ok
    errors {
      field
      message
    }
  }
}
    `;
export type FindUserBeforeLogInMutationFn = Apollo.MutationFunction<FindUserBeforeLogInMutation, FindUserBeforeLogInMutationVariables>;

/**
 * __useFindUserBeforeLogInMutation__
 *
 * To run a mutation, you first call `useFindUserBeforeLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindUserBeforeLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findUserBeforeLogInMutation, { data, loading, error }] = useFindUserBeforeLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindUserBeforeLogInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindUserBeforeLogInMutation, FindUserBeforeLogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<FindUserBeforeLogInMutation, FindUserBeforeLogInMutationVariables>(FindUserBeforeLogInDocument, options);
      }
export type FindUserBeforeLogInMutationHookResult = ReturnType<typeof useFindUserBeforeLogInMutation>;
export type FindUserBeforeLogInMutationResult = Apollo.MutationResult<FindUserBeforeLogInMutation>;
export type FindUserBeforeLogInMutationOptions = Apollo.BaseMutationOptions<FindUserBeforeLogInMutation, FindUserBeforeLogInMutationVariables>;
export const FindUserByIdDocument = gql`
    query FindUserById($id: Int) {
  findUserById(id: $id) {
    id
    name
    username
    email
    type
    gender
    birthDate {
      date
      monthAndDayVisibility
      yearVisibility
    }
    emailVerified
    profile {
      profilePicture
      profileBanner
      bio
      website
    }
    userSettings {
      incomingMessages
      twoFactorAuth
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    createdAt
    updatedAt
    hiddenPosts
    identity {
      verified
      verifiedSince
    }
    verification {
      verified
      verifiedSince
    }
  }
}
    `;

/**
 * __useFindUserByIdQuery__
 *
 * To run a query within a React component, call `useFindUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindUserByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindUserByIdQuery, FindUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(FindUserByIdDocument, options);
      }
export function useFindUserByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindUserByIdQuery, FindUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(FindUserByIdDocument, options);
        }
export function useFindUserByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindUserByIdQuery, FindUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(FindUserByIdDocument, options);
        }
export type FindUserByIdQueryHookResult = ReturnType<typeof useFindUserByIdQuery>;
export type FindUserByIdLazyQueryHookResult = ReturnType<typeof useFindUserByIdLazyQuery>;
export type FindUserByIdSuspenseQueryHookResult = ReturnType<typeof useFindUserByIdSuspenseQuery>;
export type FindUserByIdQueryResult = Apollo.QueryResult<FindUserByIdQuery, FindUserByIdQueryVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($userId: Int, $origin: String!) {
  followUser(userId: $userId, origin: $origin) {
    id
    follower {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    user {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    origin
    createdAt
    updatedAt
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const GetFollowersDocument = gql`
    query GetFollowers($id: Int, $limit: Int!, $cursor: String) {
  getFollowers(id: $id, limit: $limit, cursor: $cursor) {
    followRelations {
      id
      follower {
        id
        name
        username
        email
        type
        gender
        birthDate {
          date
          monthAndDayVisibility
          yearVisibility
        }
        emailVerified
        profile {
          profilePicture
          profileBanner
          bio
          website
        }
        userSettings {
          incomingMessages
          twoFactorAuth
        }
        searchSettings {
          hideSensitiveContent
          hideBlockedAccounts
        }
        createdAt
        updatedAt
        hiddenPosts
        identity {
          verified
          verifiedSince
        }
        verification {
          verified
          verifiedSince
        }
      }
      user {
        id
        name
        username
        email
        type
        gender
        birthDate {
          date
          monthAndDayVisibility
          yearVisibility
        }
        emailVerified
        profile {
          profilePicture
          profileBanner
          bio
          website
        }
        userSettings {
          incomingMessages
          twoFactorAuth
        }
        searchSettings {
          hideSensitiveContent
          hideBlockedAccounts
        }
        createdAt
        updatedAt
        hiddenPosts
        identity {
          verified
          verifiedSince
        }
        verification {
          verified
          verifiedSince
        }
      }
      origin
      createdAt
      updatedAt
    }
    hasMore
    totalCount
  }
}
    `;

/**
 * __useGetFollowersQuery__
 *
 * To run a query within a React component, call `useGetFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowersQuery({
 *   variables: {
 *      id: // value for 'id'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetFollowersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables> & ({ variables: GetFollowersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
      }
export function useGetFollowersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
        }
export function useGetFollowersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
        }
export type GetFollowersQueryHookResult = ReturnType<typeof useGetFollowersQuery>;
export type GetFollowersLazyQueryHookResult = ReturnType<typeof useGetFollowersLazyQuery>;
export type GetFollowersSuspenseQueryHookResult = ReturnType<typeof useGetFollowersSuspenseQuery>;
export type GetFollowersQueryResult = Apollo.QueryResult<GetFollowersQuery, GetFollowersQueryVariables>;
export const HasThisUserAsAffiliateDocument = gql`
    query HasThisUserAsAffiliate($id: Int, $userId: Int) {
  hasThisUserAsAffiliate(id: $id, userId: $userId)
}
    `;

/**
 * __useHasThisUserAsAffiliateQuery__
 *
 * To run a query within a React component, call `useHasThisUserAsAffiliateQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasThisUserAsAffiliateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasThisUserAsAffiliateQuery({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useHasThisUserAsAffiliateQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HasThisUserAsAffiliateQuery, HasThisUserAsAffiliateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<HasThisUserAsAffiliateQuery, HasThisUserAsAffiliateQueryVariables>(HasThisUserAsAffiliateDocument, options);
      }
export function useHasThisUserAsAffiliateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HasThisUserAsAffiliateQuery, HasThisUserAsAffiliateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<HasThisUserAsAffiliateQuery, HasThisUserAsAffiliateQueryVariables>(HasThisUserAsAffiliateDocument, options);
        }
export function useHasThisUserAsAffiliateSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<HasThisUserAsAffiliateQuery, HasThisUserAsAffiliateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<HasThisUserAsAffiliateQuery, HasThisUserAsAffiliateQueryVariables>(HasThisUserAsAffiliateDocument, options);
        }
export type HasThisUserAsAffiliateQueryHookResult = ReturnType<typeof useHasThisUserAsAffiliateQuery>;
export type HasThisUserAsAffiliateLazyQueryHookResult = ReturnType<typeof useHasThisUserAsAffiliateLazyQuery>;
export type HasThisUserAsAffiliateSuspenseQueryHookResult = ReturnType<typeof useHasThisUserAsAffiliateSuspenseQuery>;
export type HasThisUserAsAffiliateQueryResult = Apollo.QueryResult<HasThisUserAsAffiliateQuery, HasThisUserAsAffiliateQueryVariables>;
export const HasUserBlockedMeDocument = gql`
    query HasUserBlockedMe($id: Int) {
  hasUserBlockedMe(id: $id) {
    id
    blockedId
    userId
    origin
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useHasUserBlockedMeQuery__
 *
 * To run a query within a React component, call `useHasUserBlockedMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasUserBlockedMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasUserBlockedMeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHasUserBlockedMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HasUserBlockedMeQuery, HasUserBlockedMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<HasUserBlockedMeQuery, HasUserBlockedMeQueryVariables>(HasUserBlockedMeDocument, options);
      }
export function useHasUserBlockedMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HasUserBlockedMeQuery, HasUserBlockedMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<HasUserBlockedMeQuery, HasUserBlockedMeQueryVariables>(HasUserBlockedMeDocument, options);
        }
export function useHasUserBlockedMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<HasUserBlockedMeQuery, HasUserBlockedMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<HasUserBlockedMeQuery, HasUserBlockedMeQueryVariables>(HasUserBlockedMeDocument, options);
        }
export type HasUserBlockedMeQueryHookResult = ReturnType<typeof useHasUserBlockedMeQuery>;
export type HasUserBlockedMeLazyQueryHookResult = ReturnType<typeof useHasUserBlockedMeLazyQuery>;
export type HasUserBlockedMeSuspenseQueryHookResult = ReturnType<typeof useHasUserBlockedMeSuspenseQuery>;
export type HasUserBlockedMeQueryResult = Apollo.QueryResult<HasUserBlockedMeQuery, HasUserBlockedMeQueryVariables>;
export const IsAffiliatedToDocument = gql`
    query IsAffiliatedTo($id: Int) {
  isAffiliatedTo(id: $id) {
    id
    name
    username
    email
    type
    gender
    birthDate {
      date
      monthAndDayVisibility
      yearVisibility
    }
    emailVerified
    profile {
      profilePicture
      profileBanner
      bio
      website
    }
    userSettings {
      incomingMessages
      twoFactorAuth
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    createdAt
    updatedAt
    hiddenPosts
    identity {
      verified
      verifiedSince
    }
    verification {
      verified
      verifiedSince
    }
  }
}
    `;

/**
 * __useIsAffiliatedToQuery__
 *
 * To run a query within a React component, call `useIsAffiliatedToQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsAffiliatedToQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsAffiliatedToQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIsAffiliatedToQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>(IsAffiliatedToDocument, options);
      }
export function useIsAffiliatedToLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>(IsAffiliatedToDocument, options);
        }
export function useIsAffiliatedToSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>(IsAffiliatedToDocument, options);
        }
export type IsAffiliatedToQueryHookResult = ReturnType<typeof useIsAffiliatedToQuery>;
export type IsAffiliatedToLazyQueryHookResult = ReturnType<typeof useIsAffiliatedToLazyQuery>;
export type IsAffiliatedToSuspenseQueryHookResult = ReturnType<typeof useIsAffiliatedToSuspenseQuery>;
export type IsAffiliatedToQueryResult = Apollo.QueryResult<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>;
export const IsFollowedByMeDocument = gql`
    query IsFollowedByMe($id: Int) {
  isFollowedByMe(id: $id) {
    id
    follower {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    user {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    origin
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useIsFollowedByMeQuery__
 *
 * To run a query within a React component, call `useIsFollowedByMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsFollowedByMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsFollowedByMeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIsFollowedByMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>(IsFollowedByMeDocument, options);
      }
export function useIsFollowedByMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>(IsFollowedByMeDocument, options);
        }
export function useIsFollowedByMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>(IsFollowedByMeDocument, options);
        }
export type IsFollowedByMeQueryHookResult = ReturnType<typeof useIsFollowedByMeQuery>;
export type IsFollowedByMeLazyQueryHookResult = ReturnType<typeof useIsFollowedByMeLazyQuery>;
export type IsFollowedByMeSuspenseQueryHookResult = ReturnType<typeof useIsFollowedByMeSuspenseQuery>;
export type IsFollowedByMeQueryResult = Apollo.QueryResult<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>;
export const IsUserBlockedByMeDocument = gql`
    query IsUserBlockedByMe($id: Int) {
  isUserBlockedByMe(id: $id) {
    id
    blockedId
    userId
    origin
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useIsUserBlockedByMeQuery__
 *
 * To run a query within a React component, call `useIsUserBlockedByMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserBlockedByMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserBlockedByMeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIsUserBlockedByMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsUserBlockedByMeQuery, IsUserBlockedByMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsUserBlockedByMeQuery, IsUserBlockedByMeQueryVariables>(IsUserBlockedByMeDocument, options);
      }
export function useIsUserBlockedByMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsUserBlockedByMeQuery, IsUserBlockedByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsUserBlockedByMeQuery, IsUserBlockedByMeQueryVariables>(IsUserBlockedByMeDocument, options);
        }
export function useIsUserBlockedByMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<IsUserBlockedByMeQuery, IsUserBlockedByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<IsUserBlockedByMeQuery, IsUserBlockedByMeQueryVariables>(IsUserBlockedByMeDocument, options);
        }
export type IsUserBlockedByMeQueryHookResult = ReturnType<typeof useIsUserBlockedByMeQuery>;
export type IsUserBlockedByMeLazyQueryHookResult = ReturnType<typeof useIsUserBlockedByMeLazyQuery>;
export type IsUserBlockedByMeSuspenseQueryHookResult = ReturnType<typeof useIsUserBlockedByMeSuspenseQuery>;
export type IsUserBlockedByMeQueryResult = Apollo.QueryResult<IsUserBlockedByMeQuery, IsUserBlockedByMeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($input: String!, $password: String!, $clientOS: String!, $clientType: String!, $clientName: String!) {
  login(
    input: $input
    password: $password
    clientOS: $clientOS
    clientType: $clientType
    clientName: $clientName
  ) {
    user {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    errors {
      field
      message
    }
    accessToken
    status
    ok
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *      password: // value for 'password'
 *      clientOS: // value for 'clientOS'
 *      clientType: // value for 'clientType'
 *      clientName: // value for 'clientName'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    username
    email
    type
    gender
    birthDate {
      date
      monthAndDayVisibility
      yearVisibility
    }
    emailVerified
    profile {
      profilePicture
      profileBanner
      bio
      website
    }
    userSettings {
      incomingMessages
      twoFactorAuth
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    createdAt
    updatedAt
    hiddenPosts
    identity {
      verified
      verifiedSince
    }
    verification {
      verified
      verifiedSince
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NotAuthModifyPasswordDocument = gql`
    mutation NotAuthModifyPassword($password: String!, $confirmPassword: String!, $token: String!) {
  notAuthModifyPassword(
    password: $password
    confirmPassword: $confirmPassword
    token: $token
  ) {
    status
    errors {
      field
      message
    }
    ok
  }
}
    `;
export type NotAuthModifyPasswordMutationFn = Apollo.MutationFunction<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>;

/**
 * __useNotAuthModifyPasswordMutation__
 *
 * To run a mutation, you first call `useNotAuthModifyPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotAuthModifyPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notAuthModifyPasswordMutation, { data, loading, error }] = useNotAuthModifyPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useNotAuthModifyPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>(NotAuthModifyPasswordDocument, options);
      }
export type NotAuthModifyPasswordMutationHookResult = ReturnType<typeof useNotAuthModifyPasswordMutation>;
export type NotAuthModifyPasswordMutationResult = Apollo.MutationResult<NotAuthModifyPasswordMutation>;
export type NotAuthModifyPasswordMutationOptions = Apollo.BaseMutationOptions<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>;
export const ReactivateAccountDocument = gql`
    mutation ReactivateAccount($input: String!, $password: String!) {
  reactivateAccount(input: $input, password: $password) {
    status
    errors {
      field
      message
    }
    ok
  }
}
    `;
export type ReactivateAccountMutationFn = Apollo.MutationFunction<ReactivateAccountMutation, ReactivateAccountMutationVariables>;

/**
 * __useReactivateAccountMutation__
 *
 * To run a mutation, you first call `useReactivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactivateAccountMutation, { data, loading, error }] = useReactivateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useReactivateAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactivateAccountMutation, ReactivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ReactivateAccountMutation, ReactivateAccountMutationVariables>(ReactivateAccountDocument, options);
      }
export type ReactivateAccountMutationHookResult = ReturnType<typeof useReactivateAccountMutation>;
export type ReactivateAccountMutationResult = Apollo.MutationResult<ReactivateAccountMutation>;
export type ReactivateAccountMutationOptions = Apollo.BaseMutationOptions<ReactivateAccountMutation, ReactivateAccountMutationVariables>;
export const ResendOtpDocument = gql`
    mutation ResendOTP($input: String!, $password: String!) {
  resendOTP(input: $input, password: $password)
}
    `;
export type ResendOtpMutationFn = Apollo.MutationFunction<ResendOtpMutation, ResendOtpMutationVariables>;

/**
 * __useResendOtpMutation__
 *
 * To run a mutation, you first call `useResendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendOtpMutation, { data, loading, error }] = useResendOtpMutation({
 *   variables: {
 *      input: // value for 'input'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResendOtpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResendOtpMutation, ResendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResendOtpMutation, ResendOtpMutationVariables>(ResendOtpDocument, options);
      }
export type ResendOtpMutationHookResult = ReturnType<typeof useResendOtpMutation>;
export type ResendOtpMutationResult = Apollo.MutationResult<ResendOtpMutation>;
export type ResendOtpMutationOptions = Apollo.BaseMutationOptions<ResendOtpMutation, ResendOtpMutationVariables>;
export const SendRecoveryEmailDocument = gql`
    mutation SendRecoveryEmail($email: String!) {
  sendRecoveryEmail(email: $email) {
    errors {
      field
      message
    }
    status
    ok
  }
}
    `;
export type SendRecoveryEmailMutationFn = Apollo.MutationFunction<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>;

/**
 * __useSendRecoveryEmailMutation__
 *
 * To run a mutation, you first call `useSendRecoveryEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendRecoveryEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendRecoveryEmailMutation, { data, loading, error }] = useSendRecoveryEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendRecoveryEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>(SendRecoveryEmailDocument, options);
      }
export type SendRecoveryEmailMutationHookResult = ReturnType<typeof useSendRecoveryEmailMutation>;
export type SendRecoveryEmailMutationResult = Apollo.MutationResult<SendRecoveryEmailMutation>;
export type SendRecoveryEmailMutationOptions = Apollo.BaseMutationOptions<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($email: String!, $username: String!, $name: String!, $password: String!, $gender: String!, $birthDate: DateTimeISO!) {
  signup(
    email: $email
    username: $username
    name: $name
    password: $password
    gender: $gender
    birthDate: $birthDate
  ) {
    errors {
      field
      message
    }
    status
    ok
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *      gender: // value for 'gender'
 *      birthDate: // value for 'birthDate'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UnblockUserDocument = gql`
    mutation UnblockUser($blockedId: Int) {
  unblockUser(blockedId: $blockedId)
}
    `;
export type UnblockUserMutationFn = Apollo.MutationFunction<UnblockUserMutation, UnblockUserMutationVariables>;

/**
 * __useUnblockUserMutation__
 *
 * To run a mutation, you first call `useUnblockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockUserMutation, { data, loading, error }] = useUnblockUserMutation({
 *   variables: {
 *      blockedId: // value for 'blockedId'
 *   },
 * });
 */
export function useUnblockUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument, options);
      }
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<UnblockUserMutation, UnblockUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($userId: Int) {
  unfollowUser(userId: $userId)
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const UsersToMentionDocument = gql`
    query UsersToMention($query: String!, $limit: Int!) {
  usersToMention(query: $query, limit: $limit) {
    id
    name
    username
    email
    type
    gender
    birthDate {
      date
      monthAndDayVisibility
      yearVisibility
    }
    emailVerified
    profile {
      profilePicture
      profileBanner
      bio
      website
    }
    userSettings {
      incomingMessages
      twoFactorAuth
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    createdAt
    updatedAt
    hiddenPosts
    identity {
      verified
      verifiedSince
    }
    verification {
      verified
      verifiedSince
    }
  }
}
    `;

/**
 * __useUsersToMentionQuery__
 *
 * To run a query within a React component, call `useUsersToMentionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersToMentionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersToMentionQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUsersToMentionQuery(baseOptions: ApolloReactHooks.QueryHookOptions<UsersToMentionQuery, UsersToMentionQueryVariables> & ({ variables: UsersToMentionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UsersToMentionQuery, UsersToMentionQueryVariables>(UsersToMentionDocument, options);
      }
export function useUsersToMentionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersToMentionQuery, UsersToMentionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UsersToMentionQuery, UsersToMentionQueryVariables>(UsersToMentionDocument, options);
        }
export function useUsersToMentionSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UsersToMentionQuery, UsersToMentionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UsersToMentionQuery, UsersToMentionQueryVariables>(UsersToMentionDocument, options);
        }
export type UsersToMentionQueryHookResult = ReturnType<typeof useUsersToMentionQuery>;
export type UsersToMentionLazyQueryHookResult = ReturnType<typeof useUsersToMentionLazyQuery>;
export type UsersToMentionSuspenseQueryHookResult = ReturnType<typeof useUsersToMentionSuspenseQuery>;
export type UsersToMentionQueryResult = Apollo.QueryResult<UsersToMentionQuery, UsersToMentionQueryVariables>;
export const VerifyEmailAddressDocument = gql`
    mutation VerifyEmailAddress($token: String!) {
  verifyEmailAddress(token: $token) {
    status
    ok
  }
}
    `;
export type VerifyEmailAddressMutationFn = Apollo.MutationFunction<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;

/**
 * __useVerifyEmailAddressMutation__
 *
 * To run a mutation, you first call `useVerifyEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailAddressMutation, { data, loading, error }] = useVerifyEmailAddressMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>(VerifyEmailAddressDocument, options);
      }
export type VerifyEmailAddressMutationHookResult = ReturnType<typeof useVerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationResult = Apollo.MutationResult<VerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationOptions = Apollo.BaseMutationOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation VerifyOTP($otp: String!, $input: String, $password: String, $isLogin: Boolean!, $clientOS: String, $clientType: String, $clientName: String) {
  verifyOTP(
    otp: $otp
    input: $input
    password: $password
    isLogin: $isLogin
    clientOS: $clientOS
    clientType: $clientType
    clientName: $clientName
  ) {
    status
    accessToken
    user {
      id
      name
      username
      email
      type
      gender
      birthDate {
        date
        monthAndDayVisibility
        yearVisibility
      }
      emailVerified
      profile {
        profilePicture
        profileBanner
        bio
        website
      }
      userSettings {
        incomingMessages
        twoFactorAuth
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      createdAt
      updatedAt
      hiddenPosts
      identity {
        verified
        verifiedSince
      }
      verification {
        verified
        verifiedSince
      }
    }
    ok
  }
}
    `;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      otp: // value for 'otp'
 *      input: // value for 'input'
 *      password: // value for 'password'
 *      isLogin: // value for 'isLogin'
 *      clientOS: // value for 'clientOS'
 *      clientType: // value for 'clientType'
 *      clientName: // value for 'clientName'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;