# SwissSwap Migrators

A small Ethereum smart contract project that moves liquidity from one Uniswap-style exchange to a fork of it. Liquidity providers deposit their LP tokens, receive a bonus token as a reward, and later claim the equivalent LP tokens on the new exchange.

## What it does

- `LiquidityMigrator` collects LP tokens from users through `deposit(amount)`, and mints the same amount of `BonusToken` to the depositor.
- When the admin calls `migrate()`, the contract removes all liquidity from the original pair through its router and adds it to the fork's pair through the fork's router.
- After the migration, each depositor calls `claimLptoken()` to receive their LP tokens from the fork pair.
- `BonusToken` (symbol `BTK`) is a plain ERC20 that only the migrator contract can mint.

## Tech stack

- Solidity 0.6.6
- Truffle (compile, migrate, test)
- OpenZeppelin Contracts 3.x and Uniswap V2 periphery interfaces

## How to run

You need Node.js and Truffle (`npm install -g truffle`) plus a local blockchain such as Ganache.

```bash
npm install
truffle compile
```

To deploy, add a network to `truffle-config.js` (the file has commented examples), then provide the four addresses the migrator needs:

```bash
cp .env.example .env      # fill in the router and pair addresses
export $(grep -v '^#' .env | xargs)
truffle migrate --network <your-network>
```

`migrations/2_deploy_contracts.js` deploys `BonusToken` and `LiquidityMigrator`, then authorizes the migrator to mint the bonus token. The `test/` folder is empty, so there are no automated tests yet.

## Status

Prototype. The contracts compile with the pinned compiler, but the project has no tests and needs real router and pair addresses to deploy. The code is a learning exercise and has not been audited, so do not use it with real funds as it stands.

## Credits

Built on the Uniswap V2 contracts (`@uniswap/v2-periphery`) and OpenZeppelin Contracts. The idea follows the "liquidity migrator" pattern used when a project forks Uniswap and moves its liquidity.

## Notes

The `build/` and `node_modules/` folders are committed to the repository. `build/` holds Truffle's compiled output and can be regenerated with `truffle compile`.
