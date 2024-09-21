export default function ListActivitys() {
  return (
    <div className="flex flex-col h-screen items-start w-full p-4">
      <div className="flex-col flex items-start w-full">
        <p className="text-[18px] font-semibold">Jan 24 , 2024</p>
        <div className="flex justify-between flex-row w-full p-2  mt-3 hover:bg-orange-900 hover:bg-opacity-25">
          <div className="flex justify-start items-center">
            <i className="fa-solid fa-arrow-up rotate-45 text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
            <div className="flex-col items-start pl-3 flex">
              <h2 className="text-[20px] font-semibold pb-1">Transfer</h2>
              <p className="text-green">Confirm</p>
            </div>
          </div>
          <div>
            <p className="text-[18px] font-semibold">-0.12 ETH</p>
            <p className="text-[16px] pt-1">-0.12 ETH</p>
          </div>
        </div>
        <div className="flex justify-between flex-row w-full p-2   mt-3 hover:bg-orange-900 hover:bg-opacity-25">
          <div className="flex justify-start items-center">
            <i className="fa-solid fa-arrow-up rotate-45 text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
            <div className="flex-col items-start pl-3 flex">
              <h2 className="text-[20px] font-semibold pb-1">Transfer</h2>
              <p className="text-red">Failed</p>
            </div>
          </div>
          <div>
            <p className="text-[18px] font-semibold">-0.12 ETH</p>
            <p className="text-[16px] pt-1">-0.12 ETH</p>
          </div>
        </div>
      </div>
      <div className="flex-col flex items-start pt-5 w-full">
        <p className="text-[18px] font-semibold">Jan 24 , 2024</p>
        <div className="flex justify-between flex-row w-full p-2  mt-3 hover:bg-orange-900 hover:bg-opacity-25">
          <div className="flex justify-start items-center">
            <i className="fa-solid fa-arrow-up rotate-[225deg] text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
            <div className="flex-col items-start pl-3 flex">
              <h2 className="text-[20px] font-semibold pb-1">Receive</h2>
              <p className="text-green">Confirm</p>
            </div>
          </div>
          <div>
            <p className="text-[18px] font-semibold">-0.12 ETH</p>
            <p className="text-[16px] pt-1">-0.12 ETH</p>
          </div>
        </div>
        <div className="flex justify-between flex-row w-full p-2   mt-3 hover:bg-orange-900 hover:bg-opacity-25">
          <div className="flex justify-start items-center">
            <i className="fa-solid fa-arrow-up rotate-45 text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
            <div className="flex-col items-start pl-3 flex">
              <h2 className="text-[20px] font-semibold pb-1">Transfer</h2>
              <p className="text-yellow">Pending</p>
            </div>
          </div>
          <div>
            <p className="text-[18px] font-semibold">-0.12 ETH</p>
            <p className="text-[16px] pt-1">-0.12 ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
}
