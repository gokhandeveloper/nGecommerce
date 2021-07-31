
interface CryptocurrencyAddresses {
  bitcoin: string
  bitcoincash: string
  dai: string
  dogecoin: string
  ethereum: string
  litecoin: string
  usdc: string
}

interface Pricing {

    ethereum: {
      amount: string
      currency: string
    },
    usdc: {
      amount: string,
      currency: string
    },
    dai: {
      amount: string
      currency: string
    },
    bitcoincash: {
      amount: string,
      currency: string
    },
    dogecoin: {
      amount: string,
      currency:string
    },
    litecoin: {
      amount: string,
      currency: string
    },
    bitcoin: {
      amount: string,
      currency: string
    }
}

export class CoinbaseChargeResponse {
  public status: string = "";

  public cryproAddresses!: CryptocurrencyAddresses;
  public pricing!: Pricing;

  constructor(r: Object) {

    Object.entries(r).forEach(obj => {

      if(obj[1].hasOwnProperty("addresses")) {
        this.cryproAddresses=obj[1]["addresses"];
        this.pricing=obj[1]['pricing'];

      };
    });
  }
}
