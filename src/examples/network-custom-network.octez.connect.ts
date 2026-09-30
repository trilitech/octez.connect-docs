/// START
import { DAppClient, NetworkType } from "@tezos-x/octez.connect-sdk";
import Logger from "../Logger";
/// END

const networkCustomBeacon = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const dAppClient = new DAppClient({
    name: "Beacon Docs",
    network: {
      type: NetworkType.CUSTOM,
      // e.g. a local node at "http://localhost:8732". Here we point to a public
      // Shadownet RPC so the example can be run as-is.
      name: "Shadownet (custom)",
      rpcUrl: "https://rpc.shadownet.teztnets.com",
    },
  });

  // Custom network (eg. local development or latest testnet).
  // Not every wallet supports custom networks.
  try {
    const result = await dAppClient.requestPermissions();
    logger.log("Permissions: ", result);
  } catch (error) {
    logger.log("Error: ", error?.message ?? error);
  }
  /// END
};
export default networkCustomBeacon;
