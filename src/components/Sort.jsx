const Sort = ({ setSortBy }) => {
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-gray-300 text-sm font-semibold">Sort by</h2>
      <select
        onChange={handleSortChange}
        className="text-gray-300 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm cursor-pointer min-w-[200px] focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-400/20"
        defaultValue="population"
      >
        <option value="population" className="bg-gray-800 text-gray-300">
          Population
        </option>
        <option value="name" className="bg-gray-800 text-gray-300">
          Name
        </option>
        <option value="area" className="bg-gray-800 text-gray-300">
          Area
        </option>
      </select>
    </div>
  );
};

export default Sort;