import SearchIcon from "../assets/Search.svg"

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="w-full shadow-md rounded-lg">
            <div className="relative flex items-center rounded-lg p-4 bg-lightgray">
                <img 
                    src={SearchIcon} 
                    className="w-5 h-5 mr-4 text-white" 
                    alt="Search Icon"
                /> 
                <input 
                    type="text" 
                    className="w-full bg-transparent text-white focus:outline-none placeholder-white" 
                    placeholder="Search by name, region, or subregion..."
                    aria-label="Search by name, region, or subregion"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}
export default SearchBar;