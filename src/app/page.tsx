import { getProducts } from "@/services/shopify-services";
import React from 'react';

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <h1>Ecommerce Project</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </main>
  )
}
