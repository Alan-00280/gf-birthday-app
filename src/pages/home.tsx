import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Music, Pause, Gift, Heart, Star, Sparkles, Camera } from 'lucide-react';

import foto1 from "../assets/img/IMG-20250401-WA0038.jpg";
import foto2 from "../assets/img/IMG-20260119-WA0003.jpg";
import foto3 from "../assets/img/IMG-20260313-WA0035.jpg";
import foto4 from "../assets/img/IMG_20221031_124143.jpg";
import foto5 from "../assets/img/IMG_20260324_121209.jpg";
import foto6 from "../assets/img/IMG_20250206_111628.jpg";

// You can customize the image URLs and audio URL later
const PHOTOS = [
  foto1,
  foto2,
  foto3,
  foto4,
  foto5,
  foto6
];

const AUDIO_URL = "https://cdn.pixabay.com/audio/2026/01/19/audio_909d3ca1fa.mp3"; // Placeholder

function FloatingBalloon({ color, left, delay, duration }: any) {
  return (
    <motion.div
      className="absolute bottom-[-100px] text-5xl z-0"
      style={{ left }}
      animate={{
        y: ['10vh', '-120vh'],
        x: ['0px', '30px', '-30px', '0px']
      }}
      transition={{
        y: { duration, repeat: Infinity, ease: "linear", delay },
        x: { duration: duration / 2, repeat: Infinity, ease: "easeInOut", delay }
      }}
    >
      {color === 'pink' ? '🎈' : color === 'purple' ? '💜' : '🌸'}
    </motion.div>
  );
}

