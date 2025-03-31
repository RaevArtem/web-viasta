import { 
  products, type Product, type InsertProduct,
  services, type Service, type InsertService,
  testimonials, type Testimonial, type InsertTestimonial,
  faqs, type Faq, type InsertFaq,
  contactForms, type ContactForm, type InsertContactForm,
  benefits, type Benefit, type InsertBenefit
} from "@shared/schema";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByFilter(filters: ProductFilter): Promise<Product[]>;
  addProduct(product: InsertProduct): Promise<Product>;
  
  // Services
  getAllServices(): Promise<Service[]>;
  
  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  
  // FAQs
  getAllFaqs(): Promise<Faq[]>;
  
  // Contact Forms
  submitContactForm(form: InsertContactForm): Promise<ContactForm>;
  
  // Benefits
  getAllBenefits(): Promise<Benefit[]>;
}

export interface ProductFilter {
  area?: string;
  type?: string;
  brand?: string;
  priceRange?: string;
}

export class MemStorage implements IStorage {
  private productsStore: Map<number, Product>;
  private servicesStore: Map<number, Service>;
  private testimonialsStore: Map<number, Testimonial>;
  private faqsStore: Map<number, Faq>;
  private contactFormsStore: Map<number, ContactForm>;
  private benefitsStore: Map<number, Benefit>;
  
  private productId: number = 1;
  private serviceId: number = 1;
  private testimonialId: number = 1;
  private faqId: number = 1;
  private contactFormId: number = 1;
  private benefitId: number = 1;

  constructor() {
    this.productsStore = new Map();
    this.servicesStore = new Map();
    this.testimonialsStore = new Map();
    this.faqsStore = new Map();
    this.contactFormsStore = new Map();
    this.benefitsStore = new Map();
    
    this.initData();
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.productsStore.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.productsStore.get(id);
  }

  async getProductsByFilter(filters: ProductFilter): Promise<Product[]> {
    let filteredProducts = Array.from(this.productsStore.values());
    
    if (filters.area && filters.area !== 'Все размеры') {
      filteredProducts = filteredProducts.filter(product => {
        switch(filters.area) {
          case 'До 20 м²': return product.area.includes('20');
          case '20-30 м²': return parseInt(product.area.match(/\d+/g)?.[0] || '0') >= 20 && parseInt(product.area.match(/\d+/g)?.[0] || '0') <= 30;
          case '30-50 м²': return parseInt(product.area.match(/\d+/g)?.[0] || '0') >= 30 && parseInt(product.area.match(/\d+/g)?.[0] || '0') <= 50;
          case 'Более 50 м²': return parseInt(product.area.match(/\d+/g)?.[0] || '0') > 50;
          default: return true;
        }
      });
    }
    
    if (filters.type && filters.type !== 'Все типы') {
      filteredProducts = filteredProducts.filter(product => product.type === filters.type);
    }
    
    if (filters.brand && filters.brand !== 'Все бренды') {
      filteredProducts = filteredProducts.filter(product => product.brand === filters.brand);
    }
    
    if (filters.priceRange && filters.priceRange !== 'Любая') {
      filteredProducts = filteredProducts.filter(product => {
        switch(filters.priceRange) {
          case 'До 30 000 ₽': return product.price <= 30000;
          case '30 000 - 50 000 ₽': return product.price > 30000 && product.price <= 50000;
          case '50 000 - 80 000 ₽': return product.price > 50000 && product.price <= 80000;
          case 'Более 80 000 ₽': return product.price > 80000;
          default: return true;
        }
      });
    }
    
    return filteredProducts;
  }

