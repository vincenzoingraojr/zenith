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
  creatorId: Scalars['Float']['output'];
  events?: Maybe<Array<Event>>;
  id: Scalars['Int']['output'];
  messages?: Maybe<Array<Message>>;
  messagesCount: Scalars['Int']['output'];
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
  resourceId?: Maybe<Scalars['Float']['output']>;
  userId: Scalars['Float']['output'];
};

export type ExploreSettings = {
  __typename?: 'ExploreSettings';
  personalizedTrends: Scalars['Boolean']['output'];
  useLocation: Scalars['Boolean']['output'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['String']['output'];
  followerId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  origin: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
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
  authorId: Scalars['Float']['output'];
  chat: Chat;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  hashtags?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['Int']['output'];
  isEdited: Scalars['Boolean']['output'];
  isReplyTo?: Maybe<Scalars['Float']['output']>;
  media: MessageMedia;
  mentions?: Maybe<Array<Scalars['String']['output']>>;
  messageId: Scalars['String']['output'];
  status: MessageStatus;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
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
  editPersonalizedTrendsSetting: Scalars['Boolean']['output'];
  editProfile: UserResponse;
  editTwoFactorAuth: UserResponse;
  editUseLocationOnTrends: Scalars['Boolean']['output'];
  findUserBeforeLogIn?: Maybe<UserResponse>;
  followUser?: Maybe<Follow>;
  incrementPostViews?: Maybe<Post>;
  likePost?: Maybe<Like>;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean']['output'];
  notAuthModifyPassword: UserResponse;
  removeLike: Scalars['Boolean']['output'];
  removeUserFromGroup: Scalars['Boolean']['output'];
  resendOTP: Scalars['Boolean']['output'];
  revokeRefreshTokensForUser: Scalars['Boolean']['output'];
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
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
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


export type MutationRevokeRefreshTokensForUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationSendMessageArgs = {
  chatId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  isReplyTo?: InputMaybe<Scalars['Int']['input']>;
  media: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationSendRecoveryEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  birthDate: Scalars['DateTimeISO']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
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

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Float']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  hashtags?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['Int']['output'];
  isEdited: Scalars['Boolean']['output'];
  isReplyTo?: Maybe<Scalars['Float']['output']>;
  lang: Scalars['String']['output'];
  media?: Maybe<Array<MediaItem>>;
  mentions?: Maybe<Array<Scalars['String']['output']>>;
  postId: Scalars['String']['output'];
  topicsIds: Array<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  views: Scalars['Int']['output'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
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
  latestMessageOrEvent?: Maybe<MessageOrEvent>;
  me?: Maybe<User>;
  messagesAndEvents: Array<MessageOrEvent>;
  notificationFeed: Array<Notification>;
  otherSessions?: Maybe<Array<Session>>;
  postComments: Array<Post>;
  postFeed: Array<Post>;
  postMedia: Array<MediaItem>;
  relevantPeople: Array<User>;
  reportOptions: Array<ReportOption>;
  search: SearchResult;
  topics: Array<Topic>;
  trends: Array<Trend>;
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
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindPostByIdArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindSessionArgs = {
  sessionId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindUserArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
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
};


export type QueryGetFollowingArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetLikedPostsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPostLikesArgs = {
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


export type QueryPostCommentsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
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
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserPostFeedArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type Report = {
  __typename?: 'Report';
  additionalContentIds?: Maybe<Array<Scalars['Int']['output']>>;
  additionalContentType?: Maybe<Scalars['String']['output']>;
  authorId: Scalars['Float']['output'];
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
  editedChat: Chat;
  editedChatUser: ChatUser;
  editedMessage: Message;
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
};

export type Trend = {
  __typename?: 'Trend';
  occurrences: Scalars['Int']['output'];
  term: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  birthDate?: Maybe<BirthDate>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  exploreSettings: ExploreSettings;
  firstName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  profile: Profile;
  searchSettings: SearchSettings;
  sessions?: Maybe<Array<Session>>;
  topicsIds: Array<Scalars['Int']['output']>;
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
  status?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type AddNewUsersToGroupMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type AddNewUsersToGroupMutation = { __typename?: 'Mutation', addNewUsersToGroup: { __typename?: 'ChatResponse', status?: string | null } };

export type AddedChatUsersSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddedChatUsersSubscription = { __typename?: 'Subscription', addedChatUsers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }> };

export type AllUnseenMessageNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUnseenMessageNotificationsQuery = { __typename?: 'Query', allUnseenMessageNotifications: Array<{ __typename?: 'MessageNotification', id: number, notificationId: string, creatorId: number, chatId: string, itemId: number, recipientId: number, itemType: string, content: string, viewed: boolean, createdAt: string }> };

export type AuthSendVerificationEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthSendVerificationEmailMutation = { __typename?: 'Mutation', authSendVerificationEmail: { __typename?: 'UserResponse', status?: string | null } };

export type BlockUserMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  origin: Scalars['String']['input'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser?: { __typename?: 'Block', id: number, blockedId: number, userId: number, origin: string, createdAt: string } | null };

export type BlockedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type BlockedUsersQuery = { __typename?: 'Query', blockedUsers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }> };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', status?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangeUserRoleMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
}>;


export type ChangeUserRoleMutation = { __typename?: 'Mutation', changeUserRole: boolean };

export type ChangeUsernameMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type ChangeUsernameMutation = { __typename?: 'Mutation', changeUsername: { __typename?: 'UserResponse', status?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null } };

export type ChatUsersQueryVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
}>;


export type ChatUsersQuery = { __typename?: 'Query', chatUsers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }> };

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean, users: Array<{ __typename?: 'ChatUser', id: number, role: string, userId: number, joinedChat: string, inside: boolean, lastExit?: string | null, hiddenMessagesIds?: Array<number> | null }>, messages?: Array<{ __typename?: 'Message', id: number, messageId: string, authorId: number, isReplyTo?: number | null, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null } }> | null, events?: Array<{ __typename?: 'Event', id: number, userId: number, resourceId?: number | null, eventType: string, eventMessage: string, createdAt: string }> | null }> };

export type CreateChatOrGroupMutationVariables = Exact<{
  type: Scalars['String']['input'];
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  chatImage?: InputMaybe<Scalars['String']['input']>;
  chatTitle?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateChatOrGroupMutation = { __typename?: 'Mutation', createChatOrGroup: { __typename?: 'ChatResponse', status?: string | null, chat?: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean, users: Array<{ __typename?: 'ChatUser', id: number, role: string, userId: number, joinedChat: string, inside: boolean, lastExit?: string | null, hiddenMessagesIds?: Array<number> | null }>, messages?: Array<{ __typename?: 'Message', id: number, messageId: string, authorId: number, isReplyTo?: number | null, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null } }> | null, events?: Array<{ __typename?: 'Event', id: number, userId: number, resourceId?: number | null, eventType: string, eventMessage: string, createdAt: string }> | null } | null } };

export type CreateDeviceTokenMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateDeviceTokenMutation = { __typename?: 'Mutation', createDeviceToken: boolean };

export type CreatePostMutationVariables = Exact<{
  type: Scalars['String']['input'];
  content: Scalars['String']['input'];
  media: Scalars['String']['input'];
  isReplyTo?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, author: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateReportMutationVariables = Exact<{
  contentId: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  categoryId: Scalars['Int']['input'];
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
  additionalContentIds?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  additionalContentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport: { __typename?: 'ReportResponse', status?: string | null } };

export type CurrentSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentSessionQuery = { __typename?: 'Query', currentSession?: { __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string, user: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } } | null };

export type DeactivateAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeactivateAccountMutation = { __typename?: 'Mutation', deactivateAccount: boolean };

export type DeleteDeviceTokenMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteDeviceTokenMutation = { __typename?: 'Mutation', deleteDeviceToken: boolean };

export type DeleteDeviceTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteDeviceTokensMutation = { __typename?: 'Mutation', deleteDeviceTokens: boolean };

export type DeleteMeFromGroupMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type DeleteMeFromGroupMutation = { __typename?: 'Mutation', deleteMeFromGroup: boolean };

export type DeleteMessageForEveryoneMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
}>;


export type DeleteMessageForEveryoneMutation = { __typename?: 'Mutation', deleteMessageForEveryone: boolean };

export type DeleteMessageForMeMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
}>;


export type DeleteMessageForMeMutation = { __typename?: 'Mutation', deleteMessageForMe: boolean };

export type DeleteOrAbandonChatOrGroupMutationVariables = Exact<{
  type: Scalars['String']['input'];
  chatId: Scalars['String']['input'];
}>;


export type DeleteOrAbandonChatOrGroupMutation = { __typename?: 'Mutation', deleteOrAbandonChatOrGroup: boolean };

export type DeleteOtherSessionsMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteOtherSessionsMutation = { __typename?: 'Mutation', deleteOtherSessions: boolean };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type DeleteSessionMutationVariables = Exact<{
  sessionId: Scalars['String']['input'];
}>;


export type DeleteSessionMutation = { __typename?: 'Mutation', deleteSession: boolean };

export type DeletedChatUserSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeletedChatUserSubscription = { __typename?: 'Subscription', deletedChatUser: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } };

export type DeletedMessageNotificationSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeletedMessageNotificationSubscription = { __typename?: 'Subscription', deletedMessageNotification: { __typename?: 'MessageNotification', id: number, notificationId: string, creatorId: number, chatId: string, itemId: number, recipientId: number, itemType: string, content: string, viewed: boolean, createdAt: string } };

export type DeletedMessageOrEventSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeletedMessageOrEventSubscription = { __typename?: 'Subscription', deletedMessageOrEvent: { __typename?: 'Event', id: number, userId: number, resourceId?: number | null, eventType: string, eventMessage: string, createdAt: string, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean } } | { __typename?: 'Message', id: number, messageId: string, authorId: number, isReplyTo?: number | null, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null }, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean } } };

export type DeletedNotificationSubscriptionVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeletedNotificationSubscription = { __typename?: 'Subscription', deletedNotification: { __typename?: 'Notification', id: number, notificationId: string, creatorId: number, recipientId: number, resourceId: number, type: string, content: string, viewed: boolean, createdAt: string } };

export type EditBirthDateMutationVariables = Exact<{
  birthDate: Scalars['DateTimeISO']['input'];
  monthAndDayVisibility: Scalars['String']['input'];
  yearVisibility: Scalars['String']['input'];
}>;


export type EditBirthDateMutation = { __typename?: 'Mutation', editBirthDate: { __typename?: 'UserResponse', status?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type EditEmailAddressMutationVariables = Exact<{
  email: Scalars['String']['input'];
  confirmEmail: Scalars['String']['input'];
}>;


export type EditEmailAddressMutation = { __typename?: 'Mutation', editEmailAddress: { __typename?: 'UserResponse', status?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null } };

export type EditGroupInfoMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  chatImage: Scalars['String']['input'];
  chatTitle: Scalars['String']['input'];
}>;


export type EditGroupInfoMutation = { __typename?: 'Mutation', editGroupInfo: { __typename?: 'ChatResponse', status?: string | null } };

export type EditHideBlockedAccountsSettingMutationVariables = Exact<{ [key: string]: never; }>;


export type EditHideBlockedAccountsSettingMutation = { __typename?: 'Mutation', editHideBlockedAccountsSetting: boolean };

export type EditHideSensitiveContentSettingMutationVariables = Exact<{ [key: string]: never; }>;


export type EditHideSensitiveContentSettingMutation = { __typename?: 'Mutation', editHideSensitiveContentSetting: boolean };

export type EditIncomingMessagesMutationVariables = Exact<{
  incomingMessages: Scalars['String']['input'];
}>;


export type EditIncomingMessagesMutation = { __typename?: 'Mutation', editIncomingMessages: { __typename?: 'UserResponse', status?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type EditMessageMutationVariables = Exact<{
  messageId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  media: Scalars['String']['input'];
  chatId: Scalars['String']['input'];
}>;


export type EditMessageMutation = { __typename?: 'Mutation', editMessage: boolean };

export type EditPersonalizedTrendsSettingMutationVariables = Exact<{ [key: string]: never; }>;


export type EditPersonalizedTrendsSettingMutation = { __typename?: 'Mutation', editPersonalizedTrendsSetting: boolean };

export type EditProfileMutationVariables = Exact<{
  website: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  profileBanner: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'UserResponse', status?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null } };

export type EditTwoFactorAuthMutationVariables = Exact<{ [key: string]: never; }>;


export type EditTwoFactorAuthMutation = { __typename?: 'Mutation', editTwoFactorAuth: { __typename?: 'UserResponse', status?: string | null, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null } };

export type EditUseLocationOnTrendsMutationVariables = Exact<{ [key: string]: never; }>;


export type EditUseLocationOnTrendsMutation = { __typename?: 'Mutation', editUseLocationOnTrends: boolean };

export type EditedChatSubscriptionVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
  chatId?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditedChatSubscription = { __typename?: 'Subscription', editedChat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean } };

export type EditedChatUserSubscriptionVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EditedChatUserSubscription = { __typename?: 'Subscription', editedChatUser: { __typename?: 'ChatUser', id: number, role: string, userId: number, joinedChat: string, inside: boolean, lastExit?: string | null, hiddenMessagesIds?: Array<number> | null } };

export type EditedMessageSubscriptionVariables = Exact<{
  messageId?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditedMessageSubscription = { __typename?: 'Subscription', editedMessage: { __typename?: 'Message', id: number, messageId: string, authorId: number, isReplyTo?: number | null, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null }, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean } } };

export type FindChatQueryVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindChatQuery = { __typename?: 'Query', findChat?: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean, users: Array<{ __typename?: 'ChatUser', id: number, role: string, userId: number, joinedChat: string, inside: boolean, lastExit?: string | null, hiddenMessagesIds?: Array<number> | null }>, messages?: Array<{ __typename?: 'Message', id: number, messageId: string, authorId: number, isReplyTo?: number | null, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null } }> | null, events?: Array<{ __typename?: 'Event', id: number, userId: number, resourceId?: number | null, eventType: string, eventMessage: string, createdAt: string }> | null } | null };

export type FindMessageQueryVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
  messageId?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindMessageQuery = { __typename?: 'Query', findMessage?: { __typename?: 'Message', id: number, messageId: string, authorId: number, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number }, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null } } | null };

export type FindMessageByIdQueryVariables = Exact<{
  chatId: Scalars['String']['input'];
  id: Scalars['Int']['input'];
}>;


export type FindMessageByIdQuery = { __typename?: 'Query', findMessageById?: { __typename?: 'Message', id: number, messageId: string, authorId: number, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number }, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null } } | null };

export type FindPostQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindPostQuery = { __typename?: 'Query', findPost?: { __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, author: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null } | null };

export type FindPostByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindPostByIdQuery = { __typename?: 'Query', findPostById?: { __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, author: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null } | null };

export type FindSessionQueryVariables = Exact<{
  sessionId?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindSessionQuery = { __typename?: 'Query', findSession?: { __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string, user: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } } | null };

export type FindUserQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindUserQuery = { __typename?: 'Query', findUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null };

export type FindUserBeforeLogInMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type FindUserBeforeLogInMutation = { __typename?: 'Mutation', findUserBeforeLogIn?: { __typename?: 'UserResponse', status?: string | null, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null } | null };

export type FindUserByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type FindUserByIdQuery = { __typename?: 'Query', findUserById?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null };

export type FindUserDeviceTokenByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindUserDeviceTokenByIdQuery = { __typename?: 'Query', findUserDeviceTokenById?: { __typename?: 'UserDeviceToken', id: number, token: string, userId: number, sessionId: string, createdAt: string } | null };

