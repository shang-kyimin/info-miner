// PRIMARY INTERFACES

export interface WebSearchApiResponse {
  type: "search";
  discussions: Discussions;
  faq: FAQ;
  infobox: GraphInfobox;
  locations: Locations;
  mixed: MixedResponse;
  news: News;
  query: Query;
  videos: Videos;
  web: Search;
  summarizer: Summarizer;
};

export interface SummarizerSearchApiResponse {
  type: "summarizer";
  status: string;
  results: SummarizerResult[];
  title: string;
  summary: SummaryMessage[];
  enrichments: SummaryEnrichments;
  followups: string[];
  entities_infos: { [ key: string ]: SummaryEntityInfo };
};

export interface LocalPoiSearchApiResponse {
  type: "localpois";
  results: LocationResult[];
};

export interface LocalDescriptionsSearchApiResponse {
  type: "local_descriptions";
  results: LocationDescription[];
};


// ADDITIONAL SUPPORTING INTERFACES

interface Query {
  original: string;
  show_strict_warning: boolean;
  altered: string;
  safesearch: boolean;
  is_navigational: boolean;
  is_geolocal: boolean;
  local_decision: string;
  local_locations_idx: number;
  is_trending: boolean;
  is_news_breaking: boolean;
  ask_for_location: boolean;
  language: Language;
  spellcheck_off: boolean;
  country: string;
  bad_results: boolean;
  should_fallback: boolean;
  lat: string;
  long: string;
  postal_code: string;
  city: string;
  state: string;
  header_country: string;
  more_results_available: boolean;
  custom_location_label: string;
  reddit_cluster: string;
  summary_key: string;
}

interface Discussions {
  type: "search";
  results: DiscussionResult[];
  mutated_by_goggles: boolean;
};

interface FAQ {
  type: "faq";
  results: QA[];
};

interface Search {
  type: "search";
  results: SearchResult[];
  family_friendly: boolean;
};


interface DiscussionResult {
  type: "discussion";
  data: ForumData;
};

interface ForumData {
  forum_name: string;
  num_answers: number;
  score: string;
  title: string;
  question: string;
  top_comment: string;
}

interface QA {
  question: string;
  answer: string;
  title: string;
  url: string;
  meta_url: MetaUrl;
};

interface MetaUrl {
  scheme: string;
  netloc: string;
  hostname: string;
  favicon: string;
  path: string;
}

export interface SearchResult extends Result {
  type: "search_result";
  subtype: "generic";
  deep_results: DeepResult;
  schemas: [][];
  meta_url: MetaUrl;
  thumbnail: Thumbnail;
  age: string;
  language: string;
  location: LocationResult;
  video: VideoData;
  movie: MovieData;
  faq: FAQ;
  qa: QA;
  book: Book;
  rating: Rating;
  article: Article;
  product: Product | Review;
  product_cluster: Product[] | Review[];
  cluster_type: string;
  cluster: Result[];
  creative_work: CreativeWork;
  music_recording: MusicRecording;
  review: Review;
  software: Software;
  recipe: Recipe;
  organization: Organization;
  content_type: string;
  extra_snippets: string[];
};

export interface Result {
  title: string;
  url: string;
  is_source_local: boolean;
  is_source_both: boolean;
  description: string;
  page_age: string;
  page_fetched: string;
  profile: Profile;
  language: string;
  family_friendly: boolean;
};

interface AbstractGraphInfobox {
  type: "infobox";
  position: number;
  label: string;
  category: string;
  long_desc: string;
  thumbnail: Thumbnail;
  attributes: string[][];
  profiles: Profile[] | DataProvider[];
  website_url: string;
  ratings: Rating[];
  providers: DataProvider[];
  distance: Unit;
  images: Thumbnail[];
  movie: MovieData;
};

interface GenericInfobox {
  subtype: "generic";
  found_in_urls: string[];
};

interface QAInfobox {
  subtype: "code";
  data: QAPage;
  meta_url:MetaUrl;
};

interface InfoboxWithLocation {
  subtype: "location";
  is_location: boolean;
  coordinates: number[];
  zoom_level: number;
  location: LocationResult;
};

