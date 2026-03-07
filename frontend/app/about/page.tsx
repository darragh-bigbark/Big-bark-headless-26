import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'About Our Show',
  description:
    "Learn about The Big Bark — Ireland's number one canine podcast, hosted by Darragh Bourke.",
};

export const revalidate = 3600;

export default async function AboutPage() {
  const page = await getPage('about-our-show');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-bigbark-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {page?.title ?? 'About Our Show'}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Ireland &amp; UK&apos;s #1 canine podcast — dog news, reviews, and
            professional interviews.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {page ? (
          <div
            className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:text-gray-900 prose-a:text-bigbark-blue wp-content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              The Big Bark is Ireland and the UK&apos;s number one canine
              podcast, hosted by Darragh Bourke. Each episode explores dog
              welfare, training, health, and the stories that matter to dog
              lovers.
            </p>
            <p>
              From professional breeder interviews to rescue stories, we cover
              everything for the modern dog owner.
            </p>
            <div className="not-prose flex flex-wrap gap-4 mt-8">
              <Link
                href="/listen-now"
                className="inline-block bg-bigbark-blue text-white font-bold px-8 py-3 rounded-full hover:bg-bigbark-blue-light transition-colors"
              >
                Listen Now
              </Link>
              <Link
                href="/team"
                className="inline-block border-2 border-bigbark-blue text-bigbark-blue font-bold px-8 py-3 rounded-full hover:bg-bigbark-blue-muted transition-colors"
              >
                Meet the Team
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
