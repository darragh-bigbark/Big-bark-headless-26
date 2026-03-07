import Image from 'next/image';
import { TeamMember } from '@/lib/wordpress';

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      {/* Photo */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-bigbark-blue-muted ring-4 ring-bigbark-blue-muted">
        {member.featuredImage ? (
          <Image
            src={member.featuredImage.node.sourceUrl}
            alt={member.featuredImage.node.altText || member.title}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-bigbark-blue/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>

      <h3 className="font-bold text-gray-900 text-lg">{member.title}</h3>

      {member.role && (
        <p className="text-bigbark-blue text-sm font-medium mt-1">
          {member.role}
        </p>
      )}

      {member.content && (
        <p className="text-gray-500 text-sm mt-3 line-clamp-4 leading-relaxed">
          {stripHtml(member.content)}
        </p>
      )}

      {!member.isActive && (
        <span className="mt-4 text-xs text-gray-400 italic">
          In loving memory
        </span>
      )}
    </div>
  );
}
