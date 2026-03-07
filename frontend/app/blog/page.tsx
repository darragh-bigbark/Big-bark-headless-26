import type { Metadata } from 'next';
import { getPosts } from '@/lib/queries';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Latest News',
  description:
    'Dog news, welfare updates, and stories from the canine world in Ireland and beyond.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const { posts } = await getPosts(24);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-bigbark-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Latest News
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Dog news, welfare updates, and stories from the canine world.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-20">
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
