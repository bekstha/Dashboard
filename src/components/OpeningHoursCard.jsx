const OpeningHoursCard = ({
    header,
    openingHour,
    closingHour,
    open,
    onTimeChange,
    onOpenChange,
  }) => {
    const handleOpeningHourChange = (e) => {
      onTimeChange("opens", e.target.value);
    };
  
    const handleClosingHourChange = (e) => {
      onTimeChange("closes", e.target.value);
    };
  
    const handleOpenChange = (e) => {
      onOpenChange(e.target.value === "true");
    };
  
    return (
      <div className="bg-slate-100 p-5 rounded-xl text-blue-950 mt-20 md:mt-5">
        <h1 className="font-extrabold mb-5 capitalize">{header}</h1>
        <div className="-mx-3 flex flex-wrap text-left items-center">
          <div className="w-full px-3 sm:w-1/3">
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-left">
                Opens at
              </label>
              <input
                type="time"
                name="openingHour"
                id="openingHour"
                value={openingHour}
                onChange={handleOpeningHourChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/3">
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-left">
                Closes at
              </label>
              <input
                type="time"
                name="closingHour"
                id="closingHour"
                value={closingHour}
                onChange={handleClosingHourChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
  
          <div className="w-full px-3 sm:w-1/3">
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-left">
              Status
            </label>
            <select
              value={open.toString()}
              onChange={handleOpenChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option value="true">Open</option>
              <option value="false">Close</option>
            </select>
            </div>
          </div>
  
          {/* <SegmentedButton isOpen={open} onToggle={onToggle} /> */}
        </div>
      </div>
    );
  };
  
  export default OpeningHoursCard;
  