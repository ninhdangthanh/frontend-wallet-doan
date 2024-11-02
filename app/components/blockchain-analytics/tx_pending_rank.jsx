import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const TxPoolAnalyzer = () => {
  const [topTransactions, setTopTransactions] = useState([]); // Track top transactions

  useEffect(() => {
    
  }, []);

  // Fill empty rows if there are less than 10 transactions
  const rowsToDisplay = Array.from({ length: 10 }, (_, index) => {
    const tx = topTransactions[index] || { txHash: '---', gasTip: '---' };
    return { rank: index + 1, ...tx };
  });

  return (
    <div className='px-6'>
      <h3 className="text-xl text-left font-bold text-blue-500 mb-4">Top Transactions</h3>
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
              <td className="border border-gray-600 px-2 text-sm py-1 text-white">{tx.txHash}</td>
              <td className="border border-gray-600 px-2 text-sm py-1 text-white">{tx.balances}</td>
              <td className="border border-gray-600 px-2 text-sm py-1 text-white">{tx.gasTip} Gwei</td>
            </tr>
          ))}
          {/* <tr key={12} className="bg-gray-800">
              <td className="border border-gray-600 px-2 text-sm py-1 text-white">11</td>
              <td className="border border-gray-600 px-2 text-sm py-1 text-white">0x3254698562657847605476348768076</td>
              <td className="border border-gray-600 px-2 text-sm py-1 text-white">0.24</td>
              <td className="border border-gray-600 px-2 text-sm py-1 text-white">653547 Gwei</td>
            </tr> */}
        </tbody>
      </table>

        {/* <div className='mb-20'>
            <button className='text-white px-4 py-2 bg-orangered rounded-2xl text-xl hover:bg-orange-800'>
                Latest Block
            </button>
            <div className='flex items-center justify-center mt-4'>
                <button className='text-white py-1 bg-orangered w-12 block rounded-lg hover:bg-orange-800'>
                    -
                </button>
                <div className='px-4 font-bold text-base'>21,014,849</div>
                <button 
                    className='text-white py-1 bg-orangered w-12 block rounded-lg hover:bg-orange-800 cursor-not-allowed opacity-50'
                    disabled
                >
                    +
                </button>
            </div>
        </div> */}
    </div>
  );
};

export default TxPoolAnalyzer;
