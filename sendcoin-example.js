const { ethers } = require("ethers");

// Provider - This can be any Ethereum JSON-RPC provider
const provider = new ethers.providers.JsonRpcProvider("https://1rpc.io/sepolia");

// Wallet - This should be your Ethereum wallet
const wallet = new ethers.Wallet("0x8c0b00aee63f657c491f8eef5fe27d1751ab9ffa23162810432ca848072b7806", provider);

// Destination address - The address you want to send Ethereum to
const toAddress = "0xEd899f12dc83c59eA830e0aA903c7684655E29be";

// Amount to send - Specify the amount in wei
const amountToSend = ethers.utils.parseEther("0.1");

async function sendEth() {
    try {
        const transactionResponse = await wallet.sendTransaction({
            to: toAddress,
            value: amountToSend,
        });

        console.log("Transaction hash:", transactionResponse.hash);

        // Wait for the transaction to be mined
        await transactionResponse.wait();

        console.log("Transaction confirmed");
    } catch (error) {
        console.error("Error:", error);
    }
}

sendEth();
