import BookCard from "./BookCard";

const BooksList = ({ data }) => {
  if (data.length === 0) return <h4 className="text-lg">No books found...</h4>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.map((book) => {
        return <BookCard key={book.id} book={book}></BookCard>;
      })}
    </div>
  );
};

export default BooksList;
