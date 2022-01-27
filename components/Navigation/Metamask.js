import { useContext } from "react";
import { IoWallet } from "react-icons/io5";
import { MetaContext } from "../../context/MetaContext";
import { getShortAccountHash, login } from "../../pages/api/util";
import { ethers } from "ethers";

const ConnectWallet = ({ address, setAddress }) => {
  const login = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();
    setAddress(walletAddress);
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-8">
      <button
        onClick={login}
        className="items-center px-2 py-1 text-center transition-all duration-200 bg-gray-200 border border-white rounded-full md:px-6 md:py-3 hover:bg-orange-100 hover:text-white"
      >
        <div
          className={
            address
              ? `text-lg xl:text-2xl font-bold xl:p-2 text-orange-500 inline-flex items-center gap-2`
              : `text-lg xl:text-2xl font-bold xl:p-2 inline-flex items-center gap-2`
          }
        >
          <IoWallet className="" />
          {address ? getShortAccountHash(address) : "Connect wallet"}
        </div>
      </button>
    </div>
  );
};

export default ConnectWallet;
