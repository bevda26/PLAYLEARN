import { AppHeader } from "@/components/layout/app-header";
import { MagicalButton } from "@/components/ui/magical-button";
import { Crown, Castle, Sparkles, ArrowDown, Volume2, Play } from "lucide-react";
import Link from "next/link";

// 3D Castle Environment Component
const CastleThrone = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
      
      {/* Magical Sky Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/30 via-blue-900/20 to-black/80" />
        
        {/* Floating Magical Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Castle Structure */}
      <div className="absolute bottom-0 left-0 right-0 h-3/4">
        <svg 
          viewBox="0 0 1200 600" 
          className="absolute bottom-0 w-full h-full fill-gray-900/80"
          preserveAspectRatio="xMidYMax slice"
        >
          {/* Main Castle Foundation */}
          <path d="M0,600 L0,400 L200,350 L300,300 L500,250 L700,200 L900,220 L1100,240 L1200,260 L1200,600 Z" />
          
          {/* Central Keep */}
          <rect x="500" y="150" width="200" height="450" className="fill-gray-800" />
          <polygon points="500,150 600,80 700,150" className="fill-gray-700" />
          
          {/* Side Towers */}
          <rect x="300" y="200" width="80" height="400" className="fill-gray-800" />
          <rect x="820" y="180" width="80" height="420" className="fill-gray-800" />
          
          {/* Tower Tops */}
          <polygon points="300,200 340,130 380,200" className="fill-gray-700" />
          <polygon points="820,180 860,110 900,180" className="fill-gray-700" />
          
          {/* Walls */}
          <rect x="380" y="250" width="120" height="350" className="fill-gray-800" />
          <rect x="700" y="230" width="120" height="370" className="fill-gray-800" />
          
          {/* Gates and Windows */}
          <rect x="570" y="450" width="60" height="150" className="fill-yellow-600/80" />
          <circle cx="600" cy="400" r="15" className="fill-yellow-400/60" />
          <circle cx="340" cy="350" r="8" className="fill-yellow-400/60" />
          <circle cx="860" cy="320" r="8" className="fill-yellow-400/60" />
        </svg>
        
        {/* Glowing Castle Windows */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-12 h-20 bg-yellow-400/80 blur-sm animate-pulse" />
        <div className="absolute bottom-52 left-1/3 w-4 h-4 bg-yellow-400/60 rounded-full blur-sm animate-pulse" />
        <div className="absolute bottom-48 right-1/3 w-4 h-4 bg-yellow-400/60 rounded-full blur-sm animate-pulse" />
      </div>

      {/* Throne Room Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
        {/* Royal Crown */}
        <div className="mb-8 relative">
          <Crown className="w-24 h-24 text-yellow-400 mx-auto animate-bounce drop-shadow-2xl" />
          <div className="absolute inset-0 bg-yellow-400/30 blur-2xl rounded-full animate-pulse" />
          <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-300 animate-spin" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-yellow-300 animate-ping" />
        </div>

        {/* Royal Proclamation */}
        <h1 className="text-7xl md:text-9xl font-bold font-serif mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl tracking-wider">
          PLAYLEARN
        </h1>
        
        <div className="mb-4 px-8 py-3 bg-black/40 border-2 border-yellow-400/50 rounded-lg backdrop-blur-sm">
          <p className="text-2xl md:text-3xl text-yellow-400 font-bold tracking-wider">
            ⚔️ ROYAL ACADEMY OF MYSTICAL LEARNING ⚔️
          </p>
        </div>
        
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-serif">
          "Hear ye! Enter the mystical realm where ancient knowledge becomes epic adventure. 
          Embark on quests, vanquish ignorance, and rise as a true Scholar-Warrior!"
        </p>

        {/* Royal Commands (Buttons) */}
        <div className="flex flex-col sm:flex-row gap-6 mb-12">
          <MagicalButton asChild variant="primary" className="px-12 py-6 text-xl group relative">
            <Link href="/quest-kingdom">
              <div className="flex items-center">
                <Castle className="mr-3 w-7 h-7 group-hover:animate-bounce" />
                <span className="font-bold">BEGIN YOUR QUEST</span>
              </div>
            </Link>
          </MagicalButton>
          
          <MagicalButton asChild variant="secondary" className="px-12 py-6 text-xl group">
            <Link href="/dashboard">
              <div className="flex items-center">
                <Sparkles className="mr-3 w-7 h-7 group-hover:animate-spin" />
                <span className="font-bold">ENTER THRONE ROOM</span>
              </div>
            </Link>
          </MagicalButton>
        </div>

        {/* RPG Status Bar Preview */}
        <div className="bg-black/60 border-2 border-yellow-400/50 rounded-lg p-4 backdrop-blur-sm mb-8">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">Health: 100</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">Mana: 50</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Level: 1</span>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <span className="text-sm text-yellow-400 uppercase tracking-wider font-bold">⚡ EXPLORE THE KINGDOMS ⚡</span>
          <ArrowDown className="w-6 h-6 text-yellow-400" />
        </div>
      </div>

      {/* Ambient Audio Control */}
      <div className="absolute top-4 right-4 z-20">
        <button className="bg-black/60 border border-yellow-400/50 rounded-full p-3 hover:bg-yellow-400/20 transition-colors">
          <Volume2 className="w-5 h-5 text-yellow-400" />
        </button>
      </div>
    </div>
  );
};

