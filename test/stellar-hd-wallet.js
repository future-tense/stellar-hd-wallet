import assert from 'assert';
import { mnemonicToSeedSync } from 'bip39';
import { StellarHDWallet } from '../src/stellar-hd-wallet';

const MNEMONIC_ENGLISH =
  'asthma blouse security reform bread mesh roast garage ' +
  'win clock aerobic gauge emotion slender frozen profit ' +
  'duck uphold time perfect giggle drop turn movie';
const MNEMONIC_KOREAN =
  '한쪽 공개 학점 거액 재빨리 주민 해군 조절 종로 여론 성당 송아지';

const FROM_MNEMONIC_ENGLISH_PUBLIC_KEY_0 =
  'GBJCYUFJA7VA4GOZV7ZFVB7FGZTLVQTNS7JWJOWQVK6GN7DBUW7L5I5O';
const FROM_MNEMONIC_ENGLISH_SECRET_KEY_0 =
  'SC4SPBMTO3FAKHIW5EGMOX6UR6ILGBKHFWUPKN4QHEU426UBU4CKFNHW';

describe('StellarHDWallet', () => {
  describe('fromMnemonic', () => {
    it('creates wallet from mnemonic with defaults', () => {
      const seed = mnemonicToSeedSync(MNEMONIC_ENGLISH);
      const wallet = StellarHDWallet.fromSeed(seed);
      assert.equal(wallet.getPublicKey(0), FROM_MNEMONIC_ENGLISH_PUBLIC_KEY_0);
      assert.equal(wallet.getSecret(0), FROM_MNEMONIC_ENGLISH_SECRET_KEY_0);
    })

    it('creates wallet from mnemonic with specific language', () => {
      const expectedPublic =
        'GCFWJRACE5TMTPAOF2DCOJXARZT23LW47C3YW22CAMWFJJJ25NYLCXND'
      const expectedSecret =
        'SBLSO6PNV55E7N3KEP5EML6L3BQT35F3LUKZL4ZY5T3UXWZZJW6DHQAO'
      const seed = mnemonicToSeedSync(MNEMONIC_KOREAN);
      const wallet = StellarHDWallet.fromSeed(seed);
      assert.equal(wallet.getPublicKey(0), expectedPublic)
      assert.equal(wallet.getSecret(0), expectedSecret)
    })

    it('creates wallet from mnemonic with password', () => {
      const expectedPublic =
        'GCQR32FP47DBS2TESSTXWGI5ZAEYV43SD45QNMTB6R7Q4CBONEMBMCC6'
      const expectedSecret =
        'SB3XPQZ5JMINM2VECDHH5YQWFH2RGMDC54JUHSLZZ2OAN4TNTZ4NDJMB'
      const seed = mnemonicToSeedSync(MNEMONIC_ENGLISH, 'password');
      const wallet = StellarHDWallet.fromSeed(seed);
      assert.equal(wallet.getPublicKey(0), expectedPublic)
      assert.equal(wallet.getSecret(0), expectedSecret)
    })

    it('creates wallet from mnemonic with password AND specific language', () => {
      const expectedPublic =
        'GDHHKYVBHPMAQ7LEUXZSV5SJD67RRJNGTSVSQ5G76633XYYYMFYJG6DW'
      const expectedSecret =
        'SDMDPWEW2JXUH7CZMGZTHWYAV25JKV4QJCM44II5XYUBYBHKQUZVBTFF'
      const seed = mnemonicToSeedSync(MNEMONIC_KOREAN, '스텔라');
      const wallet = StellarHDWallet.fromSeed(seed);
      assert.equal(wallet.getPublicKey(0), expectedPublic)
      assert.equal(wallet.getSecret(0), expectedSecret)
    })
  })

  describe('fromSeed', () => {
    it('creates wallet from seed hex string', () => {
      const seedHex = mnemonicToSeedSync(MNEMONIC_ENGLISH).toString('hex');
      const wallet = StellarHDWallet.fromSeed(seedHex);
      assert.equal(wallet.getPublicKey(0), FROM_MNEMONIC_ENGLISH_PUBLIC_KEY_0);
      assert.equal(wallet.getSecret(0), FROM_MNEMONIC_ENGLISH_SECRET_KEY_0);
    })

    it('creates wallet from seed Buffer', () => {
      const seedBuffer = mnemonicToSeedSync(MNEMONIC_ENGLISH);
      const wallet = StellarHDWallet.fromSeed(seedBuffer);
      assert.equal(wallet.getPublicKey(0), FROM_MNEMONIC_ENGLISH_PUBLIC_KEY_0);
      assert.equal(wallet.getSecret(0), FROM_MNEMONIC_ENGLISH_SECRET_KEY_0);
    })
  })
})
