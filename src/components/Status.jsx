import { useState } from "react";

const Status = ({ setUnMember }) => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleStatusChange = (status) => {
    setSelectedStatus(status);

    if (status === "member") {
      setUnMember(true);
    } else if (status === "non-member") {
      setUnMember(false);
    } else {
      setUnMember(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-gray-300 text-sm font-semibold">Status</h2>
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer hover:bg-gray-800 px-2 py-1 rounded transition-colors">
          <input
            type="radio"
            name="status"
            value="all"
            checked={selectedStatus === "all"}
            onChange={() => handleStatusChange("all")}
            className="cursor-pointer accent-blue-800"
          />
          All
        </label>
        <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer hover:bg-gray-800 px-2 py-1 rounded transition-colors">
          <input
            type="radio"
            name="status"
            value="member"
            checked={selectedStatus === "member"}
            onChange={() => handleStatusChange("member")}
            className="cursor-pointer accent-blue-800"
          />
          Member of the United Nations
        </label>
        <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer hover:bg-gray-800 px-2 py-1 rounded transition-colors">
          <input
            type="radio"
            name="status"
            value="non-member"
            checked={selectedStatus === "non-member"}
            onChange={() => handleStatusChange("non-member")}
            className="cursor-pointer accent-blue-800"
          />
          Not a Member
        </label>
      </div>
    </div>
  );
}

export default Status;