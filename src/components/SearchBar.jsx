import SearchIcon from "../assets/Search.svg"

const SearchBar = () => {
    return (
        <div className="w-full max-w-lg shadow-md rounded-lg">
            <div className="relative flex items-center bg-white dark:bg-gray-700 rounded-lg p-4">
                <img 
                    src={SearchIcon} 
                    className="w-5 h-5 mr-4 text-gray-500 dark:text-gray-300" 
                    alt="Search Icon"
                /> 
                <input 
                    type="text" 
                    className="w-full bg-transparent focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="Search by name, region, or subregion..."
                    aria-label="Search by name, region, or subregion"
                />
            </div>
        </div>
    )
}

export default SearchBar;