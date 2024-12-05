"use client";

const BookInfo = ({ bookInfo }) => {
  // console.log(bookInfo);
  const { book, author, description, highlights } = bookInfo;

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-semibold mb-4">{book}</h1>
      <p className="leading-loose mb-6">{description}</p>
      <ul>
        {highlights.map((highlight) => {
          return (
            <li
              key={highlight.slice(4, 10)}
              className="mb-4 bg-base-100 p-4 rounded-xl"
            >
              <p>{highlight}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookInfo;