export type FindUserDeviceTokenBySessionIdQueryVariables = Exact<{
  sessionId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindUserDeviceTokenBySessionIdQuery = { __typename?: 'Query', findUserDeviceTokenBySessionId?: { __typename?: 'UserDeviceToken', id: number, token: string, userId: number, sessionId: string, createdAt: string } | null };

export type FindUserDeviceTokenByTokenQueryVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindUserDeviceTokenByTokenQuery = { __typename?: 'Query', findUserDeviceTokenByToken?: { __typename?: 'UserDeviceToken', id: number, token: string, userId: number, sessionId: string, createdAt: string } | null };

export type FindUserDeviceTokensByUserIdQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindUserDeviceTokensByUserIdQuery = { __typename?: 'Query', findUserDeviceTokensByUserId?: Array<{ __typename?: 'UserDeviceToken', id: number, token: string, userId: number, sessionId: string, createdAt: string }> | null };

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  origin: Scalars['String']['input'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'Follow', id: number, followerId: number, userId: number, origin: string, createdAt: string } | null };

export type GetFollowersQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetFollowersQuery = { __typename?: 'Query', getFollowers?: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }> | null };

export type GetFollowingQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetFollowingQuery = { __typename?: 'Query', getFollowing?: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }> | null };

export type GetLikedPostsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetLikedPostsQuery = { __typename?: 'Query', getLikedPosts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, author: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null };

export type GetPostLikesQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostLikesQuery = { __typename?: 'Query', getPostLikes?: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }> | null };

export type HasUserBlockedMeQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type HasUserBlockedMeQuery = { __typename?: 'Query', hasUserBlockedMe: boolean };

export type IncrementPostViewsMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  postOpened: Scalars['Boolean']['input'];
  origin: Scalars['String']['input'];
}>;


export type IncrementPostViewsMutation = { __typename?: 'Mutation', incrementPostViews?: { __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null } | null };

export type IsFollowedByMeQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IsFollowedByMeQuery = { __typename?: 'Query', isFollowedByMe: boolean };

export type IsPostLikedByMeQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type IsPostLikedByMeQuery = { __typename?: 'Query', isPostLikedByMe: boolean };

export type IsUserBlockedByMeQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IsUserBlockedByMeQuery = { __typename?: 'Query', isUserBlockedByMe: boolean };

export type IsUserFollowingMeQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IsUserFollowingMeQuery = { __typename?: 'Query', isUserFollowingMe: boolean };

export type LatestMessageOrEventQueryVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
}>;


export type LatestMessageOrEventQuery = { __typename?: 'Query', latestMessageOrEvent?: { __typename?: 'Event', id: number, userId: number, resourceId?: number | null, eventType: string, eventMessage: string, createdAt: string } | { __typename?: 'Message', id: number, messageId: string, authorId: number, isReplyTo?: number | null, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null } } | null };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  origin: Scalars['String']['input'];
  postOpened: Scalars['Boolean']['input'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost?: { __typename?: 'Like', id: number, userId: number, likedPostId: string, postOpened: boolean, origin: string, createdAt: string } | null };

export type LoginMutationVariables = Exact<{
  input: Scalars['String']['input'];
  password: Scalars['String']['input'];
  clientOS: Scalars['String']['input'];
  clientType: Scalars['String']['input'];
  clientName: Scalars['String']['input'];
  deviceLocation: Scalars['String']['input'];
  country: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserResponse', accessToken?: string | null, status?: string | null, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null };

export type MessagesAndEventsQueryVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
}>;


export type MessagesAndEventsQuery = { __typename?: 'Query', messagesAndEvents: Array<{ __typename?: 'Event', id: number, userId: number, resourceId?: number | null, eventType: string, eventMessage: string, createdAt: string, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean } } | { __typename?: 'Message', id: number, messageId: string, authorId: number, isReplyTo?: number | null, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null }, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean } }> };

export type NewChatSubscriptionVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NewChatSubscription = { __typename?: 'Subscription', newChat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean, users: Array<{ __typename?: 'ChatUser', id: number, role: string, userId: number, joinedChat: string, inside: boolean, lastExit?: string | null, hiddenMessagesIds?: Array<number> | null }>, messages?: Array<{ __typename?: 'Message', id: number, messageId: string, authorId: number, isReplyTo?: number | null, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null } }> | null, events?: Array<{ __typename?: 'Event', id: number, userId: number, resourceId?: number | null, eventType: string, eventMessage: string, createdAt: string }> | null } };

export type NewMessageNotificationSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NewMessageNotificationSubscription = { __typename?: 'Subscription', newMessageNotification: { __typename?: 'MessageNotification', id: number, notificationId: string, creatorId: number, chatId: string, itemId: number, recipientId: number, itemType: string, content: string, viewed: boolean, createdAt: string } };

export type NewMessageOrEventSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NewMessageOrEventSubscription = { __typename?: 'Subscription', newMessageOrEvent: { __typename?: 'Event', id: number, userId: number, resourceId?: number | null, eventType: string, eventMessage: string, createdAt: string, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean } } | { __typename?: 'Message', id: number, messageId: string, authorId: number, isReplyTo?: number | null, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null }, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number, visible: boolean } } };

export type NewNotificationSubscriptionVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NewNotificationSubscription = { __typename?: 'Subscription', newNotification: { __typename?: 'Notification', id: number, notificationId: string, creatorId: number, recipientId: number, resourceId: number, type: string, content: string, viewed: boolean, createdAt: string } };

export type NotAuthModifyPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type NotAuthModifyPasswordMutation = { __typename?: 'Mutation', notAuthModifyPassword: { __typename?: 'UserResponse', status?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type NotificationFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationFeedQuery = { __typename?: 'Query', notificationFeed: Array<{ __typename?: 'Notification', id: number, notificationId: string, creatorId: number, recipientId: number, resourceId: number, type: string, content: string, viewed: boolean, createdAt: string }> };

export type OtherSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type OtherSessionsQuery = { __typename?: 'Query', otherSessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string, user: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } }> | null };

export type PostCommentsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PostCommentsQuery = { __typename?: 'Query', postComments: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, author: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> };

export type PostFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type PostFeedQuery = { __typename?: 'Query', postFeed: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, author: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> };

export type PostMediaQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostMediaQuery = { __typename?: 'Query', postMedia: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> };

export type RelevantPeopleQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type RelevantPeopleQuery = { __typename?: 'Query', relevantPeople: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }> };

export type RemoveLikeMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type RemoveLikeMutation = { __typename?: 'Mutation', removeLike: boolean };

export type RemoveUserFromGroupMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
}>;


export type RemoveUserFromGroupMutation = { __typename?: 'Mutation', removeUserFromGroup: boolean };

export type ReportOptionsQueryVariables = Exact<{
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type ReportOptionsQuery = { __typename?: 'Query', reportOptions: Array<{ __typename?: 'ReportOption', id: number, title: string, description: string, subcategories?: Array<{ __typename?: 'SubCategoryOption', categoryId: number, id: number, title: string, description?: string | null }> | null }> };

export type ResendOtpMutationVariables = Exact<{
  input?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type ResendOtpMutation = { __typename?: 'Mutation', resendOTP: boolean };

export type SearchQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchQuery = { __typename?: 'Query', search: { __typename?: 'SearchResult', users?: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, author: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null } };

export type SendMessageMutationVariables = Exact<{
  type: Scalars['String']['input'];
  content: Scalars['String']['input'];
  media: Scalars['String']['input'];
  chatId: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'Message', id: number, messageId: string, authorId: number, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number }, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null } } | null };

export type SendRecoveryEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendRecoveryEmailMutation = { __typename?: 'Mutation', sendRecoveryEmail: { __typename?: 'UserResponse', status?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SignupMutationVariables = Exact<{
  birthDate: Scalars['DateTimeISO']['input'];
  gender: Scalars['String']['input'];
  password: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'UserResponse', status?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type TopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', id: number, name: string, createdAt: string }> };

export type TrendsQueryVariables = Exact<{ [key: string]: never; }>;


export type TrendsQuery = { __typename?: 'Query', trends: Array<{ __typename?: 'Trend', occurrences: number, term: string }> };

export type UnblockUserMutationVariables = Exact<{
  blockedId: Scalars['Int']['input'];
}>;


export type UnblockUserMutation = { __typename?: 'Mutation', unblockUser: boolean };

export type UnfollowUserMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: boolean };

export type UnseenMessageNotificationsQueryVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UnseenMessageNotificationsQuery = { __typename?: 'Query', unseenMessageNotifications: Array<{ __typename?: 'MessageNotification', id: number, notificationId: string, creatorId: number, chatId: string, itemId: number, recipientId: number, itemType: string, content: string, viewed: boolean, createdAt: string }> };

export type UnseenNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnseenNotificationsQuery = { __typename?: 'Query', unseenNotifications: Array<{ __typename?: 'Notification', id: number, notificationId: string, creatorId: number, recipientId: number, resourceId: number, type: string, content: string, viewed: boolean, createdAt: string }> };

export type UpdateGenderMutationVariables = Exact<{
  gender?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateGenderMutation = { __typename?: 'Mutation', updateGender: { __typename?: 'UserResponse', status?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  media: Scalars['String']['input'];
  deletedMedia: Scalars['String']['input'];
  existingAltTexts: Scalars['String']['input'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, author: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UserCommentsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserCommentsQuery = { __typename?: 'Query', userComments: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, author: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> };

export type UserPostFeedQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserPostFeedQuery = { __typename?: 'Query', userPostFeed: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, author: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> };

export type UsersToMessageQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersToMessageQuery = { __typename?: 'Query', usersToMessage: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } }> };

export type VerifyEmailAddressMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyEmailAddressMutation = { __typename?: 'Mutation', verifyEmailAddress: { __typename?: 'UserResponse', status?: string | null } };

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


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOTP: { __typename?: 'UserResponse', accessToken?: string | null, status?: string | null, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, email: string, gender: string, emailVerified: boolean, topicsIds: Array<number>, birthDate?: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string } | null, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, sessions?: Array<{ __typename?: 'Session', id: number, sessionId: string, clientOS: string, clientType: string, clientName: string, deviceLocation: string, country: string, creationDate: string }> | null, posts?: Array<{ __typename?: 'Post', id: number, postId: string, authorId: number, isReplyTo?: number | null, type: string, content: string, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, views: number, topicsIds: Array<number>, lang: string, media?: Array<{ __typename?: 'MediaItem', id: number, type: string, src: string, alt: string, createdAt: string }> | null }> | null, exploreSettings: { __typename?: 'ExploreSettings', useLocation: boolean, personalizedTrends: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null } };

export type ViewMessageMutationVariables = Exact<{
  messageId?: InputMaybe<Scalars['String']['input']>;
}>;


export type ViewMessageMutation = { __typename?: 'Mutation', viewMessage?: { __typename?: 'Message', id: number, messageId: string, authorId: number, type: string, content?: string | null, createdAt: string, isEdited: boolean, updatedAt: string, mentions?: Array<string> | null, hashtags?: Array<string> | null, status: MessageStatus, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, type: string, chatImage?: string | null, chatTitle?: string | null, createdAt: string, updatedAt: string, messagesCount: number }, media: { __typename?: 'MessageMedia', type?: string | null, src?: string | null } } | null };

export type ViewMessageNotificationsMutationVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']['input']>;
}>;


export type ViewMessageNotificationsMutation = { __typename?: 'Mutation', viewMessageNotifications?: boolean | null };

export type ViewNotificationMutationVariables = Exact<{
  notificationId?: InputMaybe<Scalars['String']['input']>;
}>;


export type ViewNotificationMutation = { __typename?: 'Mutation', viewNotification?: boolean | null };

export type ViewNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type ViewNotificationsMutation = { __typename?: 'Mutation', viewNotifications?: boolean | null };


export const AddNewUsersToGroupDocument = gql`
    mutation AddNewUsersToGroup($chatId: String!, $userIds: [Int!]!) {
  addNewUsersToGroup(chatId: $chatId, userIds: $userIds) {
    status
  }
}
    `;
export type AddNewUsersToGroupMutationFn = Apollo.MutationFunction<AddNewUsersToGroupMutation, AddNewUsersToGroupMutationVariables>;

/**
 * __useAddNewUsersToGroupMutation__
 *
 * To run a mutation, you first call `useAddNewUsersToGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewUsersToGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewUsersToGroupMutation, { data, loading, error }] = useAddNewUsersToGroupMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useAddNewUsersToGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddNewUsersToGroupMutation, AddNewUsersToGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddNewUsersToGroupMutation, AddNewUsersToGroupMutationVariables>(AddNewUsersToGroupDocument, options);
      }
export type AddNewUsersToGroupMutationHookResult = ReturnType<typeof useAddNewUsersToGroupMutation>;
export type AddNewUsersToGroupMutationResult = Apollo.MutationResult<AddNewUsersToGroupMutation>;
export type AddNewUsersToGroupMutationOptions = Apollo.BaseMutationOptions<AddNewUsersToGroupMutation, AddNewUsersToGroupMutationVariables>;
export const AddedChatUsersDocument = gql`
    subscription AddedChatUsers($chatId: String) {
  addedChatUsers(chatId: $chatId) {
    id
    username
    email
    firstName
    lastName
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
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
  }
}
    `;

/**
 * __useAddedChatUsersSubscription__
 *
 * To run a query within a React component, call `useAddedChatUsersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddedChatUsersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddedChatUsersSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useAddedChatUsersSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<AddedChatUsersSubscription, AddedChatUsersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<AddedChatUsersSubscription, AddedChatUsersSubscriptionVariables>(AddedChatUsersDocument, options);
      }
export type AddedChatUsersSubscriptionHookResult = ReturnType<typeof useAddedChatUsersSubscription>;
export type AddedChatUsersSubscriptionResult = Apollo.SubscriptionResult<AddedChatUsersSubscription>;
export const AllUnseenMessageNotificationsDocument = gql`
    query AllUnseenMessageNotifications {
  allUnseenMessageNotifications {
    id
    notificationId
    creatorId
    chatId
    itemId
    recipientId
    itemType
    content
    viewed
    createdAt
  }
}
    `;

/**
 * __useAllUnseenMessageNotificationsQuery__
 *
 * To run a query within a React component, call `useAllUnseenMessageNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUnseenMessageNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUnseenMessageNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUnseenMessageNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllUnseenMessageNotificationsQuery, AllUnseenMessageNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AllUnseenMessageNotificationsQuery, AllUnseenMessageNotificationsQueryVariables>(AllUnseenMessageNotificationsDocument, options);
      }
export function useAllUnseenMessageNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllUnseenMessageNotificationsQuery, AllUnseenMessageNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AllUnseenMessageNotificationsQuery, AllUnseenMessageNotificationsQueryVariables>(AllUnseenMessageNotificationsDocument, options);
        }
export function useAllUnseenMessageNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AllUnseenMessageNotificationsQuery, AllUnseenMessageNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AllUnseenMessageNotificationsQuery, AllUnseenMessageNotificationsQueryVariables>(AllUnseenMessageNotificationsDocument, options);
        }
export type AllUnseenMessageNotificationsQueryHookResult = ReturnType<typeof useAllUnseenMessageNotificationsQuery>;
export type AllUnseenMessageNotificationsLazyQueryHookResult = ReturnType<typeof useAllUnseenMessageNotificationsLazyQuery>;
export type AllUnseenMessageNotificationsSuspenseQueryHookResult = ReturnType<typeof useAllUnseenMessageNotificationsSuspenseQuery>;
export type AllUnseenMessageNotificationsQueryResult = Apollo.QueryResult<AllUnseenMessageNotificationsQuery, AllUnseenMessageNotificationsQueryVariables>;
export const AuthSendVerificationEmailDocument = gql`
    mutation AuthSendVerificationEmail {
  authSendVerificationEmail {
    status
  }
}
    `;
export type AuthSendVerificationEmailMutationFn = Apollo.MutationFunction<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>;

/**
 * __useAuthSendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useAuthSendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSendVerificationEmailMutation, { data, loading, error }] = useAuthSendVerificationEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useAuthSendVerificationEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>(AuthSendVerificationEmailDocument, options);
      }
export type AuthSendVerificationEmailMutationHookResult = ReturnType<typeof useAuthSendVerificationEmailMutation>;
export type AuthSendVerificationEmailMutationResult = Apollo.MutationResult<AuthSendVerificationEmailMutation>;
export type AuthSendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>;
export const BlockUserDocument = gql`
    mutation BlockUser($userId: Int!, $origin: String!) {
  blockUser(userId: $userId, origin: $origin) {
    id
    blockedId
    userId
    origin
    createdAt
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
export const BlockedUsersDocument = gql`
    query BlockedUsers {
  blockedUsers {
    id
    username
    email
    firstName
    lastName
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
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
  }
}
    `;

/**
 * __useBlockedUsersQuery__
 *
 * To run a query within a React component, call `useBlockedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlockedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlockedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useBlockedUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BlockedUsersQuery, BlockedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BlockedUsersQuery, BlockedUsersQueryVariables>(BlockedUsersDocument, options);
      }
export function useBlockedUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BlockedUsersQuery, BlockedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BlockedUsersQuery, BlockedUsersQueryVariables>(BlockedUsersDocument, options);
        }
export function useBlockedUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<BlockedUsersQuery, BlockedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<BlockedUsersQuery, BlockedUsersQueryVariables>(BlockedUsersDocument, options);
        }
export type BlockedUsersQueryHookResult = ReturnType<typeof useBlockedUsersQuery>;
export type BlockedUsersLazyQueryHookResult = ReturnType<typeof useBlockedUsersLazyQuery>;
export type BlockedUsersSuspenseQueryHookResult = ReturnType<typeof useBlockedUsersSuspenseQuery>;
export type BlockedUsersQueryResult = Apollo.QueryResult<BlockedUsersQuery, BlockedUsersQueryVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($currentPassword: String!, $password: String!, $confirmPassword: String!) {
  changePassword(
    currentPassword: $currentPassword
    password: $password
    confirmPassword: $confirmPassword
  ) {
    status
    errors {
      field
      message
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeUserRoleDocument = gql`
    mutation ChangeUserRole($chatId: String!, $userId: Int!, $role: String) {
  changeUserRole(chatId: $chatId, userId: $userId, role: $role)
}
    `;
export type ChangeUserRoleMutationFn = Apollo.MutationFunction<ChangeUserRoleMutation, ChangeUserRoleMutationVariables>;

/**
 * __useChangeUserRoleMutation__
 *
 * To run a mutation, you first call `useChangeUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserRoleMutation, { data, loading, error }] = useChangeUserRoleMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useChangeUserRoleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeUserRoleMutation, ChangeUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangeUserRoleMutation, ChangeUserRoleMutationVariables>(ChangeUserRoleDocument, options);
      }
export type ChangeUserRoleMutationHookResult = ReturnType<typeof useChangeUserRoleMutation>;
export type ChangeUserRoleMutationResult = Apollo.MutationResult<ChangeUserRoleMutation>;
export type ChangeUserRoleMutationOptions = Apollo.BaseMutationOptions<ChangeUserRoleMutation, ChangeUserRoleMutationVariables>;
export const ChangeUsernameDocument = gql`
    mutation ChangeUsername($username: String) {
  changeUsername(username: $username) {
    errors {
      field
      message
    }
    user {
      id
      firstName
      lastName
      username
      email
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
      sessions {
        id
        sessionId
        clientOS
        clientType
        clientName
        deviceLocation
        country
        creationDate
      }
      posts {
        id
        postId
        authorId
        isReplyTo
        type
        content
        createdAt
        isEdited
        updatedAt
        media {
          id
          type
          src
          alt
          createdAt
        }
        mentions
        hashtags
        views
        topicsIds
        lang
      }
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    status
  }
}
    `;
export type ChangeUsernameMutationFn = Apollo.MutationFunction<ChangeUsernameMutation, ChangeUsernameMutationVariables>;

/**
 * __useChangeUsernameMutation__
 *
 * To run a mutation, you first call `useChangeUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUsernameMutation, { data, loading, error }] = useChangeUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useChangeUsernameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeUsernameMutation, ChangeUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangeUsernameMutation, ChangeUsernameMutationVariables>(ChangeUsernameDocument, options);
      }
export type ChangeUsernameMutationHookResult = ReturnType<typeof useChangeUsernameMutation>;
export type ChangeUsernameMutationResult = Apollo.MutationResult<ChangeUsernameMutation>;
export type ChangeUsernameMutationOptions = Apollo.BaseMutationOptions<ChangeUsernameMutation, ChangeUsernameMutationVariables>;
export const ChatUsersDocument = gql`
    query ChatUsers($chatId: String) {
  chatUsers(chatId: $chatId) {
    id
    username
    email
    firstName
    lastName
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
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
  }
}
    `;

/**
 * __useChatUsersQuery__
 *
 * To run a query within a React component, call `useChatUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatUsersQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChatUsersQuery, ChatUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ChatUsersQuery, ChatUsersQueryVariables>(ChatUsersDocument, options);
      }
export function useChatUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChatUsersQuery, ChatUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ChatUsersQuery, ChatUsersQueryVariables>(ChatUsersDocument, options);
        }
export function useChatUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ChatUsersQuery, ChatUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ChatUsersQuery, ChatUsersQueryVariables>(ChatUsersDocument, options);
        }
export type ChatUsersQueryHookResult = ReturnType<typeof useChatUsersQuery>;
export type ChatUsersLazyQueryHookResult = ReturnType<typeof useChatUsersLazyQuery>;
export type ChatUsersSuspenseQueryHookResult = ReturnType<typeof useChatUsersSuspenseQuery>;
export type ChatUsersQueryResult = Apollo.QueryResult<ChatUsersQuery, ChatUsersQueryVariables>;
export const ChatsDocument = gql`
    query Chats {
  chats {
    id
    chatId
    creatorId
    type
    chatImage
    chatTitle
    createdAt
    updatedAt
    messagesCount
    visible
    users {
      id
      role
      userId
      joinedChat
      inside
      lastExit
      hiddenMessagesIds
    }
    messages {
      id
      messageId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        type
        src
      }
      mentions
      hashtags
      status
    }
    events {
      id
      userId
      resourceId
      eventType
      eventMessage
      createdAt
    }
  }
}
    `;

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
      }
export function useChatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
        }
export function useChatsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
        }
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsSuspenseQueryHookResult = ReturnType<typeof useChatsSuspenseQuery>;
export type ChatsQueryResult = Apollo.QueryResult<ChatsQuery, ChatsQueryVariables>;
export const CreateChatOrGroupDocument = gql`
    mutation CreateChatOrGroup($type: String!, $userIds: [Int!]!, $chatImage: String, $chatTitle: String) {
  createChatOrGroup(
    type: $type
    userIds: $userIds
    chatImage: $chatImage
    chatTitle: $chatTitle
  ) {
    chat {
      id
      chatId
      creatorId
      type
      chatImage
      chatTitle
      createdAt
      updatedAt
      messagesCount
      visible
      users {
        id
        role
        userId
        joinedChat
        inside
        lastExit
        hiddenMessagesIds
      }
      messages {
        id
        messageId
        authorId
        isReplyTo
        type
        content
        createdAt
        isEdited
        updatedAt
        media {
          type
          src
        }
        mentions
        hashtags
        status
      }
      events {
        id
        userId
        resourceId
        eventType
        eventMessage
        createdAt
      }
    }
    status
  }
}
    `;
export type CreateChatOrGroupMutationFn = Apollo.MutationFunction<CreateChatOrGroupMutation, CreateChatOrGroupMutationVariables>;

/**
 * __useCreateChatOrGroupMutation__
 *
 * To run a mutation, you first call `useCreateChatOrGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatOrGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatOrGroupMutation, { data, loading, error }] = useCreateChatOrGroupMutation({
 *   variables: {
 *      type: // value for 'type'
 *      userIds: // value for 'userIds'
 *      chatImage: // value for 'chatImage'
 *      chatTitle: // value for 'chatTitle'
 *   },
 * });
 */
export function useCreateChatOrGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateChatOrGroupMutation, CreateChatOrGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateChatOrGroupMutation, CreateChatOrGroupMutationVariables>(CreateChatOrGroupDocument, options);
      }
