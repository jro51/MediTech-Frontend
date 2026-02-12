export default function ProductCard({imageSrc, name, price}) {
    return (
        <a href="#" className="group">
            <img src={imageSrc}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
            <h3 className="mt-4 text-sm text-white">{name}</h3>
            <p className="mt-1 text-lg font-medium text-white">Precio: ${price}</p>
        </a>
    );
}