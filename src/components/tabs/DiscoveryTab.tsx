import React from 'react';

const DiscoverySection = () => {
  const discoveryInfo = {
    showingInDiscovery: 'No',
    category: 'None',
    rank: 'None',
    language: 'Unknown'
  };

  const boosts = [
    'High quality artwork / about page',
    'Interesting niche',
    'Authentic human engagement',
    'Active owner'
  ];

  const penalties = [
    'Bots or fake accounts',
    'Spam or low quality engagement',
    'Low quality artwork / about page',
    'Payments off platform',
    'Bad customer support',
    'Inactive owner'
  ];

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Discovery</h2>
      <p className="text-gray-600 mb-6">Get discovered by millions of active users.</p>
      
      {/* Status Information */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-sm">
        <div>
          <span className="text-gray-700">Showing in discovery: </span>
          <span className="text-red-500 font-medium">{discoveryInfo.showingInDiscovery}</span>
        </div>
        <div>
          <span className="text-gray-700">Category: </span>
          <span className="text-red-500 font-medium">{discoveryInfo.category}</span>
        </div>
        <div>
          <span className="text-gray-700">Rank: </span>
          <span className="text-red-500 font-medium">{discoveryInfo.rank}</span>
        </div>
        <div>
          <span className="text-gray-700">Language: </span>
          <span className="text-red-500 font-medium">{discoveryInfo.language}</span>
        </div>
      </div>

      {/* Showing in discovery explanation */}
      <div className="mb-6">
        <p className="text-gray-700 text-sm leading-relaxed">
          <span className="font-semibold">Showing in discovery —</span> Groups need a minimum threshold of members, posts, and activity to show in discovery. You also need a group description, about page description/images, and a cover image.
        </p>
      </div>

      {/* Discovery rank explanation */}
      <div className="mb-6">
        <p className="text-gray-700 text-sm leading-relaxed">
          <span className="font-semibold">Discovery rank —</span> Groups are ranked by: member growth, engagement, and retention. If you consistently grow your group, get members to engage, and keep them coming back — your rank will increase.
        </p>
      </div>

      {/* Boosts and penalties explanation */}
      <div className="mb-6">
        <p className="text-gray-700 text-sm leading-relaxed">
          <span className="font-semibold">Boosts and penalties —</span> To prevent people from gaming the system, we have a &quot;human in the loop&quot; to manually review rankings and apply boosts and penalties:
        </p>
      </div>

      {/* Boosts and Penalties Lists */}
      <div className="grid md:grid-cols-2 gap-8 mb-6">
        {/* Boosts */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Boosts</h3>
          <ul className="space-y-2">
            {boosts.map((boost, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 font-bold mr-2">+</span>
                <span className="text-gray-700 text-sm">{boost}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Penalties */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Penalties</h3>
          <ul className="space-y-2">
            {penalties.map((penalty, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-500 mr-2">-</span>
                <span className="text-gray-700 text-sm">{penalty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Note */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">Note —</span> Removing inactive or level 1 members doesn&apos;t improve your rank. Some people like to lurk.
        </p>
      </div>

      {/* Support link */}
      <div>
        <p className="text-gray-700 text-sm">
          If your category or language is wrong, please{' '}
          <a href="#" className="text-blue-500 hover:text-blue-600 underline">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default DiscoverySection;