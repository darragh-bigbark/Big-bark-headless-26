import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPost, getAllPostSlugs } from '@/lib/queries';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt
      ?.replace(/<[^>]*>/g, '')
      .trim()
      .slice(0, 160),
    openGraph: {
      title: post.title,
      images: post.featuredImage
        ? [{ url: post.featuredImage.node.sourceUrl }]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="min-h-screen bg-white">
      {/* Featured image */}
      {post.featuredImage && (
        <div className="relative h-64 md:h-[28rem] w-full">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-bigbark-blue transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/blog"
            className="hover:text-bigbark-blue transition-colors"
          >
            News
          </Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Categories */}
        {post.categories.nodes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.nodes.map((cat) => (
              <span
                key={cat.slug}
                className="text-xs font-bold text-bigbark-blue uppercase tracking-wider"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-400 pb-8 border-b border-gray-100 mb-8">
          <time dateTime={post.date}>{date}</time>
          {post.author?.node?.name && (
            <>
              <span>&middot;</span>
              <span>By {post.author.node.name}</span>
            </>
          )}
        </div>

        {/* WordPress content — trusted internal HTML */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:text-gray-900 prose-a:text-bigbark-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-sm wp-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/blog"
            className="text-bigbark-blue font-semibold hover:underline"
          >
            &larr; Back to News
          </Link>
        </div>
      </div>
    </article>
  );
}
