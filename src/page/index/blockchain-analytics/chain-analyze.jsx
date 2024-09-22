import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const BlockInfo = () => {
  const [blockInfo, setBlockInfo] = useState(null);
  const [highlight, setHighlight] = useState(false); // State to track highlight
  const [prevBlockMinedAt, setPrevBlockMinedAt] = useState(null); // State to store the previous block's mined time
  const [timeBetweenBlocks, setTimeBetweenBlocks] = useState(null); // State to store the time difference

  useEffect(() => {
    // Initialize WebSocket provider
    const provider = new ethers.WebSocketProvider("wss://ethereum-rpc.publicnode.com");

    // Function to fetch and set block data
    const fetchBlockInfo = async (blockNumber) => {
      const block = await provider.getBlock(blockNumber);
      const receivedAt = new Date();
      const blockMinedAt = new Date(block.timestamp * 1000);
      const propagationTime = receivedAt - blockMinedAt;
      const txCount = block.transactions.length;

      // Calculate time difference between blocks
      if (prevBlockMinedAt) {
        const timeDiff = (blockMinedAt - prevBlockMinedAt) / 1000; // Time difference in seconds
        setTimeBetweenBlocks(timeDiff);
      }

      // Update block info and previous block's mined time
      setBlockInfo({
        blockNumber: block.number,
        miner: block.miner,
        gasUsed: block.gasUsed.toString(),
        txCount,
        propagationTime,
        blockMinedAt: blockMinedAt.toLocaleString(),
        receivedAt: receivedAt.toLocaleString(),
      });

      setPrevBlockMinedAt(blockMinedAt); // Update previous block's mined time

      // Trigger highlight
      setHighlight(true);
      setTimeout(() => setHighlight(false), 1500); // Reset highlight after 1 second
    };

    provider.on('block', fetchBlockInfo);

    return () => provider.removeAllListeners();
  }, [prevBlockMinedAt]);

  return (
      <div>
        <div className="mt-4 flex justify-center items-center mb-6">
            {blockInfo ? (
            <div className="flex shadow-md rounded-lg w-full px-10">
                {/* Left Side: Block Number & Miner */}
                <div className="w-1/2 p-4 flex flex-col items-center">
                <h1 className={`text-4xl font-bold mb-4 ${highlight ? 'text-orangered' : 'text-blue-500'}`}>
                    Block #{blockInfo.blockNumber}
                </h1>
                <p className={`text-lg w-3/4 break-all ${highlight ? 'text-orangered' : 'text-slate-400'}`}>
                    <strong>Miner:</strong> {blockInfo.miner}
                </p>
                <p className={`text-lg w-3/4 pt-2 ${highlight ? 'text-orangered' : 'text-slate-400'}`}>
                    <strong>Time Between Blocks:</strong> 
                    <strong className={`text-2xl text-blue-500 ${highlight ? 'text-orangered' : 'text-blue-500'}`}>
                        {/* {timeBetweenBlocks || 12} */}
                        12
                    </strong>
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
                        <td className="border px-4 py-2 font-bold">Gas Used:</td>
                        <td className="border px-4 py-2">{blockInfo.gasUsed} <strong>wei</strong></td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Block Mined At:</td>
                        <td className="border px-4 py-2">{blockInfo.blockMinedAt}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Block Received At:</td>
                        <td className="border px-4 py-2">{blockInfo.receivedAt}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Propagation Delay:</td>
                        <td className="border px-4 py-2">{blockInfo.propagationTime} ms</td>
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

export default BlockInfo;
