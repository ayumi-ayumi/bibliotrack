import Rating from 'react-rating';

export default function InputRating({ rating, onChange }) {
  return (
    <div>
      <label htmlFor="rating" className="label mr-4 align-super">
        Rating
      </label>

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