export type CreateChatOrGroupMutationHookResult = ReturnType<typeof useCreateChatOrGroupMutation>;
export type CreateChatOrGroupMutationResult = Apollo.MutationResult<CreateChatOrGroupMutation>;
export type CreateChatOrGroupMutationOptions = Apollo.BaseMutationOptions<CreateChatOrGroupMutation, CreateChatOrGroupMutationVariables>;
export const CreateDeviceTokenDocument = gql`
    mutation CreateDeviceToken($token: String) {
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
export const CreatePostDocument = gql`
    mutation CreatePost($type: String!, $content: String!, $media: String!, $isReplyTo: Int) {
  createPost(type: $type, content: $content, media: $media, isReplyTo: $isReplyTo) {
    post {
      id
      postId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      author {
        id
        username
        email
        firstName
        lastName
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
        exploreSettings {
          useLocation
          personalizedTrends
        }
        searchSettings {
          hideSensitiveContent
          hideBlockedAccounts
        }
        topicsIds
      }
      media {
        id
        type
        src
        alt
        createdAt
      }
      mentions
      hashtags
      views
      topicsIds
      lang
    }
    errors {
      field
      message
    }
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
 *      isReplyTo: // value for 'isReplyTo'
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
export const CurrentSessionDocument = gql`
    query CurrentSession {
  currentSession {
    id
    sessionId
    clientOS
    clientType
    clientName
    deviceLocation
    country
    creationDate
    user {
      id
      username
      email
      firstName
      lastName
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
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
  }
}
    `;

/**
 * __useCurrentSessionQuery__
 *
 * To run a query within a React component, call `useCurrentSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentSessionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentSessionQuery, CurrentSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CurrentSessionQuery, CurrentSessionQueryVariables>(CurrentSessionDocument, options);
      }
export function useCurrentSessionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentSessionQuery, CurrentSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CurrentSessionQuery, CurrentSessionQueryVariables>(CurrentSessionDocument, options);
        }
export function useCurrentSessionSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<CurrentSessionQuery, CurrentSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<CurrentSessionQuery, CurrentSessionQueryVariables>(CurrentSessionDocument, options);
        }
export type CurrentSessionQueryHookResult = ReturnType<typeof useCurrentSessionQuery>;
export type CurrentSessionLazyQueryHookResult = ReturnType<typeof useCurrentSessionLazyQuery>;
export type CurrentSessionSuspenseQueryHookResult = ReturnType<typeof useCurrentSessionSuspenseQuery>;
export type CurrentSessionQueryResult = Apollo.QueryResult<CurrentSessionQuery, CurrentSessionQueryVariables>;
export const DeactivateAccountDocument = gql`
    mutation DeactivateAccount {
  deactivateAccount
}
    `;
export type DeactivateAccountMutationFn = Apollo.MutationFunction<DeactivateAccountMutation, DeactivateAccountMutationVariables>;

/**
 * __useDeactivateAccountMutation__
 *
 * To run a mutation, you first call `useDeactivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateAccountMutation, { data, loading, error }] = useDeactivateAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeactivateAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeactivateAccountMutation, DeactivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeactivateAccountMutation, DeactivateAccountMutationVariables>(DeactivateAccountDocument, options);
      }
export type DeactivateAccountMutationHookResult = ReturnType<typeof useDeactivateAccountMutation>;
export type DeactivateAccountMutationResult = Apollo.MutationResult<DeactivateAccountMutation>;
export type DeactivateAccountMutationOptions = Apollo.BaseMutationOptions<DeactivateAccountMutation, DeactivateAccountMutationVariables>;
export const DeleteDeviceTokenDocument = gql`
    mutation DeleteDeviceToken($id: Int) {
  deleteDeviceToken(id: $id)
}
    `;
export type DeleteDeviceTokenMutationFn = Apollo.MutationFunction<DeleteDeviceTokenMutation, DeleteDeviceTokenMutationVariables>;

/**
 * __useDeleteDeviceTokenMutation__
 *
 * To run a mutation, you first call `useDeleteDeviceTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeviceTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeviceTokenMutation, { data, loading, error }] = useDeleteDeviceTokenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDeviceTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDeviceTokenMutation, DeleteDeviceTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteDeviceTokenMutation, DeleteDeviceTokenMutationVariables>(DeleteDeviceTokenDocument, options);
      }
export type DeleteDeviceTokenMutationHookResult = ReturnType<typeof useDeleteDeviceTokenMutation>;
export type DeleteDeviceTokenMutationResult = Apollo.MutationResult<DeleteDeviceTokenMutation>;
export type DeleteDeviceTokenMutationOptions = Apollo.BaseMutationOptions<DeleteDeviceTokenMutation, DeleteDeviceTokenMutationVariables>;
export const DeleteDeviceTokensDocument = gql`
    mutation DeleteDeviceTokens {
  deleteDeviceTokens
}
    `;
export type DeleteDeviceTokensMutationFn = Apollo.MutationFunction<DeleteDeviceTokensMutation, DeleteDeviceTokensMutationVariables>;

/**
 * __useDeleteDeviceTokensMutation__
 *
 * To run a mutation, you first call `useDeleteDeviceTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeviceTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeviceTokensMutation, { data, loading, error }] = useDeleteDeviceTokensMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteDeviceTokensMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDeviceTokensMutation, DeleteDeviceTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteDeviceTokensMutation, DeleteDeviceTokensMutationVariables>(DeleteDeviceTokensDocument, options);
      }
export type DeleteDeviceTokensMutationHookResult = ReturnType<typeof useDeleteDeviceTokensMutation>;
export type DeleteDeviceTokensMutationResult = Apollo.MutationResult<DeleteDeviceTokensMutation>;
export type DeleteDeviceTokensMutationOptions = Apollo.BaseMutationOptions<DeleteDeviceTokensMutation, DeleteDeviceTokensMutationVariables>;
export const DeleteMeFromGroupDocument = gql`
    mutation DeleteMeFromGroup($chatId: String!) {
  deleteMeFromGroup(chatId: $chatId)
}
    `;
export type DeleteMeFromGroupMutationFn = Apollo.MutationFunction<DeleteMeFromGroupMutation, DeleteMeFromGroupMutationVariables>;

/**
 * __useDeleteMeFromGroupMutation__
 *
 * To run a mutation, you first call `useDeleteMeFromGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeFromGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeFromGroupMutation, { data, loading, error }] = useDeleteMeFromGroupMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useDeleteMeFromGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMeFromGroupMutation, DeleteMeFromGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteMeFromGroupMutation, DeleteMeFromGroupMutationVariables>(DeleteMeFromGroupDocument, options);
      }
export type DeleteMeFromGroupMutationHookResult = ReturnType<typeof useDeleteMeFromGroupMutation>;
export type DeleteMeFromGroupMutationResult = Apollo.MutationResult<DeleteMeFromGroupMutation>;
export type DeleteMeFromGroupMutationOptions = Apollo.BaseMutationOptions<DeleteMeFromGroupMutation, DeleteMeFromGroupMutationVariables>;
export const DeleteMessageForEveryoneDocument = gql`
    mutation DeleteMessageForEveryone($chatId: String!, $messageId: String!) {
  deleteMessageForEveryone(chatId: $chatId, messageId: $messageId)
}
    `;
export type DeleteMessageForEveryoneMutationFn = Apollo.MutationFunction<DeleteMessageForEveryoneMutation, DeleteMessageForEveryoneMutationVariables>;

/**
 * __useDeleteMessageForEveryoneMutation__
 *
 * To run a mutation, you first call `useDeleteMessageForEveryoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageForEveryoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageForEveryoneMutation, { data, loading, error }] = useDeleteMessageForEveryoneMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageForEveryoneMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessageForEveryoneMutation, DeleteMessageForEveryoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteMessageForEveryoneMutation, DeleteMessageForEveryoneMutationVariables>(DeleteMessageForEveryoneDocument, options);
      }
export type DeleteMessageForEveryoneMutationHookResult = ReturnType<typeof useDeleteMessageForEveryoneMutation>;
export type DeleteMessageForEveryoneMutationResult = Apollo.MutationResult<DeleteMessageForEveryoneMutation>;
export type DeleteMessageForEveryoneMutationOptions = Apollo.BaseMutationOptions<DeleteMessageForEveryoneMutation, DeleteMessageForEveryoneMutationVariables>;
export const DeleteMessageForMeDocument = gql`
    mutation DeleteMessageForMe($chatId: String!, $messageId: String!) {
  deleteMessageForMe(chatId: $chatId, messageId: $messageId)
}
    `;
export type DeleteMessageForMeMutationFn = Apollo.MutationFunction<DeleteMessageForMeMutation, DeleteMessageForMeMutationVariables>;

/**
 * __useDeleteMessageForMeMutation__
 *
 * To run a mutation, you first call `useDeleteMessageForMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageForMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageForMeMutation, { data, loading, error }] = useDeleteMessageForMeMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageForMeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessageForMeMutation, DeleteMessageForMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteMessageForMeMutation, DeleteMessageForMeMutationVariables>(DeleteMessageForMeDocument, options);
      }
export type DeleteMessageForMeMutationHookResult = ReturnType<typeof useDeleteMessageForMeMutation>;
export type DeleteMessageForMeMutationResult = Apollo.MutationResult<DeleteMessageForMeMutation>;
export type DeleteMessageForMeMutationOptions = Apollo.BaseMutationOptions<DeleteMessageForMeMutation, DeleteMessageForMeMutationVariables>;
export const DeleteOrAbandonChatOrGroupDocument = gql`
    mutation DeleteOrAbandonChatOrGroup($type: String!, $chatId: String!) {
  deleteOrAbandonChatOrGroup(type: $type, chatId: $chatId)
}
    `;
export type DeleteOrAbandonChatOrGroupMutationFn = Apollo.MutationFunction<DeleteOrAbandonChatOrGroupMutation, DeleteOrAbandonChatOrGroupMutationVariables>;

/**
 * __useDeleteOrAbandonChatOrGroupMutation__
 *
 * To run a mutation, you first call `useDeleteOrAbandonChatOrGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrAbandonChatOrGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrAbandonChatOrGroupMutation, { data, loading, error }] = useDeleteOrAbandonChatOrGroupMutation({
 *   variables: {
 *      type: // value for 'type'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useDeleteOrAbandonChatOrGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOrAbandonChatOrGroupMutation, DeleteOrAbandonChatOrGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteOrAbandonChatOrGroupMutation, DeleteOrAbandonChatOrGroupMutationVariables>(DeleteOrAbandonChatOrGroupDocument, options);
      }
export type DeleteOrAbandonChatOrGroupMutationHookResult = ReturnType<typeof useDeleteOrAbandonChatOrGroupMutation>;
export type DeleteOrAbandonChatOrGroupMutationResult = Apollo.MutationResult<DeleteOrAbandonChatOrGroupMutation>;
export type DeleteOrAbandonChatOrGroupMutationOptions = Apollo.BaseMutationOptions<DeleteOrAbandonChatOrGroupMutation, DeleteOrAbandonChatOrGroupMutationVariables>;
export const DeleteOtherSessionsDocument = gql`
    mutation DeleteOtherSessions {
  deleteOtherSessions
}
    `;
export type DeleteOtherSessionsMutationFn = Apollo.MutationFunction<DeleteOtherSessionsMutation, DeleteOtherSessionsMutationVariables>;

/**
 * __useDeleteOtherSessionsMutation__
 *
 * To run a mutation, you first call `useDeleteOtherSessionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOtherSessionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOtherSessionsMutation, { data, loading, error }] = useDeleteOtherSessionsMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteOtherSessionsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOtherSessionsMutation, DeleteOtherSessionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteOtherSessionsMutation, DeleteOtherSessionsMutationVariables>(DeleteOtherSessionsDocument, options);
      }
export type DeleteOtherSessionsMutationHookResult = ReturnType<typeof useDeleteOtherSessionsMutation>;
export type DeleteOtherSessionsMutationResult = Apollo.MutationResult<DeleteOtherSessionsMutation>;
export type DeleteOtherSessionsMutationOptions = Apollo.BaseMutationOptions<DeleteOtherSessionsMutation, DeleteOtherSessionsMutationVariables>;
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
export const DeleteSessionDocument = gql`
    mutation DeleteSession($sessionId: String!) {
  deleteSession(sessionId: $sessionId)
}
    `;
export type DeleteSessionMutationFn = Apollo.MutationFunction<DeleteSessionMutation, DeleteSessionMutationVariables>;

/**
 * __useDeleteSessionMutation__
 *
 * To run a mutation, you first call `useDeleteSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSessionMutation, { data, loading, error }] = useDeleteSessionMutation({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useDeleteSessionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSessionMutation, DeleteSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteSessionMutation, DeleteSessionMutationVariables>(DeleteSessionDocument, options);
      }
export type DeleteSessionMutationHookResult = ReturnType<typeof useDeleteSessionMutation>;
export type DeleteSessionMutationResult = Apollo.MutationResult<DeleteSessionMutation>;
export type DeleteSessionMutationOptions = Apollo.BaseMutationOptions<DeleteSessionMutation, DeleteSessionMutationVariables>;
export const DeletedChatUserDocument = gql`
    subscription DeletedChatUser($chatId: String) {
  deletedChatUser(chatId: $chatId) {
    id
    username
    email
    firstName
    lastName
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
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
  }
}
    `;

/**
 * __useDeletedChatUserSubscription__
 *
 * To run a query within a React component, call `useDeletedChatUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeletedChatUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeletedChatUserSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useDeletedChatUserSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DeletedChatUserSubscription, DeletedChatUserSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<DeletedChatUserSubscription, DeletedChatUserSubscriptionVariables>(DeletedChatUserDocument, options);
      }
export type DeletedChatUserSubscriptionHookResult = ReturnType<typeof useDeletedChatUserSubscription>;
export type DeletedChatUserSubscriptionResult = Apollo.SubscriptionResult<DeletedChatUserSubscription>;
export const DeletedMessageNotificationDocument = gql`
    subscription DeletedMessageNotification($chatId: String, $userId: Int) {
  deletedMessageNotification(chatId: $chatId, userId: $userId) {
    id
    notificationId
    creatorId
    chatId
    itemId
    recipientId
    itemType
    content
    viewed
    createdAt
  }
}
    `;

/**
 * __useDeletedMessageNotificationSubscription__
 *
 * To run a query within a React component, call `useDeletedMessageNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeletedMessageNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeletedMessageNotificationSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeletedMessageNotificationSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DeletedMessageNotificationSubscription, DeletedMessageNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<DeletedMessageNotificationSubscription, DeletedMessageNotificationSubscriptionVariables>(DeletedMessageNotificationDocument, options);
      }
export type DeletedMessageNotificationSubscriptionHookResult = ReturnType<typeof useDeletedMessageNotificationSubscription>;
export type DeletedMessageNotificationSubscriptionResult = Apollo.SubscriptionResult<DeletedMessageNotificationSubscription>;
export const DeletedMessageOrEventDocument = gql`
    subscription DeletedMessageOrEvent($chatId: String, $userId: Int) {
  deletedMessageOrEvent(chatId: $chatId, userId: $userId) {
    ... on Message {
      id
      messageId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        type
        src
      }
      mentions
      hashtags
      status
      chat {
        id
        chatId
        creatorId
        type
        chatImage
        chatTitle
        createdAt
        updatedAt
        messagesCount
        visible
      }
    }
    ... on Event {
      id
      userId
      resourceId
      eventType
      eventMessage
      createdAt
      chat {
        id
        chatId
        creatorId
        type
        chatImage
        chatTitle
        createdAt
        updatedAt
        messagesCount
        visible
      }
    }
  }
}
    `;

/**
 * __useDeletedMessageOrEventSubscription__
 *
 * To run a query within a React component, call `useDeletedMessageOrEventSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeletedMessageOrEventSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeletedMessageOrEventSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeletedMessageOrEventSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DeletedMessageOrEventSubscription, DeletedMessageOrEventSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<DeletedMessageOrEventSubscription, DeletedMessageOrEventSubscriptionVariables>(DeletedMessageOrEventDocument, options);
      }
export type DeletedMessageOrEventSubscriptionHookResult = ReturnType<typeof useDeletedMessageOrEventSubscription>;
export type DeletedMessageOrEventSubscriptionResult = Apollo.SubscriptionResult<DeletedMessageOrEventSubscription>;
export const DeletedNotificationDocument = gql`
    subscription DeletedNotification($userId: Int) {
  deletedNotification(userId: $userId) {
    id
    notificationId
    creatorId
    recipientId
    resourceId
    type
    content
    viewed
    createdAt
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
export const EditBirthDateDocument = gql`
    mutation EditBirthDate($birthDate: DateTimeISO!, $monthAndDayVisibility: String!, $yearVisibility: String!) {
  editBirthDate(
    birthDate: $birthDate
    monthAndDayVisibility: $monthAndDayVisibility
    yearVisibility: $yearVisibility
  ) {
    status
    errors {
      field
      message
    }
  }
}
    `;
export type EditBirthDateMutationFn = Apollo.MutationFunction<EditBirthDateMutation, EditBirthDateMutationVariables>;

/**
 * __useEditBirthDateMutation__
 *
 * To run a mutation, you first call `useEditBirthDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBirthDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBirthDateMutation, { data, loading, error }] = useEditBirthDateMutation({
 *   variables: {
 *      birthDate: // value for 'birthDate'
 *      monthAndDayVisibility: // value for 'monthAndDayVisibility'
 *      yearVisibility: // value for 'yearVisibility'
 *   },
 * });
 */
export function useEditBirthDateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditBirthDateMutation, EditBirthDateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditBirthDateMutation, EditBirthDateMutationVariables>(EditBirthDateDocument, options);
      }
export type EditBirthDateMutationHookResult = ReturnType<typeof useEditBirthDateMutation>;
export type EditBirthDateMutationResult = Apollo.MutationResult<EditBirthDateMutation>;
export type EditBirthDateMutationOptions = Apollo.BaseMutationOptions<EditBirthDateMutation, EditBirthDateMutationVariables>;
export const EditEmailAddressDocument = gql`
    mutation EditEmailAddress($email: String!, $confirmEmail: String!) {
  editEmailAddress(email: $email, confirmEmail: $confirmEmail) {
    status
    errors {
      field
      message
    }
    user {
      id
      firstName
      lastName
      username
      email
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
      sessions {
        id
        sessionId
        clientOS
        clientType
        clientName
        deviceLocation
        country
        creationDate
      }
      posts {
        id
        postId
        authorId
        isReplyTo
        type
        content
        createdAt
        isEdited
        updatedAt
        media {
          id
          type
          src
          alt
          createdAt
        }
        mentions
        hashtags
        views
        topicsIds
        lang
      }
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
  }
}
    `;
export type EditEmailAddressMutationFn = Apollo.MutationFunction<EditEmailAddressMutation, EditEmailAddressMutationVariables>;

/**
 * __useEditEmailAddressMutation__
 *
 * To run a mutation, you first call `useEditEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEmailAddressMutation, { data, loading, error }] = useEditEmailAddressMutation({
 *   variables: {
 *      email: // value for 'email'
 *      confirmEmail: // value for 'confirmEmail'
 *   },
 * });
 */
export function useEditEmailAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditEmailAddressMutation, EditEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditEmailAddressMutation, EditEmailAddressMutationVariables>(EditEmailAddressDocument, options);
      }
