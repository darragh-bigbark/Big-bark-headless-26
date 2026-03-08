import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getEpisodes, getTeamMembers } from '@/lib/queries';
import BlogCard from '@/components/BlogCard';
import PodcastCard from '@/components/PodcastCard';
import TeamCard from '@/components/TeamCard';

const SPOTIFY_SHOW_ID = '1q1moteO1FTB0B6pzSQnG7';

export const revalidate = 60;

export default async function HomePage() {
  const [{ posts }, episodes, teamMembers] = await Promise.all([
    getPosts(3),
    getEpisodes(5),
    getTeamMembers(),
  ]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bigbark-blue text-white">
        {/* Banner image — already has dark blue bg, logo and tagline baked in */}
        <div className="w-full">
          <Image
            src="https://thebigbark.ie/wp-content/uploads/2024/07/Bringing-all-the-Canine-stories-to-you-2.png"
            alt="The Big Bark — Bringing all the Canine stories to you"
            width={1920}
            height={640}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* CTAs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
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
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/50">
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

      {/* ── Spotify Podcast Embed ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Listen to The Big Bark
            </h2>
            <p className="text-gray-500 mt-2">
              Subscribe and never miss an episode
            </p>
          </div>

          {/* Spotify show embed */}
          <iframe
            src={`https://open.spotify.com/embed/show/${SPOTIFY_SHOW_ID}?utm_source=generator`}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl shadow-md"
            style={{ border: 'none' }}
            title="The Big Bark on Spotify"
          />

          {/* Platform links */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href={`https://open.spotify.com/show/${SPOTIFY_SHOW_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1DB954] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Open on Spotify
            </a>
            <a
              href="https://podcasts.apple.com/ie/podcast/the-big-bark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#9933CC] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Apple Podcasts
            </a>
          </div>
        </div>
      </section>

      {/* ── Latest Episodes (from WordPress once WPGraphQL is set up) ── */}
      {episodes.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Recent Episodes
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
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
        <section className="bg-gray-50 py-16">
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
        <section className="bg-white py-16">
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
          <p className="mt-4 text-white/40 text-sm">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </section>
    </>
  );
}
