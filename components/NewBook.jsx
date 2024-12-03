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
  const {
    mutate,
    isPending,
    data: bookInfo,
  } = useMutation({
    // Taking a bold step by making this async, hopefully it works out
    mutationFn: async (destination) => {
      const newBook = await generateBookResponse(destination);
      if (newBook) {
        return newBook;
      }

      toast.error("No matching book found");
      return null;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination);
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
