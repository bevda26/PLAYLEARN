'use client';

import { MagicalButton } from "@/components/ui/magical-button";
import { Crown, Castle, Sparkles, ArrowDown, Volume2, Play, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { RPGHud } from "@/components/ui/rpg-hud"; // Import RPGHud
import { useState } from 'react';

// 3D Castle Environment Component
const CastleThrone = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [dialogue, setDialogue] = useState<{ npc: string; message: string } | null>(null);

  const toggleAudio = () => {
    // TODO: Implement actual audio playback/pause logic here
    // For example:
    // const audio = new Audio('/path/to/your/castle_theme.mp3');
    // if (isAudioPlaying) {
    //   audio.pause();
    // } else {
    //   audio.play();
    // }
    setIsAudioPlaying(!isAudioPlaying);
    console.log(`Audio is now ${isAudioPlaying ? 'paused' : 'playing'}`);
  };

  const handleNPCTalk = (npcName: string, message: string) => {
    setDialogue({ npc: npcName, message });
    // Optionally clear message after some time
    setTimeout(() => setDialogue(null), 5000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
      
      {/* Magical Sky Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/30 via-blue-900/20 to-black/80" />
        
        {/* Floating Magical Particles */}
        {[...Array(50)].map((_, i) => ( // Increased particles
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-flicker opacity-60" // New animation
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Castle Structure */}
      <div className="absolute bottom-0 left-0 right-0 h-3/4 animate-float-up-down"> {/* Added animation */}
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
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-12 h-20 bg-yellow-400/80 blur-sm animate-pulse-light" /> {/* New animation */}
        <div className="absolute bottom-52 left-1/3 w-4 h-4 bg-yellow-400/60 rounded-full blur-sm animate-pulse-light" />
        <div className="absolute bottom-48 right-1/3 w-4 h-4 bg-yellow-400/60 rounded-full blur-sm animate-pulse-light" />
      </div>

      {/* Throne Room Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
        {/* Royal Crown */}
        <div className="mb-8 relative">
          <Crown className="w-24 h-24 text-yellow-400 mx-auto animate-float-and-glow drop-shadow-2xl" /> {/* New animation */}
          <div className="absolute inset-0 bg-yellow-400/30 blur-2xl rounded-full animate-pulse-strong" /> {/* New animation */}
          <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-300 animate-spin-slow" /> {/* New animation */}
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-yellow-300 animate-ping-slow" /> {/* New animation */}
        </div>

        {/* Royal Proclamation */}
        <h1 className="text-7xl md:text-9xl font-bold font-serif mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl tracking-wider animate-text-glow"> {/* New animation */}
          PLAYLEARN
        </h1>
        
        <div className="mb-4 px-8 py-3 bg-black/40 border-2 border-yellow-400/50 rounded-lg backdrop-blur-sm animate-fade-in"> {/* New animation */}
          <p className="text-2xl md:text-3xl text-yellow-400 font-bold tracking-wider">
            ⚔️ ROYAL ACADEMY OF MYSTICAL LEARNING ⚔️
          </p>
        </div>
        
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-serif animate-fade-in delay-100"> {/* New animation */}
          "Hear ye! Enter the mystical realm where ancient knowledge becomes epic adventure. 
          Embark on quests, vanquish ignorance, and rise as a true Scholar-Warrior!"
        </p>

        {/* Royal Commands (Buttons) */}
        <div className="flex flex-col sm:flex-row gap-6 mb-12 animate-fade-in delay-200"> {/* New animation */}
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

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <span className="text-sm text-yellow-400 uppercase tracking-wider font-bold">⚡ EXPLORE THE KINGDOMS ⚡</span>
          <ArrowDown className="w-6 h-6 text-yellow-400" />
        </div>

        {/* Quest Giver NPCs */}
        <div className="absolute bottom-0 left-0 p-8 flex flex-col gap-8 items-start text-left max-w-xs animate-fade-in-left delay-300"> {/* New animation */}
          <div className="bg-gray-800/70 p-4 rounded-lg border border-yellow-700 shadow-lg">
            <h4 className="text-xl font-bold text-yellow-300 mb-2">👑 The Royal Librarian</h4>
            <p className="text-gray-300 text-sm">"Greetings, young scholar! I have ancient knowledge quests for you!"</p>
            <button 
              onClick={() => handleNPCTalk('The Royal Librarian', 'Welcome, adventurer! Seek knowledge in the ancient scrolls, and you shall be rewarded.')}
              className="mt-3 px-4 py-2 bg-yellow-600/30 border border-yellow-500 text-yellow-200 rounded-md text-sm hover:bg-yellow-500/50 transition-colors flex items-center gap-2"
            >
              <MessageSquareText size={16} /> Talk
            </button>
          </div>
          <div className="bg-gray-800/70 p-4 rounded-lg border border-yellow-700 shadow-lg">
            <h4 className="text-xl font-bold text-yellow-300 mb-2">⚔️ Captain of the Royal Guard</h4>
            <p className="text-gray-300 text-sm">"Think you're ready for battle? Prove your math skills!"</p>
            <button 
              onClick={() => handleNPCTalk('Captain of the Royal Guard', 'Halt! Your mind must be as sharp as your blade. Solve these equations, and glory awaits!')}
              className="mt-3 px-4 py-2 bg-yellow-600/30 border border-yellow-500 text-yellow-200 rounded-md text-sm hover:bg-yellow-500/50 transition-colors flex items-center gap-2"
            >
              <MessageSquareText size={16} /> Talk
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 p-8 flex flex-col gap-8 items-end text-right max-w-xs animate-fade-in-right delay-300"> {/* New animation */}
          <div className="bg-gray-800/70 p-4 rounded-lg border border-yellow-700 shadow-lg">
            <h4 className="text-xl font-bold text-yellow-300 mb-2">🧙‍♂️ The Court Wizard</h4>
            <p className="text-gray-300 text-sm">"The mysteries of magic await! Let's experiment!"</p>
            <button 
              onClick={() => handleNPCTalk('The Court Wizard', 'Young apprentice, the elements whisper secrets! Begin your alchemical journey with this experiment.')}
              className="mt-3 px-4 py-2 bg-yellow-600/30 border border-yellow-500 text-yellow-200 rounded-md text-sm hover:bg-yellow-500/50 transition-colors flex items-center gap-2"
            >
              <MessageSquareText size={16} /> Talk
            </button>
          </div>
          <div className="bg-gray-800/70 p-4 rounded-lg border border-yellow-700 shadow-lg">
            <h4 className="text-xl font-bold text-yellow-300 mb-2">🎨 The Royal Bard</h4>
            <p className="text-gray-300 text-sm">"Stories have power! Help me craft epic tales!"</p>
            <button 
              onClick={() => handleNPCTalk('The Royal Bard', 'Hark! A tale untold awaits your quill. Weave words into wonders, and let your saga begin!')}
              className="mt-3 px-4 py-2 bg-yellow-600/30 border border-yellow-500 text-yellow-200 rounded-md text-sm hover:bg-yellow-500/50 transition-colors flex items-center gap-2"
            >
              <MessageSquareText size={16} /> Talk
            </button>
          </div>
        </div>

        {/* Dialogue Box */}
        {dialogue && (
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-blue-900/90 border-2 border-blue-400 text-white p-6 rounded-lg shadow-2xl max-w-sm w-full animate-fade-in-up">
            <h5 className="font-bold text-lg mb-2 text-blue-300">{dialogue.npc} says:</h5>
            <p className="text-base">{dialogue.message}</p>
            <button 
              onClick={() => setDialogue(null)}
              className="mt-4 px-4 py-2 bg-blue-700/50 border border-blue-500 text-white rounded-md text-sm hover:bg-blue-600/70 transition-colors"
            >
              Close
            </button>
          </div>
        )}

      </div>

      {/* Ambient Audio Control */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={toggleAudio}
          className="bg-black/60 border border-yellow-400/50 rounded-full p-3 hover:bg-yellow-400/20 transition-colors"
        >
          {isAudioPlaying ? (
            <Volume2 className="w-5 h-5 text-yellow-400" />
          ) : (
            <Play className="w-5 h-5 text-yellow-400" />
          )}
        </button>
        {/* TODO: Add an <audio> element here that plays the background music */}
        {/* Example: <audio src="/audio/castle_theme.mp3" loop autoPlay={isAudioPlaying} /> */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">\
          {kingdoms.map((kingdom, index) => (
            <Link key={index} href="/quest-kingdom" className="group">\
              <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${kingdom.color} border-2 border-white/20 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-yellow-400/20`}>\
                
                {/* Magic Aura */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${kingdom.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
                
                {/* Portal Icon */}
                <div className="text-center mb-6 relative z-10">\
                  <div className="text-6xl mb-4 group-hover:animate-bounce">{kingdom.icon}</div>
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Kingdom Info */}
                <div className="relative z-10 text-center">\
                  <h3 className="text-2xl font-bold text-white mb-3 font-serif">{kingdom.name}</h3>\
                  <p className="text-white/80 text-sm leading-relaxed">{kingdom.description}</p>\
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
    <div className="min-h-screen bg-black">\
      {/* The RPGHud component now serves as the main persistent UI, including health/mana/XP */}
      <RPGHud />
      
      {/* Castle Throne Room */}
      <CastleThrone />
      
      {/* Kingdom Selection */}
      <KingdomPortals />
      
      {/* Footer Call to Action */}
      <div className="bg-gradient-to-t from-purple-900 to-black py-16 text-center">\
        <h3 className="text-4xl font-bold text-white mb-6 font-serif">\
          ⚔️ Your Legend Awaits, Young Scholar! ⚔️\
        </h3>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">\
          Join thousands of brave adventurers on the greatest quest of all - the pursuit of knowledge!\
        </p>
        <MagicalButton asChild variant="primary" className="px-12 py-6 text-xl">\
          <Link href="/login">\
            <Crown className="mr-3 w-6 h-6" />\
            JOIN THE ACADEMY\
          </Link>\
        </MagicalButton>
      </div>
    </div>
  );
}