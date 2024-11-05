import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import env_fe from '@/utils/env_fe';

const TxPoolAnalyzer = () => {
  const [topTransactions, setTopTransactions] = useState([]);
  const [blockNumber, setBlockNumber] = useState(null);
  const [error, setError] = useState(null); // Track errors
  const [loading, setLoading] = useState(false); // Track loading state

  const provider = new ethers.JsonRpcProvider(env_fe.transaction_analytics_rpc);

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      const blockNum = parseInt(event.target.value);
      // if (isNaN(blockNum) || blockNum <= 6666666) {
      //   setError("Block number must be greater than 6666666.");
      //   return;
      // }

      setError(null); // Clear any previous error
      setBlockNumber(blockNum);
      await fetchTopTransactions(blockNum);
    }
  };

  const fetchTopTransactions = async (blockNum) => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const block = await provider.getBlock(blockNum);

      if (!block) {
        setError("Block not found.");
        setTopTransactions([]);
        return;
      }

      const transactions = await Promise.all(
        block.transactions.slice(0, 10).map(async (txHash) => {
          const tx = await provider.getTransaction(txHash);
          const gasTip = tx.maxPriorityFeePerGas ? ethers.formatUnits(tx.maxPriorityFeePerGas, 'gwei') : '0';
          return {
            txHash: tx.hash,
            gasTip: parseFloat(gasTip),
            balances: ethers.formatEther(tx.value),
          };
        })
      );

      const topTxs = transactions
        .sort((a, b) => b.gasTip - a.gasTip)
        .slice(0, 10);

      if (topTxs.length < 10) {
        setError("Block does not have enough transactions (10 or more).");
      } else {
        setError(null);
      }

      setTopTransactions(topTxs);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("An error occurred while fetching transactions.");
    } finally {
      setLoading(false); // Set loading to false once fetching completes
    }
  };

  const rowsToDisplay = Array.from({ length: 10 }, (_, index) => {
    const tx = topTransactions[index] || { txHash: '---', balances: '---', gasTip: '---' };
    return { rank: index + 1, ...tx };
  });

  return (
    <div className='px-6 mt-4'>
      <h3 className="text-xl text-left font-bold text-blue-500 mb-4">
        Top Transactions of Block 
        <input 
          type="text" 
          className='pl-2 ml-4 border-orangered border-[1px] w-[160px]' 
          onKeyPress={handleKeyPress} 
        />
        <span className='ml-4 font-thin text-base text-orangered'>(should be {'>'} <strong className='font-bold text-lg'>6666666</strong> and near <strong className='font-bold text-lg'>20000000</strong> )</span>
      </h3>
      
      {error && (
        <p className="text-orangered font-bold text-2xl mb-16 mt-8">{error}</p>
      )}
  
      {loading ? (
        <p className="text-blue-500 font-bold text-2xl mb-16 mt-8">Loading transactions...</p>
      ) : (
        !error && (
          <table className="min-w-full border border-gray-700 bg-gray-800 mb-6">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-4 py-2 text-center font-bold text-white">Rank</th>
                <th className="border border-gray-600 px-4 py-2 text-center font-bold text-white">Transaction Hash</th>
                <th className="border border-gray-600 px-4 py-2 text-center font-bold text-white">Balances</th>
                <th className="border border-gray-600 px-4 py-2 text-center font-bold text-white">Gas Tip (Gwei)</th>
              </tr>
            </thead>
            <tbody>
              {rowsToDisplay.map((tx, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                  <td className="border border-gray-600 px-2 text-sm py-1 text-white">{tx.rank}</td>
                  <td
                    onClick={() => window.open(`${env_fe.mainnet_ether_scan}/tx/${tx.txHash}`, '_blank')}
                    className="border border-gray-600 px-2 text-sm py-1 text-white cursor-pointer hover:bg-orange-700"
                  >
                    {tx.txHash}
                  </td>
                  <td className="border border-gray-600 px-2 text-sm py-1 text-white">{tx.balances}</td>
                  <td className="border border-gray-600 px-2 text-sm py-1 text-white">{tx.gasTip} Gwei</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
  
};

export default TxPoolAnalyzer;
