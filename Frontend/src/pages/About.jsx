import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Headphones,
  Briefcase,
  Globe,
  MessageSquare
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ContactCard = ({ icon: Icon, title, subtitle, color, link, linkText }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] flex flex-col items-center text-center group transition-all hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.1)]"
  >
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6 shadow-inner transform group-hover:rotate-6 transition-transform`}>
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{title}</h3>
    <p className="text-slate-500 text-sm mb-6 leading-relaxed">{subtitle}</p>
    <a 
      href={link} 
      className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-2"
    >
      {linkText}
    </a>
  </motion.div>
);

export default function About() {
  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <motion.header 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-6">
            <MessageSquare size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
            Let’s start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 italic">conversation.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about a course or want to partner with us? Our global team is here to help you unlock your full potential.
          </p>
        </motion.header>

        {/* --- Contact Bento Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <ContactCard 
            icon={Headphones}
            title="Customer Support"
            subtitle="Need help with a course or your account? Our team is available 24/7."
            color="bg-blue-50 text-blue-600"
            link="mailto:support@elearning.com"
            linkText="support@elearning.com"
          />
          <ContactCard 
            icon={Briefcase}
            title="Sales Inquiries"
            subtitle="Interested in bulk licenses or custom training for your company?"
            color="bg-indigo-50 text-indigo-600"
            link="mailto:sales@elearning.com"
            linkText="sales@elearning.com"
          />
          <ContactCard 
            icon={Globe}
            title="General Inquiries"
            subtitle="Everything else from media requests to simple hellos."
            color="bg-emerald-50 text-emerald-600"
            link="mailto:info@elearning.com"
            linkText="info@elearning.com"
          />
        </div>

        {/* --- Address & Socials Bento --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Office Location */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white flex flex-col justify-center relative overflow-hidden"
          >
            <MapPin className="text-blue-500 mb-6" size={40} />
            <h2 className="text-3xl font-black mb-4 tracking-tight">Main Campus</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-sm">
              123 Learning St, Knowledge City, <br />
              Education State, 12345
            </p>
            <div className="flex gap-4">
               <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">United States</span>
               <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">Remote Friendly</span>
            </div>
            {/* Decorative blob */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Social Hub */}
          <div className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-100 shadow-sm flex flex-col justify-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Follow Our Journey</h2>
            <p className="text-slate-500 mb-10 font-medium">Join 50k+ students getting daily tips and updates.</p>
            
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
                { icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
                { icon: Linkedin, color: "hover:bg-blue-700", label: "LinkedIn" },
                { icon: Instagram, color: "hover:bg-pink-500", label: "Instagram" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:text-white ${social.color} shadow-sm`}
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}