/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { NetworkType } from "../node_modules/octez.connect-sdk/dist/cjs";
/// END

async () => {
  /// START
  // We set the network to "SEOULNET"
  // The network configuration will make the connection is sent to the correct URL
  const Tezos = new TezosToolkit("https://rpc.seoulnet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    network: {
      type: NetworkType.SEOULNET,
      rpcUrl: "https://rpc.seoulnet.teztnets.com",
    },
  });

  Tezos.setWalletProvider(wallet);

  const result = await wallet.client.requestPermissions();

  console.log(`Connected to ${result.address} on ${result.network.type}`);
  /// END
};
