import Image from 'next/image';
import { Episode } from '@/lib/wordpress';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function PodcastCard({ episode }: { episode: Episode }) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Artwork */}
      <div className="relative aspect-square bg-bigbark-blue-muted">
        {episode.featuredImage ? (
          <Image
            src={episode.featuredImage.node.sourceUrl}
            alt={episode.featuredImage.node.altText || episode.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-bigbark-blue/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Episode badge + duration */}
        <div className="flex items-center gap-2 mb-2">
          {episode.episodeNumber != null && (
            <span className="text-xs font-bold bg-bigbark-blue text-white px-2 py-0.5 rounded">
              Ep. {episode.episodeNumber}
            </span>
          )}
          {episode.duration && (
            <span className="text-xs text-gray-400">{episode.duration}</span>
          )}
        </div>

        <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 mb-2">
          {episode.title}
        </h3>

        {episode.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {stripHtml(episode.excerpt)}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <time className="text-xs text-gray-400">{formatDate(episode.date)}</time>
          {episode.spotifyEmbedUrl && (
            <a
              href={episode.spotifyEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1DB954] hover:underline"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Listen
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
