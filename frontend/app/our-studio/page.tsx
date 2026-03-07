import type { Metadata } from 'next';
import { getPage } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Our Studio',
  description: 'Take a look behind the scenes at The Big Bark studio.',
};

export const revalidate = 3600;

export default async function OurStudioPage() {
  const page = await getPage('our-studio');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-bigbark-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {page?.title ?? 'Our Studio'}
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Behind the scenes of Ireland&apos;s favourite canine podcast.
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
          <p className="text-center text-gray-400 py-20">
            Studio page coming soon!
          </p>
        )}
      </div>
    </div>
  );
}
