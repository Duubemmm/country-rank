const Region = () => {
      const Regions = [
    { name: "America" },
    { name: "Antarctic" },
    { name: "Africa" },
    { name: "Asia" },
    { name: "Europe" },
    { name: "Oceania" }
  ];

  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        Region
        {Regions.map((region, index) => (
          <button 
            key={index} 
            className="text-gray-300 bg-transparent border border-gray-300 px-5 py-2.5 rounded cursor-pointer text-base transition-all duration-300 hover:bg-gray-100/10 hover:text-gray-200 hover:border-gray-200"
          >
            {region.name}
          </button>
        ))}
      </div>
    </>
  );
};
export default Region;