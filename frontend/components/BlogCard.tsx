import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/wordpress';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {post.featuredImage && (
        <div className="relative aspect-video">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        {post.categories.nodes[0] && (
          <span className="text-xs font-bold text-bigbark-blue uppercase tracking-wider mb-2">
            {post.categories.nodes[0].name}
          </span>
        )}
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 line-clamp-2">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-bigbark-blue transition-colors"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {stripHtml(post.excerpt)}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <time className="text-xs text-gray-400">{formatDate(post.date)}</time>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-semibold text-bigbark-blue hover:underline"
          >
            Read more &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
