import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";
import { Check, X, Loader2 } from "lucide-react";

const ProductComparison = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  if (isLoading) {
    return (
      <div className="py-12 bg-white flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Select the first 3 products for comparison
  const comparisonProducts = products?.slice(0, 3) || [];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Сравнение популярных моделей</h2>
          <p className="text-lg">Выберите оптимальный кондиционер для ваших задач</p>
        </div>
        
        {comparisonProducts.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="p-3 text-left w-1/5">Характеристики</th>
                  {comparisonProducts.map((product, index) => (
                    <th key={product.id} className={`p-3 text-center ${index === 0 ? 'bg-secondary' : ''}`}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="mx-auto w-32 h-24 object-cover mb-2 rounded"
                      />
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="font-bold text-primary mt-1">{product.price.toLocaleString()} ₽</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Площадь помещения</td>
                  {comparisonProducts.map((product, index) => (
                    <td key={`${product.id}-area`} className={`p-3 text-center ${index === 0 ? 'bg-secondary' : ''}`}>
                      {product.area}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Мощность охлаждения</td>
                  {comparisonProducts.map((product, index) => (
                    <td key={`${product.id}-power`} className={`p-3 text-center ${index === 0 ? 'bg-secondary' : ''}`}>
                      {product.coolingPower} кВт
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Инверторный</td>
                  {comparisonProducts.map((product, index) => (
                    <td key={`${product.id}-inverter`} className={`p-3 text-center ${index === 0 ? 'bg-secondary' : ''}`}>
                      {product.isInverter ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Уровень шума (мин.)</td>
                  {comparisonProducts.map((product, index) => (
                    <td key={`${product.id}-noise`} className={`p-3 text-center ${index === 0 ? 'bg-secondary' : ''}`}>
                      {product.noiseLevel} дБ
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Класс энергоэффективности</td>
                  {comparisonProducts.map((product, index) => (
                    <td key={`${product.id}-energy`} className={`p-3 text-center ${index === 0 ? 'bg-secondary' : ''}`}>
                      {product.energyClass}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Wi-Fi управление</td>
                  {comparisonProducts.map((product, index) => (
                    <td key={`${product.id}-wifi`} className={`p-3 text-center ${index === 0 ? 'bg-secondary' : ''}`}>
                      {product.hasWifi ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3"></td>
                  {comparisonProducts.map((product, index) => (
                    <td key={`${product.id}-button`} className={`p-3 text-center ${index === 0 ? 'bg-secondary' : ''}`}>
                      <Button className="w-full bg-accent hover:bg-accent/90">
                        Выбрать
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductComparison;
