import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
  views: Scalars['Int']['output'];
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

export type FeedItem = {
  __typename?: 'FeedItem';
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isEdited: Scalars['Boolean']['output'];
  itemId: Scalars['String']['output'];
  lang: Scalars['String']['output'];
  topics?: Maybe<Array<Scalars['JSONObject']['output']>>;
  type: Scalars['String']['output'];
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
  incrementPostViews?: Maybe<FeedItem>;
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
  userId: Scalars['Int']['input'];
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


export type MutationIncrementPostViewsArgs = {
  itemId: Scalars['String']['input'];
  itemOpened: Scalars['Boolean']['input'];
  origin: Scalars['String']['input'];
  type: Scalars['String']['input'];
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
  country: Scalars['String']['input'];
  deviceLocation: Scalars['String']['input'];
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
  blockedId: Scalars['Int']['input'];
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
  country?: InputMaybe<Scalars['String']['input']>;
  deviceLocation?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['String']['input']>;
  isLogin: Scalars['Boolean']['input'];
  otp: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
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

export type PaginatedChatItems = {
  __typename?: 'PaginatedChatItems';
  chatItems: Array<MessageOrEvent>;
  hasMore: Scalars['Boolean']['output'];
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
  mentions: Array<Scalars['String']['output']>;
  quotedPostId?: Maybe<Scalars['Int']['output']>;
  topics?: Maybe<Array<Scalars['JSONObject']['output']>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  views: Scalars['Int']['output'];
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
  affiliates: PaginatedUsers;
  allUnseenMessageNotifications?: Maybe<Array<MessageNotification>>;
  blockedUsers: PaginatedUsers;
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
  getBookmarks: PaginatedPosts;
  getFollowers: PaginatedUsers;
  getFollowing: PaginatedUsers;
  getLikedPosts: PaginatedPosts;
  getPostLikes: PaginatedUsers;
  getReposts: PaginatedReposts;
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


export type QueryGetRepostsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  postId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryHasUserBlockedMeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsAffiliatedToArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsBookmarkedArgs = {
  itemId: Scalars['Int']['input'];
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
  postId: Scalars['Int']['input'];
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
  limit?: InputMaybe<Scalars['Int']['input']>;
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
  type: Scalars['String']['input'];
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
  userId: Scalars['Int']['input'];
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
  userId: Scalars['Int']['input'];
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

export type UsersToMessageQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type UsersToMessageQuery = { __typename?: 'Query', usersToMessage: { __typename?: 'PaginatedUsers', hasMore: boolean, users: Array<{ __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }> } };

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


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', ok: boolean, status?: string | null, post?: { __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, views: number, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, mentions: Array<string>, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

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


export type EditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'PostResponse', ok: boolean, status?: string | null, post?: { __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, views: number, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, mentions: Array<string>, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type FindPostQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type FindPostQuery = { __typename?: 'Query', findPost?: { __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, views: number, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, mentions: Array<string>, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null } | null };

export type FindPostByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindPostByIdQuery = { __typename?: 'Query', findPostById?: { __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, views: number, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, mentions: Array<string>, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null } | null };

export type GetPostLikesQueryVariables = Exact<{
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostLikesQuery = { __typename?: 'Query', getPostLikes: { __typename?: 'PaginatedUsers', hasMore: boolean, totalCount?: number | null, users: Array<{ __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }> } };

export type GetRepostsQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetRepostsQuery = { __typename?: 'Query', getReposts: { __typename?: 'PaginatedReposts', hasMore: boolean, totalCount?: number | null, reposts: Array<{ __typename?: 'Repost', id: number, repostId: string, postId: number, authorId: number, createdAt: string, updatedAt: string }> } };

export type IncrementPostViewsMutationVariables = Exact<{
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  itemOpened: Scalars['Boolean']['input'];
  origin: Scalars['String']['input'];
}>;


export type IncrementPostViewsMutation = { __typename?: 'Mutation', incrementPostViews?: { __typename?: 'FeedItem', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, views: number, lang: string, topics?: Array<any> | null, createdAt: string, updatedAt: string } | null };

export type IsBookmarkedQueryVariables = Exact<{
  itemId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
}>;


export type IsBookmarkedQuery = { __typename?: 'Query', isBookmarked?: { __typename?: 'Bookmark', id: number, itemId: number, itemType: string, origin: string, authorId: number, createdAt: string, updatedAt: string } | null };

export type IsPostLikedByMeQueryVariables = Exact<{
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
}>;


export type IsPostLikedByMeQuery = { __typename?: 'Query', isPostLikedByMe?: { __typename?: 'Like', id: number, userId: number, likedItemId: string, itemOpened: boolean, itemType: string, origin: string, createdAt: string, updatedAt: string } | null };

export type IsRepostedByUserQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
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


export type PostCommentsQuery = { __typename?: 'Query', postComments: { __typename?: 'PaginatedPosts', hasMore: boolean, totalCount?: number | null, posts: Array<{ __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, views: number, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, mentions: Array<string>, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null }> } };

export type PostFeedQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostFeedQuery = { __typename?: 'Query', postFeed: { __typename?: 'PaginatedPosts', hasMore: boolean, totalCount?: number | null, posts: Array<{ __typename?: 'Post', id: number, itemId: string, authorId: number, type: string, content: string, isEdited: boolean, views: number, lang: string, topics?: Array<any> | null, isReplyToId?: number | null, isReplyToType?: string | null, quotedPostId?: number | null, mentions: Array<string>, hashtags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string }> | null }> } };

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

export type FindUserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } | null };

export type FindUserBeforeLogInMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type FindUserBeforeLogInMutation = { __typename?: 'Mutation', findUserBeforeLogIn: { __typename?: 'UserResponse', status?: string | null, ok: boolean, user?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

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


export type GetFollowersQuery = { __typename?: 'Query', getFollowers: { __typename?: 'PaginatedUsers', hasMore: boolean, totalCount?: number | null, users: Array<{ __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }> } };

export type IsAffiliatedToQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IsAffiliatedToQuery = { __typename?: 'Query', isAffiliatedTo?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } | null };

export type IsFollowedByMeQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IsFollowedByMeQuery = { __typename?: 'Query', isFollowedByMe?: { __typename?: 'Follow', id: number, origin: string, createdAt: string, updatedAt: string, follower: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } }, user: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, hiddenPosts: Array<number>, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean }, identity: { __typename?: 'IdentityVerification', verified: VerificationStatus, verifiedSince?: string | null }, verification: { __typename?: 'Verification', verified: VerificationStatus, verifiedSince?: string | null } } } | null };

