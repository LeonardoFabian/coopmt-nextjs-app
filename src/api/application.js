import { authFetch, ENV } from "@/utils";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { size } from "lodash";

export class Application {
  async fill(userId, serviceId) {
    const localData = this.getLocalData();

    // TODO: investigar la cantidad de garantias que puede seleccionar un socio
    const data = {
      user: userId,
      service: serviceId,
      amount: 0,
      termInMonths: 0,
      collaterals: [],
      paymentMethod: [],
      bankAccount: [],
      employmentInformation: [],
      relationships: [],
      cosigner: [],
    };
    localStorage.setItem(ENV.APPLICATION, JSON.stringify(data));
  }

  getLocalData() {
    const response = localStorage.getItem(ENV.APPLICATION);

    if (!response) {
      return [];
    } else {
      JSON.parse(response);
    }
    return response;
  }
}
