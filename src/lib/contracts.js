const supportedFeeAssets = {
  TESTNET: [
    {
      code: "USDC",
      issuer: "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
      contract: "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA",
    },
    {
      code: "XLM",
      issuer: "native",
      contract: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
    },
  ],
  PUBLIC: [
    {
      code: "USDC",
      issuer: "",
      contract: "CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZPUTHXSTZLEO7SJMI75",
    },
    {
      code: "XLM",
      issuer: "native",
      contract: "CAS3J7GYLGXMF6TDJBBYYSE3HQ6BBSMLNUQ34T6TZMYMW2EVH34XOWMA",
    },
  ],
};
const escrowContracts = {
  TESTNET: "CC2DVZYLB4APQZKQVGOCF3F2NTHLXJKTMXFEQZQI3E6RIBU2MARL5V7J",
  PUBLIC: "CDS6XH5TPKVL3JG4RP6WTV43C5KMTAOCMQ5XBYO6EKU5OKR2J7E74HFN",
};

export const selectedNetwork = "PUBLIC";

export const activeFeeAssets = supportedFeeAssets[selectedNetwork];
export const escrowContract = escrowContracts[selectedNetwork];
