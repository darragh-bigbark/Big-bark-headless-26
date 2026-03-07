import { fetchGraphQL, Post, Episode, TeamMember, WPPage } from './wordpress';

// ── Posts ────────────────────────────────────────────────────────────────────

export async function getPosts(first = 10): Promise<{
  posts: Post[];
  hasNextPage: boolean;
  endCursor: string;
}> {
  try {
    const data = await fetchGraphQL<{
      posts: {
        pageInfo: { hasNextPage: boolean; endCursor: string };
        nodes: Post[];
      };
    }>(
      `query GetPosts($first: Int!) {
        posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
          pageInfo { hasNextPage endCursor }
          nodes {
            id databaseId title slug date excerpt
            featuredImage { node { sourceUrl altText } }
            categories { nodes { name slug } }
            author { node { name } }
          }
        }
      }`,
      { first },
      60
    );

    return {
      posts: data.posts.nodes,
      hasNextPage: data.posts.pageInfo.hasNextPage,
      endCursor: data.posts.pageInfo.endCursor,
    };
  } catch (err) {
    console.warn('[getPosts] WordPress API unavailable:', err);
    return { posts: [], hasNextPage: false, endCursor: '' };
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const data = await fetchGraphQL<{ post: Post | null }>(
      `query GetPost($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id databaseId title slug date content excerpt
          featuredImage { node { sourceUrl altText } }
          categories { nodes { name slug } }
          author { node { name } }
        }
      }`,
      { slug },
      3600
    );
    return data.post;
  } catch (err) {
    console.warn('[getPost] WordPress API unavailable:', err);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const data = await fetchGraphQL<{ posts: { nodes: { slug: string }[] } }>(
      `query GetAllPostSlugs {
        posts(first: 1000, where: { status: PUBLISH }) {
          nodes { slug }
        }
      }`,
      {},
      3600
    );
    return data.posts.nodes.map((p) => p.slug);
  } catch (err) {
    console.warn('[getAllPostSlugs] WordPress API unavailable:', err);
    return [];
  }
}

// ── Episodes ─────────────────────────────────────────────────────────────────

export async function getEpisodes(first = 12): Promise<Episode[]> {
  try {
    const data = await fetchGraphQL<{ episodes: { nodes: Episode[] } }>(
      `query GetEpisodes($first: Int!) {
        episodes(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
          nodes {
            id databaseId title slug date excerpt
            episodeNumber spotifyEmbedUrl duration
            featuredImage { node { sourceUrl altText } }
          }
        }
      }`,
      { first },
      3600
    );
    return data.episodes.nodes;
  } catch (err) {
    console.warn('[getEpisodes] WordPress API unavailable:', err);
    return [];
  }
}

// ── Team Members ─────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const data = await fetchGraphQL<{ teamMembers: { nodes: TeamMember[] } }>(
      `query GetTeamMembers {
        teamMembers(first: 20, where: { status: PUBLISH }) {
          nodes {
            id databaseId title slug content
            role isActive
            featuredImage { node { sourceUrl altText } }
          }
        }
      }`,
      {},
      3600
    );
    return data.teamMembers.nodes;
  } catch (err) {
    console.warn('[getTeamMembers] WordPress API unavailable:', err);
    return [];
  }
}

// ── Pages ─────────────────────────────────────────────────────────────────────

export async function getPage(slug: string): Promise<WPPage | null> {
  try {
    const data = await fetchGraphQL<{ page: WPPage | null }>(
      `query GetPage($slug: ID!) {
        page(id: $slug, idType: SLUG) {
          title
          content
        }
      }`,
      { slug },
      3600
    );
    return data.page;
  } catch (err) {
    console.warn('[getPage] WordPress API unavailable:', err);
    return null;
  }
}
