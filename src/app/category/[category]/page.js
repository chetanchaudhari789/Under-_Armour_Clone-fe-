import CategoryPage from "@/imports/category/ui/pages/CategoryPage";
import { getCategory } from "@/lib/server-helpers";
import { PRODUCT_DATA } from "@/server-data/server-data";

export async function generateMetadata({ params }) {
  const { category } = params;
  return {
    title: `UA-${category.charAt(0).toUpperCase() + category.slice(1)}`,
  };
}

export default function Page({ params }) {
  const { category } = params;
  const categoryData = getCategory(category);
  if (!categoryData) {
    return <div>Category Not Found</div>; 
  }

  return (
    <CategoryPage 
      categoryData={categoryData} 
      productData={PRODUCT_DATA} 
    />
  );
}
