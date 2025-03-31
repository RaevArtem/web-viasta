import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              ВиаСтак<span className="text-accent">Климат</span>
            </h3>
            <p className="mb-4 text-gray-300">
              Продажа и установка бюджетных кондиционеров с оптимальным соотношением цены и качества.
            </p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} ВиаСтакКлимат. Все права защищены.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Каталог</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#catalog" className="text-gray-300 hover:text-primary transition">
                  Настенные кондиционеры
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="text-gray-300 hover:text-primary transition">
                  Напольные кондиционеры
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="text-gray-300 hover:text-primary transition">
                  Кассетные кондиционеры
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="text-gray-300 hover:text-primary transition">
                  Канальные кондиционеры
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="text-gray-300 hover:text-primary transition">
                  Мульти-сплит системы
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-gray-300 hover:text-primary transition">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-300 hover:text-primary transition">
                  Услуги и цены
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition">
                  Гарантия
                </Link>
              </li>
              <li>
                <Link href="/#contacts" className="text-gray-300 hover:text-primary transition">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-3 text-primary flex-shrink-0" />
                <span className="text-gray-300">г. Москва, ул. Климатическая, д. 123</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mt-1 mr-3 text-primary flex-shrink-0" />
                <a href="tel:+74951234567" className="text-gray-300 hover:text-primary transition">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mt-1 mr-3 text-primary flex-shrink-0" />
                <a href="mailto:info@viastaklimat.ru" className="text-gray-300 hover:text-primary transition">
                  info@viastaklimat.ru
                </a>
              </li>
            </ul>
            
            <h4 className="text-lg font-bold mt-6 mb-3">Мы в социальных сетях</h4>
            <div className="flex space-x-3">
              {/* Social Media Icons */}
              <a 
                href="#" 
                className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition"
                aria-label="VK"
              >
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 16.611h-1.616c-.607 0-.793-.583-1.873-1.674-1.012-.971-1.417-1.117-1.645-1.117-.337 0-.434.096-.434.551v1.535c0 .383-.127.606-1.146.606-1.695 0-3.579-1.004-4.891-2.895-1.985-2.801-2.531-4.891-2.531-5.322 0-.236.096-.455.551-.455H7.41c.408 0 .563.192.719.647.791 2.295 2.116 4.313 2.668 4.313.204 0 .3-.096.3-.623V9.045c-.06-1.12-.679-1.213-.679-1.615 0-.19.156-.383.407-.383h2.532c.348 0 .468.191.468.611v3.26c0 .348.156.468.252.468.204 0 .372-.12.744-.493.1.152 2.235-2.354 3.088-3.64.216-.384.432-.504.714-.504h1.616c.48 0 .587.252.48.6-.263 1.213-2.859 4.878-2.859 4.878-.216.36-.288.528 0 .936.204.3.875.875 1.319 1.403.815.972 1.439 1.787 1.595 2.354.18.54-.096.811-.564.811z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.68 8.476c-.112.572-.451.714-.931.444l-2.557-1.996-1.245 1.244c-.144.142-.271.272-.54.272l.181-2.832 4.921-4.69c.227-.211-.045-.329-.329-.117l-6.075 4.042-2.595-.857c-.559-.187-.57-.562.131-.836l10.16-4.145c.452-.185.85.112.683.997z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.473 4.527A11.892 11.892 0 0 0 12.001 0a11.857 11.857 0 0 0-8.473 3.527A11.857 11.857 0 0 0 0 12.001c0 2.09.54 4.136 1.573 5.949L.064 24l6.281-1.646a11.86 11.86 0 0 0 5.656 1.437h.012a11.998 11.998 0 0 0 12-12 11.86 11.86 0 0 0-3.527-7.264zm-8.48 18.276H12a9.863 9.863 0 0 1-5.024-1.38l-.36-.214-3.720.975.996-3.653-.236-.375A9.813 9.813 0 0 1 2.183 12a9.812 9.812 0 0 1 9.806-9.806 9.81 9.81 0 0 1 7.001 2.906 9.808 9.808 0 0 1 2.907 7.001 9.927 9.927 0 0 1-9.902 9.702zm5.385-7.258c-.299-.149-1.76-.867-2.034-.963-.273-.099-.473-.149-.673.149-.198.297-.769.963-.941 1.162-.174.198-.347.223-.645.075-1.761-.882-2.916-1.577-4.08-3.577-.309-.533.308-.495.884-1.646.099-.198.049-.371-.025-.518-.074-.149-.673-1.62-.921-2.221-.242-.581-.487-.5-.673-.51a12.17 12.17 0 0 0-.571-.01c-.198 0-.52.074-.792.372-.273.298-1.04 1.017-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.15.198 2.092 3.386 5.165 4.617.723.311 1.287.496 1.725.637.726.232 1.388.2 1.909.12.582-.085 1.786-.729 2.034-1.43.248-.704.248-1.307.174-1.432-.074-.123-.273-.198-.57-.347z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384c.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126A5.897 5.897 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-primary transition">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-primary transition">
                  Пользовательское соглашение
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-2">Способы оплаты:</span>
            <div className="flex space-x-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.5,9l.35,2.5H19.37L19.5,13h2.07l.34,2.5H18.12L17.6,9Zm-8.25,0,1.29,6.5h1.94L17,11.14a1.94,1.94,0,0,1,1.27-.75c1.35-.13,2.86.46,3.34,1.77A2.2,2.2,0,0,1,22,11H20l-.13-.7H18.14l-.34,1.61c-1.06-.36-1.5.42-1.45.63a.7.7,0,0,1,.84.27v.16h0V13h1.6L19,15.5H17.41L16.9,13l-1.12,2.5H14.33L16.9,9ZM5.74,9,4.25,15.5H2.5L4,9Zm-2.3,0L1.24,15.5H3l.48-2.5H6.13L5.51,15.5h2L8.33,9H6.46L6.24,10H4.22L4.44,9Zm12.44,0L14.7,9l-1,5-1.69-5h-2L8.78,15.5h1.75L11,12l1.56,3.5h1.5L15,10h0c.21-.62.66-.87,1.41-.87-.06-.09-.12-.09-.23-.13Zm-5.19,6.5L9.26,9H7.51L6.1,15.5Zm.81-3,0-.5h3.24l.05.5Z"/>
              </svg>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5,11.75v-.5a6.25,6.25,0,0,0-6.25-6.25H7.75A6.25,6.25,0,0,0,1.5,11.25v.5"/><path d="M7.25,16.5A3.75,3.75,0,1,0,11,12.75,3.75,3.75,0,0,0,7.25,16.5Z"/><circle cx="17.25" cy="9.5" r="1.25"/><circle cx="13.25" cy="13.5" r="1.25"/><circle cx="17.25" cy="17.5" r="1.25"/>
              </svg>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5,5.63V18.38A2.12,2.12,0,0,0,3.63,20.5H20.38a2.12,2.12,0,0,0,2.12-2.12V5.63A2.13,2.13,0,0,0,20.37,3.5H3.63A2.13,2.13,0,0,0,1.5,5.63ZM13.77,16.12l-2.42,2.41a1,1,0,0,1-1.35,0L7.59,16.12a1.58,1.58,0,0,1,0-2.25l2.42-2.4a1,1,0,0,1,1.35,0l2.41,2.4A1.59,1.59,0,0,1,13.77,16.12Zm7.62-8.87A1.25,1.25,0,0,1,20.14,8.5H3.86a1.25,1.25,0,0,1-1.25-1.25V5.63A1.25,1.25,0,0,1,3.86,4.38H20.14a1.25,1.25,0,0,1,1.25,1.25Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