// Kingdom Portals Section
const KingdomPortals = () => {
  const kingdoms = [
    {
      name: "Mystic Mathlands",
      color: "from-purple-600 to-indigo-600",
      icon: "🔮",
      description: "Where numbers hold magical power"
    },
    {
      name: "Scientific Citadel", 
      color: "from-blue-600 to-cyan-600",
      icon: "⚗️",
      description: "Alchemy and mystical experiments"
    },
    {
      name: "Literary Realms",
      color: "from-green-600 to-emerald-600", 
      icon: "📚",
      description: "Enchanted libraries of ancient wisdom"
    },
    {
      name: "Chronicle Kingdoms",
      color: "from-amber-600 to-orange-600",
      icon: "🏛️", 
      description: "Temples of forgotten civilizations"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      
      {/* Background Magic */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-400/30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold font-serif text-white mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            🗺️ THE FOUR GREAT KINGDOMS 🗺️
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your destiny, brave adventurer. Each kingdom holds ancient secrets and powerful knowledge waiting to be discovered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {kingdoms.map((kingdom, index) => (
            <Link key={index} href="/quest-kingdom" className="group">
              <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${kingdom.color} border-2 border-white/20 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-yellow-400/20`}>
                
                {/* Magic Aura */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${kingdom.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
                
                {/* Portal Icon */}
                <div className="text-center mb-6 relative z-10">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">{kingdom.icon}</div>
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Kingdom Info */}
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-white mb-3 font-serif">{kingdom.name}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{kingdom.description}</p>
                </div>

                {/* Magical Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/0 group-hover:border-yellow-400/50 transition-colors duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Homepage Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <AppHeader />
      
      {/* Castle Throne Room */}
      <CastleThrone />
      
      {/* Kingdom Selection */}
      <KingdomPortals />
      
      {/* Footer Call to Action */}
      <div className="bg-gradient-to-t from-purple-900 to-black py-16 text-center">
        <h3 className="text-4xl font-bold text-white mb-6 font-serif">
          ⚔️ Your Legend Awaits, Young Scholar! ⚔️
        </h3>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of brave adventurers on the greatest quest of all - the pursuit of knowledge!
        </p>
        <MagicalButton asChild variant="primary" className="px-12 py-6 text-xl">
          <Link href="/login">
            <Crown className="mr-3 w-6 h-6" />
            JOIN THE ACADEMY
          </Link>
        </MagicalButton>
      </div>
    </div>
  );
}