export type EditEmailAddressMutationHookResult = ReturnType<typeof useEditEmailAddressMutation>;
export type EditEmailAddressMutationResult = Apollo.MutationResult<EditEmailAddressMutation>;
export type EditEmailAddressMutationOptions = Apollo.BaseMutationOptions<EditEmailAddressMutation, EditEmailAddressMutationVariables>;
export const EditGroupInfoDocument = gql`
    mutation EditGroupInfo($chatId: String!, $chatImage: String!, $chatTitle: String!) {
  editGroupInfo(chatId: $chatId, chatImage: $chatImage, chatTitle: $chatTitle) {
    status
  }
}
    `;
export type EditGroupInfoMutationFn = Apollo.MutationFunction<EditGroupInfoMutation, EditGroupInfoMutationVariables>;

/**
 * __useEditGroupInfoMutation__
 *
 * To run a mutation, you first call `useEditGroupInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditGroupInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editGroupInfoMutation, { data, loading, error }] = useEditGroupInfoMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      chatImage: // value for 'chatImage'
 *      chatTitle: // value for 'chatTitle'
 *   },
 * });
 */
export function useEditGroupInfoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditGroupInfoMutation, EditGroupInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditGroupInfoMutation, EditGroupInfoMutationVariables>(EditGroupInfoDocument, options);
      }
export type EditGroupInfoMutationHookResult = ReturnType<typeof useEditGroupInfoMutation>;
export type EditGroupInfoMutationResult = Apollo.MutationResult<EditGroupInfoMutation>;
export type EditGroupInfoMutationOptions = Apollo.BaseMutationOptions<EditGroupInfoMutation, EditGroupInfoMutationVariables>;
export const EditHideBlockedAccountsSettingDocument = gql`
    mutation EditHideBlockedAccountsSetting {
  editHideBlockedAccountsSetting
}
    `;
export type EditHideBlockedAccountsSettingMutationFn = Apollo.MutationFunction<EditHideBlockedAccountsSettingMutation, EditHideBlockedAccountsSettingMutationVariables>;

/**
 * __useEditHideBlockedAccountsSettingMutation__
 *
 * To run a mutation, you first call `useEditHideBlockedAccountsSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditHideBlockedAccountsSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editHideBlockedAccountsSettingMutation, { data, loading, error }] = useEditHideBlockedAccountsSettingMutation({
 *   variables: {
 *   },
 * });
 */
export function useEditHideBlockedAccountsSettingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditHideBlockedAccountsSettingMutation, EditHideBlockedAccountsSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditHideBlockedAccountsSettingMutation, EditHideBlockedAccountsSettingMutationVariables>(EditHideBlockedAccountsSettingDocument, options);
      }
export type EditHideBlockedAccountsSettingMutationHookResult = ReturnType<typeof useEditHideBlockedAccountsSettingMutation>;
export type EditHideBlockedAccountsSettingMutationResult = Apollo.MutationResult<EditHideBlockedAccountsSettingMutation>;
export type EditHideBlockedAccountsSettingMutationOptions = Apollo.BaseMutationOptions<EditHideBlockedAccountsSettingMutation, EditHideBlockedAccountsSettingMutationVariables>;
export const EditHideSensitiveContentSettingDocument = gql`
    mutation EditHideSensitiveContentSetting {
  editHideSensitiveContentSetting
}
    `;
export type EditHideSensitiveContentSettingMutationFn = Apollo.MutationFunction<EditHideSensitiveContentSettingMutation, EditHideSensitiveContentSettingMutationVariables>;

/**
 * __useEditHideSensitiveContentSettingMutation__
 *
 * To run a mutation, you first call `useEditHideSensitiveContentSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditHideSensitiveContentSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editHideSensitiveContentSettingMutation, { data, loading, error }] = useEditHideSensitiveContentSettingMutation({
 *   variables: {
 *   },
 * });
 */
export function useEditHideSensitiveContentSettingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditHideSensitiveContentSettingMutation, EditHideSensitiveContentSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditHideSensitiveContentSettingMutation, EditHideSensitiveContentSettingMutationVariables>(EditHideSensitiveContentSettingDocument, options);
      }
