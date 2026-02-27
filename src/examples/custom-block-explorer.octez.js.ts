/// START
import { BlockExplorer, NetworkType, Network } from "@airgap/beacon-dapp";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import Logger from "../Logger";
/// END

const customBlockExplorerTaquito = async (loggerFun: Function) => {
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
        [NetworkType.WEEKLYNET]: "https://tzkt.io",
        [NetworkType.DAILYNET]: "https://tzkt.io",
        [NetworkType.DELPHINET]: "https://tzkt.io",
        [NetworkType.EDONET]: "https://tzkt.io",
        [NetworkType.FLORENCENET]: "https://tzkt.io",
        [NetworkType.GRANADANET]: "https://tzkt.io",
        [NetworkType.HANGZHOUNET]: "https://tzkt.io",
        [NetworkType.ITHACANET]: "https://tzkt.io",
        [NetworkType.JAKARTANET]: "https://tzkt.io",
        [NetworkType.KATHMANDUNET]: "https://tzkt.io",
        [NetworkType.LIMANET]: "https://tzkt.io",
        [NetworkType.MUMBAINET]: "https://tzkt.io",
        [NetworkType.NAIROBINET]: "https://tzkt.io",
        [NetworkType.OXFORDNET]: "https://tzkt.io",
        [NetworkType.PARISNET]: "https://tzkt.io",
        [NetworkType.QUEBECNET]: "https://tzkt.io",
        [NetworkType.RIONET]: "https://tzkt.io",
        [NetworkType.TEZLINK_SHADOWNET]: "https://tzkt.io",
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

  const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    blockExplorer: new TzStatsBlockExplorer(),
  });

  try {
    logger.log("Requesting permissions...");
    const permissions = await wallet.client.requestPermissions();
    logger.log("Got permissions:", permissions.address);
  } catch (error) {
    logger.log("Got error:", error.message);
  }
  Tezos.setWalletProvider(wallet);
  /// END
};
export default customBlockExplorerTaquito;
