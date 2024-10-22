import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import powImage from "@/assets/proof-of-work.png"
import axios from 'axios';

const ChainAnalytics = () => {
  const [blockInfo, setBlockInfo] = useState(null);
  const [highlight, setHighlight] = useState(false); // State to track highlight

  useEffect(() => {
    const fetchLatestBlock = async () => {
      try {
        let latestBlockInfoResponse = await axios.get("http://localhost:5000/api/chain/latest-block-info");
        let latestBlockInfo = latestBlockInfoResponse.data[0]
        // console.log(latestBlockInfo);
        
        setBlockInfo({
          blockNumber: latestBlockInfo.block_number,
          miner: latestBlockInfo.miner,
          gasUsed: latestBlockInfo.gas_used,
          txCount: latestBlockInfo.transaction_count,
          blockMinedAt: latestBlockInfo.block_mined_at,
          timeBetweenBlocks: latestBlockInfo.time_between_blocks
        });

        setHighlight(true);
        setTimeout(() => setHighlight(false), 1500); // 1.5s highlight duration
      } catch (error) {
        console.error("Error fetching block:", error);
      }
    };

    // Fetch the initial block when the component mounts
    fetchLatestBlock();

    // Set an interval to query every 12 seconds after the first fetch
    const intervalId = setInterval(fetchLatestBlock, 12000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);



  return (
    <div>
      <div className="mt-4 flex justify-center items-center mb-6">
        {blockInfo ? (
          <div className="flex shadow-md rounded-lg w-full px-10">
            {/* Left Side: Block Number & Miner */}
            <div className="w-1/2 p-4 flex flex-col items-center">
              <div className='flex'>
                <img src={powImage.src} alt='Proof of Work' className="w-28 h-28" />
                <div className={`flex-1 text-4xl font-bold mb-4 ${highlight ? 'text-orangered' : 'text-blue-500'}`}>
                  Block #{formatBlockNumber(blockInfo.blockNumber)}
                </div>
              </div>
              <div className='flex'>
                <div className='w-28'></div>
                <p className={`text-lg w-3/4 break-all ${highlight ? 'text-orangered' : 'text-slate-400'}`}>
                  <strong>Miner:</strong> {blockInfo.miner}
                </p>
              </div>
            </div>

            {/* Right Side: Rest of the Info */}
            <div className={`w-1/2 p-4 ${highlight ? 'text-orangered' : 'text-slate-400'}`}>
              <table className="min-w-full table-auto border-collapse">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Transactions count:</td>
                    <td className={`border px-4 py-2 text-lg ${highlight ? 'text-orangered' : 'text-blue-500'}`}><strong>{blockInfo.txCount}</strong></td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Time Between Blocks:</td>
                    <td className={`border px-4 py-2 text-lg ${highlight ? 'text-orangered' : 'text-blue-500'}`}><strong>{blockInfo.timeBetweenBlocks}</strong></td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Gas Used:</td>
                    <td className="border px-4 py-2">{blockInfo.gasUsed} <strong>wei</strong></td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Block Mined At:</td>
                    <td className="border px-4 py-2">{blockInfo.blockMinedAt}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center pb-40">
            <p className="text-orangered text-xl">Waiting for block data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const formatBlockNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default ChainAnalytics;
