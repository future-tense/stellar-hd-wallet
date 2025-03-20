import slip10 from "micro-key-producer/slip10.js";
import { Keypair } from "@stellar/stellar-base";

const INVALID_SEED = "Invalid seed (must be a Buffer or hex string)";

/**
 * Class for SEP-0005 key derivation.
 * @see {@link https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md|SEP-0005}
 */
export class StellarHDWallet {

  /**
   * Instance from a seed
   * @param {(string|Buffer)} binary seed
   * @throws {TypeError} Invalid seed
   */
  static fromSeed(seed) {
    if (!Buffer.isBuffer(seed)) {
      if (typeof seed === "string") seed = Buffer.from(seed, 'hex')
      else throw new TypeError(INVALID_SEED);  
    }
    return new StellarHDWallet(seed);
  }

  /**
   * New instance from seed buffer
   * @param {Buffer} seed
   */
  constructor(seed) {
    this.key = slip10.fromMasterSeed(seed);
  }

  /**
   * Derive key given a full BIP44 path
   * @param {string} path BIP44 path string (eg. m/44'/148'/8')
   * @return {Buffer} Key binary as Buffer
   */
  derive(path) {
    return Buffer.from(this.key.derive(path).privateKey);
  }

  /**
   * Get Stellar account keypair for child key at given index
   * @param {Number} index Account index into path m/44'/148'/{index}
   * @return {stellar-base.Keypair} Keypair instance for the account
   */
  getKeypair(index) {
    const key = this.derive(`m/44'/148'/${index}'`);
    return Keypair.fromRawEd25519Seed(key);
  }

  /**
   * Get public key for account at index
   * @param {Number} index Account index into path m/44'/148'/{index}
   * @return {string} Public key
   */
  getPublicKey(index) {
    return this.getKeypair(index).publicKey();
  }

  /**
   * Get secret for account at index
   * @param {Number} index Account index into path m/44'/148'/{index}
   * @return {string} Secret
   */
  getSecret(index) {
    return this.getKeypair(index).secret();
  }
}
