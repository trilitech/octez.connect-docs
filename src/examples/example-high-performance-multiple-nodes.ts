/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

async () => {
  /// START
  // Define an array of nodes
  const RPCs = ["https://rpc.shadownet.teztnets.com"];

  // Select random node from array
  const randomRpc = RPCs[Math.floor(RPCs.length * Math.random())];

  const Tezos = new TezosToolkit(randomRpc);
  const wallet = new BeaconWallet({
    name: "Beacon Docs",
    network: { type: NetworkType.SHADOWNET },
  }); // Takes the same arguments as the DAppClient constructor

  Tezos.setWalletProvider(wallet);
  /// END
};