export type EditHideSensitiveContentSettingMutationHookResult = ReturnType<typeof useEditHideSensitiveContentSettingMutation>;
export type EditHideSensitiveContentSettingMutationResult = Apollo.MutationResult<EditHideSensitiveContentSettingMutation>;
export type EditHideSensitiveContentSettingMutationOptions = Apollo.BaseMutationOptions<EditHideSensitiveContentSettingMutation, EditHideSensitiveContentSettingMutationVariables>;
export const EditIncomingMessagesDocument = gql`
    mutation EditIncomingMessages($incomingMessages: String!) {
  editIncomingMessages(incomingMessages: $incomingMessages) {
    status
    errors {
      field
      message
    }
  }
}
    `;
export type EditIncomingMessagesMutationFn = Apollo.MutationFunction<EditIncomingMessagesMutation, EditIncomingMessagesMutationVariables>;

/**
 * __useEditIncomingMessagesMutation__
 *
 * To run a mutation, you first call `useEditIncomingMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditIncomingMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editIncomingMessagesMutation, { data, loading, error }] = useEditIncomingMessagesMutation({
 *   variables: {
 *      incomingMessages: // value for 'incomingMessages'
 *   },
 * });
 */
export function useEditIncomingMessagesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditIncomingMessagesMutation, EditIncomingMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditIncomingMessagesMutation, EditIncomingMessagesMutationVariables>(EditIncomingMessagesDocument, options);
      }
export type EditIncomingMessagesMutationHookResult = ReturnType<typeof useEditIncomingMessagesMutation>;
export type EditIncomingMessagesMutationResult = Apollo.MutationResult<EditIncomingMessagesMutation>;
export type EditIncomingMessagesMutationOptions = Apollo.BaseMutationOptions<EditIncomingMessagesMutation, EditIncomingMessagesMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($messageId: String!, $content: String!, $media: String!, $chatId: String!) {
  editMessage(
    messageId: $messageId
    content: $content
    media: $media
    chatId: $chatId
  )
}
    `;
export type EditMessageMutationFn = Apollo.MutationFunction<EditMessageMutation, EditMessageMutationVariables>;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      content: // value for 'content'
 *      media: // value for 'media'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useEditMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditMessageMutation, EditMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditMessageMutation, EditMessageMutationVariables>(EditMessageDocument, options);
      }
export type EditMessageMutationHookResult = ReturnType<typeof useEditMessageMutation>;
export type EditMessageMutationResult = Apollo.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = Apollo.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const EditPersonalizedTrendsSettingDocument = gql`
    mutation EditPersonalizedTrendsSetting {
  editPersonalizedTrendsSetting
}
    `;
export type EditPersonalizedTrendsSettingMutationFn = Apollo.MutationFunction<EditPersonalizedTrendsSettingMutation, EditPersonalizedTrendsSettingMutationVariables>;

/**
 * __useEditPersonalizedTrendsSettingMutation__
 *
 * To run a mutation, you first call `useEditPersonalizedTrendsSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPersonalizedTrendsSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPersonalizedTrendsSettingMutation, { data, loading, error }] = useEditPersonalizedTrendsSettingMutation({
 *   variables: {
 *   },
 * });
 */
export function useEditPersonalizedTrendsSettingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditPersonalizedTrendsSettingMutation, EditPersonalizedTrendsSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditPersonalizedTrendsSettingMutation, EditPersonalizedTrendsSettingMutationVariables>(EditPersonalizedTrendsSettingDocument, options);
      }