  async addProduct(product: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const newProduct = { ...product, id };
    this.productsStore.set(id, newProduct);
    return newProduct;
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.servicesStore.values());
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonialsStore.values());
  }

  // FAQs
  async getAllFaqs(): Promise<Faq[]> {
    return Array.from(this.faqsStore.values());
  }

  // Contact Forms
  async submitContactForm(form: InsertContactForm): Promise<ContactForm> {
    const id = this.contactFormId++;
    const newForm = { 
      ...form, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contactFormsStore.set(id, newForm);
    return newForm;
  }
  
  // Benefits
  async getAllBenefits(): Promise<Benefit[]> {
    return Array.from(this.benefitsStore.values());
  }

  // Initialize data
  private initData() {
    // Add products
    [
      {
        name: "Haier AS25TADHRA-CL",
        brand: "Haier",
        image: "https://images.unsplash.com/photo-1628414881227-ce7f14eacbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        price: 27990,
        oldPrice: 32490,
        area: "до 25 м²",
        coolingPower: 2.5,
        noiseLevel: 22,
        type: "Настенные",
        tag: "Бестселлер",
        isInverter: true,
        hasWifi: true,
        energyClass: "A+",
        inStock: true
      },
      {
        name: "HISENSE AS-07HR4SYDTG5",
        brand: "HISENSE",
        image: "https://images.unsplash.com/photo-1628414879233-71008aed5c4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        price: 24590,
        oldPrice: 29990,
        area: "до 20 м²",
        coolingPower: 2.2,
        noiseLevel: 24,
        type: "Настенные",
        tag: "Выгодно",
        isInverter: true,
        hasWifi: true,
        energyClass: "A++",
        inStock: true
      },
      {
        name: "Mitsubishi SRK20ZSPR-S",
        brand: "Mitsubishi",
        image: "https://images.unsplash.com/photo-1674376598797-627f72cb69e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        price: 32790,
        oldPrice: 38490,
        area: "до 20 м²",
        coolingPower: 2.0,
        noiseLevel: 19,
        type: "Настенные",
        isInverter: false,
        hasWifi: false,
        energyClass: "A",
        inStock: false
      },
      {
        name: "Daikin FTXB35C/RXB35C",
        brand: "Daikin",
        image: "https://images.unsplash.com/photo-1587212705571-16235d95d975?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        price: 42990,
        oldPrice: 48490,
        area: "до 35 м²",
        coolingPower: 3.5,
        noiseLevel: 21,
        type: "Настенные",
        tag: "Инвертор",
        isInverter: true,
        hasWifi: true,
        energyClass: "A+",
        inStock: true
      },
      {
        name: "Haier AS09NA6HRA",
        brand: "Haier",
        image: "https://images.unsplash.com/photo-1570907965102-1fd287d4a569?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        price: 25490,
        oldPrice: 34990,
        area: "до 25 м²",
        coolingPower: 2.5,
        noiseLevel: 26,
        type: "Настенные",
        tag: "Распродажа",
        isInverter: false,
        hasWifi: false,
        energyClass: "A",
        inStock: true
      },
      {
        name: "HISENSE AS-13UR4SVDDB5",
        brand: "HISENSE",
        image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        price: 29990,
        oldPrice: 36490,
        area: "до 35 м²",
        coolingPower: 3.5,
        noiseLevel: 23,
        type: "Настенные",
        isInverter: true,
        hasWifi: true,
        energyClass: "A+",
        inStock: true
      }
    ].forEach(product => this.addProduct(product));

    // Add services
    [
      {
        title: "Монтаж кондиционеров",
        description: "Профессиональная установка с соблюдением всех технических норм и требований производителя.",
        icon: "tools",
        features: [
          "Стандартный монтаж от 4990 ₽",
          "Монтаж с расширенной трассой",
          "Монтаж мульти-сплит систем"
        ]
      },
      {
        title: "Сервисное обслуживание",
        description: "Регулярное обслуживание для продления срока службы и эффективной работы оборудования.",
        icon: "broom",
        features: [
          "Диагностика от 1500 ₽",
          "Чистка и дезинфекция",
          "Заправка фреоном"
        ]
      },
      {
        title: "Ремонт и диагностика",
        description: "Оперативный ремонт любой сложности с использованием оригинальных запчастей.",
        icon: "wrench",
        features: [
          "Диагностика неисправностей",
          "Замена компонентов",
          "Устранение утечек фреона"
        ]
      }
    ].forEach(service => {
      const id = this.serviceId++;
      this.servicesStore.set(id, { ...service, id });
    });

    // Add testimonials
    [
      {
        name: "Иван Петров",
        location: "Москва",
        text: "Очень доволен покупкой кондиционера Haier. Специалисты помогли выбрать модель под мою квартиру, быстро доставили и установили. Работает тихо, охлаждает отлично.",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 5,
        date: "2 недели назад"
      },
      {
        name: "Ольга Сидорова",
        location: "Санкт-Петербург",
        text: "Приобрела кондиционер HISENSE по совету менеджера. Приятно удивлена соотношением цены и качества. Монтаж выполнен аккуратно и быстро. За месяц использования никаких проблем не возникло.",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 4.5,
        date: "1 месяц назад"
      },
      {
        name: "Алексей Смирнов",
        location: "Екатеринбург",
        text: "Заказывал кондиционер для офиса. Порадовал профессиональный подход: помогли с выбором подходящей мощности, учли особенности помещения. Монтаж без нареканий, всем рекомендую!",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 5,
        date: "2 месяца назад"
      }
    ].forEach(testimonial => {
      const id = this.testimonialId++;
      this.testimonialsStore.set(id, { ...testimonial, id });
    });

    // Add FAQs
    [
      {
        question: "Как выбрать мощность кондиционера для помещения?",
        answer: "Для правильного выбора мощности кондиционера нужно учитывать площадь помещения, высоту потолков, количество окон и их ориентацию по сторонам света, количество людей и теплоизлучающих приборов. Примерный расчет: на 10 м² требуется около 1 кВт мощности охлаждения. Для точного расчета лучше проконсультироваться с нашими специалистами."
      },
      {
        question: "Что такое инверторный кондиционер и чем он отличается от обычного?",
        answer: "Инверторный кондиционер оснащен компрессором с плавной регулировкой мощности, который не выключается полностью, а снижает обороты при достижении заданной температуры. Преимущества инверторных моделей: экономия электроэнергии до 30-40%, более точное поддержание температуры, пониженный уровень шума, увеличенный срок службы компрессора."
      },
      {
        question: "Сколько стоит установка кондиционера?",
        answer: "Стоимость стандартной установки настенного кондиционера начинается от 4990 рублей. В стандартный монтаж входит: монтаж внутреннего и наружного блоков, прокладка межблочных коммуникаций до 3 метров, вакуумирование системы, пусконаладочные работы. Точная стоимость зависит от сложности монтажа, длины трассы и дополнительных материалов."
      },
      {
        question: "Какой срок службы у бюджетных кондиционеров?",
        answer: "При правильной эксплуатации и регулярном обслуживании современные бюджетные кондиционеры служат в среднем 7-10 лет. Качественный монтаж и своевременное сервисное обслуживание (1-2 раза в год) значительно продлевают срок службы оборудования."
      },
      {
        question: "Какая гарантия предоставляется на кондиционеры и монтаж?",
        answer: "Мы предоставляем гарантию до 3 лет на оборудование и 1 год на монтажные работы при условии регулярного сервисного обслуживания. Сроки гарантии зависят от модели кондиционера и условий эксплуатации."
      }
    ].forEach(faq => {
      const id = this.faqId++;
      this.faqsStore.set(id, { ...faq, id });
    });

    // Add benefits
    [
      {
        title: "Оптимальное соотношение цены и качества",
        description: "Мы подбираем модели, которые имеют лучшие показатели надежности в бюджетном сегменте.",
        icon: "money-bill-wave"
      },
      {
        title: "Профессиональный монтаж",
        description: "Наши специалисты имеют многолетний опыт установки климатического оборудования любой сложности.",
        icon: "tools"
      },
      {
        title: "Гарантия до 3 лет",
        description: "Предоставляем расширенную гарантию на оборудование и выполненные работы с быстрым сервисным обслуживанием.",
        icon: "shield-alt"
      }
    ].forEach(benefit => {
      const id = this.benefitId++;
      this.benefitsStore.set(id, { ...benefit, id });
    });
  }
}

export const storage = new MemStorage();
