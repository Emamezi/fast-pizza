function Button({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      className="disabled::cursor-not-allowed mt-10 inline-block rounded-full border bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wider text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300"
    >
      {children}
    </button>
  );
}

export default Button;
