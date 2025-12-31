import { useState } from "react";

const Region = ({ setSelectedRegions }) => {
  const regions = [
    { name: "Americas" },
    { name: "Antarctic" },
    { name: "Africa" },
    { name: "Asia" },
    { name: "Europe" },
    { name: "Oceania" },
  ];

  const [selectedRegions, setSelectedRegionsState] = useState([]);

  const handleRegionClick = (regionName) => {
    let newSelected;

    if (selectedRegions.includes(regionName)) {
      newSelected = selectedRegions.filter((r) => r !== regionName);
    } else {
      newSelected = [...selectedRegions, regionName];
    }

    setSelectedRegionsState(newSelected);
    setSelectedRegions(newSelected);
  };

  const isSelected = (regionName) => {
    return selectedRegions.includes(regionName);
  };

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-gray-300 text-sm font-semibold">Region</h2>
      <div className="flex flex-wrap gap-2">
        {regions.map((region, index) => (
          <button
            key={index}
            onClick={() => handleRegionClick(region.name)}
            className={`text-sm px-4 py-2 rounded cursor-pointer transition-all duration-300 border
              ${
                isSelected(region.name)
                  ? "bg-gray-600 text-white border-gray-800 hover:bg-gray-700"
                  : "text-gray-300 bg-transparent border-gray-600 hover:bg-gray-800 hover:border-gray-400"
              }`}
          >
            {region.name}
          </button>
        ))}
      </div>
      {selectedRegions.length > 0 && (
        <button
          onClick={() => {
            setSelectedRegionsState([]);
            setSelectedRegions([]);
          }}
          className="text-xs text-gray-400 hover:text-gray-200 self-start underline"
        >
          Clear all filters
        </button>
      )}
    </section>
  );
};

export default Region;