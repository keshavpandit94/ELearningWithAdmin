import React from "react";
<<<<<<< HEAD
import { motion } from "framer-motion";
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
<<<<<<< HEAD
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
=======
} from "lucide-react";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6 sm:px-8 lg:px-12 bg-white rounded-2xl shadow-xl">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12 text-center border-b pb-6">
        Contact Us
      </h1>

      {/* Sections */}
      <div className="space-y-12 text-gray-700 text-base sm:text-lg">
        {/* Customer Support */}
        <section>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-blue-700 border-b pb-3">
            Customer Support
          </h2>
          <p>
            For questions, assistance, or issues with your courses, please reach
            out to our support team:
          </p>
          <ul className="mt-4 space-y-4">
            <li className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-blue-100">
                <Mail className="w-6 h-6 text-blue-600" />
              </span>
              <a
                href="mailto:support@elearning.com"
                className="text-blue-600 hover:underline"
              >
                support@elearning.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-green-100">
                <Phone className="w-6 h-6 text-green-600" />
              </span>
              <a
                href="tel:+1234567890"
                className="text-green-600 hover:underline"
              >
                +1 (234) 567-890
              </a>
            </li>
          </ul>
        </section>

        {/* Sales Inquiries */}
        <section>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-blue-700 border-b pb-3">
            Sales Inquiries
          </h2>
          <p>
            Interested in partnerships, bulk course purchases, or custom
            training solutions? Contact our sales team:
          </p>
          <ul className="mt-4 space-y-4">
            <li className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-purple-100">
                <Mail className="w-6 h-6 text-purple-600" />
              </span>
              <a
                href="mailto:sales@elearning.com"
                className="text-purple-600 hover:underline"
              >
                sales@elearning.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-green-100">
                <Phone className="w-6 h-6 text-green-600" />
              </span>
              <a
                href="tel:+1987654321"
                className="text-green-600 hover:underline"
              >
                +1 (987) 654-321
              </a>
            </li>
          </ul>
        </section>

        {/* General Inquiries */}
        <section>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-blue-700 border-b pb-3">
            General Inquiries
          </h2>
          <p>
            If you want to get in touch for any other reason, feel free to
            contact us via:
          </p>
          <ul className="mt-4 space-y-4">
            <li className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-indigo-100">
                <Mail className="w-6 h-6 text-indigo-600" />
              </span>
              <a
                href="mailto:info@elearning.com"
                className="text-indigo-600 hover:underline"
              >
                info@elearning.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-green-100">
                <Phone className="w-6 h-6 text-green-600" />
              </span>
              <a
                href="tel:+11234567890"
                className="text-green-600 hover:underline"
              >
                +1 (123) 456-7890
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-red-100">
                <MapPin className="w-6 h-6 text-red-600" />
              </span>
              <span>
                123 Learning St, Knowledge City, Education State, 12345
              </span>
            </li>
          </ul>
        </section>

        {/* Social Media */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8 text-blue-700 border-b pb-3">
            Follow Us
          </h2>
          <div className="flex justify-center gap-8 text-3xl sm:text-4xl">
            <a
              href="https://facebook.com/elearning"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition"
            >
              <Facebook className="text-blue-600" />
            </a>
            <a
              href="https://twitter.com/elearning"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="p-3 rounded-full bg-sky-100 hover:bg-sky-200 transition"
            >
              <Twitter className="text-sky-500" />
            </a>
            <a
              href="https://linkedin.com/company/elearning"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-blue-50 hover:bg-blue-200 transition"
            >
              <Linkedin className="text-blue-700" />
            </a>
            <a
              href="https://instagram.com/elearning"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 rounded-full bg-pink-100 hover:bg-pink-200 transition"
            >
              <Instagram className="text-pink-500" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
