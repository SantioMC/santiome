interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export async function strapi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.VITE_STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const res = await fetch(url.toString());
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}

export const strapiImage = (image: Image): string => {
  return `${import.meta.env.VITE_STRAPI_URL}${image.url}`;
}

export interface Paginated<T> {
  data: {[key: number]: T};
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

export interface Post {
  id: number;
  documentId: string;
  title: string;
  image: Image | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  short_description: string | null;
  body: string;
  slug: string;

  author: Author | undefined;
  tags: {[key: number]: Tag} | undefined;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Tag {
  id: number;
  documentId: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Project {
  id: number;
  documentId: string;
  name: string;
  description: string;
  website: string | null;
  source_code: string | null;
  image: Image | null;
  tags: {[key: number]: Tag};
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    }
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}