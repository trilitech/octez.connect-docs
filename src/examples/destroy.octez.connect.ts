/// START
import Logger from "../Logger";
import { DAppClient, NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

const destroyBeacon = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const dAppClient = new DAppClient({
    name: "Beacon Docs",
    network: { type: NetworkType.SHADOWNET },
  });

  dAppClient
    .destroy()
    .then(() => {
      logger.log("Instance destroyed.");
    })
    .catch((err) => logger.log("Error: ", err.message));
  /// END
};
export default destroyBeacon;
