import { selector } from "./nearhandler.js";
import { connect, Contract } from "near-api-js";

const networkId = selector.options.network.networkId;
let RATING_CONTRACT = "";

if (networkId === "testnet") {
  RATING_CONTRACT = "ratecourseneargami.testnet";
} else {
  RATING_CONTRACT =
    "90f08df7e4d38fb24c05729e39291e8bcec4e20eb369eec148a016a4c3cc9120";
}

const nearConfig = {
  networkId: networkId,
  nodeUrl: `https://rpc.${networkId}.near.org`,
  walletUrl: `https://${networkId}.mynearwallet.com/`,
  helperUrl: `https://helper.${networkId}.near.org`,
  explorerUrl: `https://${networkId}.nearblocks.io`,
};

export const initNear = async () => {
  const wallet = await selector.wallet();
  const accounts = await wallet.getAccounts();
  const account = accounts[0];
  const accountId = accounts[0].accountId;

  return { wallet, accountId, account };
};

export const getAverageRating = async (courseId) => {
  const { accountId } = await initNear();
  const nearConnection = await connect(nearConfig);
  const account = await nearConnection.account(accountId);

  const contract = new Contract(account, RATING_CONTRACT, {
    viewMethods: ["getAverageRating"],
  });
  try {
    const rating = await contract.getAverageRating({
      courseId: courseId,
    });
    return rating;
  } catch (error) {
    console.error("Failed to get Average rating for course:", error);
  }
};

export const getOldRatingForUser = async (courseId) => {
  const { accountId } = await initNear();

  const nearConnection = await connect(nearConfig);
  const account = await nearConnection.account(accountId);

  const contract = new Contract(account, RATING_CONTRACT, {
    viewMethods: ["getUserRatingForCourse"],
  });
  try {
    const rating = await contract.getUserRatingForCourse({
      courseId: courseId,
      sender: accountId,
    });
    return rating;
  } catch (error) {
    console.error("Failed to get user rating for course:", error);
  }
};

export const getAllRatingForCourse = async (courseId) => {
  const { accountId } = await initNear();

  const nearConnection = await connect(nearConfig);
  const account = await nearConnection.account(accountId);

  const contract = new Contract(account, RATING_CONTRACT, {
    viewMethods: ["convertData"],
  });
  try {
    const rating = await contract.convertData({
      courseId: courseId,
    });
    return rating;
  } catch (error) {
    console.error("Failed to get all rating for course:", error);
  }
};

export const addRating = async (rate, courseId, message = "") => {
  const { account, wallet } = await initNear();
  try {
    const trans = await wallet.signAndSendTransactions({
      transactions: [
        {
          signerId: account.accountId,
          receiverId: RATING_CONTRACT,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "addRating",
                args: {
                  rate: rate,
                  courseId: courseId,
                  message: message,
                },
                gas: "30000000000000",
                deposit: "0",
              },
            },
          ],
        },
      ],
    });

    return trans;
  } catch (error) {
    console.error("Failed to add rating:", error);
  }
};
