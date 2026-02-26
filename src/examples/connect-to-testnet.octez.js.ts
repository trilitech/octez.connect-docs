/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@tezos-x/octez.connect-sdk";
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
