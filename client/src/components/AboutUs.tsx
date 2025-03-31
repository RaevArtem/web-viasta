import { 
  Card, 
  CardContent 
} from "@/components/ui/card";

const AboutUs = () => {
  return (
    <section id="about" className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">О компании ВиаСтакКлимат</h2>
            <p className="mb-4">
              Компания ВиаСтакКлимат специализируется на продаже и установке кондиционеров бюджетного сегмента, которые обеспечивают оптимальное соотношение цены и качества.
            </p>
            <p className="mb-4">
              Мы помогаем нашим клиентам создать комфортный микроклимат в помещении, не переплачивая за избыточную функциональность или бренд. Наши специалисты тщательно отбирают модели, которые обладают хорошими техническими характеристиками, надежностью и доступной ценой.
            </p>
            <p className="mb-4">
              Работаем на рынке климатического оборудования более 10 лет и гордимся тысячами успешно реализованных проектов.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0 text-center">
                  <h3 className="text-3xl font-bold text-primary">10+</h3>
                  <p className="text-sm">Лет опыта</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0 text-center">
                  <h3 className="text-3xl font-bold text-primary">5000+</h3>
                  <p className="text-sm">Довольных клиентов</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0 text-center">
                  <h3 className="text-3xl font-bold text-primary">15+</h3>
                  <p className="text-sm">Брендов кондиционеров</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0 text-center">
                  <h3 className="text-3xl font-bold text-primary">3</h3>
                  <p className="text-sm">Года гарантии</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Монтаж кондиционера специалистами ВиаСтакКлимат" 
                className="rounded-lg shadow-lg w-full"
              />
              <Card className="absolute -bottom-4 -right-4 shadow-lg md:w-64 hidden md:block">
                <CardContent className="p-3">
                  <div className="flex items-center mb-2">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Директор компании" 
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-bold">Алексей Климатов</h4>
                      <p className="text-sm text-gray-600">Технический директор</p>
                    </div>
                  </div>
                  <p className="text-sm italic">"Мы подбираем только те модели, которые установили бы себе дома."</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
