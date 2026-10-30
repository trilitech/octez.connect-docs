/// START
import { BlockExplorer, DAppClient } from "@tezos-x/octez.connect-sdk";
import { NetworkType, Network } from "@tezos-x/octez.connect-types";
import Logger from "../Logger";
/// END

const customBlockExplorerBeacon = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  class TzStatsBlockExplorer extends BlockExplorer {
    constructor(
      public readonly rpcUrls: { [key in NetworkType]: string } = {
        [NetworkType.MAINNET]: "https://tzkt.io",
        [NetworkType.GHOSTNET]: "https://ghostnet.tzkt.io/",
        [NetworkType.SHADOWNET]: "https://shadownet.tzkt.io/",
        [NetworkType.SEOULNET]: "https://seoulnet.tzkt.io/",
        [NetworkType.TALLINNNET]: "https://tallinnnet.tzkt.io/",
        [NetworkType.USHUAIANET]: "https://ushuaianet.tzkt.io/",
        [NetworkType.WEEKLYNET]: "https://tzkt.io",
        [NetworkType.DAILYNET]: "https://tzkt.io",
        [NetworkType.TEZLINK_SHADOWNET]: "https://tzkt.io",
        [NetworkType.TEZOSX_PREVIEWNET]: "https://previewnet.tezosx.tzkt.io",
        [NetworkType.TEZOSX_MAINNET]: "https://etherlink.tzkt.io",
        [NetworkType.TEZOSX_SHADOWNET]: "https://shadownet.etherlink.tzkt.io",
        [NetworkType.CUSTOM]: "https://tzkt.io",
      },
    ) {
      super(rpcUrls);
    }

    public async getAddressLink(
      address: string,
      network: Network,
    ): Promise<string> {
      const blockExplorer = await this.getLinkForNetwork(network);

      return `${blockExplorer}/${address}`;
    }
    public async getTransactionLink(
      transactionId: string,
      network: Network,
    ): Promise<string> {
      const blockExplorer = await this.getLinkForNetwork(network);

      return `${blockExplorer}/${transactionId}`;
    }
  }

  const dAppClient = new DAppClient({
    name: "Beacon Docs",
    network: { type: NetworkType.SHADOWNET },
    blockExplorer: new TzStatsBlockExplorer(),
  });

  try {
    logger.log("Requesting permissions...");
    const permissions = await dAppClient.requestPermissions();
    logger.log("Got permissions:", permissions.address);
  } catch (error) {
    logger.log("Got error:", error?.message ?? error);
  }
  /// END
};
export default customBlockExplorerBeacon;
