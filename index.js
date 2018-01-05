/**
 * Walter caluclator module
 */

"use strict";

const WALTER_PRICE = 0.53;
const TARE_PRICE = 0.08;

/**
 * Get number of walters possible for the money
 * @param {number} money
 * Returns [num_walters, leftover_money]
 */
function getNumWalters(money) {
  const ret = [0, 0];
  ret[0] = Math.floor(money / WALTER_PRICE);
  ret[1] = round(money - ret[0] * WALTER_PRICE);
  return ret;
}

function round(f) {
  return Math.round(f * Math.pow(10, 2)) / Math.pow(10, 2);
}

/**
 * Computes and returns the buying permutations
 * @param money {number} - Total money available
 */
function computeCycles(money) {
  let totalWalters = 0;

  while (money >= WALTER_PRICE) {
    const walters = getNumWalters(money);
    totalWalters += walters[0];
    money = round(walters[1] + TARE_PRICE * walters[0]);
  }

  return { totalWalters, money };
}

/**
 * Walter calculator function
 * @param money {number} - Total money available
 */
function walterCalculator(money) {
  return new Promise(resolve => {
    const defaultResult = {
      totalWalters: 0,
      money
    };

    if (money === "") {
      return resolve(defaultResult);
    }
    money = parseFloat(money);
    if (!isFinite(money)) {
      return resolve(defaultResult);
    }

    if (isNaN(money) || money < 0.0) {
      money = 0.0;
    }

    // Compute the number of walters we can buy
    return resolve(computeCycles(money));
  });
}

module.exports = walterCalculator;
