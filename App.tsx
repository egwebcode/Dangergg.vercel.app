
import React from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from './components/ParticleBackground';
import { Instagram, Gamepad2, Phone, Video, ChevronRight, Target, Trophy, Crosshair } from 'lucide-react';

// --- DATA ---
const SOCIALS = [
  { name: 'Instagram', url: 'https://www.instagram.com/dangergg_ff', icon: <Instagram size={24} />, color: 'hover:text-pink-500', border: 'hover:border-pink-500/50' },
  { name: 'Discord', url: 'https://discord.gg/qVmeXNaQB', icon: <Gamepad2 size={24} />, color: 'hover:text-indigo-500', border: 'hover:border-indigo-500/50' },
  { name: 'WhatsApp', url: 'https://whatsapp.com/channel/0029VbBUa2K4yltLCgrR3i07', icon: <Phone size={24} />, color: 'hover:text-green-500', border: 'hover:border-green-500/50' },
  { name: 'TikTok', url: 'https://tiktok.com/@dangergg_ff', icon: <Video size={24} />, color: 'hover:text-cyan-500', border: 'hover:border-cyan-500/50' },
];

const BLOCKS = [
  { 
    title: 'RECRUTAMENTO DANGER GG', 
    url: './recrutamento', 
    image: 'bloco1.png',
    desc: 'Junte-se à elite'
  },
  { 
    title: 'X-TREINO DANGER GG', 
    url: 'https://chat.whatsapp.com/Bvb1xZhjyht0TlxWENCBNB?mode=hqrt2', 
    image: 'bloco2.png',
    desc: 'Treinos diários competitivos'
  },
  { 
    title: 'CONQUISTAS DA GUILDA', 
    url: 'https://dangergg.netlify.app/guilda', 
    image: 'bloco3.png',
    desc: 'Nossa história de vitórias'
  },
];

// --- COMPONENTS ---

const LogoSection = () => (
  <motion.div 
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', duration: 1.5 }}
    className="relative w-40 h-40 mb-6 flex justify-center items-center"
  >
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gold-400/20 blur-3xl rounded-full animate-pulse-fast" />
    
    {/* Spinning Ring */}
    <div className="absolute inset-[-10px] rounded-full border-2 border-gold-400 border-t-transparent border-b-transparent animate-spin-slow opacity-60 shadow-[0_0_15px_#FFD700]" />
    
    {/* Main Logo */}
    <img 
      src="logo.png" 
      alt="Logo Danger GG" 
      className="w-full h-full object-cover rounded-full border-4 border-gold-400/80 shadow-2xl relative z-10"
    />
  </motion.div>
);

const SocialButton: React.FC<{ data: typeof SOCIALS[0], index: number }> = ({ data, index }) => (
  <motion.a
    href={data.url}
    target="_blank"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3 + (index * 0.1) }}
    className={`
      w-14 h-14 rounded-2xl bg-white/5 border border-gold-400/20 backdrop-blur-md
      flex items-center justify-center text-white transition-all duration-300
      ${data.color} ${data.border} hover:scale-110 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]
      group relative overflow-hidden
    `}
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
    {data.icon}
  </motion.a>
);

const MainCTA = () => (
  <motion.a
    href="./recrutamento"
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.6 }}
    className="w-full max-w-md group relative mb-8"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
    <div className="relative px-6 py-4 bg-dark-800 rounded-xl border border-gold-400/50 flex items-center justify-between overflow-hidden group-hover:bg-dark-900 transition-colors">
      
      <div className="flex items-center gap-3 z-10">
        <Target className="text-gold-400 group-hover:animate-spin" size={24} />
        <div className="flex flex-col text-left">
          <span className="font-orbitron font-bold text-gold-400 tracking-wider text-lg leading-none group-hover:text-white transition-colors">RECRUTAMENTO</span>
          <span className="font-rajdhani font-semibold text-gray-400 text-xs tracking-[0.2em] group-hover:text-gold-400">SISTEMA AUTOMATIZADO</span>
        </div>
      </div>
      
      <div className="z-10 bg-gold-400/10 p-2 rounded-lg group-hover:bg-gold-400 group-hover:text-black transition-all">
        <ChevronRight size={20} className="text-gold-400 group-hover:text-black" />
      </div>

      {/* Background Shine */}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
    </div>
  </motion.a>
);

const InfoBlock: React.FC<{ data: typeof BLOCKS[0], index: number }> = ({ data, index }) => (
  <motion.a
    href={data.url}
    target={data.url.startsWith('http') ? '_blank' : '_self'}
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.8 + (index * 0.15) }}
    className="w-full max-w-md bg-dark-glass border border-white/5 rounded-2xl p-3 flex items-center gap-4 hover:border-gold-400/60 hover:bg-dark-800 transition-all duration-300 group hover:translate-x-2"
  >
    <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-white/10 relative">
      <img src={data.image} alt={data.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gold-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    
    <div className="flex-1 flex flex-col justify-center">
      <h3 className="font-orbitron font-bold text-white text-base leading-tight mb-1 group-hover:text-gold-400 transition-colors">
        {data.title}
      </h3>
      <p className="font-rajdhani text-gray-400 text-sm">{data.desc}</p>
      <div className="flex items-center gap-1 mt-2 text-xs font-bold text-gold-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
        Acessar <ChevronRight size={12} />
      </div>
    </div>
  </motion.a>
);

// --- MAIN APP ---

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-12 px-4 z-10">
      <ParticleBackground />

      <div className="w-full max-w-lg flex flex-col items-center relative z-20">
        
        {/* Header */}
        <LogoSection />
        
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-orbitron font-black text-4xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gold-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] mb-2"
        >
          GUILDA DANGER GG
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mb-8"
        >
          <div className="h-[1px] w-8 bg-gold-600" />
          <p className="font-rajdhani font-bold text-gold-400 tracking-[0.3em] uppercase text-sm">Melhor Guilda Competitiva</p>
          <div className="h-[1px] w-8 bg-gold-600" />
        </motion.div>

        {/* Socials */}
        <div className="flex gap-4 mb-10">
          {SOCIALS.map((social, idx) => (
            <SocialButton key={social.name} data={social} index={idx} />
          ))}
        </div>

        {/* Main Actions */}
        <MainCTA />

        {/* Info Blocks */}
        <div className="flex flex-col gap-4 w-full items-center">
          {BLOCKS.map((block, idx) => (
            <InfoBlock key={block.title} data={block} index={idx} />
          ))}
        </div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 pt-8 border-t border-white/5 w-full text-center"
        >
          <div className="flex justify-center items-center gap-2 text-gray-600 text-xs font-rajdhani font-semibold tracking-widest">
            <Trophy size={14} className="text-gold-600" />
            <span>DIREITOS RESERVADOS © 2025</span>
            <span className="text-gold-500">DANGER GG</span>
            <Crosshair size={14} className="text-gold-600" />
          </div>
        </motion.footer>

      </div>
    </div>
  );
};

export default App;
