import broadcastRequestBeacon from "./examples/broadcast-request.octez.connect";
import broadcastRequestTaquito from "./examples/broadcast-request.octez.js";
import destroyBeacon from "./examples/destroy.octez.connect";
import destroyTaquito from "./examples/destroy.octez.js";
import differentNodeBeacon from "./examples/different-node.octez.connect";
import differentNodeTaquito from "./examples/different-node.octez.js";
import disableUIBeacon from "./examples/disable-all-ui.octez.connect";
import disableUITaquito from "./examples/disable-all-ui.octez.js";
import disconnectWalletBeacon2 from "./examples/disconnect-wallet-2.octez.connect";
import disconnectWalletTaquito2 from "./examples/disconnect-wallet-2.octez.js";
import disconnectWalletBeacon from "./examples/disconnect-wallet.octez.connect";
import disconnectWalletTaquito from "./examples/disconnect-wallet.octez.js";
import exampleAdvancedBeacon from "./examples/example-advanced.octez.connect";
import exampleAdvancedTaquito from "./examples/example-advanced.octez.js";
import exampleSimpleBeacon from "./examples/example-simple.octez.connect";
import exampleSimpleTaquito from "./examples/example-simple.octez.js";
import fa12TransferTaquito from "./examples/fa1.2-transfer.octez.js";
import fa2TransferTaquito from "./examples/fa2-transfer.octez.js";
import getActiveAccountBeaconWithEvents from "./examples/getting-started-active-account-events.octez.connect";
import getActiveAccountTaquitoWithEvents from "./examples/getting-started-active-account-events.octez.js";
import getActiveAccountBeacon from "./examples/getting-started-active-account.octez.connect";
import getActiveAccountTaquito from "./examples/getting-started-active-account.octez.js";
import getOperationRequestBeaconWithEvents from "./examples/getting-started-operation-request-events.octez.connect";
import getOperationRequestTaquitoWithEvents from "./examples/getting-started-operation-request-events.octez.js";
import requestOperationBeacon from "./examples/getting-started-operation-request.octez.connect";
import requestOperationTaquito from "./examples/getting-started-operation-request.octez.js";
import requestPermissionsBeacon from "./examples/getting-started-permission-request.octez.connect";
import requestPermissionsTaquito from "./examples/getting-started-permission-request.octez.js";
import infoConnectionBeacon from "./examples/info-connection.octez.connect";
import infoConnectionTaquito from "./examples/info-connection.octez.js";
import infoVersionBeacon from "./examples/info-version.octez.connect";
import infoVersionTaquito from "./examples/info-version.octez.js";
import networkCustomBeacon from "./examples/network-custom-network.octez.connect";
import networkCustomTaquito from "./examples/network-custom-network.octez.js";
import networkSeoulnetWithRpcBeacon from "./examples/network-seoulnet-with-url.octez.connect";
import networkSeoulnetWithRpcTaquito from "./examples/network-seoulnet-with-url.octez.js";
import networkSeoulnetBeacon from "./examples/network-seoulnet.octez.connect";
import networkSeoulnetTaquito from "./examples/network-seoulnet.octez.js";
import networkMainnetWithUrlBeacon from "./examples/network-mainnet-with-url.octez.connect";
import networkMainnetWithUrlTaquito from "./examples/network-mainnet-with-url.octez.js";
import overrideAlertAbortedBeacon from "./examples/override-alert-aborted-handler.octez.connect";
import overrideAlertAbortedTaquito from "./examples/override-alert-aborted-handler.octez.js";
import overrideDefaultEventBeacon from "./examples/override-default-event.octez.connect";
import overrideDefaultEventTaquito from "./examples/override-default-event.octez.js";
import signPayloadMichelineBeacon from "./examples/sign-payload-micheline.octez.connect";
import signPayloadMichelineTaquito from "./examples/sign-payload-micheline.octez.js";
import signPayloadOperationBeacon from "./examples/sign-payload-operation.octez.connect";
import signPayloadOperationTaquito from "./examples/sign-payload-operation.octez.js";
import signPayloadRawBeacon from "./examples/sign-payload-raw.octez.connect";
import signPayloadRawTaquito from "./examples/sign-payload-raw.octez.js";
import simpleContractCallBeacon from "./examples/simple-contract-call.octez.connect";
import simpleContractCallTaquito from "./examples/simple-contract-call.octez.js";
import subscribeToEventBeacon from "./examples/subscribe-to-event.octez.connect";
import subscribeToEventTaquito from "./examples/subscribe-to-event.octez.js";

export class ExecuteExample {
  private static wasHandlerInitialized = false;

  static async execute(code: string, updateLogs: Function) {
    try {
      await this.executeExample(code, updateLogs);
    } catch (error) {
      updateLogs(error.message);
    }
  }

  private static setUpHandler() {
    if (this.wasHandlerInitialized) {
      return;
    }

    window.addEventListener("error", function (e) {
      e.preventDefault();
      console.error("Error occurred: " + e.error.message);
      this.location.reload();
    });

    window.addEventListener("unhandledrejection", function (e) {
      e.preventDefault();
      console.error("Error occurred: " + e.reason.message);
      this.location.reload();
    });

    this.wasHandlerInitialized = true;
  }

