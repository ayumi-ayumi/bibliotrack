export default function InputDate({ register, errors }) {
  return (
    <div>
      <label htmlFor="date" className="label">
        Date Read
      </label>
      <input
        type="date"
        id="date"
        placeholder="complete date"
        {...register("date")}
        className={`ml-3 p-2 border rounded-md text-base border-gray-300 focus:outline-none focus:border-blue-500`}
      />
      {errors.message && (
        <div className="text-red-500 text-sm mt-1">{errors.message}</div>
      )}
    </div>
  );
}
