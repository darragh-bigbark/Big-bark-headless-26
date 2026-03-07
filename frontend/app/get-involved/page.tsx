import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Support The Big Bark podcast and get involved with the show.',
};

export const revalidate = 3600;

export default async function GetInvolvedPage() {
  const page = await getPage('get-involved');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-bigbark-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {page?.title ?? 'Get Involved'}
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Be part of Ireland&apos;s favourite canine podcast community.
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
          // Fallback if WP page not found
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg mb-3">
              Want to be part of The Big Bark? We&apos;d love to hear from you!
            </p>
            <p className="text-gray-500 mb-8">
              Whether you want to advertise, contribute, or just support the
              show, there are plenty of ways to get involved.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.patreon.com/thebigbark"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-bigbark-blue text-white font-bold px-8 py-3 rounded-full hover:bg-bigbark-blue-light transition-colors"
              >
                Support on Patreon
              </a>
              <Link
                href="/subscribe"
                className="inline-block border-2 border-bigbark-blue text-bigbark-blue font-bold px-8 py-3 rounded-full hover:bg-bigbark-blue-muted transition-colors"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
