import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
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
