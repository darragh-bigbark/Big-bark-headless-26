import type { Metadata } from 'next';
import { getTeamMembers } from '@/lib/queries';
import TeamCard from '@/components/TeamCard';

export const metadata: Metadata = {
  title: 'The Team',
  description:
    "Meet the hosts, producers, and canine co-hosts behind The Big Bark podcast.",
};

export const revalidate = 3600;

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  const active = teamMembers.filter((m) => m.isActive !== false);
  const memorial = teamMembers.filter((m) => m.isActive === false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-bigbark-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            The Team
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            The paws and people behind Ireland&apos;s favourite canine podcast.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {active.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {active.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {active.length === 0 && memorial.length === 0 && (
          <p className="text-center text-gray-400 py-20">
            Team profiles coming soon!
          </p>
        )}

        {memorial.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-600 mb-8 text-center">
              In Loving Memory
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {memorial.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
