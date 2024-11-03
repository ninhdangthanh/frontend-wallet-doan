import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import powImage from "@/assets/proof-of-work.png"
import axios from 'axios';
import env_fe from '@/utils/env_fe';

const ChainAnalytics = () => {
  const [blockInfo, setBlockInfo] = useState(null);
  const [highlight, setHighlight] = useState(false); 
  const timeBetweenBlock = 12;

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider(env_fe.block_analytics_rpc);

    const fetchLatestBlock = async () => {
      try {
        const latestBlockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(latestBlockNumber);
        const blockMinedAt = new Date(block.timestamp * 1000);
        const txCount = block.transactions.length;

        setBlockInfo({
          blockNumber: block.number,
          miner: block.miner,
          gasUsed: block.gasUsed.toString(),
          txCount,
          blockMinedAt: blockMinedAt.toLocaleString(),
        });

        setHighlight(true);
        setTimeout(() => setHighlight(false), 1500);
      } catch (error) {
        console.error("Error fetching block:", error);
      }
    };

    fetchLatestBlock();

    const intervalId = setInterval(fetchLatestBlock, 12000);

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
                <div 
                  onClick={() => window.open(`https://etherscan.io/block/${blockInfo.blockNumber}`, '_blank')}
                  className={`hover:text-blue-800 flex-1 text-4xl font-bold mb-4 ${highlight ? 'text-orangered' : 'text-blue-500'}`}
                >
                  Block #{formatBlockNumber(blockInfo.blockNumber)}
                </div>
              </div>
              <div className='flex'>
                <div className='w-28'></div>
                <p
                  onClick={() => window.open(`https://etherscan.io/address/${blockInfo.miner}`, '_blank')}
                  className={`hover:text-blue-800 text-lg w-3/4 break-all cursor-pointer ${highlight ? 'text-orangered' : 'text-slate-400'}`}
                >
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
                    <td className={`border px-4 py-2 text-lg ${highlight ? 'text-orangered' : 'text-blue-500'}`}><strong>{timeBetweenBlock}</strong></td>
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
