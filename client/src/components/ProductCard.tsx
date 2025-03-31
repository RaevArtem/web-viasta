import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";
import { Eye, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="relative">
        {product.tag && (
          <Badge 
            className="absolute top-2 left-2 z-10" 
            variant={
              product.tag === "Бестселлер" ? "destructive" : 
              product.tag === "Выгодно" ? "default" : 
              product.tag === "Распродажа" ? "destructive" : 
              "outline"
            }
          >
            {product.tag}
          </Badge>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold">{product.name}</h3>
          <Badge variant={product.inStock ? "success" : "outline"} className={product.inStock ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
            {product.inStock ? "В наличии" : "Под заказ"}
          </Badge>
        </div>
        <div className="mb-4">
          <div className="flex items-center text-sm mb-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2 text-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span>Площадь: {product.area}</span>
          </div>
          <div className="flex items-center text-sm mb-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2 text-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Мощность охлаждения: {product.coolingPower} кВт</span>
          </div>
          <div className="flex items-center text-sm">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2 text-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536M5.586 8.464l3.536 3.536" />
            </svg>
            <span>Уровень шума: {product.noiseLevel} дБ</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div>
            <p className="text-xl font-bold">{product.price.toLocaleString()} ₽</p>
            {product.oldPrice && (
              <p className="text-sm line-through text-gray-500">{product.oldPrice.toLocaleString()} ₽</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button asChild variant="outline" size="icon" className="text-primary border-primary hover:bg-primary/5">
              <Link href={`/product/${product.id}`}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">Просмотр</span>
              </Link>
            </Button>
            <Button size="icon" className="bg-accent hover:bg-accent/90">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">В корзину</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