export type EditPersonalizedTrendsSettingMutationHookResult = ReturnType<typeof useEditPersonalizedTrendsSettingMutation>;
export type EditPersonalizedTrendsSettingMutationResult = Apollo.MutationResult<EditPersonalizedTrendsSettingMutation>;
export type EditPersonalizedTrendsSettingMutationOptions = Apollo.BaseMutationOptions<EditPersonalizedTrendsSettingMutation, EditPersonalizedTrendsSettingMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($website: String!, $bio: String!, $profileBanner: String!, $profilePicture: String!, $lastName: String!, $firstName: String!) {
  editProfile(
    website: $website
    bio: $bio
    profileBanner: $profileBanner
    profilePicture: $profilePicture
    lastName: $lastName
    firstName: $firstName
  ) {
    errors {
      field
      message
    }
    user {
      id
      firstName
      lastName
      username
      email
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
      sessions {
        id
        sessionId
        clientOS
        clientType
        clientName
        deviceLocation
        country
        creationDate
      }
      posts {
        id
        postId
        authorId
        isReplyTo
        type
        content
        createdAt
        isEdited
        updatedAt
        media {
          id
          type
          src
          alt
          createdAt
        }
        mentions
        hashtags
        views
        topicsIds
        lang
      }
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    status
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      website: // value for 'website'
 *      bio: // value for 'bio'
 *      profileBanner: // value for 'profileBanner'
 *      profilePicture: // value for 'profilePicture'
 *      lastName: // value for 'lastName'
 *      firstName: // value for 'firstName'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const EditTwoFactorAuthDocument = gql`
    mutation EditTwoFactorAuth {
  editTwoFactorAuth {
    status
    user {
      id
      firstName
      lastName
      username
      email
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
      sessions {
        id
        sessionId
        clientOS
        clientType
        clientName
        deviceLocation
        country
        creationDate
      }
      posts {
        id
        postId
        authorId
        isReplyTo
        type
        content
        createdAt
        isEdited
        updatedAt
        media {
          id
          type
          src
          alt
          createdAt
        }
        mentions
        hashtags
        views
        topicsIds
        lang
      }
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
  }
}
    `;
export type EditTwoFactorAuthMutationFn = Apollo.MutationFunction<EditTwoFactorAuthMutation, EditTwoFactorAuthMutationVariables>;

/**
 * __useEditTwoFactorAuthMutation__
 *
 * To run a mutation, you first call `useEditTwoFactorAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTwoFactorAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTwoFactorAuthMutation, { data, loading, error }] = useEditTwoFactorAuthMutation({
 *   variables: {
 *   },
 * });
 */
export function useEditTwoFactorAuthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditTwoFactorAuthMutation, EditTwoFactorAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditTwoFactorAuthMutation, EditTwoFactorAuthMutationVariables>(EditTwoFactorAuthDocument, options);
      }
export type EditTwoFactorAuthMutationHookResult = ReturnType<typeof useEditTwoFactorAuthMutation>;
export type EditTwoFactorAuthMutationResult = Apollo.MutationResult<EditTwoFactorAuthMutation>;
export type EditTwoFactorAuthMutationOptions = Apollo.BaseMutationOptions<EditTwoFactorAuthMutation, EditTwoFactorAuthMutationVariables>;
export const EditUseLocationOnTrendsDocument = gql`
    mutation EditUseLocationOnTrends {
  editUseLocationOnTrends
}
    `;
export type EditUseLocationOnTrendsMutationFn = Apollo.MutationFunction<EditUseLocationOnTrendsMutation, EditUseLocationOnTrendsMutationVariables>;

/**
 * __useEditUseLocationOnTrendsMutation__
 *
 * To run a mutation, you first call `useEditUseLocationOnTrendsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUseLocationOnTrendsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUseLocationOnTrendsMutation, { data, loading, error }] = useEditUseLocationOnTrendsMutation({
 *   variables: {
 *   },
 * });
 */
export function useEditUseLocationOnTrendsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditUseLocationOnTrendsMutation, EditUseLocationOnTrendsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditUseLocationOnTrendsMutation, EditUseLocationOnTrendsMutationVariables>(EditUseLocationOnTrendsDocument, options);
      }
export type EditUseLocationOnTrendsMutationHookResult = ReturnType<typeof useEditUseLocationOnTrendsMutation>;
export type EditUseLocationOnTrendsMutationResult = Apollo.MutationResult<EditUseLocationOnTrendsMutation>;
export type EditUseLocationOnTrendsMutationOptions = Apollo.BaseMutationOptions<EditUseLocationOnTrendsMutation, EditUseLocationOnTrendsMutationVariables>;
export const EditedChatDocument = gql`
    subscription EditedChat($userId: Int, $chatId: String) {
  editedChat(userId: $userId, chatId: $chatId) {
    id
    chatId
    creatorId
    type
    chatImage
    chatTitle
    createdAt
    updatedAt
    messagesCount
    visible
  }
}
    `;

/**
 * __useEditedChatSubscription__
 *
 * To run a query within a React component, call `useEditedChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEditedChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditedChatSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useEditedChatSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<EditedChatSubscription, EditedChatSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<EditedChatSubscription, EditedChatSubscriptionVariables>(EditedChatDocument, options);
      }
export type EditedChatSubscriptionHookResult = ReturnType<typeof useEditedChatSubscription>;
export type EditedChatSubscriptionResult = Apollo.SubscriptionResult<EditedChatSubscription>;
export const EditedChatUserDocument = gql`
    subscription EditedChatUser($userId: Int) {
  editedChatUser(userId: $userId) {
    id
    role
    userId
    joinedChat
    inside
    lastExit
    hiddenMessagesIds
  }
}
    `;

/**
 * __useEditedChatUserSubscription__
 *
 * To run a query within a React component, call `useEditedChatUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEditedChatUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditedChatUserSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useEditedChatUserSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<EditedChatUserSubscription, EditedChatUserSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<EditedChatUserSubscription, EditedChatUserSubscriptionVariables>(EditedChatUserDocument, options);
      }
export type EditedChatUserSubscriptionHookResult = ReturnType<typeof useEditedChatUserSubscription>;
export type EditedChatUserSubscriptionResult = Apollo.SubscriptionResult<EditedChatUserSubscription>;
export const EditedMessageDocument = gql`
    subscription EditedMessage($messageId: String) {
  editedMessage(messageId: $messageId) {
    id
    messageId
    authorId
    isReplyTo
    type
    content
    createdAt
    isEdited
    updatedAt
    media {
      type
      src
    }
    mentions
    hashtags
    status
    chat {
      id
      chatId
      creatorId
      type
      chatImage
      chatTitle
      createdAt
      updatedAt
      messagesCount
      visible
    }
  }
}
    `;

/**
 * __useEditedMessageSubscription__
 *
 * To run a query within a React component, call `useEditedMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEditedMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditedMessageSubscription({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useEditedMessageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<EditedMessageSubscription, EditedMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<EditedMessageSubscription, EditedMessageSubscriptionVariables>(EditedMessageDocument, options);
      }
export type EditedMessageSubscriptionHookResult = ReturnType<typeof useEditedMessageSubscription>;
export type EditedMessageSubscriptionResult = Apollo.SubscriptionResult<EditedMessageSubscription>;
export const FindChatDocument = gql`
    query FindChat($chatId: String) {
  findChat(chatId: $chatId) {
    id
    chatId
    creatorId
    type
    chatImage
    chatTitle
    createdAt
    updatedAt
    messagesCount
    visible
    users {
      id
      role
      userId
      joinedChat
      inside
      lastExit
      hiddenMessagesIds
    }
    messages {
      id
      messageId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        type
        src
      }
      mentions
      hashtags
      status
    }
    events {
      id
      userId
      resourceId
      eventType
      eventMessage
      createdAt
    }
  }
}
    `;

/**
 * __useFindChatQuery__
 *
 * To run a query within a React component, call `useFindChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useFindChatQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindChatQuery, FindChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindChatQuery, FindChatQueryVariables>(FindChatDocument, options);
      }
export function useFindChatLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindChatQuery, FindChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindChatQuery, FindChatQueryVariables>(FindChatDocument, options);
        }
export function useFindChatSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindChatQuery, FindChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindChatQuery, FindChatQueryVariables>(FindChatDocument, options);
        }
export type FindChatQueryHookResult = ReturnType<typeof useFindChatQuery>;
export type FindChatLazyQueryHookResult = ReturnType<typeof useFindChatLazyQuery>;
export type FindChatSuspenseQueryHookResult = ReturnType<typeof useFindChatSuspenseQuery>;
export type FindChatQueryResult = Apollo.QueryResult<FindChatQuery, FindChatQueryVariables>;
export const FindMessageDocument = gql`
    query FindMessage($chatId: String, $messageId: String) {
  findMessage(chatId: $chatId, messageId: $messageId) {
    id
    messageId
    authorId
    type
    content
    createdAt
    isEdited
    updatedAt
    mentions
    hashtags
    status
    chat {
      id
      chatId
      creatorId
      type
      chatImage
      chatTitle
      createdAt
      updatedAt
      messagesCount
    }
    media {
      type
      src
    }
  }
}
    `;

/**
 * __useFindMessageQuery__
 *
 * To run a query within a React component, call `useFindMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMessageQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useFindMessageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindMessageQuery, FindMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindMessageQuery, FindMessageQueryVariables>(FindMessageDocument, options);
      }
export function useFindMessageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindMessageQuery, FindMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindMessageQuery, FindMessageQueryVariables>(FindMessageDocument, options);
        }
export function useFindMessageSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindMessageQuery, FindMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindMessageQuery, FindMessageQueryVariables>(FindMessageDocument, options);
        }
export type FindMessageQueryHookResult = ReturnType<typeof useFindMessageQuery>;
export type FindMessageLazyQueryHookResult = ReturnType<typeof useFindMessageLazyQuery>;
export type FindMessageSuspenseQueryHookResult = ReturnType<typeof useFindMessageSuspenseQuery>;
export type FindMessageQueryResult = Apollo.QueryResult<FindMessageQuery, FindMessageQueryVariables>;
export const FindMessageByIdDocument = gql`
    query FindMessageById($chatId: String!, $id: Int!) {
  findMessageById(chatId: $chatId, id: $id) {
    id
    messageId
    authorId
    type
    content
    createdAt
    isEdited
    updatedAt
    mentions
    hashtags
    status
    chat {
      id
      chatId
      creatorId
      type
      chatImage
      chatTitle
      createdAt
      updatedAt
      messagesCount
    }
    media {
      type
      src
    }
  }
}
    `;

/**
 * __useFindMessageByIdQuery__
 *
 * To run a query within a React component, call `useFindMessageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMessageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMessageByIdQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindMessageByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FindMessageByIdQuery, FindMessageByIdQueryVariables> & ({ variables: FindMessageByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindMessageByIdQuery, FindMessageByIdQueryVariables>(FindMessageByIdDocument, options);
      }
export function useFindMessageByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindMessageByIdQuery, FindMessageByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindMessageByIdQuery, FindMessageByIdQueryVariables>(FindMessageByIdDocument, options);
        }
export function useFindMessageByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindMessageByIdQuery, FindMessageByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindMessageByIdQuery, FindMessageByIdQueryVariables>(FindMessageByIdDocument, options);
        }
export type FindMessageByIdQueryHookResult = ReturnType<typeof useFindMessageByIdQuery>;
export type FindMessageByIdLazyQueryHookResult = ReturnType<typeof useFindMessageByIdLazyQuery>;
export type FindMessageByIdSuspenseQueryHookResult = ReturnType<typeof useFindMessageByIdSuspenseQuery>;
export type FindMessageByIdQueryResult = Apollo.QueryResult<FindMessageByIdQuery, FindMessageByIdQueryVariables>;
export const FindPostDocument = gql`
    query FindPost($postId: String) {
  findPost(postId: $postId) {
    id
    postId
    authorId
    isReplyTo
    type
    content
    createdAt
    isEdited
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
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
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    media {
      id
      type
      src
      alt
      createdAt
    }
    mentions
    hashtags
    views
    topicsIds
    lang
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
export function useFindPostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindPostQuery, FindPostQueryVariables>) {
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
    postId
    authorId
    isReplyTo
    type
    content
    createdAt
    isEdited
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
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
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    media {
      id
      type
      src
      alt
      createdAt
    }
    mentions
    hashtags
    views
    topicsIds
    lang
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
export const FindSessionDocument = gql`
    query FindSession($sessionId: String) {
  findSession(sessionId: $sessionId) {
    id
    sessionId
    clientOS
    clientType
    clientName
    deviceLocation
    country
    creationDate
    user {
      id
      username
      email
      firstName
      lastName
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
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
  }
}
    `;

/**
 * __useFindSessionQuery__
 *
 * To run a query within a React component, call `useFindSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSessionQuery({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useFindSessionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindSessionQuery, FindSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindSessionQuery, FindSessionQueryVariables>(FindSessionDocument, options);
      }
export function useFindSessionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindSessionQuery, FindSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindSessionQuery, FindSessionQueryVariables>(FindSessionDocument, options);
        }
export function useFindSessionSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindSessionQuery, FindSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindSessionQuery, FindSessionQueryVariables>(FindSessionDocument, options);
        }
export type FindSessionQueryHookResult = ReturnType<typeof useFindSessionQuery>;
export type FindSessionLazyQueryHookResult = ReturnType<typeof useFindSessionLazyQuery>;
export type FindSessionSuspenseQueryHookResult = ReturnType<typeof useFindSessionSuspenseQuery>;
export type FindSessionQueryResult = Apollo.QueryResult<FindSessionQuery, FindSessionQueryVariables>;
export const FindUserDocument = gql`
    query FindUser($username: String) {
  findUser(username: $username) {
    id
    firstName
    lastName
    username
    email
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
    sessions {
      id
      sessionId
      clientOS
      clientType
      clientName
      deviceLocation
      country
      creationDate
    }
    posts {
      id
      postId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        id
        type
        src
        alt
        createdAt
      }
      mentions
      hashtags
      views
      topicsIds
      lang
    }
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
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
export function useFindUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
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
      firstName
      lastName
      username
      email
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
      sessions {
        id
        sessionId
        clientOS
        clientType
        clientName
        deviceLocation
        country
        creationDate
      }
      posts {
        id
        postId
        authorId
        isReplyTo
        type
        content
        createdAt
        isEdited
        updatedAt
        media {
          id
          type
          src
          alt
          createdAt
        }
        mentions
        hashtags
        views
        topicsIds
        lang
      }
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    status
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
    query FindUserById($id: Int, $deleted: Boolean) {
  findUserById(id: $id, deleted: $deleted) {
    id
    firstName
    lastName
    username
    email
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
    sessions {
      id
      sessionId
      clientOS
      clientType
      clientName
      deviceLocation
      country
      creationDate
    }
    posts {
      id
      postId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        id
        type
        src
        alt
        createdAt
      }
      mentions
      hashtags
      views
      topicsIds
      lang
    }
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
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
 *      deleted: // value for 'deleted'
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
export const FindUserDeviceTokenByIdDocument = gql`
    query FindUserDeviceTokenById($id: Int, $userId: Int) {
  findUserDeviceTokenById(id: $id, userId: $userId) {
    id
    token
    userId
    sessionId
    createdAt
  }
}
    `;

/**
 * __useFindUserDeviceTokenByIdQuery__
 *
 * To run a query within a React component, call `useFindUserDeviceTokenByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserDeviceTokenByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserDeviceTokenByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserDeviceTokenByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindUserDeviceTokenByIdQuery, FindUserDeviceTokenByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindUserDeviceTokenByIdQuery, FindUserDeviceTokenByIdQueryVariables>(FindUserDeviceTokenByIdDocument, options);
      }
export function useFindUserDeviceTokenByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindUserDeviceTokenByIdQuery, FindUserDeviceTokenByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindUserDeviceTokenByIdQuery, FindUserDeviceTokenByIdQueryVariables>(FindUserDeviceTokenByIdDocument, options);
        }
export function useFindUserDeviceTokenByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindUserDeviceTokenByIdQuery, FindUserDeviceTokenByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindUserDeviceTokenByIdQuery, FindUserDeviceTokenByIdQueryVariables>(FindUserDeviceTokenByIdDocument, options);
        }
export type FindUserDeviceTokenByIdQueryHookResult = ReturnType<typeof useFindUserDeviceTokenByIdQuery>;
export type FindUserDeviceTokenByIdLazyQueryHookResult = ReturnType<typeof useFindUserDeviceTokenByIdLazyQuery>;
export type FindUserDeviceTokenByIdSuspenseQueryHookResult = ReturnType<typeof useFindUserDeviceTokenByIdSuspenseQuery>;
export type FindUserDeviceTokenByIdQueryResult = Apollo.QueryResult<FindUserDeviceTokenByIdQuery, FindUserDeviceTokenByIdQueryVariables>;
export const FindUserDeviceTokenBySessionIdDocument = gql`
    query FindUserDeviceTokenBySessionId($sessionId: String, $userId: Int) {
  findUserDeviceTokenBySessionId(sessionId: $sessionId, userId: $userId) {
    id
    token
    userId
    sessionId
    createdAt
  }
}
    `;

/**
 * __useFindUserDeviceTokenBySessionIdQuery__
 *
 * To run a query within a React component, call `useFindUserDeviceTokenBySessionIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserDeviceTokenBySessionIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserDeviceTokenBySessionIdQuery({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserDeviceTokenBySessionIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindUserDeviceTokenBySessionIdQuery, FindUserDeviceTokenBySessionIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindUserDeviceTokenBySessionIdQuery, FindUserDeviceTokenBySessionIdQueryVariables>(FindUserDeviceTokenBySessionIdDocument, options);
      }
export function useFindUserDeviceTokenBySessionIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindUserDeviceTokenBySessionIdQuery, FindUserDeviceTokenBySessionIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindUserDeviceTokenBySessionIdQuery, FindUserDeviceTokenBySessionIdQueryVariables>(FindUserDeviceTokenBySessionIdDocument, options);
        }
export function useFindUserDeviceTokenBySessionIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindUserDeviceTokenBySessionIdQuery, FindUserDeviceTokenBySessionIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindUserDeviceTokenBySessionIdQuery, FindUserDeviceTokenBySessionIdQueryVariables>(FindUserDeviceTokenBySessionIdDocument, options);
        }
export type FindUserDeviceTokenBySessionIdQueryHookResult = ReturnType<typeof useFindUserDeviceTokenBySessionIdQuery>;
export type FindUserDeviceTokenBySessionIdLazyQueryHookResult = ReturnType<typeof useFindUserDeviceTokenBySessionIdLazyQuery>;
export type FindUserDeviceTokenBySessionIdSuspenseQueryHookResult = ReturnType<typeof useFindUserDeviceTokenBySessionIdSuspenseQuery>;
export type FindUserDeviceTokenBySessionIdQueryResult = Apollo.QueryResult<FindUserDeviceTokenBySessionIdQuery, FindUserDeviceTokenBySessionIdQueryVariables>;
export const FindUserDeviceTokenByTokenDocument = gql`
    query FindUserDeviceTokenByToken($token: String, $userId: Int) {
  findUserDeviceTokenByToken(token: $token, userId: $userId) {
    id
    token
    userId
    sessionId
    createdAt
  }
}
    `;

/**
 * __useFindUserDeviceTokenByTokenQuery__
 *
 * To run a query within a React component, call `useFindUserDeviceTokenByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserDeviceTokenByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserDeviceTokenByTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserDeviceTokenByTokenQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindUserDeviceTokenByTokenQuery, FindUserDeviceTokenByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindUserDeviceTokenByTokenQuery, FindUserDeviceTokenByTokenQueryVariables>(FindUserDeviceTokenByTokenDocument, options);
      }
export function useFindUserDeviceTokenByTokenLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindUserDeviceTokenByTokenQuery, FindUserDeviceTokenByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindUserDeviceTokenByTokenQuery, FindUserDeviceTokenByTokenQueryVariables>(FindUserDeviceTokenByTokenDocument, options);
        }
export function useFindUserDeviceTokenByTokenSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindUserDeviceTokenByTokenQuery, FindUserDeviceTokenByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindUserDeviceTokenByTokenQuery, FindUserDeviceTokenByTokenQueryVariables>(FindUserDeviceTokenByTokenDocument, options);
        }
export type FindUserDeviceTokenByTokenQueryHookResult = ReturnType<typeof useFindUserDeviceTokenByTokenQuery>;
export type FindUserDeviceTokenByTokenLazyQueryHookResult = ReturnType<typeof useFindUserDeviceTokenByTokenLazyQuery>;
export type FindUserDeviceTokenByTokenSuspenseQueryHookResult = ReturnType<typeof useFindUserDeviceTokenByTokenSuspenseQuery>;
export type FindUserDeviceTokenByTokenQueryResult = Apollo.QueryResult<FindUserDeviceTokenByTokenQuery, FindUserDeviceTokenByTokenQueryVariables>;
export const FindUserDeviceTokensByUserIdDocument = gql`
    query FindUserDeviceTokensByUserId($userId: Int) {
  findUserDeviceTokensByUserId(userId: $userId) {
    id
    token
    userId
    sessionId
    createdAt
  }
}
    `;

/**
 * __useFindUserDeviceTokensByUserIdQuery__
 *
 * To run a query within a React component, call `useFindUserDeviceTokensByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserDeviceTokensByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserDeviceTokensByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserDeviceTokensByUserIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindUserDeviceTokensByUserIdQuery, FindUserDeviceTokensByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindUserDeviceTokensByUserIdQuery, FindUserDeviceTokensByUserIdQueryVariables>(FindUserDeviceTokensByUserIdDocument, options);
      }
export function useFindUserDeviceTokensByUserIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindUserDeviceTokensByUserIdQuery, FindUserDeviceTokensByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindUserDeviceTokensByUserIdQuery, FindUserDeviceTokensByUserIdQueryVariables>(FindUserDeviceTokensByUserIdDocument, options);
        }
export function useFindUserDeviceTokensByUserIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindUserDeviceTokensByUserIdQuery, FindUserDeviceTokensByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindUserDeviceTokensByUserIdQuery, FindUserDeviceTokensByUserIdQueryVariables>(FindUserDeviceTokensByUserIdDocument, options);
        }
export type FindUserDeviceTokensByUserIdQueryHookResult = ReturnType<typeof useFindUserDeviceTokensByUserIdQuery>;
export type FindUserDeviceTokensByUserIdLazyQueryHookResult = ReturnType<typeof useFindUserDeviceTokensByUserIdLazyQuery>;
export type FindUserDeviceTokensByUserIdSuspenseQueryHookResult = ReturnType<typeof useFindUserDeviceTokensByUserIdSuspenseQuery>;
export type FindUserDeviceTokensByUserIdQueryResult = Apollo.QueryResult<FindUserDeviceTokensByUserIdQuery, FindUserDeviceTokensByUserIdQueryVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($userId: Int!, $origin: String!) {
  followUser(userId: $userId, origin: $origin) {
    id
    followerId
    userId
    origin
    createdAt
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
    query GetFollowers($id: Int) {
  getFollowers(id: $id) {
    id
    firstName
    lastName
    username
    email
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
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
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
 *   },
 * });
 */
export function useGetFollowersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
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
export const GetFollowingDocument = gql`
    query GetFollowing($id: Int) {
  getFollowing(id: $id) {
    id
    firstName
    lastName
    username
    email
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
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
  }
}
    `;

/**
 * __useGetFollowingQuery__
 *
 * To run a query within a React component, call `useGetFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFollowingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, options);
      }
export function useGetFollowingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, options);
        }
export function useGetFollowingSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, options);
        }
export type GetFollowingQueryHookResult = ReturnType<typeof useGetFollowingQuery>;
export type GetFollowingLazyQueryHookResult = ReturnType<typeof useGetFollowingLazyQuery>;
export type GetFollowingSuspenseQueryHookResult = ReturnType<typeof useGetFollowingSuspenseQuery>;
export type GetFollowingQueryResult = Apollo.QueryResult<GetFollowingQuery, GetFollowingQueryVariables>;
export const GetLikedPostsDocument = gql`
    query GetLikedPosts($id: Int) {
  getLikedPosts(id: $id) {
    id
    postId
    authorId
    isReplyTo
    type
    content
    createdAt
    isEdited
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
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
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    media {
      id
      type
      src
      alt
      createdAt
    }
    mentions
    hashtags
    views
    topicsIds
    lang
  }
}
    `;

/**
 * __useGetLikedPostsQuery__
 *
 * To run a query within a React component, call `useGetLikedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLikedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLikedPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLikedPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLikedPostsQuery, GetLikedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLikedPostsQuery, GetLikedPostsQueryVariables>(GetLikedPostsDocument, options);
      }
export function useGetLikedPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLikedPostsQuery, GetLikedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLikedPostsQuery, GetLikedPostsQueryVariables>(GetLikedPostsDocument, options);
        }
export function useGetLikedPostsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetLikedPostsQuery, GetLikedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetLikedPostsQuery, GetLikedPostsQueryVariables>(GetLikedPostsDocument, options);
        }
export type GetLikedPostsQueryHookResult = ReturnType<typeof useGetLikedPostsQuery>;
export type GetLikedPostsLazyQueryHookResult = ReturnType<typeof useGetLikedPostsLazyQuery>;
export type GetLikedPostsSuspenseQueryHookResult = ReturnType<typeof useGetLikedPostsSuspenseQuery>;
export type GetLikedPostsQueryResult = Apollo.QueryResult<GetLikedPostsQuery, GetLikedPostsQueryVariables>;
export const GetPostLikesDocument = gql`
    query GetPostLikes($postId: String) {
  getPostLikes(postId: $postId) {
    id
    firstName
    lastName
    username
    email
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
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
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
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostLikesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostLikesQuery, GetPostLikesQueryVariables>) {
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
export const HasUserBlockedMeDocument = gql`
    query HasUserBlockedMe($id: Int) {
  hasUserBlockedMe(id: $id)
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
export const IncrementPostViewsDocument = gql`
    mutation IncrementPostViews($postId: String!, $postOpened: Boolean!, $origin: String!) {
  incrementPostViews(postId: $postId, postOpened: $postOpened, origin: $origin) {
    id
    postId
    authorId
    isReplyTo
    type
    content
    createdAt
    isEdited
    updatedAt
    media {
      id
      type
      src
      alt
      createdAt
    }
    mentions
    hashtags
    views
    topicsIds
    lang
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
 *      postId: // value for 'postId'
 *      postOpened: // value for 'postOpened'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useIncrementPostViewsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<IncrementPostViewsMutation, IncrementPostViewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<IncrementPostViewsMutation, IncrementPostViewsMutationVariables>(IncrementPostViewsDocument, options);
      }
export type IncrementPostViewsMutationHookResult = ReturnType<typeof useIncrementPostViewsMutation>;
export type IncrementPostViewsMutationResult = Apollo.MutationResult<IncrementPostViewsMutation>;
export type IncrementPostViewsMutationOptions = Apollo.BaseMutationOptions<IncrementPostViewsMutation, IncrementPostViewsMutationVariables>;
export const IsFollowedByMeDocument = gql`
    query IsFollowedByMe($id: Int) {
  isFollowedByMe(id: $id)
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
export const IsPostLikedByMeDocument = gql`
    query IsPostLikedByMe($postId: String) {
  isPostLikedByMe(postId: $postId)
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
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useIsPostLikedByMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsPostLikedByMeQuery, IsPostLikedByMeQueryVariables>) {
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
export const IsUserBlockedByMeDocument = gql`
    query IsUserBlockedByMe($id: Int) {
  isUserBlockedByMe(id: $id)
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
export const IsUserFollowingMeDocument = gql`
    query IsUserFollowingMe($id: Int) {
  isUserFollowingMe(id: $id)
}
    `;

/**
 * __useIsUserFollowingMeQuery__
 *
 * To run a query within a React component, call `useIsUserFollowingMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserFollowingMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserFollowingMeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIsUserFollowingMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsUserFollowingMeQuery, IsUserFollowingMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsUserFollowingMeQuery, IsUserFollowingMeQueryVariables>(IsUserFollowingMeDocument, options);
      }
export function useIsUserFollowingMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsUserFollowingMeQuery, IsUserFollowingMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsUserFollowingMeQuery, IsUserFollowingMeQueryVariables>(IsUserFollowingMeDocument, options);
        }
export function useIsUserFollowingMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<IsUserFollowingMeQuery, IsUserFollowingMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<IsUserFollowingMeQuery, IsUserFollowingMeQueryVariables>(IsUserFollowingMeDocument, options);
        }
export type IsUserFollowingMeQueryHookResult = ReturnType<typeof useIsUserFollowingMeQuery>;
export type IsUserFollowingMeLazyQueryHookResult = ReturnType<typeof useIsUserFollowingMeLazyQuery>;
export type IsUserFollowingMeSuspenseQueryHookResult = ReturnType<typeof useIsUserFollowingMeSuspenseQuery>;
export type IsUserFollowingMeQueryResult = Apollo.QueryResult<IsUserFollowingMeQuery, IsUserFollowingMeQueryVariables>;
export const LatestMessageOrEventDocument = gql`
    query LatestMessageOrEvent($chatId: String) {
  latestMessageOrEvent(chatId: $chatId) {
    ... on Message {
      id
      messageId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        type
        src
      }
      mentions
      hashtags
      status
    }
    ... on Event {
      id
      userId
      resourceId
      eventType
      eventMessage
      createdAt
    }
  }
}
    `;

/**
 * __useLatestMessageOrEventQuery__
 *
 * To run a query within a React component, call `useLatestMessageOrEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestMessageOrEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestMessageOrEventQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useLatestMessageOrEventQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LatestMessageOrEventQuery, LatestMessageOrEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LatestMessageOrEventQuery, LatestMessageOrEventQueryVariables>(LatestMessageOrEventDocument, options);
      }
export function useLatestMessageOrEventLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LatestMessageOrEventQuery, LatestMessageOrEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LatestMessageOrEventQuery, LatestMessageOrEventQueryVariables>(LatestMessageOrEventDocument, options);
        }
export function useLatestMessageOrEventSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<LatestMessageOrEventQuery, LatestMessageOrEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<LatestMessageOrEventQuery, LatestMessageOrEventQueryVariables>(LatestMessageOrEventDocument, options);
        }
export type LatestMessageOrEventQueryHookResult = ReturnType<typeof useLatestMessageOrEventQuery>;
export type LatestMessageOrEventLazyQueryHookResult = ReturnType<typeof useLatestMessageOrEventLazyQuery>;
export type LatestMessageOrEventSuspenseQueryHookResult = ReturnType<typeof useLatestMessageOrEventSuspenseQuery>;
export type LatestMessageOrEventQueryResult = Apollo.QueryResult<LatestMessageOrEventQuery, LatestMessageOrEventQueryVariables>;
export const LikePostDocument = gql`
    mutation LikePost($postId: String!, $origin: String!, $postOpened: Boolean!) {
  likePost(postId: $postId, origin: $origin, postOpened: $postOpened) {
    id
    userId
    likedPostId
    postOpened
    origin
    createdAt
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
 *      postId: // value for 'postId'
 *      origin: // value for 'origin'
 *      postOpened: // value for 'postOpened'
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
      firstName
      lastName
      username
      email
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
      sessions {
        id
        sessionId
        clientOS
        clientType
        clientName
        deviceLocation
        country
        creationDate
      }
      posts {
        id
        postId
        authorId
        isReplyTo
        type
        content
        createdAt
        isEdited
        updatedAt
        media {
          id
          type
          src
          alt
          createdAt
        }
        mentions
        hashtags
        views
        topicsIds
        lang
      }
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    errors {
      field
      message
    }
    accessToken
    status
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
    firstName
    lastName
    username
    email
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
    sessions {
      id
      sessionId
      clientOS
      clientType
      clientName
      deviceLocation
      country
      creationDate
    }
    posts {
      id
      postId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        id
        type
        src
        alt
        createdAt
      }
      mentions
      hashtags
      views
      topicsIds
      lang
    }
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
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
export const MessagesAndEventsDocument = gql`
    query MessagesAndEvents($chatId: String) {
  messagesAndEvents(chatId: $chatId) {
    ... on Message {
      id
      messageId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        type
        src
      }
      mentions
      hashtags
      status
      chat {
        id
        chatId
        creatorId
        type
        chatImage
        chatTitle
        createdAt
        updatedAt
        messagesCount
        visible
      }
    }
    ... on Event {
      id
      userId
      resourceId
      eventType
      eventMessage
      createdAt
      chat {
        id
        chatId
        creatorId
        type
        chatImage
        chatTitle
        createdAt
        updatedAt
        messagesCount
        visible
      }
    }
  }
}
    `;

/**
 * __useMessagesAndEventsQuery__
 *
 * To run a query within a React component, call `useMessagesAndEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesAndEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesAndEventsQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useMessagesAndEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>(MessagesAndEventsDocument, options);
      }
export function useMessagesAndEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>(MessagesAndEventsDocument, options);
        }
export function useMessagesAndEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>(MessagesAndEventsDocument, options);
        }
export type MessagesAndEventsQueryHookResult = ReturnType<typeof useMessagesAndEventsQuery>;
export type MessagesAndEventsLazyQueryHookResult = ReturnType<typeof useMessagesAndEventsLazyQuery>;
export type MessagesAndEventsSuspenseQueryHookResult = ReturnType<typeof useMessagesAndEventsSuspenseQuery>;
export type MessagesAndEventsQueryResult = Apollo.QueryResult<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>;
export const NewChatDocument = gql`
    subscription NewChat($userId: Int) {
  newChat(userId: $userId) {
    id
    chatId
    creatorId
    type
    chatImage
    chatTitle
    createdAt
    updatedAt
    messagesCount
    visible
    users {
      id
      role
      userId
      joinedChat
      inside
      lastExit
      hiddenMessagesIds
    }
    messages {
      id
      messageId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        type
        src
      }
      mentions
      hashtags
      status
    }
    events {
      id
      userId
      resourceId
      eventType
      eventMessage
      createdAt
    }
  }
}
    `;

/**
 * __useNewChatSubscription__
 *
 * To run a query within a React component, call `useNewChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewChatSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewChatSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewChatSubscription, NewChatSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NewChatSubscription, NewChatSubscriptionVariables>(NewChatDocument, options);
      }
export type NewChatSubscriptionHookResult = ReturnType<typeof useNewChatSubscription>;
export type NewChatSubscriptionResult = Apollo.SubscriptionResult<NewChatSubscription>;
export const NewMessageNotificationDocument = gql`
    subscription NewMessageNotification($chatId: String, $userId: Int) {
  newMessageNotification(chatId: $chatId, userId: $userId) {
    id
    notificationId
    creatorId
    chatId
    itemId
    recipientId
    itemType
    content
    viewed
    createdAt
  }
}
    `;

/**
 * __useNewMessageNotificationSubscription__
 *
 * To run a query within a React component, call `useNewMessageNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageNotificationSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewMessageNotificationSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewMessageNotificationSubscription, NewMessageNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NewMessageNotificationSubscription, NewMessageNotificationSubscriptionVariables>(NewMessageNotificationDocument, options);
      }
export type NewMessageNotificationSubscriptionHookResult = ReturnType<typeof useNewMessageNotificationSubscription>;
export type NewMessageNotificationSubscriptionResult = Apollo.SubscriptionResult<NewMessageNotificationSubscription>;
export const NewMessageOrEventDocument = gql`
    subscription NewMessageOrEvent($chatId: String, $userId: Int) {
  newMessageOrEvent(chatId: $chatId, userId: $userId) {
    ... on Message {
      id
      messageId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        type
        src
      }
      mentions
      hashtags
      status
      chat {
        id
        chatId
        creatorId
        type
        chatImage
        chatTitle
        createdAt
        updatedAt
        messagesCount
        visible
      }
    }
    ... on Event {
      id
      userId
      resourceId
      eventType
      eventMessage
      createdAt
      chat {
        id
        chatId
        creatorId
        type
        chatImage
        chatTitle
        createdAt
        updatedAt
        messagesCount
        visible
      }
    }
  }
}
    `;

/**
 * __useNewMessageOrEventSubscription__
 *
 * To run a query within a React component, call `useNewMessageOrEventSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageOrEventSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageOrEventSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewMessageOrEventSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewMessageOrEventSubscription, NewMessageOrEventSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NewMessageOrEventSubscription, NewMessageOrEventSubscriptionVariables>(NewMessageOrEventDocument, options);
      }
export type NewMessageOrEventSubscriptionHookResult = ReturnType<typeof useNewMessageOrEventSubscription>;
export type NewMessageOrEventSubscriptionResult = Apollo.SubscriptionResult<NewMessageOrEventSubscription>;
export const NewNotificationDocument = gql`
    subscription NewNotification($userId: Int) {
  newNotification(userId: $userId) {
    id
    notificationId
    creatorId
    recipientId
    resourceId
    type
    content
    viewed
    createdAt
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
export const NotAuthModifyPasswordDocument = gql`
    mutation NotAuthModifyPassword($token: String!, $confirmPassword: String!, $password: String!) {
  notAuthModifyPassword(
    token: $token
    confirmPassword: $confirmPassword
    password: $password
  ) {
    status
    errors {
      field
      message
    }
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
 *      token: // value for 'token'
 *      confirmPassword: // value for 'confirmPassword'
 *      password: // value for 'password'
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
export const NotificationFeedDocument = gql`
    query NotificationFeed {
  notificationFeed {
    id
    notificationId
    creatorId
    recipientId
    resourceId
    type
    content
    viewed
    createdAt
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
 *   },
 * });
 */
export function useNotificationFeedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NotificationFeedQuery, NotificationFeedQueryVariables>) {
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
export const OtherSessionsDocument = gql`
    query OtherSessions {
  otherSessions {
    id
    sessionId
    clientOS
    clientType
    clientName
    deviceLocation
    country
    creationDate
    user {
      id
      username
      email
      firstName
      lastName
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
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
  }
}
    `;

/**
 * __useOtherSessionsQuery__
 *
 * To run a query within a React component, call `useOtherSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOtherSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOtherSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOtherSessionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OtherSessionsQuery, OtherSessionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<OtherSessionsQuery, OtherSessionsQueryVariables>(OtherSessionsDocument, options);
      }
export function useOtherSessionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OtherSessionsQuery, OtherSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<OtherSessionsQuery, OtherSessionsQueryVariables>(OtherSessionsDocument, options);
        }
export function useOtherSessionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<OtherSessionsQuery, OtherSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<OtherSessionsQuery, OtherSessionsQueryVariables>(OtherSessionsDocument, options);
        }
export type OtherSessionsQueryHookResult = ReturnType<typeof useOtherSessionsQuery>;
export type OtherSessionsLazyQueryHookResult = ReturnType<typeof useOtherSessionsLazyQuery>;
export type OtherSessionsSuspenseQueryHookResult = ReturnType<typeof useOtherSessionsSuspenseQuery>;
export type OtherSessionsQueryResult = Apollo.QueryResult<OtherSessionsQuery, OtherSessionsQueryVariables>;
export const PostCommentsDocument = gql`
    query PostComments($id: Int) {
  postComments(id: $id) {
    id
    postId
    authorId
    isReplyTo
    type
    content
    createdAt
    isEdited
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
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
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    media {
      id
      type
      src
      alt
      createdAt
    }
    mentions
    hashtags
    views
    topicsIds
    lang
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
 *   },
 * });
 */
export function usePostCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
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
    query PostFeed {
  postFeed {
    id
    postId
    authorId
    isReplyTo
    type
    content
    createdAt
    isEdited
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
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
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    media {
      id
      type
      src
      alt
      createdAt
    }
    mentions
    hashtags
    views
    topicsIds
    lang
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
 *   },
 * });
 */
