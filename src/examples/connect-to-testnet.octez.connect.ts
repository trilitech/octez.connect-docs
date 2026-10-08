/// START
import { DAppClient, NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

async () => {
  /// START
  // We set the network to "SHADOWNET"
  // The network configuration will make the connection is sent to the correct URL
  const dAppClient = new DAppClient({
    name: "Beacon Docs",
    network: {
      type: NetworkType.SHADOWNET,
      rpcUrl: "https://rpc.shadownet.teztnets.com",
    },
  });

  const result = await dAppClient.requestPermissions();

  console.log(`Connected to ${result.address} on ${result.network.type}`);
  /// END
};
