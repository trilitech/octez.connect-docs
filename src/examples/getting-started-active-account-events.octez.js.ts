/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { BeaconEvent } from "@tezos-x/octez.connect-dapp";
import { NetworkType } from "@tezos-x/octez.connect-sdk";
import Logger from "../Logger";
/// END

const getActiveAccountOctezJsWithEvents = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs octez.js",
    network: { type: NetworkType.SHADOWNET },
  });

  Tezos.setWalletProvider(wallet);

  wallet.client.subscribeToEvent(
    BeaconEvent.ACTIVE_ACCOUNT_SET as any,
    async () => {
      // An active account has been set, update the dApp UI
      const account = await wallet.client.getActiveAccount();
      logger.log(`${BeaconEvent.ACTIVE_ACCOUNT_SET} triggered: `, account);
    },
  );

  try {
    logger.log("Requesting permissions...");
    const permissions = await wallet.client.requestPermissions();
    logger.log("Got permissions:", permissions.address);
  } catch (error) {
    logger.log("Got error:", error?.message ?? error);
  }

  /// END
};
export default getActiveAccountOctezJsWithEvents;
