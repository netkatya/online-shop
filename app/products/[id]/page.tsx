import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductDetailsClient from "./productDetails.client";
// import { Metadata } from "next";
import { fetchProductById } from "@/lib/api/serverApi";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// export async function generateMetadata({
//   params,
// }: NotePageProps): Promise<Metadata> {
//   const { id } = await params;
//   const note = await fetchNoteById(id);
//   return {
//     title: `Note: ${note.title}`,
//     description: note.content.slice(0, 30),
//     openGraph: {
//       title: `Note: ${note.title}`,
//       description: note.content.slice(0, 30),
//       url: `https://09-auth-plum-xi.vercel.app/notes/${id}`,
//       images: [
//         {
//           url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//           width: 1200,
//           height: 630,
//           alt: "Note Hub Logo",
//         },
//       ],
//     },
//   };
// }

const ProductDetails = async ({ params }: ProductPageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  console.log("params:", params);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetailsClient productId={id} />
    </HydrationBoundary>
  );
};

export default ProductDetails;
