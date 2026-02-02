/// START
import { DAppClient } from "@tezos-x/octez.connect-sdk";
/// END

async () => {
  /// START
  const dAppClient = new DAppClient({ name: "Beacon Docs" });

  console.log(dAppClient.name);
  /// END
};
