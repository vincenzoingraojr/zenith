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
};

export type Article = {
  __typename?: 'Article';
  articleId: Scalars['String']['output'];
  author: User;
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  cover: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isEdited: Scalars['Boolean']['output'];
  lang: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topicsIds: Array<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
  views: Scalars['Int']['output'];
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
  userId: Scalars['Int']['output'];
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
  visible: Scalars['Boolean']['output'];
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  chat?: Maybe<Chat>;
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['String']['output']>;
};

export type ChatUser = {
  __typename?: 'ChatUser';
  chat: Chat;
  hiddenMessagesIds?: Maybe<Array<Scalars['Int']['output']>>;
  id: Scalars['Int']['output'];
  inside: Scalars['Boolean']['output'];
  joinedChat: Scalars['String']['output'];
  lastExit?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type Event = {
  __typename?: 'Event';
  chat: Chat;
  createdAt: Scalars['String']['output'];
  eventMessage: Scalars['String']['output'];
  eventType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  resourceId?: Maybe<Scalars['Int']['output']>;
  userId: Scalars['Int']['output'];
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
  user: User;
};

export type LandingUser = {
  __typename?: 'LandingUser';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  likedPostId: Scalars['String']['output'];
  origin: Scalars['String']['output'];
  postOpened: Scalars['Boolean']['output'];
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
  isReplyTo?: Maybe<Scalars['Int']['output']>;
  item: MessageItem;
  media: MessageMedia;
  mentions?: Maybe<Array<Scalars['String']['output']>>;
  messageId: Scalars['String']['output'];
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
  itemId: Scalars['Int']['output'];
  itemType: Scalars['String']['output'];
  notificationId: Scalars['String']['output'];
  recipientId: Scalars['Int']['output'];
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
  createChatOrGroup: ChatResponse;
  createDeviceToken: Scalars['Boolean']['output'];
  createPost: PostResponse;
  createReport: ReportResponse;
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
  deleteSession: Scalars['Boolean']['output'];
  editBirthDate: UserResponse;
  editEmailAddress: UserResponse;
  editGroupInfo: ChatResponse;
  editHideBlockedAccountsSetting: Scalars['Boolean']['output'];
  editHideSensitiveContentSetting: Scalars['Boolean']['output'];
  editIncomingMessages: UserResponse;
  editMessage: Scalars['Boolean']['output'];
  editProfile: UserResponse;
  editTwoFactorAuth: UserResponse;
  findUserBeforeLogIn?: Maybe<UserResponse>;
  followUser?: Maybe<Follow>;
  incrementPostViews?: Maybe<Post>;
  likePost?: Maybe<Like>;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean']['output'];
  notAuthModifyPassword: UserResponse;
  reactivateAccount?: Maybe<UserResponse>;
  removeLike: Scalars['Boolean']['output'];
  removeUserFromGroup: Scalars['Boolean']['output'];
  resendOTP: Scalars['Boolean']['output'];
  sendMessage?: Maybe<Message>;
  sendRecoveryEmail: UserResponse;
  signup?: Maybe<UserResponse>;
  unblockUser: Scalars['Boolean']['output'];
  unfollowUser: Scalars['Boolean']['output'];
  updateGender: UserResponse;
  updatePost: PostResponse;
  verifyEmailAddress: UserResponse;
  verifyOTP: UserResponse;
  viewMessage?: Maybe<Message>;
  viewMessageNotifications?: Maybe<Scalars['Boolean']['output']>;
  viewNotification?: Maybe<Scalars['Boolean']['output']>;
  viewNotifications?: Maybe<Scalars['Boolean']['output']>;
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
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateChatOrGroupArgs = {
  chatImage?: InputMaybe<Scalars['String']['input']>;
  chatTitle?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  userIds: Array<Scalars['Int']['input']>;
};


export type MutationCreateDeviceTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreatePostArgs = {
  content: Scalars['String']['input'];
  isReplyTo?: InputMaybe<Scalars['Int']['input']>;
  media: Scalars['String']['input'];
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
  media: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
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
  userId: Scalars['Int']['input'];
};


export type MutationIncrementPostViewsArgs = {
  origin: Scalars['String']['input'];
  postId: Scalars['String']['input'];
  postOpened: Scalars['Boolean']['input'];
};


export type MutationLikePostArgs = {
  origin: Scalars['String']['input'];
  postId: Scalars['String']['input'];
  postOpened: Scalars['Boolean']['input'];
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


export type MutationNotAuthModifyPasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationReactivateAccountArgs = {
  input: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveLikeArgs = {
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveUserFromGroupArgs = {
  chatId: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationResendOtpArgs = {
  input?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendMessageArgs = {
  chatId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  isReplyTo?: InputMaybe<Scalars['Int']['input']>;
  item: Scalars['String']['input'];
  media: Scalars['String']['input'];
  type: Scalars['String']['input'];
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
  gender?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePostArgs = {
  content: Scalars['String']['input'];
  deletedMedia: Scalars['String']['input'];
  existingAltTexts: Scalars['String']['input'];
  media: Scalars['String']['input'];
  postId: Scalars['String']['input'];
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
  messageId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationViewMessageNotificationsArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationViewNotificationArgs = {
  notificationId?: InputMaybe<Scalars['String']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  notificationId: Scalars['String']['output'];
  recipientId: Scalars['Int']['output'];
  resourceId: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  viewed: Scalars['Boolean']['output'];
};

export type PaginatedNotifications = {
  __typename?: 'PaginatedNotifications';
  nextCursor?: Maybe<Scalars['String']['output']>;
  notifications: Array<Notification>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  hashtags?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['Int']['output'];
  isEdited: Scalars['Boolean']['output'];
  isReplyTo?: Maybe<Scalars['Int']['output']>;
  lang: Scalars['String']['output'];
  media?: Maybe<Array<MediaItem>>;
  mentions?: Maybe<Array<Scalars['String']['output']>>;
  postId: Scalars['String']['output'];
  quotedPostId?: Maybe<Scalars['Int']['output']>;
  topicsIds: Array<Scalars['Int']['output']>;
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
  allUnseenMessageNotifications: Array<MessageNotification>;
  blockedUsers: Array<User>;
  chatUsers: Array<User>;
  chats: Array<Chat>;
  currentSession?: Maybe<Session>;
  findChat?: Maybe<Chat>;
  findMessage?: Maybe<Message>;
  findMessageById?: Maybe<Message>;
  findPost?: Maybe<Post>;
  findPostById?: Maybe<Post>;
  findSession?: Maybe<Session>;
  findUser?: Maybe<User>;
  findUserByEmail?: Maybe<User>;
  findUserById?: Maybe<User>;
  findUserDeviceTokenById?: Maybe<UserDeviceToken>;
  findUserDeviceTokenBySessionId?: Maybe<UserDeviceToken>;
  findUserDeviceTokenByToken?: Maybe<UserDeviceToken>;
  findUserDeviceTokensByUserId?: Maybe<Array<UserDeviceToken>>;
  getFollowers?: Maybe<Array<User>>;
  getFollowing?: Maybe<Array<User>>;
  getLikedPosts?: Maybe<Array<Post>>;
  getPostLikes?: Maybe<Array<User>>;
  hasUserBlockedMe: Scalars['Boolean']['output'];
  isFollowedByMe: Scalars['Boolean']['output'];
  isPostLikedByMe: Scalars['Boolean']['output'];
  isUserBlockedByMe: Scalars['Boolean']['output'];
  isUserFollowingMe: Scalars['Boolean']['output'];
  landingUsers: Array<LandingUser>;
  latestMessageOrEvent?: Maybe<MessageOrEvent>;
  me?: Maybe<User>;
  messagesAndEvents: Array<MessageOrEvent>;
  notificationFeed: PaginatedNotifications;
  otherSessions?: Maybe<Array<Session>>;
  postComments: Array<Post>;
  postFeed: Array<Post>;
  postMedia: Array<MediaItem>;
  relevantPeople: Array<User>;
  reportOptions: Array<ReportOption>;
  search: SearchResult;
  topics?: Maybe<Array<Topic>>;
  unseenMessageNotifications: Array<MessageNotification>;
  unseenNotifications: Array<Notification>;
  userComments: Array<Post>;
  userPostFeed: Array<Post>;
  usersToMessage: Array<User>;
};


export type QueryChatUsersArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindChatArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindMessageArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
  messageId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindMessageByIdArgs = {
  chatId: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};


export type QueryFindPostArgs = {
  postId: Scalars['String']['input'];
};


export type QueryFindPostByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindSessionArgs = {
  sessionId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindUserArgs = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindUserByEmailArgs = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
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
  sessionId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindUserDeviceTokenByTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindUserDeviceTokensByUserIdArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetFollowersArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetFollowingArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetLikedPostsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPostLikesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHasUserBlockedMeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsFollowedByMeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsPostLikedByMeArgs = {
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryIsUserBlockedByMeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIsUserFollowingMeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLatestMessageOrEventArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMessagesAndEventsArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNotificationFeedArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostCommentsArgs = {
  id: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostMediaArgs = {
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRelevantPeopleArgs = {
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryReportOptionsArgs = {
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUnseenMessageNotificationsArgs = {
  chatId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};


export type QueryUserPostFeedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type Report = {
  __typename?: 'Report';
  additionalContentIds?: Maybe<Array<Scalars['Int']['output']>>;
  additionalContentType?: Maybe<Scalars['String']['output']>;
  authorId: Scalars['Int']['output'];
  categoryId: Scalars['Int']['output'];
  contentId: Scalars['String']['output'];
  contentType: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  outcome?: Maybe<Scalars['String']['output']>;
  reportId: Scalars['String']['output'];
  status: ReportStatus;
  subCategoryId?: Maybe<Scalars['Int']['output']>;
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
  creationDate: Scalars['String']['output'];
  deviceLocation: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  sessionId: Scalars['String']['output'];
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
  deletedPost: Post;
  editedChat: Chat;
  editedChatUser: ChatUser;
  editedMessage: Message;
  editedPost: Post;
  newChat: Chat;
  newMessageNotification: MessageNotification;
  newMessageOrEvent: MessageOrEvent;
  newNotification: Notification;
  newPost: Post;
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


export type SubscriptionDeletedPostArgs = {
  postId?: InputMaybe<Scalars['Int']['input']>;
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
  authorId?: InputMaybe<Scalars['Float']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
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


export type SubscriptionNewPostArgs = {
  postId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type Topic = {
  __typename?: 'Topic';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  articles?: Maybe<Array<Article>>;
  birthDate?: Maybe<BirthDate>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  followers?: Maybe<Array<Follow>>;
  following?: Maybe<Array<Follow>>;
  gender: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isAffiliatedTo?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  profile: Profile;
  searchSettings: SearchSettings;
  sessions?: Maybe<Array<Session>>;
  topicsIds: Array<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  userSettings: Settings;
  username: Scalars['String']['output'];
};

export type UserDeviceToken = {
  __typename?: 'UserDeviceToken';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  sessionId: Scalars['String']['output'];
  token: Scalars['String']['output'];
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

export type AddLandingUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type AddLandingUserMutation = { __typename?: 'Mutation', addLandingUser: { __typename?: 'UserResponse', status?: string | null, ok: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };


export const AddLandingUserDocument = gql`
    mutation addLandingUser($name: String!, $username: String!, $email: String!) {
  addLandingUser(name: $name, username: $username, email: $email) {
    errors {
      field
      message
    }
    status
    ok
  }
}
    `;
export type AddLandingUserMutationFn = Apollo.MutationFunction<AddLandingUserMutation, AddLandingUserMutationVariables>;

/**
 * __useAddLandingUserMutation__
 *
 * To run a mutation, you first call `useAddLandingUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLandingUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLandingUserMutation, { data, loading, error }] = useAddLandingUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddLandingUserMutation(baseOptions?: Apollo.MutationHookOptions<AddLandingUserMutation, AddLandingUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLandingUserMutation, AddLandingUserMutationVariables>(AddLandingUserDocument, options);
      }
export type AddLandingUserMutationHookResult = ReturnType<typeof useAddLandingUserMutation>;
export type AddLandingUserMutationResult = Apollo.MutationResult<AddLandingUserMutation>;
export type AddLandingUserMutationOptions = Apollo.BaseMutationOptions<AddLandingUserMutation, AddLandingUserMutationVariables>;