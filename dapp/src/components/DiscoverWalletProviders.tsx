import { useState, useEffect } from "react";
import { ethers } from "ethers";
import * as artifacts from "./../../../artifacts/contracts/Reward.sol/Rewards.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../assets/metamask.jpg";

// Contract Details
const CONTRACT_ADDRESS = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"; // Replace with your contract's address
const ABI = artifacts.abi;

export const DiscoverWalletProviders = () => {
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [userAccount, setUserAccount] = useState<string>("");
  const [claimerAddress, setClaimerAddress] = useState<string>("");
  const [claimAmount, setClaimAmount] = useState("");
  const [balance, setBalance] = useState<any>("");
  const [rewardToken, setRewardToken] = useState<any>("");
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  // Connect Wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("No Ethereum provider found");
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setUserAccount(accounts[0]);
      setSelectedWallet(window.ethereum);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Fetch the owner address from the contract
  const fetchOwner = async () => {
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const owner = await contract.owner();
      setIsOwner(owner.toLowerCase() === userAccount.toLowerCase());
    } catch (error) {
      console.error("Error fetching owner address:", error);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("Account has changed:", accounts);
      if (accounts.length > 0) {
        setUserAccount(accounts[0]); // Cập nhật tài khoản mới
        fetchBalance();
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);
      } else {
        setUserAccount("");
        setBalance("0");
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    if (provider) {
      fetchReward();
      fetchOwner();
    }
  }, [provider, userAccount]);

  const fetchBalance = async () => {
    try {
      console.log("🔄 Fetching balance...");
      if (!provider) {
        setBalance("");
      } else {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const balanceWei = await contract.getUSDTBalance(userAccount);

        setBalance(ethers.formatUnits(balanceWei, 18)); // Convert from Wei to token units
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchReward = async () => {
    try {
      console.log("run to fetch reward");
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const reward = await contract.getReward();
      setRewardToken(ethers.formatUnits(reward, 18));
    } catch (error) {
      console.error("Error fetching rewards:", error);
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
      setClaimAmount("");
      setClaimerAddress("");
    } catch (error) {
      console.error("Error setReward:", error);
    }
  };

  const claimReward = async () => {
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const transaction = await contract.claimReward();
      await transaction.wait();
      toast.success("Claim reward successfully!");
      fetchReward();
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
            <img src={image} alt="Wallet" />
            <div>MetaMask</div>
          </button>
        ) : (
          <button onClick={connectWallet}>
            <img src={image} alt="Wallet" />
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
          <p>TOKEN Balance: {balance}</p>
        </div>
      )}
      <hr></hr>
      {userAccount && (
        <div>
          <div>
            <p>My rewards: {rewardToken} TOKEN</p>
          </div>
          <div>
            <button
              onClick={claimReward}
              disabled={parseFloat(rewardToken) <= 0}
            >
              Claim reward
            </button>
          </div>
        </div>
      )}
      <hr></hr>
      {userAccount && isOwner && (
        <div>
          <div>
            <p>user address: </p>
            <p>
              <input
                onChange={(e) => setClaimerAddress(e.target.value)}
                value={claimerAddress}
              ></input>
            </p>
          </div>

          <div>
            <p>amount: </p>
            <p>
              <input
                type="number"
                onChange={(e) => setClaimAmount(e.target.value)}
                value={claimAmount}
              ></input>
            </p>
          </div>
          <button onClick={setReward}>Set Reward</button>
        </div>
      )}

      <ToastContainer />
    </>
  );
};
