export default function InputComment({ register }) {
  return (
    <div>
      <label htmlFor="comment" className="label">Comment</label>
      <input
        type="text"
        id="comment"
        placeholder="The story was..."
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        {...register("comment")}
      />
    </div>
  );
}
