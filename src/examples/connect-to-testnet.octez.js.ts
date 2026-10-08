/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { NetworkType } from "@tezos-x/octez.connect-dapp";
/// END

async () => {
  /// START
  // We set the network to "SHADOWNET"
  // The network configuration will make the connection is sent to the correct URL
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs octez.js",
    network: {
      type: NetworkType.SHADOWNET,
      rpcUrl: "https://rpc.shadownet.teztnets.com",
    },
  });

  Tezos.setWalletProvider(wallet);

  const result = await wallet.client.requestPermissions();

  console.log(`Connected to ${result.address} on ${result.network.type}`);
  /// END
};
