import NewBook from "@/components/NewBook";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const NewBookPage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewBook></NewBook>
    </HydrationBoundary>
  );
};

export default NewBookPage;
