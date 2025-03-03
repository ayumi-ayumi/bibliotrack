export default function InputBookInfo({ register, errors, label, labelText }) {
  console.log(errors)
  return (
    <div className="mb-2">
    <label htmlFor={label} className="label">
      {labelText}
    </label>
      <input
        type="text"
        id={label}
        className="w-full p-2 border rounded border-gray-300"
        {...register(label, {
          required: `Input the book's ${label}`
        })}
      />
      {errors[label] && <div className="text-red-500 mt-2">{errors[label].message}</div>}
    </div>
  );
}
