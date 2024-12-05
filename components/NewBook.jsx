"use client";

import BookInfo from "./BookInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExistingBook,
  generateBookResponse,
  createNewBook,
} from "@/utils/actions";
import toast from "react-hot-toast";

const NewBook = () => {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    data: bookInfo,
  } = useMutation({
    // Taking a bold step by making this async, hopefully it works out (due to a glitch though)
    // AuthoBook, if youre wandering...
    // We have all the functions here instead of the actions file because the Vercel server timeout is 10 seconds,
    // so then I stole this idea of using the frontend, whereby the logic here is going to run on the fronend runtime
    // not the backend/server runtime, cos if not, the runtime for calculating all these will choke,
    // so the only thing the server can worry about is querying the Prisma and
    // Prisma querying the online database. like that, the application won't suffer from Vercel's free plan of
    // 10sec Timeout. How did I know this without uploading to vercel yet?... Youtubers warned me of such scenerios,
    // then i looked at my application and noticed that it will definitely run more than 10 secs on the server
    // so i evaded it at once.
    mutationFn: async (authoBook) => {
      const existingBook = await getExistingBook(authoBook);
      if (existingBook) return existingBook;

      const newBook = await generateBookResponse(authoBook);
      if (newBook) {
        // Add the book to the database.
        await createNewBook(newBook);
        // Basically refreshing so both fronend and db can be up to date 👍🏾
        queryClient.invalidateQueries({ queryKey: ["books"] });
        return newBook;
      }

      toast.error("No matching book found");
      return null;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const authoBook = Object.fromEntries(formData.entries()); // Seperates the objects from keys and JSONify it
    mutate(authoBook);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your favorite book</h2>
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="Author"
            name="author"
            required
          />
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="Book"
            name="book"
            required
          />

          <button className="btn bg-teal-600 join-item" type="submit">
            generate book info
          </button>
        </div>
      </form>
      <div className="mt-16">
        {bookInfo ? <BookInfo bookInfo={bookInfo}></BookInfo> : null}
      </div>
    </>
  );
};

export default NewBook;
