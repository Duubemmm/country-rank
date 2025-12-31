const DetailBox = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-1">
      {label}
    </span>
    <span className="text-base sm:text-lg text-zinc-200">{value || "N/A"}</span>
  </div>
);

export default DetailBox;
