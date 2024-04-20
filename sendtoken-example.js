const { ethers } = require("ethers");

// Provider - Điều này có thể là bất kỳ nhà cung cấp Ethereum JSON-RPC nào
const provider = new ethers.providers.JsonRpcProvider("https://1rpc.io/sepolia");

// Wallet - Đây nên là ví Ethereum của bạn
const wallet = new ethers.Wallet("0x8c0b00aee63f657c491f8eef5fe27d1751ab9ffa23162810432ca848072b7806", provider);

// Địa chỉ hợp đồng token ERC20 mà bạn muốn gửi
const tokenContractAddress = "0x29ed8cE3cA1CcF72838AdC691726603b42d8b799";

// ABI của hợp đồng token ERC20
const tokenAbi = [
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint256 value) returns (bool)"
];


// Tạo đối tượng hợp đồng token ERC20 từ địa chỉ và ABI
const tokenContract = new ethers.Contract(tokenContractAddress, tokenAbi, wallet);

// Địa chỉ người nhận
const toAddress = "0xEd899f12dc83c59eA830e0aA903c7684655E29be";

// Số lượng token muốn gửi
const amountToSend = ethers.utils.parseUnits("10", 18); // 18 là số lượng decimal của token

async function sendToken() {
    try {
        // Gửi token bằng cách gọi phương thức transfer của hợp đồng token
        const transactionResponse = await tokenContract.transfer(toAddress, amountToSend);

        console.log("Transaction hash:", transactionResponse.hash);

        // Chờ giao dịch được khai thác
        await transactionResponse.wait();

        console.log("Transaction confirmed");
    } catch (error) {
        console.error("Error:", error);
    }
}

sendToken();
