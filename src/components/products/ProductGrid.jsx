import ProductCard from "./ProductCard";

const products = [
  {
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg",
    name: "Earthen Bottle",
    price: 48
  },
  {
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg",
    name: "Nomad Tumbler",
    price: 35
  },
  {
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg",
    name: "Aspirina",
    price: 23
  },
  {
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg",
    name: "Clorfenamina",
    price: 18
  },
  {
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg",
    name: "Buscapina",
    price: 22
  },
  {
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg",
    name: "Paracetamol",
    price: 20
  },
  {
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg",
    name: "Azitromicina",
    price: 30
  },
  {
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg",
    name: "Ibuprofeno",
    price: 28
  }
]

export default function ProductGrid(){
    return (
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-gray-800">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-7 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {
                    products.map(product => (
                      <ProductCard imageSrc={product.imageSrc} name={product.name} price={product.price}/>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
    );
}