interface InfoboxPlace {
  subtype: "place";
  location: LocationResult;
};

interface GraphInfobox {
  type: "graph";
  results: GenericInfobox | QAInfobox | InfoboxPlace | InfoboxWithLocation;
};

interface QAPage {
  question: string;
  answer: Answer;
};

interface Answer {
  text: string;
  author: string;
  upvoteCount: number;
  downvoteCount: number;
};

interface Thumbnail {
  src: string;
  alt: string;
  height: number;
  width: number;
  bg_color: string;
  original: string;
  logo: boolean;
  duplicated: boolean;
  theme: string;
};

interface LocationWebResult {
  meta_url: MetaUrl;
};

interface LocationResult {
  type: "location_result";
  id: string;
  provider_url: string;
  coordinates: number[];
  zoom_level: number;
  thumbnail: Thumbnail;
  postal_address: PostalAddress;
  opening_hours: OpeningHours;
  contact: Contact;
  price_range: string;
  rating: Rating;
  distance: Unit;
  profiles: DataProvider[];
  reviews: Reviews;
  pictures: PictureResults;
  action: Action;
  serves_cuisine: string[];
  categories: string[];
  icon_category: string;
  results: LocationWebResult;
  timezone: string;
  timezone_offset: string;
};

interface LocationDescription {
  type: "local_description";
  id: string;
  description: string;
};

interface Locations {
  type: "locations";
  results: LocationResult[];
};

interface MixedResponse {
  type: "mixed";
  main: ResultReference[];
  top: ResultReference[];
  side: ResultReference[];
};

interface ResultReference {
  type: string;
  index: number;
  all: boolean;
};

interface Videos {
  type: "videos";
  results: VideoResult[];
  mutated_by_goggles: boolean;
};

interface News {
  type: "news";
  results: NewsResult[];
  mutated_by_goggles: boolean;
};

interface NewsResult {
  meta_url: MetaUrl;
  source: string;
  breaking: boolean;
  thumbnail: Thumbnail;
  age: string;
  extra_snippets: string[];
};

interface PictureResults {
  viewMoreUrl: string;
  results: Thumbnail[];
};

interface Action {
  type: string;
  url: string;
};

interface PostalAddress {
  type: "PostalAddress";
  country: string;
  postalCode: string;
  streetAddress: string;
  addressRegion: string;
  addressLocality: string;
  displayAddress: string;
};

interface OpeningHours {
  current_day: DayOpeningHours[];
  days: DayOpeningHours[][];
};

interface DayOpeningHours {
  abbr_name: string;
  full_name: string;
  opens: string;
  closes: string;
};

interface Contact {
  email: string;
  telephone: string;
};

interface DataProvider {
  type: "external";
  name: string;
  url: string;
  long_name: string;
  img: string;
};

interface Profile {
  name: string;
  long_name: string;
  url: string;
  img: string;
};

interface Unit {
  value: number;
  units: string;
};

interface MovieData {
  name: string;
  description: string;
  url: string;
  thumbnail: Thumbnail;
  release: string;
  directors: Person[];
  actors: Person[];
  rating: Rating;
  duration: string;
  genre: string[];
  query: string;
};

interface Thing {
  type: "thing";
  name: string;
  url: string;
  thumbnail: Thumbnail;
};

interface Person {
  type: "person";
};

interface Rating {
  ratingValue: number;
  bestRating: number;
  reviewCount: number;
  profile: Profile;
  is_tripadvisor: boolean;
};

interface Book {
  title: string;
  author: Person[];
  date: string;
  price: Price;
  pages: number;
  publisher: Person;
  rating: Rating;
};

interface Price {
  price: string;
  price_currency: string;
};

interface Article {
  author: Person[];
  date: string;
  publisher: Organization;
  thumbnail: Thumbnail;
  isAccessibleForFree: boolean;
};

interface ContactPoint {
  type: "contact_point";
  telephone: string;
  email: string;
};

interface Organization {
  type: "organization";
  contact_points: ContactPoint[];
};

interface HowTo {
  text: string;
  name: string;
  url: string;
  image: string[];
};