export default function Home() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [ageCount, setAgeCount] = useState(0);

  // Age Counter Effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay diblokir:", err);
      });
    }

    let start = 0;
    const end = 20;
    const duration = 10000;
    const incrementTime = (duration / end);
    
    const timer = setInterval(() => {
      start += 1;
      setAgeCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSurprise = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000); // Stop confetti after 5 seconds
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden">
      {/* Background audio */}
      <audio ref={audioRef} loop src={AUDIO_URL} />
      
      {/* Floating Music Button */}
      <button 
        onClick={toggleMusic}
        className="fixed z-50 bottom-6 right-6 p-4 rounded-full bg-brand-pink text-white shadow-lg hover:bg-pink-500 transition-colors cursor-pointer"
        aria-label="Toggle Music"
      >
        {isPlaying ? <Pause size={24} /> : <Music size={24} />}
      </button>

      {/* Confetti overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      </div>

      {/* 1. Header (Hero Section) */}
      <header className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-pink-pastel to-white overflow-hidden p-6 text-center">
        {/* Floating elements */}
        <FloatingBalloon color="pink" left="10%" delay={0} duration={15} />
        <FloatingBalloon color="purple" left="30%" delay={5} duration={18} />
        <FloatingBalloon color="pink" left="60%" delay={2} duration={14} />
        <FloatingBalloon color="flower" left="80%" delay={7} duration={16} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10 bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/50 shadow-xl"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-poppins font-bold text-gray-900 mb-4 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            🎉 Selamat Ulang Tahun, <br />
            <span className="text-brand-pink">Faiza Apriliana Disti</span> 🎉
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 font-semibold mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            27 April 2026 • Genap 20 Tahun
          </motion.p>
          <motion.button
            onClick={() => document.getElementById('surprise-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-brand-pink text-white font-bold rounded-full shadow-lg hover:bg-pink-500 hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Gift size={20} /> Lihat Kejutan 🎁
          </motion.button>
        </motion.div>
      </header>

      {/* 2. Ucapan Special */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-16 h-16 text-brand-pink mx-auto mb-8 animate-pulse" />
          <p className="text-2xl md:text-4xl leading-relaxed text-gray-700 font-poppins">
            Hari ini adalah hari <span className="text-brand-pink font-bold">spesial</span> untuk seseorang yang <span className="text-brand-pink font-bold">luar biasa</span>. 
            Semoga setiap langkahmu ke depan selalu dipenuhi dengan kebahagiaan, cinta, dan tawa yaaa muach
          </p>
        </motion.div>
      </section>

      {/* 6. Umur (Highlight Section) */}
      <section className="py-24 bg-brand-purple/30 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl font-poppins font-black text-brand-pink mb-6 tracking-tight">
            🎂 {ageCount} Tahun 🎂
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Dua dekade penuh cerita, tawa, dan mimpi ✨
          </p>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Ciyee dah tua
          </p>
        </motion.div>
      </section>

      {/* 2.2 Songs For You */}
      <section className="pt-24 px-6 max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-poppins font-bold text-center mb-16 text-gray-800"
        >
          Song For You ✨
        </motion.h2>
        <div className="">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/5Egm9N7FnzsThl1CFXB2mm"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className='mb-5'
          />
            <p className="text-xs md:text-sm leading-relaxed text-gray-700 font-poppins italic">
              Kita tidak sedang membangun rumah, tapi merangkai pulang—biarlah ia tampak sederhana dari luar, namun hangat dan penuh makna di dalamnya; tempat harapan tumbuh pelan, dan lelahmu selalu menemukan ruang untuk beristirahat...
            </p>
          </div>
      </section>

      {/* 3. Galeri (Photo Section) */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-poppins font-bold text-center mb-16 text-gray-800"
        >
          Kenangan Indah ✨
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {PHOTOS.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group overflow-hidden rounded-3xl shadow-lg cursor-pointer aspect-square bg-gray-100"
            >
              <img 
                src={src} 
                alt={`Kenangan ${index + 1}`} 
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="text-white w-10 h-10 drop-shadow-md" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Pesan & Doa */}
      <section className="py-24 bg-brand-peach/30 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-poppins font-bold text-center mb-16 text-gray-800"
          >
            Pesan & Doa 💖
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {[
              { icon: Sparkles, text: "Semoga selalu bahagia yahhh" },
              { icon: Star, text: "Sukses dalam segala hal yang kamu impikan, Amiin" },
              { icon: Gift, text: "Diberi kesehatan dan dilindungi selalu, Amiin" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-10 rounded-3xl shadow-xl text-center hover:-translate-y-3 transition-transform duration-300 border border-brand-pink-pastel/50"
              >
                <div className="w-20 h-20 bg-brand-pink-pastel/50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <item.icon className="text-brand-pink w-10 h-10" />
                </div>
                <p className="text-xl text-gray-700 font-medium leading-relaxed">"{item.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Timeline Kenangan */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-poppins font-bold text-center mb-20 text-gray-800"
        >
          Perjalanan Hidup 🌸
        </motion.h2>
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-brand-pink-pastel before:via-brand-pink before:to-brand-pink-pastel">
          {[
            { emoji: "🌸", title: "Pertama kali ketemu", desc: "Semua cerita gila dan penuh cinta ini dimulai" },
            { emoji: "🎀", title: "Momen paling lucu bersama", desc: "Tawa ceria yang selalu menghangatkan suasana" },
            { emoji: "🎂", title: "Ulang tahun sebelumnya", desc: "Merayakan usia ke-19 dengan kebahagiaan luar biasa" },
            { emoji: "✈️", title: "Kenangan perjalanan", desc: "Menjelajahi tempat baru dan mengukir memori bersama" },
            { emoji: "💖", title: "Hari ini, 20 tahun", desc: "Menyambut babak baru yang lebih indah dan gemilang" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-brand-pink-pastel text-2xl shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {item.emoji}
              </div>
              {/* Content */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-xl text-brand-pink mb-2">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Extra Section: Surprise Button */}
      <section id="surprise-section" className="py-32 text-center px-6 relative overflow-hidden bg-gradient-to-br from-brand-pink-pastel/50 to-white">
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-poppins font-bold mb-12 text-gray-800"
          >
            Ada Kejutan Untukmu! 💝
          </motion.h2>
          <motion.button
            onClick={handleSurprise}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-gradient-to-r from-brand-pink to-pink-500 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-4 mx-auto cursor-pointer"
          >
            <Gift size={28} /> Klik untuk kejutan
          </motion.button>
          
          <AnimatePresence>
            {showConfetti && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="mt-12 p-8 bg-white rounded-3xl shadow-2xl inline-block border-2 border-brand-pink/20"
              >
                <p className="text-2xl md:text-3xl font-poppins font-bold text-brand-pink leading-relaxed">
                  Selamat ulang tahun Cayangku Cintakuu <br/>Aku Sayang Kamuu! 💕
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-10 text-center text-gray-500 bg-white border-t border-gray-100 px-6">
        <p className="mb-3 text-lg font-medium">Terima kasih sudah menjadi pribadi yang luar biasa 💖</p>
        <p className="text-base text-gray-400">Dibuat dengan ❤️ untuk Faiza Apriliana Disti &copy; 2026</p>
      </footer>
    </div>
  );
}