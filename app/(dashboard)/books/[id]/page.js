import BookInfo from "@/components/BookInfo";
import { getSingleBook } from "@/utils/actions";
import { redirect } from "next/navigation";
import Link from "next/link";

const SingleBookPage = async ({ params }) => {
  const book = await getSingleBook(params.id);
  if (!book) {
    redirect("/books");
  }

  return (
    <div>
      <Link href={"/books"} className="btn btn-secondary mb-12">
        back to books
      </Link>
      <BookInfo bookInfo={book}></BookInfo>
    </div>
  );
};

export default SingleBookPage;
