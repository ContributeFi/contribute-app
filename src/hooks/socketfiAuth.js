export function savePasskeySession(res) {
  const session = res?.session;

  if (!res?.verified || !session) {
    throw new Error("Passkey authentication was not verified.");
  }

  const { socketfiAccessToken, userProfile, address } = session;

  localStorage.setItem("accessToken", socketfiAccessToken);
  localStorage.setItem("socketfiAccessToken", socketfiAccessToken);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  localStorage.setItem("walletAddress", JSON.stringify(address));
  localStorage.setItem("authVerified", "true");

  if (address?.TESTNET) {
    localStorage.setItem("walletAddress_TESTNET", address.TESTNET);
  }

  if (address?.PUBLIC) {
    localStorage.setItem("walletAddress_PUBLIC", address.PUBLIC);
  }
}
