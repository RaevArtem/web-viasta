import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Product } from "@shared/schema";
import { Loader2, Check, X, Info, Star, ShoppingCart, Eye } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const productId = parseInt(id || "0");

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto py-16">
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-center mb-4">Товар не найден</h1>
            <p className="text-center">
              К сожалению, запрашиваемый товар не найден или был удален.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-muted-foreground">Бренд: {product.brand}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative">
          {product.tag && (
            <Badge className="absolute top-4 left-4 z-10" variant={product.tag === "Бестселлер" ? "destructive" : "default"}>
              {product.tag}
            </Badge>
          )}
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant={product.inStock ? "success" : "outline"} className={product.inStock ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
              {product.inStock ? "В наличии" : "Под заказ"}
            </Badge>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-4 h-4 text-yellow-400" fill="#FBBF24" />
              ))}
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              <span>Площадь: {product.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              <span>Мощность охлаждения: {product.coolingPower} кВт</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              <span>Уровень шума: {product.noiseLevel} дБ</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              <span>Класс энергоэффективности: {product.energyClass}</span>
            </div>
            <div className="flex items-center gap-2">
              {product.isInverter ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
              <span>Инверторный</span>
            </div>
            <div className="flex items-center gap-2">
              {product.hasWifi ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
              <span>Wi-Fi управление</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-end gap-4 mb-6">
            <div>
              <p className="text-3xl font-bold">
                {product.price.toLocaleString()} ₽
              </p>
              {product.oldPrice && (
                <p className="text-sm line-through text-muted-foreground">
                  {product.oldPrice.toLocaleString()} ₽
                </p>
              )}
            </div>
            <p className="text-sm text-green-600">
              {product.oldPrice ? `Выгода ${(product.oldPrice - product.price).toLocaleString()} ₽` : ""}
            </p>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Добавить в корзину
            </Button>
            <Button variant="outline" size="lg">
              <Eye className="mr-2 h-5 w-5" />
              Подробнее
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="description">Описание</TabsTrigger>
          <TabsTrigger value="specifications">Характеристики</TabsTrigger>
          <TabsTrigger value="delivery">Доставка и оплата</TabsTrigger>
          <TabsTrigger value="warranty">Гарантия</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="space-y-4">
          <h3 className="text-xl font-bold">О кондиционере {product.name}</h3>
          <p>
            {product.name} - это современный {product.isInverter ? "инверторный" : ""} кондиционер от компании {product.brand}, 
            который обеспечивает эффективное охлаждение помещения площадью {product.area}. 
            Благодаря мощности охлаждения {product.coolingPower} кВт, устройство быстро создает комфортный микроклимат.
          </p>
          <p>
            Одним из ключевых преимуществ данной модели является низкий уровень шума - всего {product.noiseLevel} дБ, 
            что делает работу кондиционера практически незаметной. Класс энергоэффективности {product.energyClass} 
            обеспечивает экономичное энергопотребление и снижает затраты на электроэнергию.
          </p>
          {product.isInverter && (
            <p>
              Инверторная технология позволяет плавно регулировать мощность компрессора, 
              что обеспечивает более точное поддержание заданной температуры и экономию электроэнергии до 30-40%.
            </p>
          )}
          {product.hasWifi && (
            <p>
              Встроенный Wi-Fi модуль позволяет управлять кондиционером с помощью смартфона из любой точки мира.
            </p>
          )}
        </TabsContent>
        <TabsContent value="specifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Основные характеристики</h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Бренд</span>
                  <span className="font-medium">{product.brand}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Тип</span>
                  <span className="font-medium">{product.type}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Площадь помещения</span>
                  <span className="font-medium">{product.area}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Мощность охлаждения</span>
                  <span className="font-medium">{product.coolingPower} кВт</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Уровень шума</span>
                  <span className="font-medium">{product.noiseLevel} дБ</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Дополнительные характеристики</h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Инверторное управление</span>
                  <span className="font-medium">{product.isInverter ? "Да" : "Нет"}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Wi-Fi управление</span>
                  <span className="font-medium">{product.hasWifi ? "Да" : "Нет"}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Класс энергоэффективности</span>
                  <span className="font-medium">{product.energyClass}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Наличие</span>
                  <span className="font-medium">{product.inStock ? "В наличии" : "Под заказ"}</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="delivery">
          <h3 className="text-xl font-bold mb-4">Доставка и оплата</h3>
          <div className="space-y-4">
            <p>
              Мы осуществляем доставку кондиционеров по всей России. Стоимость доставки зависит от региона и рассчитывается индивидуально.
            </p>
            <h4 className="text-lg font-semibold">Способы доставки:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Доставка курьером по Москве и Московской области</li>
              <li>Доставка транспортной компанией по России</li>
              <li>Самовывоз из нашего офиса</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4">Способы оплаты:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Наличными при получении</li>
              <li>Банковской картой</li>
              <li>Безналичный расчет (для юридических лиц)</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="warranty">
          <h3 className="text-xl font-bold mb-4">Гарантия</h3>
          <div className="space-y-4">
            <p>
              На кондиционер {product.name} предоставляется официальная гарантия производителя сроком до 3 лет при условии регулярного сервисного обслуживания.
            </p>
            <h4 className="text-lg font-semibold">Условия гарантии:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Гарантия на оборудование - до 3 лет</li>
              <li>Гарантия на монтажные работы - 1 год</li>
              <li>Гарантийное обслуживание осуществляется при наличии документов, подтверждающих покупку</li>
              <li>Для сохранения гарантии необходимо регулярное сервисное обслуживание (1-2 раза в год)</li>
            </ul>
            <p className="font-medium">
              В случае возникновения неисправностей, обратитесь в наш сервисный центр по телефону +7 (495) 123-45-67
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetails;
