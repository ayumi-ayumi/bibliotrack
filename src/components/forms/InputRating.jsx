import Rating from "react-rating";

export default function InputRating({ rating, onChange }) {
  return (
    <div>
      <label htmlFor="rating" className="label align-super mr-4">Rating</label>

      <Rating
        emptySymbol="fa fa-star-o fa-2x"
        fullSymbol="fa fa-star fa-2x"
        onChange={onChange}
        value={rating}
        fractions={1} 
        initialRating={rating}
      />
    </div>
  );
}
