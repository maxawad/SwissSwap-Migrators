const BonusToken = artifacts.require("BonusToken.sol");
const LiquidityMigrator = artifacts.require("LiquidityMigrator.sol");

// Set these before deploying (see README). They are the addresses of the
// original Uniswap-style router and pair, and of the fork's router and pair.
const routerAddress = process.env.ROUTER_ADDRESS || "";
const pairAddress = process.env.PAIR_ADDRESS || "";
const routerForkAddress = process.env.ROUTER_FORK_ADDRESS || "";
const pairForkAddress = process.env.PAIR_FORK_ADDRESS || "";

module.exports = async function (deployer) {
  if (!routerAddress || !pairAddress || !routerForkAddress || !pairForkAddress) {
    throw new Error(
      "Set ROUTER_ADDRESS, PAIR_ADDRESS, ROUTER_FORK_ADDRESS and PAIR_FORK_ADDRESS before migrating."
    );
  }

  await deployer.deploy(BonusToken);
  const bonusToken = await BonusToken.deployed();

  await deployer.deploy(
    LiquidityMigrator,
    routerAddress,
    pairAddress,
    routerForkAddress,
    pairForkAddress,
    bonusToken.address
  );
  const liquidityMigrator = await LiquidityMigrator.deployed();

  await bonusToken.setLiquidator(liquidityMigrator.address);
};
