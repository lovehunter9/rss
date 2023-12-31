export enum MenuType {
  Empty = 0,
  Category = 1,
  Feed = 2,
  Search = 3,
  Discover = 4,
  Unread = 5,
  Today = 6,
  ReadLater = 7,
  CreateNewFolder = 8,
  CreateNewBoard = 9,
  Board = 10,
  Trend = 11
}

export enum DeleteType{
  FEED = 0,
  FOLDER = 1,
  BOARD= 2,
  BLACKLIST = 4
}

export const menuTypeName = (menuType: MenuType) => {
  let menuTypeName = '';
  switch (menuType) {
    case MenuType.Discover:
      menuTypeName = 'Discover';
      break;
    case MenuType.Today:
      menuTypeName = 'Today';
      break;
    case MenuType.Unread:
      menuTypeName = 'Unread';
      break;
    case MenuType.ReadLater:
      menuTypeName = 'Read Later';
      break;
    case MenuType.CreateNewFolder:
      menuTypeName = 'Create New Folder';
      break;
    case MenuType.CreateNewBoard:
      menuTypeName = 'Create New Board';
      break
    case MenuType.Trend:
      menuTypeName = 'Trend';
      break
    default:
      break;
  }
  return menuTypeName;
};

export class MenuChoice {
  type: MenuType = MenuType.Empty;
  value?: number = 0;
}

// Icon represents a website icon (favicon)
// type Icon struct {
// 	ID       int64  `json:"id"`
// 	Hash     string `json:"hash"`
// 	MimeType string `json:"mime_type"`
// 	Content  []byte `json:"content"`
// }
export interface Icon {
  id: number;
  hash: string;
  mime_type: string;
  content: string;
}


// Category represents a feed category.
// type Board struct {
//   ID          int64  `json:"id"`
//   UserID      int64  `json:"user_id"`
//   Title       string `json:"title"`
//   Description string `json:"description"`
// }

export interface Board{
  id : number;
  user_id : number;
  title : string;
  description : string;
}


// CategoryRequest represents the request to create or update a category.
// type BoardRequest struct {
//   Title       string `json:"title"`
//   Description string `json:"description"`
// }

export interface BoardRequest{
  title : string;
  description : string;
}

// type EntryToBoardRequest struct {
//   EntryID int64 `json:"entry_id"`
//   BoardID int64 `json:"board_id"`
// }

export interface EntryToBoardRequest{
  entry_id : number;
  board_id : number;
}

// FeedIcon is a junction table between feeds and icons.
// type FeedIcon struct {
// 	FeedID int64 `json:"feed_id"`
// 	IconID int64 `json:"icon_id"`
// }
export interface FeedIcon {
  feed_id: number;
  icon_id: number;
}

// type feedIconResponse struct {
// 	ID       int64  `json:"id"`
// 	MimeType string `json:"mime_type"`
// 	Data     string `json:"data"`
// }
export interface FeedIconResponse {
  id: number;
  mime_type: string;
  data: string;
}

// type Category struct {
// 	ID           int64  `json:"id"`
// 	Title        string `json:"title"`
// 	UserID       int64  `json:"user_id"`
// 	HideGlobally bool   `json:"hide_globally"`
// 	FeedCount    int    `json:"-"`
// 	TotalUnread  int    `json:"-"`
// }
export interface Category {
  id: number;
  title: string;
  user_id: number;
  hide_globally: boolean;
  feeds: Feed[];
  // feed_count: number;
  // total_unread: number;
}

// CategoryRequest represents the request to create or update a category.
// type CategoryRequest struct {
// 	Title        string `json:"title"`
// 	HideGlobally string `json:"hide_globally"`
// }
export interface CategoryRequest {
  title: string;
  hide_globally?: boolean;
}

// Enclosure represents an attachment.
// type Enclosure struct {
// 	ID       int64  `json:"id"`
// 	UserID   int64  `json:"user_id"`
// 	EntryID  int64  `json:"entry_id"`
// 	URL      string `json:"url"`
// 	MimeType string `json:"mime_type"`
// 	Size     int64  `json:"size"`
// }
export interface Enclosure {
  id: number;
  user_id: number;
  entry_id: number;
  url: string;
  mime_type: string;
  size: number;
}

