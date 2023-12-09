const SegmentedButton = ({ isOpen, onToggle }) => {
  return (
    <div className="flex h-18 mt-3">
      <button
        className={`py-2 px-4 rounded-l ${
          isOpen ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
        }`}
        onClick={() => onToggle(true)}
      >
        Open
      </button>
      <button
        className={`py-2 px-4 rounded-r ${
          !isOpen ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
        }`}
        onClick={() => onToggle(false)}
      >
        Close
      </button>
    </div>
  );
};

export default SegmentedButton;
