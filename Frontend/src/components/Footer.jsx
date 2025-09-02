import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone
} from "lucide-react";

export default function Footer({ isLoggedIn }) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
            E-Learning Platform is dedicated to providing quality online education accessible anytime, anywhere. Join thousands of learners achieving their goals with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/courses" className="hover:text-white transition">Courses</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/about-us" className="hover:text-white transition">Contact</a></li>
            {!isLoggedIn && (
              <>
                <li><a href="/login" className="hover:text-white transition">Login</a></li>
                <li><a href="/signup" className="hover:text-white transition">Sign Up</a></li>
              </>
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:support@elearning.com" className="hover:text-white transition">
                support@elearning.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+1234567890" className="hover:text-white transition">
                +1 (234) 567-890
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white transition">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white transition">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} E-Learning Platform. All Rights Reserved.
      </div>
    </footer>
  );
}
