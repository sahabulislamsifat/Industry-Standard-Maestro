import Logo from "@/assets/icons/Logo";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  const sections = [
    {
      title: "Tours",
      links: [
        { name: "All Tours", href: "/tours" },
        { name: "Popular Tours", href: "/tours/popular" },
        { name: "Recommended Tours", href: "/tours/recommended" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Meet the Team", href: "/team" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", href: "/faq" },
        { name: "Live Chat", href: "/help" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Refund Policy", href: "/refund" },
        { name: "Accessibility", href: "/accessibility" },
      ],
    },
  ];

  return (
    <footer className="transition-colors duration-300">
      <div className="mx-auto container px-4 py-12 md:py-16 space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Logo + Description + Social */}
          <div>
            <div className="text-foreground">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-gray-600 dark:text-gray-400">
              Explore Bangladesh with our curated tours and unforgettable
              experiences. Plan your dream trip today!
            </p>

            <ul className="mt-6 flex gap-4">
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <span className="sr-only text-gray-500 dark:text-gray-400">
                    Facebook
                  </span>
                  <FaFacebookF className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition"
                >
                  <span className="sr-only text-gray-500 dark:text-gray-400">
                    Instagram
                  </span>
                  <FaInstagram className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition"
                >
                  <span className="sr-only text-gray-500 dark:text-gray-400">
                    Twitter
                  </span>
                  <FaTwitter className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  <span className="sr-only text-gray-500 dark:text-gray-400">
                    GitHub
                  </span>
                  <FaGithub className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>

          {/* Links section */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="font-medium text-gray-600 dark:text-gray-400">
                  {section.title}
                </p>
                <ul className="mt-6 text-gray-600 dark:text-gray-400 space-y-4 text-sm">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="hover:opacity-75 transition"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()}. Tour Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
