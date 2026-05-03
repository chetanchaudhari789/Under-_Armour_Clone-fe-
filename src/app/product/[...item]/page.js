import ProductPage from "@/imports/product/ui/pages/ProductPage";
import { findProduct } from "@/lib/server-helpers";

export async function generateMetadata({ params }) {
  const [category, subcategory, id] = params.item;
  const product = findProduct(id, category, subcategory);

  return {
    title: product ? `${product.fullName} | Under Armour` : "Product Not Found",
  };
}

export default function Page({ params }) {
  const [category, subcategory, id] = params.item;
  const product = findProduct(id, category, subcategory);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return <ProductPage initialProduct={product} />;
}
