import { useState, useEffect } from "react";
import { ethers } from "ethers";
import * as artifacts from "./../../../artifacts/contracts/Reward.sol/Rewards.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Contract Details
const CONTRACT_ADDRESS = "0xf5059a5D33d5853360D16C683c16e67980206f36"; // Replace with your contract's address
const ABI = artifacts.abi;

export const DiscoverWalletProviders = () => {
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [userAccount, setUserAccount] = useState<string>("");
  const [claimerAddress, setClaimerAddress] = useState<string>("");
  const [claimAmount, setClaimAmount] = useState("");
  const [balance, setBalance] = useState<any>("");
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  // Connect Wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("No Ethereum provider found");

      console.log("🚀 Connecting to MetaMask...");
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setUserAccount(accounts[0]);
      setSelectedWallet(window.ethereum);
      // setBalance(ethers.formatUnits(0, 18)); // Convert from Wei to token units
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Lắng nghe sự kiện đổi tài khoản MetaMask
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("🔄 Tài khoản đã thay đổi:", accounts);
      if (accounts.length > 0) {
        setUserAccount(accounts[0]); // Cập nhật tài khoản mới
        fetchBalance();
      } else {
        setUserAccount(""); // Reset nếu không có tài khoản
        setBalance("0");
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  // Fetch USDT Balance from Contract
  const fetchBalance = async () => {
    try {
      console.log("run to fetchBalance..........");
      if (!provider) throw new Error("No provider found");
      if (!userAccount) throw new Error("No wallet connected");
      console.log("🚀 ~ fetchBalance ~ userAccount:", userAccount);

      console.log("🔄 Fetching balance...");
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const balanceWei = await contract.getUSDTBalance(userAccount);

      setBalance(ethers.formatUnits(balanceWei, 18)); // Convert from Wei to token units
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // set reward for user
  const setReward = async () => {
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const transaction = await contract.setReward(claimerAddress, claimAmount);
      await transaction.wait();
      toast.success("Set reward successfully!");
    } catch (error) {
      console.error("Error setReward:", error);
    }
  };

  return (
    <>
      <h2>Wallets Detected:</h2>
      <div>
        {selectedWallet ? (
          <button onClick={connectWallet}>
            <img src={"logo"} alt="Wallet" />
            <div>Switch Wallet</div>
          </button>
        ) : (
          <button onClick={connectWallet}>
            <img src="/wallet-icon.png" alt="Wallet" />
            <div>Connect Wallet</div>
          </button>
        )}
      </div>

      <hr />
      <h2>{userAccount ? "Connected Wallet" : "No Wallet Selected"}</h2>
      {userAccount && (
        <div>
          <p>Account: {userAccount}</p>
          <button onClick={fetchBalance}>Get Balance</button>
          <p>TOKEN Balance: {balance} TOKEN</p>
        </div>
      )}
      <hr></hr>
      <hr></hr>
      {userAccount && (
        <div>
          <div>
            <p>user address: </p>
            <input onChange={(e) => setClaimerAddress(e.target.value)}></input>
          </div>
          <div>
            <p>amount: </p>
            <input
              type="number"
              onChange={(e) => setClaimAmount(e.target.value)}
            ></input>
          </div>
          <button onClick={setReward}>Set Reward</button>
        </div>
      )}

      <ToastContainer />
    </>
  );
};
