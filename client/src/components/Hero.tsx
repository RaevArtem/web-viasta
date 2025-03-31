import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Бюджетные кондиционеры <span className="text-primary">отличного качества</span>
            </h1>
            <p className="text-lg mb-6">
              Подберем и установим кондиционер, который справится с задачей охлаждения помещения по доступной цене. Гарантия качества и долговечности.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 shadow-md">
                <Link href="#catalog">
                  Перейти к каталогу
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                <Link href="#consultation">
                  Получить консультацию
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1659192806930-d1edf1e3fe75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Современный кондиционер в интерьере" 
              className="rounded-lg shadow-lg w-full"
            />
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded shadow-lg hidden md:block">
              <div className="flex items-center space-x-1 mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="font-bold">Более 1000 довольных клиентов</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
