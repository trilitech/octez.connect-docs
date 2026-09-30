/// START
import { DAppClient, NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

async () => {
  /// START
  const dAppClient = new DAppClient({
    name: "Beacon Docs",
    network: { type: NetworkType.SHADOWNET },
  });

  console.log(dAppClient.name);
  /// END
};
