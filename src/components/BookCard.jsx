import Rating from "react-rating";

const BookCard = ({ book }) => {
  const title =
    book.title.length > 40 ? book.title.substring(0, 38) + "..." : book.title;

  const comment =
    book.comment.length > 10
      ? book.comment.substring(0, 10) + "..."
      : book.comment;

  function convertDate(date) {
    return date.split("T")[0];
  }

  return (
    <>
      <div
        className={`${
          book.status === "Have Read" ? "bg-amber-50" : "bg-teal-50"
        } grid grid-cols-8 h-52 rounded-md bg-amber-50 shadow-2xl hover:shadow-none`}
      >
        <div className="col-span-3 flex justify-center h-52 items-center overflow-hidden">
          <img
            src={book.thumbnail || "./book_alt.png"}
            alt="thumbnail"
            onError={(e) => (e.target.src = "./book_alt.png")}
            className={
              book.thumbnail
                ? "w-full h-full rounded-l-md object-cover"
                : "h-25 w-25 object-cover"
            }
          />
        </div>
        <div className="col-span-5 p-2 relative">
          <h3 className="text-xl leading-5 h-1/5 ">{title}</h3>
          <h3 className="text-lg leading-5 text-slate-700 my-1">
            {book.author}
          </h3>

          {book.status === "Have Read" && book.date && (
            <div>
              <div className="text-sm my-1 inline">Read Date: </div>
              <p className="text-md inline">
                {book.date && convertDate(book.date)}
              </p>
            </div>
          )}

          {book.status === "To-Read" && (
            <div>
              <div className="text-sm my-1 inline">Added Date: </div>
              <p className="text-md inline">
                {book.createdAt && convertDate(book.createdAt)}
              </p>
            </div>
          )}

          {comment && (
            <div>
              <span className="text-sm my-1">Comment: </span>
              <p className="">{comment}</p>
            </div>
          )}

          <div className="absolute bottom-2 left-2">
            {book.rating > 0 && (
              <>
                <span className="text-sm">Rating: </span>
                <Rating
                  emptySymbol="fa fa-star-o fa-lg"
                  fullSymbol="fa fa-star fa-lg"
                  fractions={1} 
                  initialRating={book.rating} 
                  readonly={true} 
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
