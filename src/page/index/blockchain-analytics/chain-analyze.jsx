import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const BlockInfo = () => {
  const [blockInfo, setBlockInfo] = useState(null);
  const [highlight, setHighlight] = useState(false); // State to track highlight
  const [prevBlockMinedAt, setPrevBlockMinedAt] = useState(null); // State to store the previous block's mined time

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider("https://eth-pokt.nodies.app");
  
    const fetchLatestBlock = async () => {
      try {
        const latestBlockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(latestBlockNumber);
        const blockMinedAt = new Date(block.timestamp * 1000);
        const txCount = block.transactions.length;
  
        if (prevBlockMinedAt) {
          const timeDiff = (blockMinedAt - prevBlockMinedAt) / 1000; // Time difference in seconds
          setTimeBetweenBlocks(timeDiff);
        }
  
        setBlockInfo({
          blockNumber: block.number,
          miner: block.miner,
          gasUsed: block.gasUsed.toString(),
          txCount,
          blockMinedAt: blockMinedAt.toLocaleString(),
        });
  
        setPrevBlockMinedAt(blockMinedAt);
  
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
                <h1 className={`text-4xl font-bold mb-4 ${highlight ? 'text-orangered' : 'text-blue-500'}`}>
                    Block #{formatBlockNumber(blockInfo.blockNumber)}
                </h1>
                <p className={`text-lg w-3/4 break-all ${highlight ? 'text-orangered' : 'text-slate-400'}`}>
                    <strong>Miner:</strong> {blockInfo.miner}
                </p>
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
                        <td className={`border px-4 py-2 text-lg ${highlight ? 'text-orangered' : 'text-blue-500'}`}><strong>12</strong></td>
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

export default BlockInfo;
