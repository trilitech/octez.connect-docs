/// START
import Logger from "../Logger";
import { DAppClient, NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

const disconnectWalletBeacon = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const dAppClient = new DAppClient({
    name: "Beacon Docs",
    network: { type: NetworkType.SHADOWNET },
  });

  dAppClient.clearActiveAccount().then(async () => {
    const account = await dAppClient.getActiveAccount();

    logger.log("Active Account", account);
  });
  /// END
};
export default disconnectWalletBeacon;
