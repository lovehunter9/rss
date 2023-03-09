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
  CreateNewFeed = 9,
  Innovation = 10
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
      break
    case MenuType.CreateNewFeed:
      menuTypeName = 'Create New Feed';
      break
    case MenuType.Innovation:
      menuTypeName = 'Innovation';
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
  content: string;
  author: string;
  share_code: string;
  starred: boolean;
  reading_time: number;
  enclosures: Enclosure[];
  feed: Feed;
}

export interface EntryContent {
  content: string;
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
interface SubscriptionDiscoveryRequest {
  url: string;
  user_agent: string;
  cookie: string;
  username: string;
  password: string;
  fetch_via_proxy: boolean;
  allow_self_signed_certificates: boolean;
}

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
interface FeedModificationRequest {
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
  status?: EntryQueryDirection;
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

export interface EntriesQueryResponse {
  entries: Entry[];
  total: number;
}