// Entry represents a feed item in the system.
// type Entry struct {
// 	ID          int64         `json:"id"`
// 	UserID      int64         `json:"user_id"`
// 	FeedID      int64         `json:"feed_id"`
// 	Status      string        `json:"status"`
// 	Hash        string        `json:"hash"`
// 	Title       string        `json:"title"`
// 	URL         string        `json:"url"`
//  ReadLater   string        `json:"readlater_tag"`
// 	CommentsURL string        `json:"comments_url"`
// 	Date        time.Time     `json:"published_at"`
// 	CreatedAt   time.Time     `json:"created_at"`
// 	ChangedAt   time.Time     `json:"changed_at"`
// 	Content     string        `json:"content"`
// 	Author      string        `json:"author"`
// 	ShareCode   string        `json:"share_code"`
// 	Starred     bool          `json:"starred"`
// 	ReadingTime int           `json:"reading_time"`
// 	Enclosures  EnclosureList `json:"enclosures"`
// 	Feed        *Feed         `json:"feed,omitempty"`
// }
export interface Entry {
  id: number;
  user_id: number;
  feed_id: number;
  status: string;
  hash: string;
  title: string;
  url: string;
  comments_url: string;
  published_at: string;
  created_at: string;
  changed_at: string;
  readlater_tag : boolean;
  content: string;
  author: string;
  share_code: string;
  starred: boolean;
  reading_time: number;
  enclosures: Enclosure[];
  feed: Feed;
  board_ids: string;
  image_url: string;
}

export interface EntryContent {
  content: string;

  enclosures: {
    url: string,
    mime_type: string,

  }[]
}

export enum EntryStatus {
  Unread = 'unread',
  Read = 'read',
  Removed = 'removed',
}

// EntriesStatusUpdateRequest represents a request to change entries status.
// type EntriesStatusUpdateRequest struct {
// 	EntryIDs []int64 `json:"entry_ids"`
// 	Status   string  `json:"status"`
// }
export interface EntriesStatusUpdateRequest {
  entry_ids: number[];
  status: EntryStatus;
}

// Feed represents a feed in the application.
// interface Feed {
// 	ID                          int64     `json:"id"`
// 	UserID                      int64     `json:"user_id"`
// 	FeedURL                     string    `json:"feed_url"`
// 	SiteURL                     string    `json:"site_url"`
// 	Title                       string    `json:"title"`
// 	CheckedAt                   time.Time `json:"checked_at"`
// 	NextCheckAt                 time.Time `json:"next_check_at"`
// 	EtagHeader                  string    `json:"etag_header"`
// 	LastModifiedHeader          string    `json:"last_modified_header"`
// 	ParsingErrorMsg             string    `json:"parsing_error_message"`
// 	ParsingErrorCount           int       `json:"parsing_error_count"`
// 	ScraperRules                string    `json:"scraper_rules"`
// 	RewriteRules                string    `json:"rewrite_rules"`
// 	Crawler                     bool      `json:"crawler"`
// 	BlocklistRules              string    `json:"blocklist_rules"`
// 	KeeplistRules               string    `json:"keeplist_rules"`
// 	UrlRewriteRules             string    `json:"urlrewrite_rules"`
// 	UserAgent                   string    `json:"user_agent"`
// 	Cookie                      string    `json:"cookie"`
// 	Username                    string    `json:"username"`
// 	Password                    string    `json:"password"`
// 	Disabled                    bool      `json:"disabled"`
// 	IgnoreHTTPCache             bool      `json:"ignore_http_cache"`
// 	AllowSelfSignedCertificates bool      `json:"allow_self_signed_certificates"`
// 	FetchViaProxy               bool      `json:"fetch_via_proxy"`
// 	Category                    *Category `json:"category,omitempty"`
// 	Entries                     Entries   `json:"entries,omitempty"`
// 	Icon                        *FeedIcon `json:"icon"`
// 	HideGlobally                bool      `json:"hide_globally"`
// 	UnreadCount                 int       `json:"-"`
// 	ReadCount                   int       `json:"-"`
//  UpdateTime                  time.Time `json:"update_time"`
// }
export interface Feed {
  id: number;
  user_id: number;
  feed_url: string;
  site_url: string;
  title: string;
  checked_at: string;
  next_check_at: string;
  etag_header: string;
  last_modified_header: string;
  parsing_error_message: string;
  parsing_error_count: number;
  scraper_rules: string;
  rewrite_rules: string;
  crawler: boolean;
  blocklist_rules: string;
  keeplist_rules: string;
  urlrewrite_rules: string;
  user_agent: string;
  cookie: string;
  username: string;
  password: string;
  disabled: boolean;
  ignore_http_cache: boolean;
  allow_self_signed_certificates: boolean;
  fetch_via_proxy: boolean;
  category: Category;
  entries: Entry[];
  icon: FeedIcon;
  hide_globally: boolean;
  unread?: number;
  update_time : string;
  // unread_count: number;
  // read_count: number;
}

