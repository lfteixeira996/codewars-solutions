// Leo's girlfriend asked him to buy a gift list during his next trip, now he wants to know how many of them will he be able to buy.
// Write the following function to help Leo out:
// function howManyGifts(maxBudget, gifts)
// The first parameter is Leo's budget; he second one is an array (a list in Groovy) containing the price of each gift. You should return an integer representing the maximum amount of gifts Leo can buy.
function howManyGifts(maxBudget, gifts) {
  let remainingGifts = 0;
  // sorts gift array from smallest -> largest
  gifts = gifts.sort((a, b) => a - b);
  while (maxBudget >= 0) {
    maxBudget = maxBudget - gifts[remainingGifts];
    remainingGifts++;
  }
  return remainingGifts - 1;
}
