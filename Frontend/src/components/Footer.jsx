import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  ArrowUpRight,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer({ isLoggedIn }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0c10] text-slate-400 py-16 px-6 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter">ELRN.</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Empowering a global community of learners through expert-led content and next-generation interactive technology.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: "https://facebook.com" },
                { Icon: Twitter, href: "https://twitter.com" },
                { Icon: Linkedin, href: "https://linkedin.com" },
                { Icon: Instagram, href: "https://instagram.com" }
              ].map(({ Icon, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, textShadow: "0 0 8px rgb(255,255,255)" }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 hover:text-white transition-all shadow-sm"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-tight">Platform</h3>
            <ul className="space-y-4 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "Browse Courses", href: "/courses" },
                { name: "About Us", href: "/about" },
                { name: "Contact Support", href: "/about-us" }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="group flex items-center gap-1 hover:text-white transition-colors">
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account/Auth Logic */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-tight">Account</h3>
            <ul className="space-y-4 text-sm">
              {isLoggedIn ? (
                <>
                  <li><a href="/my-courses" className="hover:text-white transition-colors">My Learning</a></li>
                  <li><a href="/profile" className="hover:text-white transition-colors">Settings</a></li>
                </>
              ) : (
                <>
                  <li><a href="/login" className="hover:text-white transition-colors">Sign In</a></li>
                  <li><a href="/signup" className="hover:text-white transition-colors">Create Account</a></li>
                </>
              )}
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Information Card */}
          <div className="bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800">
            <h3 className="text-white font-bold mb-6 tracking-tight">Get in Touch</h3>
            <div className="space-y-4 text-sm">
              <a href="mailto:support@elearning.com" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                   <Mail size={14} />
                </div>
                support@elearning.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                  <Phone size={14} />
                </div>
                +1 (234) 567-890
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">
          <p>© {currentYear} E-Learning Platform. Built for the future.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Status</a>
            <a href="#" className="hover:text-slate-400">Security</a>
            <a href="#" className="hover:text-slate-400">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}