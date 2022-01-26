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
    <div className="fixed top-0 right-0 p-8 z-50">
      <button
        onClick={login}
        className="border border-white text-center rounded-full px-2 py-1 md:px-6 md:py-3 items-center bg-gray-500 transition-all duration-200 hover:bg-purple-600"
      >
        <div
          className={
            address
              ? `text-lg xl:text-2xl font-bold xl:p-2 text-orange-500 inline-flex items-center gap-2`
              : `text-lg xl:text-2xl font-bold xl:p-2 text-white inline-flex items-center gap-2`
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
