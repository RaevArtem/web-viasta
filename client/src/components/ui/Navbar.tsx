import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Search,
  ShoppingCart,
  Menu,
} from "lucide-react";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white ${isScrolled ? 'shadow-sm' : ''} transition-shadow duration-300`}>
      <div className="container mx-auto">
        {/* Top bar with contact info - Hidden on mobile */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <a href="tel:+74951234567" className="flex items-center hover:text-primary transition">
              <Phone className="w-4 h-4 mr-2 text-primary" />
              <span>+7 (495) 123-45-67</span>
            </a>
            <a href="mailto:info@viastaklimat.ru" className="flex items-center hover:text-primary transition">
              <Mail className="w-4 h-4 mr-2 text-primary" />
              <span>info@viastaklimat.ru</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span>Пн-Пт: 9:00 - 18:00</span>
            </span>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span>Москва, ул. Климатическая, 123</span>
            </span>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-4 px-4 md:px-0">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold font-heading text-primary">
              ВиаСтак<span className="text-accent">Климат</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`font-medium hover:text-primary transition ${location === "/" ? "text-primary" : ""}`}>
              Главная
            </Link>
            <Link href="/#catalog" className="font-medium hover:text-primary transition">
              Каталог
            </Link>
            <Link href="/#about" className="font-medium hover:text-primary transition">
              О компании
            </Link>
            <Link href="/#services" className="font-medium hover:text-primary transition">
              Услуги
            </Link>
            <Link href="/#contacts" className="font-medium hover:text-primary transition">
              Контакты
            </Link>
          </nav>

          {/* Search, Cart and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-primary"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary hidden md:flex"
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-10">
                  <Link href="/" className="font-medium hover:text-primary transition">
                    Главная
                  </Link>
                  <Link href="/#catalog" className="font-medium hover:text-primary transition">
                    Каталог
                  </Link>
                  <Link href="/#about" className="font-medium hover:text-primary transition">
                    О компании
                  </Link>
                  <Link href="/#services" className="font-medium hover:text-primary transition">
                    Услуги
                  </Link>
                  <Link href="/#contacts" className="font-medium hover:text-primary transition">
                    Контакты
                  </Link>

                  <div className="pt-6 border-t border-gray-200 space-y-4 mt-4">
                    <a href="tel:+74951234567" className="flex items-center hover:text-primary transition">
                      <Phone className="w-4 h-4 mr-2 text-primary" />
                      <span>+7 (495) 123-45-67</span>
                    </a>
                    <a href="mailto:info@viastaklimat.ru" className="flex items-center hover:text-primary transition">
                      <Mail className="w-4 h-4 mr-2 text-primary" />
                      <span>info@viastaklimat.ru</span>
                    </a>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>Пн-Пт: 9:00 - 18:00</span>
                    </span>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search form (shown conditionally) */}
        {searchOpen && (
          <div className="py-4 px-4 md:px-0 border-t border-gray-200">
            <form className="flex">
              <input
                type="text"
                placeholder="Поиск кондиционеров..."
                className="w-full px-4 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" className="rounded-l-none">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
