import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const TxPoolAnalyzer = () => {
  const [topTransactions, setTopTransactions] = useState([]); // Track top transactions

  useEffect(() => {
    const provider = new ethers.WebSocketProvider("wss://ethereum-rpc.publicnode.com");
    const pendingTxs = {}; // Store pending transactions by hash
    const scanTxs = 12000;

    const updateTopTransactions = () => {
      try {
        const sortedTxs = Object.values(pendingTxs).sort((a, b) => {
          return b.gasTip - a.gasTip;
        });
        setTopTransactions(sortedTxs.slice(0, 10));
      } catch (error) {
        console.error('Error sorting transactions:', error);
        setTopTransactions([]); // Clear the list or maintain the previous state if needed
      }
    };

    const checkTransactionStatus = async () => {
      for (const txHash of Object.keys(pendingTxs)) {
        try {
          const provider = new ethers.JsonRpcProvider("https://eth-pokt.nodies.app");
          const txReceipt = await provider.getTransactionReceipt(txHash);
          if (txReceipt) {
            if (txReceipt.status !== null) {
              delete pendingTxs[txHash];
            }
          }
        } catch (error) {
          console.error('Error checking transaction status:', error);
        }
      }
    };

    // Scan transactions every 18 seconds
    const intervalId = setInterval(checkTransactionStatus, scanTxs);

    // Listen for new transactions added to the tx_pool
    provider.on('pending', async (txHash) => {
      try {
        const tx = await provider.getTransaction(txHash);
        if (tx) {
          const gasTipWei = tx.maxPriorityFeePerGas ? tx.maxPriorityFeePerGas : 0;
          const gasTip = (Number(gasTipWei.toString()) / 1000000000).toFixed(4);
          pendingTxs[txHash] = { txHash, gasTip };

          console.log("Transaction Hash:", txHash, "Gas Tip (gwei):", parseFloat(gasTip));

          updateTopTransactions();
        }
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    });

    // Listen for block mined and remove mined transactions from the list
    provider.on('block', async (blockNumber) => {
      const block = await provider.getBlock(blockNumber);
      block.transactions.forEach(txHash => delete pendingTxs[txHash]);
      updateTopTransactions();
    });
    setTimeout(() => {
      provider.removeAllListeners();
    }, 18000);

    // Clean up listeners and interval on unmount
    return () => {
      provider.removeAllListeners();
      clearInterval(intervalId);
    };
  }, []);

  // Fill empty rows if there are less than 10 transactions
  const rowsToDisplay = Array.from({ length: 10 }, (_, index) => {
    const tx = topTransactions[index] || { txHash: '---', gasTip: '---' };
    return { rank: index + 1, ...tx };
  });

  return (
    <div className='px-6'>
      <h3 className="text-xl text-left font-bold text-blue-500 mb-4">Top Transactions</h3>
      <table className="min-w-full border border-gray-700 bg-gray-800 mb-16">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2 text-center font-bold text-white">Rank</th>
            <th className="border border-gray-600 px-4 py-2 text-center font-bold text-white">Transaction Hash</th>
            <th className="border border-gray-600 px-4 py-2 text-center font-bold text-white">Gas Tip (Gwei)</th>
          </tr>
        </thead>
        <tbody>
          {rowsToDisplay.map((tx, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
              <td className="border border-gray-600 px-4 py-2 text-white">{tx.rank}</td>
              <td className="border border-gray-600 px-4 py-2 text-white">{tx.txHash}</td>
              <td className="border border-gray-600 px-4 py-2 text-white">{tx.gasTip} Gwei</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TxPoolAnalyzer;
