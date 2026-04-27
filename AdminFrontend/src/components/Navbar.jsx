import { Menu, Search, Bell, Settings, ChevronDown, UserCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ onToggleSidebar, title }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-4 md:px-8 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        
        {/* --- LEFT: Mobile Toggle & Title --- */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden sm:block">
             <div className="flex items-center gap-2 text-blue-600 mb-0.5">
                <Sparkles size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Admin Console</span>
             </div>
             <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                {title}
             </h1>
          </div>
        </div>

        {/* --- CENTER: Command Search (Desktop Only) --- */}
        <div className="hidden md:flex items-center flex-1 max-w-md relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search analytics, courses, or users..." 
            className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-400 shadow-sm">
            ⌘ K
          </kbd>
        </div>

        {/* --- RIGHT: Admin Actions --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Notifications Toggle */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </motion.button>

          {/* Quick Settings */}
          <button className="hidden sm:flex p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
            <Settings size={20} />
          </button>

          <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block" />

          {/* Admin Profile Pill */}
          <motion.button 
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200 transition-all border border-slate-800"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <UserCircle size={20} />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[10px] font-black text-blue-300 uppercase leading-none">Super Admin</p>
              <p className="text-sm font-bold text-white">Aditya</p>
            </div>
            <ChevronDown size={14} className="opacity-50" />
          </motion.button>

        </div>
      </div>
    </header>
  );
}