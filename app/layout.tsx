"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heart, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Book Appointment', path: '/book' },
  { name: 'Services', path: '/#services' },
  { name: 'About', path: '/#about' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (pathname !== '/') {
      router.push(`/${sectionId}`);
    }
  };

  const handleNavClick = (path: string) => {
    if (path.includes('#')) {
      const sectionId = path.split('#')[1];
      scrollToSection(sectionId);
    } else {
      router.push(path);
    }
    setMobileMenuOpen(false);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Navbar */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
                onClick={() => router.push('/')}
                style={{ cursor: 'pointer' }}
              >
                <Heart className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">HealthCare</span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleNavClick(item.path)}
                      className={pathname === item.path ? 'text-primary' : ''}
                    >
                      {item.name}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="md:hidden"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t"
              >
                <div className="container mx-auto px-4 py-4">
                  <div className="flex flex-col gap-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Button
                          variant="ghost"
                          onClick={() => handleNavClick(item.path)}
                          className="w-full justify-start"
                        >
                          {item.name}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Main Content */}
        <main className="pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-primary text-primary-foreground"
        >
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  <span className="font-bold text-lg">HealthCare</span>
                </div>
                <p className="text-sm opacity-80">
                  Providing exceptional medical care with cutting-edge technology
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="font-semibold">Quick Links</h3>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Button
                        variant="link"
                        className="text-primary-foreground p-0 h-auto"
                        onClick={() => handleNavClick(item.path)}
                      >
                        {item.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="font-semibold">Contact</h3>
                <div className="space-y-2 opacity-80">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </p>
                  <p>123 Healthcare Ave</p>
                  <p>Medical District, MD 12345</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="font-semibold">Hours</h3>
                <div className="space-y-2 opacity-80">
                  <p>Monday - Friday</p>
                  <p>9:00 AM - 6:00 PM</p>
                  <p>Saturday</p>
                  <p>9:00 AM - 1:00 PM</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-primary-foreground/20 text-center opacity-60"
            >
              <p>&copy; {new Date().getFullYear()} HealthCare. All rights reserved.</p>
            </motion.div>
          </div>
        </motion.footer>
      </body>
    </html>
  );
}