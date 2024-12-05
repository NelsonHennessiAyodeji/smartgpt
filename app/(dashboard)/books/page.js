import BooksPage from "@/components/BooksPage";
import { getAllBooks } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AllToursPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["books", ""],
    queryFn: () => getAllBooks(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BooksPage></BooksPage>
    </HydrationBoundary>
  );
};

export default AllToursPage;
