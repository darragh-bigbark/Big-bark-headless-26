import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <p className="text-6xl font-extrabold text-bigbark-blue mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Page not found
        </h1>
        <p className="text-gray-500 mb-8">
          This page has wandered off — like a dog off the lead.
        </p>
        <Link
          href="/"
          className="inline-block bg-bigbark-blue text-white font-bold px-7 py-3 rounded-full hover:bg-bigbark-blue-light transition-colors"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
