"use client";

import { getAllBooks } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import BooksList from "./BooksList";
import { useState } from "react";

// Setting the react-query down here again for seamless data sharing...
const BooksPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isPending } = useQuery({
    // Apparently, this is an efficient way to write conctrolled inputs using react query...
    queryKey: ["books", searchValue],
    queryFn: () => getAllBooks(searchValue),
  });
  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="enter book name or author here..."
            className="input input-bordered join-item w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          ></input>
          <button
            className="btn btn-primary join-item"
            type="button"
            disabled={isPending}
            onClick={() => setSearchValue("")}
          >
            {isPending ? "please wait..." : "reset"}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className="loading"></span>
      ) : (
        <BooksList data={data}></BooksList>
      )}
    </>
  );
};

export default BooksPage;
