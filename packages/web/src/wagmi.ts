import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { sepolia, scrollSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [sepolia, scrollSepolia],
    connectors: [coinbaseWallet()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [sepolia.id]: http(
        "https://gateway-api.cabinet-node.com/5b718fd2352985b5bb5c677cb006bc24"
      ),
      [scrollSepolia.id]: http(
        "https://gateway-api.cabinet-node.com/e1416a4e1b562995cc52b2864a20a061"
      ),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
