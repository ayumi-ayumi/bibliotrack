export default function Toggle({ setStatus, leftText, rightText }) {
  return (
    <div className="flex items-center justify-center">
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" value="" className="peer sr-only" />
        <div className="peer flex h-10 items-center gap-4 rounded-full bg-amber-500 px-3 after:absolute after:left-1 after:h-8 after:w-24 after:rounded-full after:bg-white/40 after:transition-all after:content-[''] peer-checked:bg-stone-600 peer-checked:after:translate-x-[93%] peer-focus:outline-none dark:border-slate-600 dark:bg-slate-700 text-md text-white shadow-xl">
          <span onClick={() => setStatus(leftText)}>{leftText}</span>
          <span onClick={() => setStatus(rightText)} className="px-2.5">
            {rightText}
          </span>
        </div>
      </label>
    </div>
  );
}
