const Status = () => {
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-gray-300 text-lg font-semibold mb-3"> Status</h3>
      
      <div className="flex flex-col gap-4">
        <label className="inline-flex items-center cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox" 
              className="peer sr-only" 
              defaultChecked
            />
            <div className="w-5 h-5 bg-gray-800 border-2 border-gray-300 rounded-sm peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200 group-hover:border-gray-400"></div>
            <svg 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="ml-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
            Member of The United Nations
          </span>
        </label>

        <label className="inline-flex items-center cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox" 
              className="peer sr-only" 
            />
            <div className="w-5 h-5 bg-gray-800 border-2 border-gray-300 rounded-sm peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-all duration-200 group-hover:border-gray-400"></div>
            <svg 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="ml-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
            Independent
          </span>
        </label>
      </div>
    </div>
  );
};

export default Status;