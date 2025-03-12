export default function InputDate({ register, errors }) {
  return (
    <div>
      <label htmlFor="date" className="label">
        Date Read
      </label>
      <input
        type="date"
        id="date"
        className={`ml-3 rounded-md border border-gray-300 p-2 text-base focus:border-blue-500 focus:outline-none`}
        {...register('date')}
      />
      {errors.message && (
        <div className="mt-1 text-sm text-red-500">{errors.message}</div>
      )}
    </div>
  );
}