  private static async executeExample(code: string, updateLogs: Function) {
    this.setUpHandler();
    switch (code) {
      case "beacon permission request":
        await requestPermissionsBeacon(updateLogs);
        break;
      case "taquito permission request":
        await requestPermissionsTaquito(updateLogs);
        break;
      case "beacon get active account":
        await getActiveAccountBeacon(updateLogs);
        break;
      case "taquito get active account":
        await getActiveAccountTaquito(updateLogs);
        break;
      case "beacon get active account with events":
        await getActiveAccountBeaconWithEvents(updateLogs);
        break;
      case "taquito get active account with events":
        await getActiveAccountTaquitoWithEvents(updateLogs);
        break;
      case "beacon request operation":
        await requestOperationBeacon(updateLogs);
        break;
      case "taquito request operation":
        await requestOperationTaquito(updateLogs);
        break;
      case "beacon request operation with events":
        await getOperationRequestBeaconWithEvents(updateLogs);
        break;
      case "taquito request operation with events":
        await getOperationRequestTaquitoWithEvents(updateLogs);
        break;
      case "beacon advanced example":
        await exampleAdvancedBeacon(updateLogs);
        break;
      case "taquito advanced example":
        await exampleAdvancedTaquito(updateLogs);
        break;
      case "beacon simple example":
        await exampleSimpleBeacon(updateLogs);
        break;
      case "taquito simple example":
        await exampleSimpleTaquito(updateLogs);
        break;
      case "beacon disconnect wallet":
        await disconnectWalletBeacon(updateLogs);
        break;
      case "taquito disconnect wallet":
        await disconnectWalletTaquito(updateLogs);
        break;
      case "beacon destroy":
        await destroyBeacon(updateLogs);
        break;
      case "taquito destroy":
        await destroyTaquito(updateLogs);
        break;
      case "beacon disconnect wallet 2":
        await disconnectWalletBeacon2(updateLogs);
        break;
      case "taquito disconnect wallet 2":
        await disconnectWalletTaquito2(updateLogs);
        break;
      case "beacon broadcast request":
        await broadcastRequestBeacon(updateLogs);
        break;
      case "taquito broadcast request":
        await broadcastRequestTaquito(updateLogs);
        break;
      case "beacon simple contract call":
        await simpleContractCallBeacon(updateLogs);
        break;
      case "taquito simple contract call":
        await simpleContractCallTaquito(updateLogs);
        break;
      case "taquito fa1.2 transfer":
        await fa12TransferTaquito(updateLogs);
        break;
      case "taquito fa2 transfer":
        await fa2TransferTaquito(updateLogs);
        break;
      case "beacon subscribe to event":
        await subscribeToEventBeacon(updateLogs);
        break;
      case "taquito subscribe to event":
        await subscribeToEventTaquito(updateLogs);
        break;
      case "beacon mainnet network":
        await networkMainnetWithUrlBeacon(updateLogs);
        break;
      case "taquito mainnet network":
        await networkMainnetWithUrlTaquito(updateLogs);
        break;
      case "beacon seoulnet network":
        await networkSeoulnetBeacon(updateLogs);
        break;
      case "taquito seoulnet network":
        await networkSeoulnetTaquito(updateLogs);
        break;
      case "beacon seoulnet network with RPC":
        await networkSeoulnetWithRpcBeacon(updateLogs);
        break;
      case "taquito seoulnet network with RPC":
        await networkSeoulnetWithRpcTaquito(updateLogs);
        break;
      case "beacon custom network":
        await networkCustomBeacon(updateLogs);
        break;
      case "taquito custom network":
        await networkCustomTaquito(updateLogs);
        break;
      case "beacon sign payload micheline":
        await signPayloadMichelineBeacon(updateLogs);
        break;
      case "taquito sign payload micheline":
        await signPayloadMichelineTaquito(updateLogs);
        break;
      case "beacon sign payload operation":
        await signPayloadOperationBeacon(updateLogs);
        break;
      case "taquito sign payload operation":
        await signPayloadOperationTaquito(updateLogs);
        break;
      case "beacon sign payload raw":
        await signPayloadRawBeacon(updateLogs);
        break;
      case "taquito sign payload raw":
        await signPayloadRawTaquito(updateLogs);
        break;
      case "beacon disable ui":
        await disableUIBeacon(updateLogs);
        break;
      case "taquito disable ui":
        await disableUITaquito(updateLogs);
        break;
      case "beacon request permission events":
        await overrideDefaultEventBeacon(updateLogs);
        break;
      case "taquito request permission events":
        await overrideDefaultEventTaquito(updateLogs);
        break;
      case "beacon request permission alert":
        await overrideAlertAbortedBeacon(updateLogs);
        break;
      case "taquito request permission alert":
        await overrideAlertAbortedTaquito(updateLogs);
        break;
      case "beacon different node":
        await differentNodeBeacon(updateLogs);
        break;
      case "taquito different node":
        await differentNodeTaquito(updateLogs);
        break;
      case "beacon sdk version":
        await infoVersionBeacon(updateLogs);
        break;
      case "taquito sdk version":
        await infoVersionTaquito(updateLogs);
        break;
      case "beacon sdk client":
        await infoVersionBeacon(updateLogs);
        break;
      case "taquito sdk client":
        await infoVersionTaquito(updateLogs);
        break;
      case "beacon sdk connection":
        await infoConnectionBeacon(updateLogs);
        break;
      case "taquito sdk connection":
        await infoConnectionTaquito(updateLogs);
        break;
      default:
        break;
    }
  }
}
