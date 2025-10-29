import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductsClient from "./Products.client";
import { fetchProductsClient } from "@/lib/api/clientApi";
async function ProductsPage() {
  const queryClient = new QueryClient();
  const initialSearch = "";
  const initialPage = 1;
  const initialCategory = "all";
  const initialSortBy = "name";
  await queryClient.prefetchQuery({
    queryKey: [
      "products",
      initialSearch,
      initialPage,
      initialCategory,
      initialSortBy,
    ],
    queryFn: () =>
      fetchProductsClient(
        initialSearch,
        initialPage,
        initialCategory,
        initialSortBy
      ),
  });
  return (
    <section className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Products
        </h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductsClient></ProductsClient>;
        </HydrationBoundary>
      </div>
    </section>
  );
}
export default ProductsPage;