// type FeedCounters struct {
// 	ReadCounters   map[int64]int `json:"reads"`
// 	UnreadCounters map[int64]int `json:"unreads"`
// }
export interface FeedCounters {
  reads: Record<string, number>;
  unreads: Record<string, number>;
}

// SubscriptionDiscoveryRequest represents a request to discover subscriptions.
// type SubscriptionDiscoveryRequest struct {
// 	URL                         string `json:"url"`
// 	UserAgent                   string `json:"user_agent"`
// 	Cookie                      string `json:"cookie"`
// 	Username                    string `json:"username"`
// 	Password                    string `json:"password"`
// 	FetchViaProxy               bool   `json:"fetch_via_proxy"`
// 	AllowSelfSignedCertificates bool   `json:"allow_self_signed_certificates"`
// }
// interface SubscriptionDiscoveryRequest {
//   url: string;
//   user_agent: string;
//   cookie: string;
//   username: string;
//   password: string;
//   fetch_via_proxy: boolean;
//   allow_self_signed_certificates: boolean;
// }

// FeedCreationRequest represents the request to create a feed.
// type FeedCreationRequest struct {
// 	FeedURL                     string `json:"feed_url"`
// 	CategoryID                  int64  `json:"category_id"`
// 	UserAgent                   string `json:"user_agent"`
// 	Cookie                      string `json:"cookie"`
// 	Username                    string `json:"username"`
// 	Password                    string `json:"password"`
// 	Crawler                     bool   `json:"crawler"`
// 	Disabled                    bool   `json:"disabled"`
// 	IgnoreHTTPCache             bool   `json:"ignore_http_cache"`
// 	AllowSelfSignedCertificates bool   `json:"allow_self_signed_certificates"`
// 	FetchViaProxy               bool   `json:"fetch_via_proxy"`
// 	ScraperRules                string `json:"scraper_rules"`
// 	RewriteRules                string `json:"rewrite_rules"`
// 	BlocklistRules              string `json:"blocklist_rules"`
// 	KeeplistRules               string `json:"keeplist_rules"`
// 	HideGlobally                bool   `json:"hide_globally"`
// 	UrlRewriteRules             string `json:"urlrewrite_rules"`
// }
export interface FeedCreationRequest {
  feed_url: string;
  category_id: number;
  user_agent?: string;
  cookie?: string;
  username?: string;
  password?: string;
  crawler?: boolean;
  disabled?: boolean;
  ignore_http_cache?: boolean;
  allow_self_signed_certificates?: boolean;
  fetch_via_proxy?: boolean;
  scraper_rules?: string;
  rewrite_rules?: string;
  blocklist_rules?: string;
  keeplist_rules?: string;
  hide_globally?: boolean;
  urlrewrite_rules?: string;
}