export function usePostFeedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostFeedQuery, PostFeedQueryVariables>) {
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
export const PostMediaDocument = gql`
    query PostMedia($postId: String) {
  postMedia(postId: $postId) {
    id
    type
    src
    alt
    createdAt
  }
}
    `;

/**
 * __usePostMediaQuery__
 *
 * To run a query within a React component, call `usePostMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostMediaQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostMediaQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostMediaQuery, PostMediaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PostMediaQuery, PostMediaQueryVariables>(PostMediaDocument, options);
      }
export function usePostMediaLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostMediaQuery, PostMediaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PostMediaQuery, PostMediaQueryVariables>(PostMediaDocument, options);
        }
export function usePostMediaSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PostMediaQuery, PostMediaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PostMediaQuery, PostMediaQueryVariables>(PostMediaDocument, options);
        }
export type PostMediaQueryHookResult = ReturnType<typeof usePostMediaQuery>;
export type PostMediaLazyQueryHookResult = ReturnType<typeof usePostMediaLazyQuery>;
export type PostMediaSuspenseQueryHookResult = ReturnType<typeof usePostMediaSuspenseQuery>;
export type PostMediaQueryResult = Apollo.QueryResult<PostMediaQuery, PostMediaQueryVariables>;
export const RelevantPeopleDocument = gql`
    query RelevantPeople($postId: String) {
  relevantPeople(postId: $postId) {
    id
    firstName
    lastName
    username
    email
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
    sessions {
      id
      sessionId
      clientOS
      clientType
      clientName
      deviceLocation
      country
      creationDate
    }
    posts {
      id
      postId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      media {
        id
        type
        src
        alt
        createdAt
      }
      mentions
      hashtags
      views
      topicsIds
      lang
    }
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
  }
}
    `;

/**
 * __useRelevantPeopleQuery__
 *
 * To run a query within a React component, call `useRelevantPeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `useRelevantPeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRelevantPeopleQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRelevantPeopleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RelevantPeopleQuery, RelevantPeopleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RelevantPeopleQuery, RelevantPeopleQueryVariables>(RelevantPeopleDocument, options);
      }
export function useRelevantPeopleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RelevantPeopleQuery, RelevantPeopleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RelevantPeopleQuery, RelevantPeopleQueryVariables>(RelevantPeopleDocument, options);
        }
export function useRelevantPeopleSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<RelevantPeopleQuery, RelevantPeopleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<RelevantPeopleQuery, RelevantPeopleQueryVariables>(RelevantPeopleDocument, options);
        }
export type RelevantPeopleQueryHookResult = ReturnType<typeof useRelevantPeopleQuery>;
export type RelevantPeopleLazyQueryHookResult = ReturnType<typeof useRelevantPeopleLazyQuery>;
export type RelevantPeopleSuspenseQueryHookResult = ReturnType<typeof useRelevantPeopleSuspenseQuery>;
export type RelevantPeopleQueryResult = Apollo.QueryResult<RelevantPeopleQuery, RelevantPeopleQueryVariables>;
export const RemoveLikeDocument = gql`
    mutation RemoveLike($postId: String) {
  removeLike(postId: $postId)
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
 *      postId: // value for 'postId'
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
export const RemoveUserFromGroupDocument = gql`
    mutation RemoveUserFromGroup($chatId: String!, $userId: Int!) {
  removeUserFromGroup(chatId: $chatId, userId: $userId)
}
    `;
export type RemoveUserFromGroupMutationFn = Apollo.MutationFunction<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>;

/**
 * __useRemoveUserFromGroupMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromGroupMutation, { data, loading, error }] = useRemoveUserFromGroupMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveUserFromGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>(RemoveUserFromGroupDocument, options);
      }
export type RemoveUserFromGroupMutationHookResult = ReturnType<typeof useRemoveUserFromGroupMutation>;
export type RemoveUserFromGroupMutationResult = Apollo.MutationResult<RemoveUserFromGroupMutation>;
export type RemoveUserFromGroupMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>;
export const ReportOptionsDocument = gql`
    query ReportOptions($type: String) {
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
export function useReportOptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReportOptionsQuery, ReportOptionsQueryVariables>) {
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
export const ResendOtpDocument = gql`
    mutation ResendOTP($input: String, $password: String) {
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
export const SearchDocument = gql`
    query Search($keyword: String, $type: String) {
  search(keyword: $keyword, type: $type) {
    users {
      id
      firstName
      lastName
      username
      email
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
      sessions {
        id
        sessionId
        clientOS
        clientType
        clientName
        deviceLocation
        country
        creationDate
      }
      posts {
        id
        postId
        authorId
        isReplyTo
        type
        content
        createdAt
        isEdited
        updatedAt
        media {
          id
          type
          src
          alt
          createdAt
        }
        mentions
        hashtags
        views
        topicsIds
        lang
      }
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    posts {
      id
      postId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      author {
        id
        username
        email
        firstName
        lastName
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
        exploreSettings {
          useLocation
          personalizedTrends
        }
        searchSettings {
          hideSensitiveContent
          hideBlockedAccounts
        }
        topicsIds
      }
      media {
        id
        type
        src
        alt
        createdAt
      }
      mentions
      hashtags
      views
      topicsIds
      lang
    }
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
 *   },
 * });
 */
export function useSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
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
export const SendMessageDocument = gql`
    mutation SendMessage($type: String!, $content: String!, $media: String!, $chatId: String!) {
  sendMessage(type: $type, content: $content, media: $media, chatId: $chatId) {
    id
    messageId
    authorId
    type
    content
    createdAt
    isEdited
    updatedAt
    mentions
    hashtags
    status
    chat {
      id
      chatId
      creatorId
      type
      chatImage
      chatTitle
      createdAt
      updatedAt
      messagesCount
    }
    media {
      type
      src
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      type: // value for 'type'
 *      content: // value for 'content'
 *      media: // value for 'media'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const SendRecoveryEmailDocument = gql`
    mutation SendRecoveryEmail($email: String!) {
  sendRecoveryEmail(email: $email) {
    status
    errors {
      field
      message
    }
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
    mutation Signup($birthDate: DateTimeISO!, $gender: String!, $password: String!, $lastName: String!, $firstName: String!, $username: String!, $email: String!) {
  signup(
    birthDate: $birthDate
    gender: $gender
    password: $password
    lastName: $lastName
    firstName: $firstName
    username: $username
    email: $email
  ) {
    errors {
      field
      message
    }
    status
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
 *      birthDate: // value for 'birthDate'
 *      gender: // value for 'gender'
 *      password: // value for 'password'
 *      lastName: // value for 'lastName'
 *      firstName: // value for 'firstName'
 *      username: // value for 'username'
 *      email: // value for 'email'
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
export const TopicsDocument = gql`
    query Topics {
  topics {
    id
    name
    createdAt
  }
}
    `;

/**
 * __useTopicsQuery__
 *
 * To run a query within a React component, call `useTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopicsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options);
      }
export function useTopicsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options);
        }
export function useTopicsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options);
        }
export type TopicsQueryHookResult = ReturnType<typeof useTopicsQuery>;
export type TopicsLazyQueryHookResult = ReturnType<typeof useTopicsLazyQuery>;
export type TopicsSuspenseQueryHookResult = ReturnType<typeof useTopicsSuspenseQuery>;
export type TopicsQueryResult = Apollo.QueryResult<TopicsQuery, TopicsQueryVariables>;
export const TrendsDocument = gql`
    query Trends {
  trends {
    occurrences
    term
  }
}
    `;

/**
 * __useTrendsQuery__
 *
 * To run a query within a React component, call `useTrendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTrendsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TrendsQuery, TrendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<TrendsQuery, TrendsQueryVariables>(TrendsDocument, options);
      }
export function useTrendsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TrendsQuery, TrendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<TrendsQuery, TrendsQueryVariables>(TrendsDocument, options);
        }
export function useTrendsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<TrendsQuery, TrendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<TrendsQuery, TrendsQueryVariables>(TrendsDocument, options);
        }
export type TrendsQueryHookResult = ReturnType<typeof useTrendsQuery>;
export type TrendsLazyQueryHookResult = ReturnType<typeof useTrendsLazyQuery>;
export type TrendsSuspenseQueryHookResult = ReturnType<typeof useTrendsSuspenseQuery>;
export type TrendsQueryResult = Apollo.QueryResult<TrendsQuery, TrendsQueryVariables>;
export const UnblockUserDocument = gql`
    mutation UnblockUser($blockedId: Int!) {
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
export const UnseenMessageNotificationsDocument = gql`
    query UnseenMessageNotifications($chatId: String) {
  unseenMessageNotifications(chatId: $chatId) {
    id
    notificationId
    creatorId
    chatId
    itemId
    recipientId
    itemType
    content
    viewed
    createdAt
  }
}
    `;

/**
 * __useUnseenMessageNotificationsQuery__
 *
 * To run a query within a React component, call `useUnseenMessageNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnseenMessageNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnseenMessageNotificationsQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useUnseenMessageNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UnseenMessageNotificationsQuery, UnseenMessageNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UnseenMessageNotificationsQuery, UnseenMessageNotificationsQueryVariables>(UnseenMessageNotificationsDocument, options);
      }
export function useUnseenMessageNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UnseenMessageNotificationsQuery, UnseenMessageNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UnseenMessageNotificationsQuery, UnseenMessageNotificationsQueryVariables>(UnseenMessageNotificationsDocument, options);
        }
export function useUnseenMessageNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UnseenMessageNotificationsQuery, UnseenMessageNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UnseenMessageNotificationsQuery, UnseenMessageNotificationsQueryVariables>(UnseenMessageNotificationsDocument, options);
        }
export type UnseenMessageNotificationsQueryHookResult = ReturnType<typeof useUnseenMessageNotificationsQuery>;
export type UnseenMessageNotificationsLazyQueryHookResult = ReturnType<typeof useUnseenMessageNotificationsLazyQuery>;
export type UnseenMessageNotificationsSuspenseQueryHookResult = ReturnType<typeof useUnseenMessageNotificationsSuspenseQuery>;
export type UnseenMessageNotificationsQueryResult = Apollo.QueryResult<UnseenMessageNotificationsQuery, UnseenMessageNotificationsQueryVariables>;
export const UnseenNotificationsDocument = gql`
    query UnseenNotifications {
  unseenNotifications {
    id
    notificationId
    creatorId
    recipientId
    resourceId
    type
    content
    viewed
    createdAt
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
export const UpdateGenderDocument = gql`
    mutation UpdateGender($gender: String) {
  updateGender(gender: $gender) {
    status
    errors {
      field
      message
    }
  }
}
    `;
export type UpdateGenderMutationFn = Apollo.MutationFunction<UpdateGenderMutation, UpdateGenderMutationVariables>;

/**
 * __useUpdateGenderMutation__
 *
 * To run a mutation, you first call `useUpdateGenderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGenderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGenderMutation, { data, loading, error }] = useUpdateGenderMutation({
 *   variables: {
 *      gender: // value for 'gender'
 *   },
 * });
 */
export function useUpdateGenderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateGenderMutation, UpdateGenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateGenderMutation, UpdateGenderMutationVariables>(UpdateGenderDocument, options);
      }
export type UpdateGenderMutationHookResult = ReturnType<typeof useUpdateGenderMutation>;
export type UpdateGenderMutationResult = Apollo.MutationResult<UpdateGenderMutation>;
export type UpdateGenderMutationOptions = Apollo.BaseMutationOptions<UpdateGenderMutation, UpdateGenderMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: String!, $content: String!, $media: String!, $deletedMedia: String!, $existingAltTexts: String!) {
  updatePost(
    postId: $postId
    content: $content
    media: $media
    deletedMedia: $deletedMedia
    existingAltTexts: $existingAltTexts
  ) {
    post {
      id
      postId
      authorId
      isReplyTo
      type
      content
      createdAt
      isEdited
      updatedAt
      author {
        id
        username
        email
        firstName
        lastName
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
        exploreSettings {
          useLocation
          personalizedTrends
        }
        searchSettings {
          hideSensitiveContent
          hideBlockedAccounts
        }
        topicsIds
      }
      media {
        id
        type
        src
        alt
        createdAt
      }
      mentions
      hashtags
      views
      topicsIds
      lang
    }
    errors {
      field
      message
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      content: // value for 'content'
 *      media: // value for 'media'
 *      deletedMedia: // value for 'deletedMedia'
 *      existingAltTexts: // value for 'existingAltTexts'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UserCommentsDocument = gql`
    query UserComments($userId: Int) {
  userComments(userId: $userId) {
    id
    postId
    authorId
    isReplyTo
    type
    content
    createdAt
    isEdited
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
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
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    media {
      id
      type
      src
      alt
      createdAt
    }
    mentions
    hashtags
    views
    topicsIds
    lang
  }
}
    `;

/**
 * __useUserCommentsQuery__
 *
 * To run a query within a React component, call `useUserCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCommentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserCommentsQuery, UserCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserCommentsQuery, UserCommentsQueryVariables>(UserCommentsDocument, options);
      }
export function useUserCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserCommentsQuery, UserCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserCommentsQuery, UserCommentsQueryVariables>(UserCommentsDocument, options);
        }
export function useUserCommentsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UserCommentsQuery, UserCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UserCommentsQuery, UserCommentsQueryVariables>(UserCommentsDocument, options);
        }
export type UserCommentsQueryHookResult = ReturnType<typeof useUserCommentsQuery>;
export type UserCommentsLazyQueryHookResult = ReturnType<typeof useUserCommentsLazyQuery>;
export type UserCommentsSuspenseQueryHookResult = ReturnType<typeof useUserCommentsSuspenseQuery>;
export type UserCommentsQueryResult = Apollo.QueryResult<UserCommentsQuery, UserCommentsQueryVariables>;
export const UserPostFeedDocument = gql`
    query UserPostFeed($userId: Int) {
  userPostFeed(userId: $userId) {
    id
    postId
    authorId
    isReplyTo
    type
    content
    createdAt
    isEdited
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
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
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
    media {
      id
      type
      src
      alt
      createdAt
    }
    mentions
    hashtags
    views
    topicsIds
    lang
  }
}
    `;

/**
 * __useUserPostFeedQuery__
 *
 * To run a query within a React component, call `useUserPostFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPostFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPostFeedQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserPostFeedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserPostFeedQuery, UserPostFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserPostFeedQuery, UserPostFeedQueryVariables>(UserPostFeedDocument, options);
      }
export function useUserPostFeedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserPostFeedQuery, UserPostFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserPostFeedQuery, UserPostFeedQueryVariables>(UserPostFeedDocument, options);
        }
export function useUserPostFeedSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UserPostFeedQuery, UserPostFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UserPostFeedQuery, UserPostFeedQueryVariables>(UserPostFeedDocument, options);
        }
export type UserPostFeedQueryHookResult = ReturnType<typeof useUserPostFeedQuery>;
export type UserPostFeedLazyQueryHookResult = ReturnType<typeof useUserPostFeedLazyQuery>;
export type UserPostFeedSuspenseQueryHookResult = ReturnType<typeof useUserPostFeedSuspenseQuery>;
export type UserPostFeedQueryResult = Apollo.QueryResult<UserPostFeedQuery, UserPostFeedQueryVariables>;
export const UsersToMessageDocument = gql`
    query UsersToMessage {
  usersToMessage {
    id
    firstName
    lastName
    username
    email
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
    exploreSettings {
      useLocation
      personalizedTrends
    }
    searchSettings {
      hideSensitiveContent
      hideBlockedAccounts
    }
    topicsIds
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
 *   },
 * });
 */
export function useUsersToMessageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersToMessageQuery, UsersToMessageQueryVariables>) {
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
export const VerifyEmailAddressDocument = gql`
    mutation VerifyEmailAddress($token: String!) {
  verifyEmailAddress(token: $token) {
    status
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
    accessToken
    status
    user {
      id
      firstName
      lastName
      username
      email
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
      sessions {
        id
        sessionId
        clientOS
        clientType
        clientName
        deviceLocation
        country
        creationDate
      }
      posts {
        id
        postId
        authorId
        isReplyTo
        type
        content
        createdAt
        isEdited
        updatedAt
        media {
          id
          type
          src
          alt
          createdAt
        }
        mentions
        hashtags
        views
        topicsIds
        lang
      }
      exploreSettings {
        useLocation
        personalizedTrends
      }
      searchSettings {
        hideSensitiveContent
        hideBlockedAccounts
      }
      topicsIds
    }
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
export function useVerifyOtpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const ViewMessageDocument = gql`
    mutation ViewMessage($messageId: String) {
  viewMessage(messageId: $messageId) {
    id
    messageId
    authorId
    type
    content
    createdAt
    isEdited
    updatedAt
    mentions
    hashtags
    status
    chat {
      id
      chatId
      creatorId
      type
      chatImage
      chatTitle
      createdAt
      updatedAt
      messagesCount
    }
    media {
      type
      src
    }
  }
}
    `;
export type ViewMessageMutationFn = Apollo.MutationFunction<ViewMessageMutation, ViewMessageMutationVariables>;

/**
 * __useViewMessageMutation__
 *
 * To run a mutation, you first call `useViewMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewMessageMutation, { data, loading, error }] = useViewMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useViewMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ViewMessageMutation, ViewMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ViewMessageMutation, ViewMessageMutationVariables>(ViewMessageDocument, options);
      }
export type ViewMessageMutationHookResult = ReturnType<typeof useViewMessageMutation>;
export type ViewMessageMutationResult = Apollo.MutationResult<ViewMessageMutation>;
export type ViewMessageMutationOptions = Apollo.BaseMutationOptions<ViewMessageMutation, ViewMessageMutationVariables>;
export const ViewMessageNotificationsDocument = gql`
    mutation ViewMessageNotifications($chatId: String) {
  viewMessageNotifications(chatId: $chatId)
}
    `;
export type ViewMessageNotificationsMutationFn = Apollo.MutationFunction<ViewMessageNotificationsMutation, ViewMessageNotificationsMutationVariables>;

/**
 * __useViewMessageNotificationsMutation__
 *
 * To run a mutation, you first call `useViewMessageNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewMessageNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewMessageNotificationsMutation, { data, loading, error }] = useViewMessageNotificationsMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useViewMessageNotificationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ViewMessageNotificationsMutation, ViewMessageNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ViewMessageNotificationsMutation, ViewMessageNotificationsMutationVariables>(ViewMessageNotificationsDocument, options);
      }
export type ViewMessageNotificationsMutationHookResult = ReturnType<typeof useViewMessageNotificationsMutation>;
export type ViewMessageNotificationsMutationResult = Apollo.MutationResult<ViewMessageNotificationsMutation>;
export type ViewMessageNotificationsMutationOptions = Apollo.BaseMutationOptions<ViewMessageNotificationsMutation, ViewMessageNotificationsMutationVariables>;
export const ViewNotificationDocument = gql`
    mutation ViewNotification($notificationId: String) {
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
export const ViewNotificationsDocument = gql`
    mutation ViewNotifications {
  viewNotifications
}
    `;
export type ViewNotificationsMutationFn = Apollo.MutationFunction<ViewNotificationsMutation, ViewNotificationsMutationVariables>;

/**
 * __useViewNotificationsMutation__
 *
 * To run a mutation, you first call `useViewNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewNotificationsMutation, { data, loading, error }] = useViewNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useViewNotificationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ViewNotificationsMutation, ViewNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ViewNotificationsMutation, ViewNotificationsMutationVariables>(ViewNotificationsDocument, options);
      }
export type ViewNotificationsMutationHookResult = ReturnType<typeof useViewNotificationsMutation>;
export type ViewNotificationsMutationResult = Apollo.MutationResult<ViewNotificationsMutation>;
export type ViewNotificationsMutationOptions = Apollo.BaseMutationOptions<ViewNotificationsMutation, ViewNotificationsMutationVariables>;