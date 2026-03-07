import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/listen-now', label: 'Listen Now' },
  { href: '/blog', label: 'Latest News' },
  { href: '/team', label: 'The Team' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/our-studio', label: 'Our Studio' },
  { href: '/about', label: 'About Our Show' },
  { href: '/subscribe', label: 'Subscribe' },
];

export default function Footer() {
  return (
    <footer className="bg-bigbark-blue-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-extrabold text-white hover:text-white/90 transition-colors"
            >
              The Big Bark
            </Link>
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              Ireland & UK&apos;s number one canine podcast. Bringing you the
              best in dog news, reviews, and expert interviews.
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="https://www.facebook.com/thebigbark.ie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/thebigbark.ie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@thebigbark"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@thebigbark"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-y-2 gap-x-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Listen */}
          <div>
            <h4 className="font-semibold text-white mb-4">Listen On</h4>
            <div className="space-y-2">
              <a
                href="https://open.spotify.com/show/thebigbark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Spotify
              </a>
              <a
                href="https://podcasts.apple.com/ie/podcast/the-big-bark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-[#9933CC]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59.12 2.2.01 2.846a8.648 8.648 0 01-3.44 5.778c-.636.461-1.963 1.123-2.688 1.338-.263.08-1.024.257-1.216.277-.06.007-.173-.009-.252-.035-.08-.027-.226-.029-.394-.007-.3.04-.4.03-.68-.066a9.537 9.537 0 01-2.914-1.394 8.64 8.64 0 01-3.24-5.27c-.18-.96-.18-2.502.002-3.445.562-2.912 2.607-5.285 5.379-6.38.727-.286 1.78-.52 2.113-.62zm0 2.17c-.476.073-.848.288-1.216.688-.433.474-.575.907-.575 1.74 0 .736.103 1.17.394 1.617.407.627 1.048.998 1.79.998.717 0 1.353-.373 1.748-.999.291-.447.394-.88.394-1.617 0-.833-.142-1.266-.575-1.74-.404-.443-.826-.66-1.34-.687h-.62zm.62 8.695c-1.09-.02-2.086.22-3.023.742-.544.306-.965.63-1.34 1.037-.293.313-.43.61-.43.916 0 .236.08.42.244.567.147.132.342.176.62.14a4.64 4.64 0 001.007-.239 7.18 7.18 0 012.922-.59 7.18 7.18 0 012.922.59c.348.116.686.2.971.239.29.037.487-.006.635-.14.163-.147.243-.33.243-.567 0-.307-.137-.603-.43-.916-.375-.407-.796-.731-1.34-1.037-.937-.521-1.934-.762-3.024-.742z"/>
                </svg>
                Apple Podcasts
              </a>
            </div>
            <div className="mt-6">
              <Link
                href="/subscribe"
                className="inline-block bg-white text-bigbark-blue font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
              >
                Newsletter &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-sm">
          <p>
            &copy; {new Date().getFullYear()} The Big Bark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
