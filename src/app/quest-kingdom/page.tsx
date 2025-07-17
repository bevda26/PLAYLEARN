import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
// import { AppHeader } from "@/components/layout/app-header"; // Removed as RPGHud is persistent

// Mock data for the Four Great Kingdoms based on the blueprint
const KINGDOMS = [
  {
    id: 'mathlands',
    name: 'Mystic Mathlands',
    description: 'Where numbers hold magical power',
    color: 'from-purple-600 to-indigo-600',
    icon: '🔮',
    unlocked: true, // Example of unlocking
  },
  {
    id: 'citadel',
    name: 'Scientific Citadel',
    description: 'Alchemy and mystical experiments',
    color: 'from-blue-600 to-cyan-600',
    icon: '⚗️',
    unlocked: false,
  },
  {
    id: 'literary',
    name: 'Literary Realms',
    description: 'Enchanted libraries of ancient wisdom',
    color: 'from-green-600 to-emerald-600',
    icon: '📚',
    unlocked: false,
  },
  {
    id: 'chronicle',
    name: 'Chronicle Kingdoms',
    description: 'Temples of forgotten civilizations',
    color: 'from-amber-600 to-orange-600',
    icon: '🏛️',
    unlocked: false,
  },
];

const QuestKingdomWorldMap = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-purple-900 via-gray-950 to-black overflow-hidden py-16">
      {/* Background Magical Effects */}
      {[...Array(50)].map((_, i) => (
        <Sparkles
          key={i}
          className="absolute text-yellow-400/30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
      
      {/* TODO: Add flying creatures (e.g., SVG dragons, animated sprites) */}
      {/* TODO: Implement dynamic weather systems (e.g., rain, fog overlays) */}
      {/* TODO: Implement ships sailing between island kingdoms (visuals) */}

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <header className="mb-16 text-center relative w-full">
          <Link href="/" className="absolute top-0 left-0 flex items-center gap-2 text-accent hover:underline transition-all hover:text-yellow-400 font-body">
            <ArrowLeft size={20} />
            Return to Castle Hall
          </Link>
          <h1 className="text-6xl md:text-8xl font-bold font-headline text-accent drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] leading-tight animate-fade-in-down">
            🗺️ THE ADVENTURE MAP 🗺️
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-4 max-w-3xl mx-auto font-body animate-fade-in delay-100">
            Explore the Four Great Kingdoms. Each realm holds unique challenges and ancient knowledge awaiting discovery.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {KINGDOMS.map((kingdom) => (
            <Link
              key={kingdom.id}
              href={kingdom.unlocked ? `/quest-kingdom/${kingdom.id}` : '#'}
              className={`group relative p-8 rounded-2xl border-2 backdrop-blur-sm transform transition-all duration-500
                ${kingdom.unlocked 
                  ? `bg-gradient-to-br ${kingdom.color} border-yellow-400/50 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-yellow-400/30 cursor-pointer`
                  : 'bg-gray-800/50 border-gray-700/50 cursor-not-allowed opacity-50 grayscale'
                }
              `}
            >
              {/* Magic Aura / Fog of War */}
              <div className={`absolute inset-0 rounded-2xl 
                ${kingdom.unlocked 
                  ? `bg-gradient-to-br ${kingdom.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`
                  : 'bg-black/70 opacity-80 blur-lg' // Fog of War effect
                }
              `} />
              
              {/* Portal Icon */}
              <div className="text-center mb-6 relative z-10">
                <div className={`text-7xl mb-4 ${kingdom.unlocked ? 'group-hover:animate-pulse-light' : ''}`}>{kingdom.icon}</div>
                <div className={`absolute inset-0 rounded-full blur-2xl 
                  ${kingdom.unlocked 
                    ? 'bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' 
                    : ''
                  }
                `} />
              </div>

              {/* Kingdom Info */}
              <div className="relative z-10 text-center">
                <h3 className="text-3xl font-bold text-white mb-3 font-headline">{kingdom.name}</h3>
                <p className="text-white/80 text-base leading-relaxed font-body">{kingdom.description}</p>
                {!kingdom.unlocked && (
                  <p className="text-red-400 text-sm mt-4 font-bold animate-pulse">Locked - Complete previous quests!</p>
                )}
              </div>

            </Link>
          ))}
        </div>

        {/* RPG Travel System Placeholder */}
        <div className="mt-20 text-center animate-fade-in delay-200">
          <h2 className="text-4xl font-bold font-headline text-yellow-400 mb-6">🐉 Magical Transportation Hub 🐉</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-body">
            Unlock powerful mounts and teleportation networks as you progress through the realms. 
            Travel swiftly between discovered kingdoms and delve deeper into new adventures.
          </p>
          {/* TODO: Add interactive elements for fast travel, mounts once implemented */}
          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 bg-yellow-700/30 border border-yellow-500 text-yellow-200 rounded-lg shadow-md hover:bg-yellow-600/50 transition-colors font-bold text-lg">
              Summon Dragon (Locked)
            </button>
            <button className="px-6 py-3 bg-blue-700/30 border border-blue-500 text-blue-200 rounded-lg shadow-md hover:bg-blue-600/50 transition-colors font-bold text-lg">
              Teleport Spire (Locked)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function QuestKingdomPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* RPGHud is rendered globally in RootLayout */}
      <QuestKingdomWorldMap />
    </div>
  );
}
