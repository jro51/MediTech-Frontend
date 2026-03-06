import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/products/ProductGrid";

export default function Products(){

    return (
        <>
            <Header name={"Productos"}/>
            <ProductGrid/>
            
        </>
    );
}