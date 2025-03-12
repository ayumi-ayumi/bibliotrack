export default function InputComment({ register }) {
  return (
    <div>
      <label htmlFor="comment" className="label">
        Comment
      </label>
      <input
        type="text"
        id="comment"
        placeholder="The story was..."
        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register('comment')}
      />
    </div>
  );
}
