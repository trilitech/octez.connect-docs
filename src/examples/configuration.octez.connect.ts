/// START
import { DAppClient } from "../node_modules/octez.connect-sdk/dist/cjs";
/// END

async () => {
  /// START
  const dAppClient = new DAppClient({ name: "Beacon Docs" });

  console.log(dAppClient.name);
  /// END
};
