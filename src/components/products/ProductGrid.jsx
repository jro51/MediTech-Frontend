import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../services/productService";

export default function ProductGrid(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
      getAllProducts()
        .then(data => {
          if (data) setProducts(data);
        })
        .catch(err => console.error("Error de conexión:", err));
    }, []);

    return (
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-gray-800">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-7 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {
                    products.map(product => (
                      <ProductCard key={product.id} imageSrc={product.imageSrc} name={product.name} price={product.price}/>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
    );
}