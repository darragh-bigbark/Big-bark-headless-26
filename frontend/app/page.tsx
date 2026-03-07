import Link from 'next/link';
import { getPosts, getEpisodes, getTeamMembers } from '@/lib/queries';
import BlogCard from '@/components/BlogCard';
import PodcastCard from '@/components/PodcastCard';
import TeamCard from '@/components/TeamCard';

export const revalidate = 60;

export default async function HomePage() {
  const [{ posts }, episodes, teamMembers] = await Promise.all([
    getPosts(3),
    getEpisodes(3),
    getTeamMembers(),
  ]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bigbark-blue text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">
            Ireland &amp; UK&apos;s #1 Canine Podcast
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            The Big Bark
          </h1>
          <p className="text-white/75 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10">
            Dog news, reviews, and professional interviews. Everything for dog
            lovers in Ireland, the UK, and beyond.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/listen-now"
              className="bg-white text-bigbark-blue font-bold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors text-lg shadow-lg"
            >
              Listen Now
            </Link>
            <Link
              href="/subscribe"
              className="border-2 border-white/60 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/10 hover:border-white transition-colors text-lg"
            >
              Subscribe
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-white/50">
            <span>Available on</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Spotify</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">
              Apple Podcasts
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full">
              Google Podcasts
            </span>
          </div>
        </div>
        {/* Wave */}
        <div className="overflow-hidden -mb-px">
          <svg
            viewBox="0 0 1440 48"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full fill-gray-50"
          >
            <path d="M0,48 C240,0 480,0 720,24 C960,48 1200,48 1440,24 L1440,48 L0,48 Z" />
          </svg>
        </div>
      </section>

      {/* ── Latest Episodes ── */}
      {episodes.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Latest Episodes
                </h2>
                <p className="text-gray-500 mt-1">Fresh from the studio</p>
              </div>
              <Link
                href="/listen-now"
                className="text-bigbark-blue font-semibold hover:underline hidden sm:block text-sm"
              >
                All episodes &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes.map((episode) => (
                <PodcastCard key={episode.id} episode={episode} />
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link
                href="/listen-now"
                className="text-bigbark-blue font-semibold hover:underline text-sm"
              >
                All episodes &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Latest News ── */}
      {posts.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Latest News
                </h2>
                <p className="text-gray-500 mt-1">
                  Dog news from Ireland and beyond
                </p>
              </div>
              <Link
                href="/blog"
                className="text-bigbark-blue font-semibold hover:underline hidden sm:block text-sm"
              >
                All news &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link
                href="/blog"
                className="text-bigbark-blue font-semibold hover:underline text-sm"
              >
                All news &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Team ── */}
      {teamMembers.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Meet the Team
              </h2>
              <p className="text-gray-500 mt-2">
                The paws and people behind the podcast
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.slice(0, 4).map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
            {teamMembers.length > 4 && (
              <div className="mt-8 text-center">
                <Link
                  href="/team"
                  className="inline-block bg-bigbark-blue text-white font-semibold px-7 py-3 rounded-full hover:bg-bigbark-blue-light transition-colors"
                >
                  Meet the full team
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Newsletter CTA ── */}
      <section className="bg-bigbark-blue text-white py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Stay in the loop
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Get the latest episodes, dog news, and exclusive content delivered
            to your inbox.
          </p>
          <Link
            href="/subscribe"
            className="inline-block bg-white text-bigbark-blue font-bold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors text-lg shadow-lg"
          >
            Subscribe to Newsletter
          </Link>
          <p className="mt-4 text-white/40 text-sm">No spam. Unsubscribe any time.</p>
        </div>
      </section>
    </>
  );
}
