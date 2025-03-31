import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Product } from "@shared/schema";
import { ProductFilter } from "server/storage";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const ProductCatalog = () => {
  const [filters, setFilters] = useState<ProductFilter>({
    area: 'Все размеры',
    type: 'Все типы',
    brand: 'Все бренды',
    priceRange: 'Любая'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Fetch all products
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Apply client-side filtering until we implement the filter API
  const applyFilter = (products: Product[]) => {
    let filtered = [...products];
    
    if (filters.area && filters.area !== 'Все размеры') {
      filtered = filtered.filter(product => {
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
      filtered = filtered.filter(product => product.type === filters.type);
    }
    
    if (filters.brand && filters.brand !== 'Все бренды') {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }
    
    if (filters.priceRange && filters.priceRange !== 'Любая') {
      filtered = filtered.filter(product => {
        switch(filters.priceRange) {
          case 'До 30 000 ₽': return product.price <= 30000;
          case '30 000 - 50 000 ₽': return product.price > 30000 && product.price <= 50000;
          case '50 000 - 80 000 ₽': return product.price > 50000 && product.price <= 80000;
          case 'Более 80 000 ₽': return product.price > 80000;
          default: return true;
        }
      });
    }
    
    return filtered;
  };

  // Apply current filters
  const filteredProducts = products ? applyFilter(products) : [];
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle filter changes
  const handleFilterChange = (name: keyof ProductFilter, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleApplyFilters = () => {
    // For immediate filtering, we're already doing it with client-side code
    // This could be replaced with an API call if needed
    queryClient.invalidateQueries({ queryKey: ['/api/products'] });
  };

  return (
    <section id="catalog" className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Каталог кондиционеров</h2>
          <p className="text-lg">Бюджетные модели с отличными характеристиками</p>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium mb-1">Площадь помещения</label>
              <Select 
                value={filters.area} 
                onValueChange={(value) => handleFilterChange('area', value)}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Все размеры" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Все размеры">Все размеры</SelectItem>
                  <SelectItem value="До 20 м²">До 20 м²</SelectItem>
                  <SelectItem value="20-30 м²">20-30 м²</SelectItem>
                  <SelectItem value="30-50 м²">30-50 м²</SelectItem>
                  <SelectItem value="Более 50 м²">Более 50 м²</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium mb-1">Тип кондиционера</label>
              <Select 
                value={filters.type} 
                onValueChange={(value) => handleFilterChange('type', value)}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Все типы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Все типы">Все типы</SelectItem>
                  <SelectItem value="Настенные">Настенные</SelectItem>
                  <SelectItem value="Напольные">Напольные</SelectItem>
                  <SelectItem value="Кассетные">Кассетные</SelectItem>
                  <SelectItem value="Канальные">Канальные</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium mb-1">Бренд</label>
              <Select 
                value={filters.brand} 
                onValueChange={(value) => handleFilterChange('brand', value)}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Все бренды" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Все бренды">Все бренды</SelectItem>
                  <SelectItem value="Daikin">Daikin</SelectItem>
                  <SelectItem value="Mitsubishi">Mitsubishi</SelectItem>
                  <SelectItem value="Haier">Haier</SelectItem>
                  <SelectItem value="HISENSE">HISENSE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium mb-1">Цена</label>
              <Select 
                value={filters.priceRange} 
                onValueChange={(value) => handleFilterChange('priceRange', value)}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Любая" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Любая">Любая</SelectItem>
                  <SelectItem value="До 30 000 ₽">До 30 000 ₽</SelectItem>
                  <SelectItem value="30 000 - 50 000 ₽">30 000 - 50 000 ₽</SelectItem>
                  <SelectItem value="50 000 - 80 000 ₽">50 000 - 80 000 ₽</SelectItem>
                  <SelectItem value="Более 80 000 ₽">Более 80 000 ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto md:ml-auto flex items-end">
              <Button onClick={handleApplyFilters}>
                Применить фильтры
              </Button>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Show message when no products match filters */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg">К сожалению, не найдено кондиционеров, соответствующих выбранным фильтрам.</p>
                <Button 
                  onClick={() => {
                    setFilters({
                      area: 'Все размеры',
                      type: 'Все типы',
                      brand: 'Все бренды',
                      priceRange: 'Любая'
                    });
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded-md shadow-sm">
                  <Button 
                    variant="outline" 
                    className="rounded-r-none" 
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button 
                      key={i} 
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      className={`rounded-none ${i === 0 ? "" : "border-l-0"} ${i === totalPages - 1 ? "" : "border-r-0"}`}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="rounded-l-none" 
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
