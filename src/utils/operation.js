

import { tezos } from "./tezos";

export const buyTicketOperation = async () => {
  try {
    const contract = await tezos.wallet.at(
      "KT1TRHqoWYzzdMB4J3TquqxLCVU9oG5b5HS9"
    );
    const op = await contract.methods.buy_ticket().send({
      amount: 2,
      mutez: false,
    });
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};



export const endGameOperation = async () => {
  try {
    const contract = await tezos.wallet.at(
      "KT1Qv5wVgps3xCsPtTq8vmDB5niKisB37Bog"
    );
    const randomNumber = Math.random(Math.random() * 1000);
    const op = await contract.methods.end_game(randomNumber).send();
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};
