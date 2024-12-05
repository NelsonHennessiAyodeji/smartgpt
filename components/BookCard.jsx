import Link from "next/link";

const BookCard = ({ book }) => {
  const { book: bk, author, id } = book;
  return (
    <Link
      href={`/books/${id}`}
      className="card card-compact rounded-xl bg-base-100"
    >
      <div className="card-body items-center text-center">
        <h1 className="card-title text-center">
          {bk} by {author}
        </h1>
      </div>
    </Link>
  );
};

export default BookCard;
