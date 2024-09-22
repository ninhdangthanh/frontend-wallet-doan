import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ChainAnalytics from './blockchain-analytics/chain-analyze';
import TxPoolAnalyzer from './blockchain-analytics/tx_pending_rank';

const BlockchainAnalytics = () => {
  return (
    <>
      <ChainAnalytics />
      <TxPoolAnalyzer />
    </>
  )
};

export default BlockchainAnalytics;
