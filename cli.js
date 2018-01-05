'use strict';

const walterCalculator = require('./index');

/**
 * Cli for walter calclator
 */
const cli = async () => {
  if (process.argv.length > 1) {
    const money = process.argv[2];
    const result = await walterCalculator(money);
    console.log(result);
  }
}

cli();
