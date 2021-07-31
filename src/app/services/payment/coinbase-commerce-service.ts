import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CoinbaseCredentials} from "./coinbaseCredentials";
import {Observable} from "rxjs";
import {CoinbaseCharge} from "../../../models/CoinbaseCharge";
import {map} from "rxjs/operators";
import {CoinbaseChargeResponse} from "../../payments/cryptocurrency/coinbase/payment-component-coinbase/CoinBaseChargeResponse";


@Injectable({
  providedIn: 'root'
})
export class CoinbaseCommerceService {

  constructor(private http: HttpClient,
              private credentials: CoinbaseCredentials) {

  }

  async createCharge(charge:CoinbaseCharge) : Promise<Observable<CoinbaseChargeResponse>> {

    let header = new HttpHeaders()
      .append('X-CC-Api-Key', this.credentials.getCoinbaseAPiKey())
      .append('X-CC-Version', this.credentials.getAPIVersion())
      .append('content-type', 'application/json');

    const body=JSON.stringify(charge);

   let result = this.http.post
    (`${this.credentials.getCoinbaseAPIHost()}/charges`,
      body,{headers:header}).pipe(map(r=> {
      return new CoinbaseChargeResponse(r);
    }));

   return result;



}

  getCharge() {
    let chargeId = "ca661120-96ca-49b5-b3c3-92cb2210598a";
    let header = new HttpHeaders()
      .append('X-CC-Api-Key', this.credentials.getCoinbaseAPiKey())
      .append('X-CC-Version', this.credentials.getAPIVersion())

    let result =this.http.get(`${this.credentials.getCoinbaseAPIHost()}/charges/`+chargeId, {headers:header})
    result.subscribe(data=> {
      console.log(data);
    });
  }
}