// FeedModificationRequest represents the request to update a feed.
// type FeedModificationRequest struct {
// 	FeedURL                     *string `json:"feed_url"`
// 	SiteURL                     *string `json:"site_url"`
// 	Title                       *string `json:"title"`
// 	ScraperRules                *string `json:"scraper_rules"`
// 	RewriteRules                *string `json:"rewrite_rules"`
// 	BlocklistRules              *string `json:"blocklist_rules"`
// 	KeeplistRules               *string `json:"keeplist_rules"`
// 	UrlRewriteRules             *string `json:"urlrewrite_rules"`
// 	Crawler                     *bool   `json:"crawler"`
// 	UserAgent                   *string `json:"user_agent"`
// 	Cookie                      *string `json:"cookie"`
// 	Username                    *string `json:"username"`
// 	Password                    *string `json:"password"`
// 	CategoryID                  *int64  `json:"category_id"`
// 	Disabled                    *bool   `json:"disabled"`
// 	IgnoreHTTPCache             *bool   `json:"ignore_http_cache"`
// 	AllowSelfSignedCertificates *bool   `json:"allow_self_signed_certificates"`
// 	FetchViaProxy               *bool   `json:"fetch_via_proxy"`
// 	HideGlobally                *bool   `json:"hide_globally"`
// }
export interface FeedModificationRequest {
  feed_url: string;
  site_url: string;
  title: string;
  scraper_rules: string;
  rewrite_rules: string;
  blocklist_rules: string;
  keeplist_rules: string;
  urlrewrite_rules: string;
  crawler: boolean;
  user_agent: string;
  cookie: string;
  username: string;
  password: string;
  category_id: number;
  disabled: boolean;
  ignore_http_cache: boolean;
  allow_self_signed_certificates: boolean;
  fetch_via_proxy: boolean;
  hide_globally: boolean;
}

export class FeedModificationRequestImpl implements FeedModificationRequest{

  allow_self_signed_certificates: boolean;
  blocklist_rules: string;
  category_id: number;
  cookie: string;
  crawler: boolean;
  disabled: boolean;
  feed_url: string;
  fetch_via_proxy: boolean;
  hide_globally: boolean;
  ignore_http_cache: boolean;
  keeplist_rules: string;
  password: string;
  rewrite_rules: string;
  scraper_rules: string;
  site_url: string;
  title: string;
  urlrewrite_rules: string;
  user_agent: string;
  username: string;


  constructor(feed : Feed) {
    this.allow_self_signed_certificates = feed.allow_self_signed_certificates;
    this.blocklist_rules = feed.blocklist_rules;
    this.category_id = feed.category.id;
    this.cookie = feed.cookie;
    this.crawler = feed.crawler;
    this.disabled = feed.disabled;
    this.feed_url = feed.feed_url;
    this.fetch_via_proxy = feed.fetch_via_proxy;
    this.hide_globally = feed.hide_globally;
    this.ignore_http_cache = feed.ignore_http_cache;
    this.keeplist_rules = feed.keeplist_rules;
    this.password = feed.password;
    this.rewrite_rules = feed.rewrite_rules;
    this.scraper_rules = feed.scraper_rules;
    this.site_url = feed.site_url;
    this.title = feed.title;
    this.urlrewrite_rules = feed.urlrewrite_rules;
    this.user_agent = feed.user_agent;
    this.username = feed.username;
  }
}

//order : "id", "status", "changed_at", "published_at", "created_at", "category_title", "category_id", "title", "author", dafault = "published_at"
export enum EnteryQueryOrder {
  ID = 'id',
  Status = 'status',
  ChangeAt = 'change_at',
  PublishedAt = 'published_at',
  CategoryTitle = 'category_title',
  CategoryID = 'category_id',
  Title = 'title',
  Author = 'author',
}

//direction : "asc", "desc", default="desc"
export enum EntryQueryDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class EntriesQueryRequest {
  feed_id?: number;
  category_id?: number;
  direction?: string;
  order?: EnteryQueryOrder;
  status?: EntryStatus;
  limit = 10;
  offset = 0;

  constructor(props?: Partial<EntriesQueryRequest>) {
    props && Object.assign(this, props);
  }

  public build(): string {
    let url = '';
    if (this.feed_id) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `feed_id=${this.feed_id}`;
    }
    if (this.category_id) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `category_id=${this.category_id}`;
    }
    if (this.direction) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `direction=${this.direction}`;
    }
    if (this.order) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `order=${this.order}`;
    }
    if (this.status) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `status=${this.status}`;
    }
    if (this.limit) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `limit=${this.limit}`;
    }
    if (this.offset) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `offset=${this.offset}`;
    }
    return url;
  }
}

export class BoardEntriesQueryRequest {
  direction?: string;
  order?: EnteryQueryOrder;
  limit = 10;
  offset = 0;