interface Recipe {
  title: string;
  description: string;
  thumbnail: Thumbnail;
  url: string;
  domain: string;
  favicon: string;
  time: string;
  prep_time: string;
  cook_time: string;
  ingredients: string;
  instructions: HowTo[];
  servings: number;
  calories: number;
  rating: Rating;
  recipeCategory: string;
  recipeCuisine: string;
  video: VideoData;
};

interface Product {
  type: "Product";
  name: string;
  price: string;
  thumbnail: Thumbnail;
  description: string;
  offers: Offer[];
  rating: Rating;
};

interface Offer {
  url: string;
  priceCurrency: string;
  price: string;
};

interface Review {
  type: "review";
  name: string;
  thumbnail: Thumbnail;
  description: string;
  rating: Rating;
};

interface Reviews {
  results: TripAdvisorReview[];
  viewMoreUrl: string;
  reviews_in_foreign_language: boolean;
};

interface TripAdvisorReview {
  title: string;
  description: string;
  date: string;
  rating: Rating;
  author: Person;
  review_url: string;
  language: string;
};

interface CreativeWork {
  name: string;
  thumbnail: Thumbnail;
  rating: Rating;
};

interface MusicRecording {
  name: string;
  thumbnail: Thumbnail;
  rating: Rating;
};

interface Software {
  name: string;
  author: string;
  version: string;
  codeRepository: string;
  homepage: string;
  datePublisher: string;
  is_npm: boolean;
  is_pypi: boolean;
  stars: number;
  forks: number;
  ProgrammingLanguage: string;
}

interface DeepResult {
  news: NewsResult[];
  buttons: ButtonResult[];
  social: KnowledgeGraphProfile[];
  videos: VideoResult[];
  images: Image[];
};

export interface VideoResult {
  type: "video_result";
  video: VideoData;
  meta_url: MetaUrl;
  thumbnail: Thumbnail;
  age: string;
};

interface VideoData {
  duraton: string;
  views: string;
  creator: string;
  publisher: string;
  thumbnail: Thumbnail;
};

interface ButtonResult {
  type: "button_result";
  title: string;
  url: string;
};

interface KnowledgeGraphEntity {
  title: string;
  description: string;
  url: URL;
  thumbnail: URL;
};

interface KnowledgeGraphProfile {
  url: URL;
  description: string;
};

interface URL {
  original: string;
  display: string;
  alternatives: string[];
  canonical: string;
  mobile: MobileUrlItem;
};

interface MobileUrlItem {
  original: string;
  amp: string;
  android: string;
  ios: string;
}

interface Image {
  thumbnail: Thumbnail;
  url: string;
  properties: ImageProperties;
};

interface Language {
  name: string;
}

interface ImageProperties {
  url: string;
  resized: string;
  height: number;
  width: number;
  format: string;
  content_size: string;
}

interface SummarizerResult {
  type: "summarizer_result";
  summary: string;
  answer: SummarizerAnswer;
  references: ReferenceSource[];
};

interface SummarizerAnswer {
  text: string;
  location: TextLocation;
};

interface TextLocation {
  start: string;
  end: string;
};

interface ReferenceSource {
  type: string;
  name: string;
  url: string;
  img: string;
  locations: TextLocation[];
};

interface SummaryMessage{
  type: string;
  data: SummaryEntity | string;
};

interface SummaryEntity {
  uuid: string;
  name: string;
  url: string;
  text: string;
  images: SummaryImage[];
  highlight: TextLocation[];
};

interface SummaryImage {
  text: string;
};

interface SummaryEnrichments {
  raw: string;
  images: SummaryImage[];
  qa: SummaryAnswer[];
  entities: SummaryEntity[];
  context: SummaryContext[];
};

interface SummaryAnswer {
  answer: string;
  score: number;
  highlight: TextLocation;
};

interface SummaryContext {
  title: string;
  url: string;
  meta_url: MetaUrl;
};

interface SummaryEntityInfo {
  provider: string;
  description: string;
};

interface Summarizer {
  type: "summarizer";
  key: string;
};


