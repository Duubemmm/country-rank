const Sort = () => {
  return (
    <div className="flex items-center gap-4">
      <h1 className="text-gray-300 text-lg font-semibold m-0">Sort by</h1>
      <select className="text-gray-300 bg-transparent border border-gray-300 rounded px-4 py-2 text-base cursor-pointer min-w-[200px] focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-400/20">
        <option className="bg-gray-800 text-gray-300">Population</option>
        <option className="bg-gray-800 text-gray-300">Alphabetical order</option>
        <option className="bg-gray-800 text-gray-300">Area</option>
      </select>
    </div>
  );
};

export default Sort;