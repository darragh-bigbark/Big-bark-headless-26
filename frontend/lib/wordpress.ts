export type Post = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage: FeaturedImage | null;
  categories: { nodes: { name: string; slug: string }[] };
  author: { node: { name: string } };
};

export type Episode = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  episodeNumber: number | null;
  spotifyEmbedUrl: string | null;
  duration: string | null;
  featuredImage: FeaturedImage | null;
};

export type TeamMember = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  role: string | null;
  isActive: boolean;
  featuredImage: FeaturedImage | null;
};

export type WPPage = {
  title: string;
  content: string;
};

type FeaturedImage = {
  node: { sourceUrl: string; altText: string };
};

const WP_API_URL =
  process.env.WORDPRESS_API_URL ?? 'https://thebigbark.ie/graphql';

export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate = 3600
): Promise<T> {
  const res = await fetch(WP_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Unknown GraphQL error');
  }

  return json.data as T;
}
