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
  birthOrCreationDate: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  documents: Array<Scalars['JSONObject']['output']>;
  entityIdentifier: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  matchStatus: MatchStatus;
  outcome?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
  verified: VerificationStatus;
  verifiedSince?: Maybe<Scalars['String']['output']>;
};

export type IdentityVerificationResponse = {
  __typename?: 'IdentityVerificationResponse';
  errors?: Maybe<Array<FieldError>>;
  identityVerification?: Maybe<UserVerification>;
  ok: Scalars['Boolean']['output'];
  status?: Maybe<Scalars['String']['output']>;
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

/** Possible documents and form data match status */
export enum MatchStatus {
  Green = 'GREEN',
  Red = 'RED',
  Yellow = 'YELLOW'
}

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
  requestIdentityVerification: IdentityVerificationResponse;
  requestVerification: UserVerificationResponse;
  resendOTP: Scalars['Boolean']['output'];
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
  deleteMedia?: InputMaybe<Scalars['Boolean']['input']>;
  media?: InputMaybe<Scalars['String']['input']>;
  messageId: Scalars['String']['input'];
};


export type MutationEditPostArgs = {
  content: Scalars['String']['input'];
  deletedMedia: Scalars['String']['input'];
  existingAltTexts: Scalars['String']['input'];
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
  hashtags: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isEdited: Scalars['Boolean']['output'];
  isReplyToId?: Maybe<Scalars['Int']['output']>;
  isReplyToType: Scalars['String']['output'];
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
  affiliates?: Maybe<Array<User>>;
  allUnseenMessageNotifications?: Maybe<Array<MessageNotification>>;
  blockedUsers?: Maybe<Array<User>>;
  chatUsers?: Maybe<Array<User>>;
  chats?: Maybe<Array<Chat>>;
  currentSession?: Maybe<Session>;
  findAffiliationByUserId?: Maybe<Affiliation>;
  findAffiliationRequest?: Maybe<Affiliation>;
  findChat?: Maybe<Chat>;
  findIdentityVerificationRequest?: Maybe<IdentityVerification>;
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
  findVerificationRequest?: Maybe<UserVerification>;
  getBookmarks?: Maybe<Array<Post>>;
  getFollowers?: Maybe<Array<User>>;
  getFollowing?: Maybe<Array<User>>;
  getLikedPosts?: Maybe<Array<Post>>;
  getPostLikes?: Maybe<Array<User>>;
  hasUserBlockedMe: Scalars['Boolean']['output'];
  isAffiliatedTo?: Maybe<User>;
  isBookmarked: Scalars['Boolean']['output'];
  isFollowedByMe: Scalars['Boolean']['output'];
  isPostLikedByMe: Scalars['Boolean']['output'];
  isUserBlockedByMe: Scalars['Boolean']['output'];
  isUserFollowingMe: Scalars['Boolean']['output'];
  landingUsers: Array<LandingUser>;
  latestMessageOrEvent?: Maybe<MessageOrEvent>;
  me?: Maybe<User>;
  messagesAndEvents?: Maybe<Array<MessageOrEvent>>;
  notificationFeed: PaginatedNotifications;
  otherSessions?: Maybe<Array<Session>>;
  postComments?: Maybe<Array<Post>>;
  postFeed?: Maybe<Array<Post>>;
  postMedia?: Maybe<Array<MediaItem>>;
  reportOptions?: Maybe<Array<ReportOption>>;
  search: SearchResult;
  topics?: Maybe<Array<Topic>>;
  unseenMessageNotifications?: Maybe<Array<MessageNotification>>;
  unseenNotifications: Array<Notification>;
  userComments?: Maybe<Array<Post>>;
  userPostFeed?: Maybe<Array<Post>>;
  usersToMessage?: Maybe<Array<User>>;
};


export type QueryAffiliatesArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBlockedUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryFindIdentityVerificationRequestArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
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


export type QueryFindVerificationRequestArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};


export type QueryGetBookmarksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  itemId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
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
};


export type QueryNotificationFeedArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostCommentsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};


export type QueryPostFeedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserPostFeedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersToMessageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  userId: Scalars['Int']['input'];
};


export type SubscriptionDeletedPostArgs = {
  postId?: InputMaybe<Scalars['Int']['input']>;
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


export type SubscriptionNewPostArgs = {
  postId?: InputMaybe<Scalars['Int']['input']>;
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

export type UserVerification = {
  __typename?: 'UserVerification';
  createdAt: Scalars['String']['output'];
  documents: Array<Scalars['JSONObject']['output']>;
  id: Scalars['Int']['output'];
  outcome?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
  verified: VerificationStatus;
  verifiedSince?: Maybe<Scalars['String']['output']>;
};

export type UserVerificationResponse = {
  __typename?: 'UserVerificationResponse';
  ok: Scalars['Boolean']['output'];
  status?: Maybe<Scalars['String']['output']>;
  userVerification?: Maybe<UserVerification>;
};

/** Possible verification request status values */
export enum VerificationStatus {
  Failed = 'FAILED',
  UnderReview = 'UNDER_REVIEW',
  Verified = 'VERIFIED'
}

export type FindUserBeforeLogInMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type FindUserBeforeLogInMutation = { __typename?: 'Mutation', findUserBeforeLogIn: { __typename?: 'UserResponse', status?: string | null, ok: boolean, user?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  input: Scalars['String']['input'];
  password: Scalars['String']['input'];
  clientOS: Scalars['String']['input'];
  clientType: Scalars['String']['input'];
  clientName: Scalars['String']['input'];
  deviceLocation: Scalars['String']['input'];
  country: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', accessToken?: string | null, status?: string | null, ok: boolean, user?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null };

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


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOTP: { __typename?: 'UserResponse', status?: string | null, accessToken?: string | null, ok: boolean, user?: { __typename?: 'User', id: number, name: string, username: string, email: string, type: string, gender: string, emailVerified: boolean, createdAt: string, updatedAt: string, birthDate: { __typename?: 'BirthDate', date: string, monthAndDayVisibility: string, yearVisibility: string }, profile: { __typename?: 'Profile', profilePicture: string, profileBanner: string, bio: string, website: string }, userSettings: { __typename?: 'Settings', incomingMessages: string, twoFactorAuth: boolean }, searchSettings: { __typename?: 'SearchSettings', hideSensitiveContent: boolean, hideBlockedAccounts: boolean } } | null } };


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