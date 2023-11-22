// TODO 2.a - Setup a Beacon Wallet instance
import { BeaconWallet } from "@taquito/beacon-wallet";

export const wallet = new BeaconWallet({
  name: "Education ",
  preferredNetwork: "ghostnet",
});


export const connectWallet = async () => {
  await wallet.requestPermissions({ network: { type: "ghostnet" } });
};


export const getAccount = async () => {
  const connectedWallet = await wallet.client.getActiveAccount();
  if (connectedWallet) {
    return connectedWallet.address;
  } else {
    return "";
  }
};
