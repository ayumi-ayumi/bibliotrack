export default function InputBookInfo({ register, errors, label, labelText }) {
  return (
    <div className="mb-2">
      <label htmlFor={label} className="label">
        {labelText}
      </label>
      <input
        type="text"
        id={label}
        className="w-full rounded border border-gray-300 p-2"
        {...register(label, {
          required: `Input the book's ${label}`,
        })}
      />
      {errors[label] && (
        <div className="mt-2 text-red-500">{errors[label].message}</div>
      )}
    </div>
  );
}
