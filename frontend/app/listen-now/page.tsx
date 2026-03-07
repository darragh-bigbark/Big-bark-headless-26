import type { Metadata } from 'next';
import { getEpisodes } from '@/lib/queries';
import PodcastCard from '@/components/PodcastCard';

export const metadata: Metadata = {
  title: 'Listen Now',
  description:
    "Browse all episodes of The Big Bark — Ireland's #1 canine podcast.",
};

export const revalidate = 3600;

export default async function ListenNowPage() {
  const episodes = await getEpisodes(50);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-bigbark-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Listen Now
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Every episode of Ireland&apos;s #1 canine podcast, available on
            Spotify and Apple Podcasts.
          </p>
        </div>
      </div>

      {/* Episodes grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {episodes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {episodes.map((episode) => (
              <PodcastCard key={episode.id} episode={episode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <svg
              className="w-16 h-16 mx-auto mb-4 opacity-30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            <p className="text-lg font-medium">No episodes yet</p>
            <p className="text-sm mt-1">Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