  constructor(props?: Partial<BoardEntriesQueryRequest>) {
    props && Object.assign(this, props);
  }

  public build(): string {
    let url = '';
    if (this.direction) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `direction=${this.direction}`;
    }
    if (this.order) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `order=${this.order}`;
    }
    if (this.limit) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `limit=${this.limit}`;
    }
    console.log(url)
    if (this.offset) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `offset=${this.offset}`;
    }
    console.log(url)
    return url;
  }
}

export class SDKQueryRequest {

  path?: string

  constructor(props?: Partial<SDKQueryRequest>) {
    props && Object.assign(this, props);
  }

  public build(): string {
    let url = '';
    if (this.path) {
      if (url) {
        url += '&';
      } else {
        url += '?';
      }
      url += `path=${this.path}`;
    }

    return url;
  }
}

export interface EntriesQueryResponse {
  entries: Entry[];
  total: number;
}

export interface SDKSearchPathResponse {
  atomlink: string
  item: SDKSearchPathItem[]
  lastBuildDate: string
  link: string
  title: string
  ttl: number
  updated: string
  logo?: string
}

export interface SDKSearchPathItem {
  author: string
  description: string
  link: string
  pubDate: string
  title: string
}



// export interface RecommendListQueryResponse {
//   total: number
//   entries: Recommend[]
// }

export interface Recommend {
  batch: number
  entry_id: number
  title: string
  author: string
  published_at: string
  full_content : string
  url: string
  feed: {
    id: number
    feed_title: string
    feed_desc : string
    feed_url : string
    site_url: string
    icon_type?: string
    icon_byte_content?: string
    icon_content: string
    category_id: number
    category_title: string
  }
  score: number
  keyword : string
  rank: number
  image_url: string
}

export interface PageToBoard{
  url : string
  title: string
  board_id : number
}

// ID              int64   `json:"id"`
// Title           string  `json:"feed_title"`
// Desc            string  `json:"feed_desc"`
// FeedUrl         string  `json:"feed_url"`
// SiteUrl         string  `json:"site_url"`
// IconType        *string `json:"icon_type"`
// IconByteContent []byte  `json:"icon_byte_content"`
// IconContent     string  `json:"icon_content"`
// CategoryID      int64   `json:"category_id"`
// CategoryTitle   string  `json:"category_title"`
export interface RecommendFeed {
  id: number
  feed_title: string
  feed_desc: string
  feed_url: string
  site_url: string
  icon_type: string
  icon_byte_content: string
  icon_content: string
  category_id: number
  category_title: string
}


// type Blacklist struct {
//   +	ID              int64   `json:"id"`
//   +	FeedID          int64   `json:"feed_id"`
//   +	FeedUrl         string  `json:"feed_url"`
//   +	FeedTitle       string  `json:"feed_title"`
//   +	IconType        *string `json:"icon_type"`
//   +	IconByteContent []byte  `json:"icon_byte_content"`
//   +	IconContent     string  `json:"icon_content"`
//   +	EntryUrl        string  `json:"entry_url"`
//   +	EntryTitle      string  `json:"entry_title"`
//   +	FullContent     *string `json:"full_content"`
//   +	Status          int     `json:"status"`
// }

export interface Blacklist{
  id : number
  feed_id : number
  feed_url : string
  feed_title : string
  icon_type : string
  icon_byte_content : string
  icon_content : string
  entry_url : string
  entry_title : string
  full_content : string
  status : number
}

// type OptionSettingRequest struct {
//   Language   []string `json:"language"`
//   ShowResult bool     `json:"show_recommend_result"`
// }

export interface OptionSetting{
  language : string[]
  show_recommend_result : boolean
}

export interface RssContentQueryItem {
  name: string
  entry_id: number
  created: string
  feed_infos: {
    feed_id: number,
    feed_name: string,
    feed_icon: string
  }[]
  brders: {
    name: string
    id: number
  }[]
  docId: string
  snippet: string
}

export interface RssContentQuery {

  code: number
  message: string
  data: {
    code: number
    data: {
      count: number,
      offset: number,
      limit: number,
      items: RssContentQueryItem[]
    }
  }

}