export type LoginMutationVariables = Exact<{
  input: Scalars['String']['input'];
  password: Scalars['String']['input'];
  clientOS: Scalars['String']['input'];
  clientType: Scalars['String']['input'];
  clientName: Scalars['String']['input'];
  deviceLocation: Scalars['String']['input'];
  country: Scalars['String']['input'];
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
  deviceLocation?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
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
export function useUsersToMessageQuery(baseOptions: Apollo.QueryHookOptions<UsersToMessageQuery, UsersToMessageQueryVariables> & ({ variables: UsersToMessageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersToMessageQuery, UsersToMessageQueryVariables>(UsersToMessageDocument, options);
      }
export function useUsersToMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersToMessageQuery, UsersToMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersToMessageQuery, UsersToMessageQueryVariables>(UsersToMessageDocument, options);
        }
export function useUsersToMessageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersToMessageQuery, UsersToMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersToMessageQuery, UsersToMessageQueryVariables>(UsersToMessageDocument, options);
        }
export type UsersToMessageQueryHookResult = ReturnType<typeof useUsersToMessageQuery>;
export type UsersToMessageLazyQueryHookResult = ReturnType<typeof useUsersToMessageLazyQuery>;
export type UsersToMessageSuspenseQueryHookResult = ReturnType<typeof useUsersToMessageSuspenseQuery>;
export type UsersToMessageQueryResult = Apollo.QueryResult<UsersToMessageQuery, UsersToMessageQueryVariables>;
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
export function useCreateBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookmarkMutation, CreateBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookmarkMutation, CreateBookmarkMutationVariables>(CreateBookmarkDocument, options);
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
      views
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
      mentions
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
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
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
export function useCreateRepostMutation(baseOptions?: Apollo.MutationHookOptions<CreateRepostMutation, CreateRepostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRepostMutation, CreateRepostMutationVariables>(CreateRepostDocument, options);
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
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
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
export function useDeleteRepostMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRepostMutation, DeleteRepostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRepostMutation, DeleteRepostMutationVariables>(DeleteRepostDocument, options);
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
      views
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
      mentions
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
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const FindPostDocument = gql`
    query FindPost($postId: String!) {
  findPost(postId: $postId) {
    id
    itemId
    authorId
    type
    content
    isEdited
    views
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
    mentions
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
 *   },
 * });
 */
export function useFindPostQuery(baseOptions: Apollo.QueryHookOptions<FindPostQuery, FindPostQueryVariables> & ({ variables: FindPostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPostQuery, FindPostQueryVariables>(FindPostDocument, options);
      }
export function useFindPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPostQuery, FindPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPostQuery, FindPostQueryVariables>(FindPostDocument, options);
        }
export function useFindPostSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindPostQuery, FindPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindPostQuery, FindPostQueryVariables>(FindPostDocument, options);
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
    views
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
    mentions
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
export function useFindPostByIdQuery(baseOptions?: Apollo.QueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
      }
export function useFindPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
        }
export function useFindPostByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
        }
export type FindPostByIdQueryHookResult = ReturnType<typeof useFindPostByIdQuery>;
export type FindPostByIdLazyQueryHookResult = ReturnType<typeof useFindPostByIdLazyQuery>;
export type FindPostByIdSuspenseQueryHookResult = ReturnType<typeof useFindPostByIdSuspenseQuery>;
export type FindPostByIdQueryResult = Apollo.QueryResult<FindPostByIdQuery, FindPostByIdQueryVariables>;
export const GetPostLikesDocument = gql`
    query GetPostLikes($itemId: String!, $type: String!, $limit: Int!, $cursor: String) {
  getPostLikes(itemId: $itemId, type: $type, limit: $limit, cursor: $cursor) {
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
export function useGetPostLikesQuery(baseOptions: Apollo.QueryHookOptions<GetPostLikesQuery, GetPostLikesQueryVariables> & ({ variables: GetPostLikesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostLikesQuery, GetPostLikesQueryVariables>(GetPostLikesDocument, options);
      }
export function useGetPostLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostLikesQuery, GetPostLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostLikesQuery, GetPostLikesQueryVariables>(GetPostLikesDocument, options);
        }
export function useGetPostLikesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostLikesQuery, GetPostLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostLikesQuery, GetPostLikesQueryVariables>(GetPostLikesDocument, options);
        }
export type GetPostLikesQueryHookResult = ReturnType<typeof useGetPostLikesQuery>;
export type GetPostLikesLazyQueryHookResult = ReturnType<typeof useGetPostLikesLazyQuery>;
export type GetPostLikesSuspenseQueryHookResult = ReturnType<typeof useGetPostLikesSuspenseQuery>;
export type GetPostLikesQueryResult = Apollo.QueryResult<GetPostLikesQuery, GetPostLikesQueryVariables>;
export const GetRepostsDocument = gql`
    query GetReposts($postId: Int!, $limit: Int!, $cursor: String) {
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
export function useGetRepostsQuery(baseOptions: Apollo.QueryHookOptions<GetRepostsQuery, GetRepostsQueryVariables> & ({ variables: GetRepostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRepostsQuery, GetRepostsQueryVariables>(GetRepostsDocument, options);
      }
export function useGetRepostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRepostsQuery, GetRepostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRepostsQuery, GetRepostsQueryVariables>(GetRepostsDocument, options);
        }
export function useGetRepostsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRepostsQuery, GetRepostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRepostsQuery, GetRepostsQueryVariables>(GetRepostsDocument, options);
        }
export type GetRepostsQueryHookResult = ReturnType<typeof useGetRepostsQuery>;
export type GetRepostsLazyQueryHookResult = ReturnType<typeof useGetRepostsLazyQuery>;
export type GetRepostsSuspenseQueryHookResult = ReturnType<typeof useGetRepostsSuspenseQuery>;
export type GetRepostsQueryResult = Apollo.QueryResult<GetRepostsQuery, GetRepostsQueryVariables>;
export const IncrementPostViewsDocument = gql`
    mutation IncrementPostViews($itemId: String!, $type: String!, $itemOpened: Boolean!, $origin: String!) {
  incrementPostViews(
    itemId: $itemId
    type: $type
    itemOpened: $itemOpened
    origin: $origin
  ) {
    id
    itemId
    authorId
    type
    content
    isEdited
    views
    lang
    topics
    createdAt
    updatedAt
  }
}
    `;
export type IncrementPostViewsMutationFn = Apollo.MutationFunction<IncrementPostViewsMutation, IncrementPostViewsMutationVariables>;

/**
 * __useIncrementPostViewsMutation__
 *
 * To run a mutation, you first call `useIncrementPostViewsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementPostViewsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementPostViewsMutation, { data, loading, error }] = useIncrementPostViewsMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      type: // value for 'type'
 *      itemOpened: // value for 'itemOpened'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useIncrementPostViewsMutation(baseOptions?: Apollo.MutationHookOptions<IncrementPostViewsMutation, IncrementPostViewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementPostViewsMutation, IncrementPostViewsMutationVariables>(IncrementPostViewsDocument, options);
      }
export type IncrementPostViewsMutationHookResult = ReturnType<typeof useIncrementPostViewsMutation>;
export type IncrementPostViewsMutationResult = Apollo.MutationResult<IncrementPostViewsMutation>;
export type IncrementPostViewsMutationOptions = Apollo.BaseMutationOptions<IncrementPostViewsMutation, IncrementPostViewsMutationVariables>;
export const IsBookmarkedDocument = gql`
    query IsBookmarked($itemId: Int!, $type: String!) {
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
export function useIsBookmarkedQuery(baseOptions: Apollo.QueryHookOptions<IsBookmarkedQuery, IsBookmarkedQueryVariables> & ({ variables: IsBookmarkedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsBookmarkedQuery, IsBookmarkedQueryVariables>(IsBookmarkedDocument, options);
      }
export function useIsBookmarkedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsBookmarkedQuery, IsBookmarkedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsBookmarkedQuery, IsBookmarkedQueryVariables>(IsBookmarkedDocument, options);
        }
export function useIsBookmarkedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsBookmarkedQuery, IsBookmarkedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsBookmarkedQuery, IsBookmarkedQueryVariables>(IsBookmarkedDocument, options);
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
export function useIsPostLikedByMeQuery(baseOptions: Apollo.QueryHookOptions<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables> & ({ variables: IsPostLikedByMeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>(IsPostLikedByMeDocument, options);
      }
export function useIsPostLikedByMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>(IsPostLikedByMeDocument, options);
        }
export function useIsPostLikedByMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>(IsPostLikedByMeDocument, options);
        }
export type IsPostLikedByMeQueryHookResult = ReturnType<typeof useIsPostLikedByMeQuery>;
export type IsPostLikedByMeLazyQueryHookResult = ReturnType<typeof useIsPostLikedByMeLazyQuery>;
export type IsPostLikedByMeSuspenseQueryHookResult = ReturnType<typeof useIsPostLikedByMeSuspenseQuery>;
export type IsPostLikedByMeQueryResult = Apollo.QueryResult<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>;
export const IsRepostedByUserDocument = gql`
    query IsRepostedByUser($postId: Int!, $userId: Int) {
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
export function useIsRepostedByUserQuery(baseOptions: Apollo.QueryHookOptions<IsRepostedByUserQuery, IsRepostedByUserQueryVariables> & ({ variables: IsRepostedByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>(IsRepostedByUserDocument, options);
      }
export function useIsRepostedByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>(IsRepostedByUserDocument, options);
        }
export function useIsRepostedByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsRepostedByUserQuery, IsRepostedByUserQueryVariables>(IsRepostedByUserDocument, options);
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
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
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
      views
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
      mentions
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
export function usePostCommentsQuery(baseOptions: Apollo.QueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables> & ({ variables: PostCommentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
      }
export function usePostCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
        }
export function usePostCommentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
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
      views
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
      mentions
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
export function usePostFeedQuery(baseOptions: Apollo.QueryHookOptions<PostFeedQuery, PostFeedQueryVariables> & ({ variables: PostFeedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostFeedQuery, PostFeedQueryVariables>(PostFeedDocument, options);
      }
export function usePostFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostFeedQuery, PostFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostFeedQuery, PostFeedQueryVariables>(PostFeedDocument, options);
        }
export function usePostFeedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostFeedQuery, PostFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostFeedQuery, PostFeedQueryVariables>(PostFeedDocument, options);
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
export function useRemoveBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>(RemoveBookmarkDocument, options);
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
export function useRemoveLikeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLikeMutation, RemoveLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(RemoveLikeDocument, options);
      }
export type RemoveLikeMutationHookResult = ReturnType<typeof useRemoveLikeMutation>;
export type RemoveLikeMutationResult = Apollo.MutationResult<RemoveLikeMutation>;
export type RemoveLikeMutationOptions = Apollo.BaseMutationOptions<RemoveLikeMutation, RemoveLikeMutationVariables>;
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
export function useCreateReportMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportMutation, CreateReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument, options);
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
export function useReportOptionsQuery(baseOptions: Apollo.QueryHookOptions<ReportOptionsQuery, ReportOptionsQueryVariables> & ({ variables: ReportOptionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportOptionsQuery, ReportOptionsQueryVariables>(ReportOptionsDocument, options);
      }
export function useReportOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportOptionsQuery, ReportOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportOptionsQuery, ReportOptionsQueryVariables>(ReportOptionsDocument, options);
        }
export function useReportOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReportOptionsQuery, ReportOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReportOptionsQuery, ReportOptionsQueryVariables>(ReportOptionsDocument, options);
        }
export type ReportOptionsQueryHookResult = ReturnType<typeof useReportOptionsQuery>;
export type ReportOptionsLazyQueryHookResult = ReturnType<typeof useReportOptionsLazyQuery>;
export type ReportOptionsSuspenseQueryHookResult = ReturnType<typeof useReportOptionsSuspenseQuery>;
export type ReportOptionsQueryResult = Apollo.QueryResult<ReportOptionsQuery, ReportOptionsQueryVariables>;
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
export function useFindUserQuery(baseOptions: Apollo.QueryHookOptions<FindUserQuery, FindUserQueryVariables> & ({ variables: FindUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
      }
export function useFindUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
        }
export function useFindUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
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
export function useFindUserBeforeLogInMutation(baseOptions?: Apollo.MutationHookOptions<FindUserBeforeLogInMutation, FindUserBeforeLogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FindUserBeforeLogInMutation, FindUserBeforeLogInMutationVariables>(FindUserBeforeLogInDocument, options);
      }
export type FindUserBeforeLogInMutationHookResult = ReturnType<typeof useFindUserBeforeLogInMutation>;
export type FindUserBeforeLogInMutationResult = Apollo.MutationResult<FindUserBeforeLogInMutation>;
export type FindUserBeforeLogInMutationOptions = Apollo.BaseMutationOptions<FindUserBeforeLogInMutation, FindUserBeforeLogInMutationVariables>;
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
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const GetFollowersDocument = gql`
    query GetFollowers($id: Int, $limit: Int!, $cursor: String) {
  getFollowers(id: $id, limit: $limit, cursor: $cursor) {
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
export function useGetFollowersQuery(baseOptions: Apollo.QueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables> & ({ variables: GetFollowersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
      }
export function useGetFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
        }
export function useGetFollowersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
        }
export type GetFollowersQueryHookResult = ReturnType<typeof useGetFollowersQuery>;
export type GetFollowersLazyQueryHookResult = ReturnType<typeof useGetFollowersLazyQuery>;
export type GetFollowersSuspenseQueryHookResult = ReturnType<typeof useGetFollowersSuspenseQuery>;
export type GetFollowersQueryResult = Apollo.QueryResult<GetFollowersQuery, GetFollowersQueryVariables>;
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
export function useIsAffiliatedToQuery(baseOptions?: Apollo.QueryHookOptions<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>(IsAffiliatedToDocument, options);
      }
export function useIsAffiliatedToLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>(IsAffiliatedToDocument, options);
        }
export function useIsAffiliatedToSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsAffiliatedToQuery, IsAffiliatedToQueryVariables>(IsAffiliatedToDocument, options);
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
export function useIsFollowedByMeQuery(baseOptions?: Apollo.QueryHookOptions<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>(IsFollowedByMeDocument, options);
      }
export function useIsFollowedByMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>(IsFollowedByMeDocument, options);
        }
export function useIsFollowedByMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>(IsFollowedByMeDocument, options);
        }
export type IsFollowedByMeQueryHookResult = ReturnType<typeof useIsFollowedByMeQuery>;
export type IsFollowedByMeLazyQueryHookResult = ReturnType<typeof useIsFollowedByMeLazyQuery>;
export type IsFollowedByMeSuspenseQueryHookResult = ReturnType<typeof useIsFollowedByMeSuspenseQuery>;
export type IsFollowedByMeQueryResult = Apollo.QueryResult<IsFollowedByMeQuery, IsFollowedByMeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($input: String!, $password: String!, $clientOS: String!, $clientType: String!, $clientName: String!, $deviceLocation: String!, $country: String!) {
  login(
    input: $input
    password: $password
    clientOS: $clientOS
    clientType: $clientType
    clientName: $clientName
    deviceLocation: $deviceLocation
    country: $country
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
 *      deviceLocation: // value for 'deviceLocation'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
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
export function useNotAuthModifyPasswordMutation(baseOptions?: Apollo.MutationHookOptions<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>(NotAuthModifyPasswordDocument, options);
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
export function useReactivateAccountMutation(baseOptions?: Apollo.MutationHookOptions<ReactivateAccountMutation, ReactivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReactivateAccountMutation, ReactivateAccountMutationVariables>(ReactivateAccountDocument, options);
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
export function useResendOtpMutation(baseOptions?: Apollo.MutationHookOptions<ResendOtpMutation, ResendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendOtpMutation, ResendOtpMutationVariables>(ResendOtpDocument, options);
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
export function useSendRecoveryEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>(SendRecoveryEmailDocument, options);
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
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
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
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
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
export function useUsersToMentionQuery(baseOptions: Apollo.QueryHookOptions<UsersToMentionQuery, UsersToMentionQueryVariables> & ({ variables: UsersToMentionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersToMentionQuery, UsersToMentionQueryVariables>(UsersToMentionDocument, options);
      }
export function useUsersToMentionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersToMentionQuery, UsersToMentionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersToMentionQuery, UsersToMentionQueryVariables>(UsersToMentionDocument, options);
        }
export function useUsersToMentionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersToMentionQuery, UsersToMentionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersToMentionQuery, UsersToMentionQueryVariables>(UsersToMentionDocument, options);
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
export function useVerifyEmailAddressMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>(VerifyEmailAddressDocument, options);
      }
export type VerifyEmailAddressMutationHookResult = ReturnType<typeof useVerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationResult = Apollo.MutationResult<VerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationOptions = Apollo.BaseMutationOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation VerifyOTP($otp: String!, $input: String, $password: String, $isLogin: Boolean!, $clientOS: String, $clientType: String, $clientName: String, $deviceLocation: String, $country: String) {
  verifyOTP(
    otp: $otp
    input: $input
    password: $password
    isLogin: $isLogin
    clientOS: $clientOS
    clientType: $clientType
    clientName: $clientName
    deviceLocation: $deviceLocation
    country: $country
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
 *      deviceLocation: // value for 'deviceLocation'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;