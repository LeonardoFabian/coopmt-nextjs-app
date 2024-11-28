import { ENV, authFetch } from "@/utils";

export class User {
  async getUserGroups() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.USER_GROUPS}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getByDocumentId(documentId) {
    const filters = `filters[documentId][$eq]=${documentId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.UPDATE}?${filters}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the currently authenticated user's information.
   *
   * @return {object} The user's data.
   */
  async getMe() {
    try {
      const populateDefaultAddress = "populate[0]=defaultAddress";

      const populateDefaultPhone = "populate[1]=defaultPhone";
      const populateCurrentJob = "populate[2]=currentJob";
      const populateAddressMeta =
        "populate[3]=defaultAddress.city&populate[4]=defaultAddress.state&populate[5]=defaultAddress.country";
      const populatePersonalReferences = "populate[6]=personal_references";
      const populateBeneficiaries = "populate[7]=beneficiaries";
      const populateBankAccounts =
        "populate[8]=bank_accounts&populate[9]=bank_accounts.bank&populate[10]=bank_accounts.type&populate[11]=bank_accounts.currency";
      const populateDefaultBankAccount =
        "populate[12]=defaultBankAccount&populate[13]=defaultBankAccount.bank&populate[14]=defaultBankAccount.type&populate[15]=defaultBankAccount.currency";
      const populateGender = "populate[16]=gender";
      const populateMaritalStatus = "populate[17]=maritalStatus";
      const populateBoardPosition = "populate[18]=board_position";
      const populateBoardGroup = "populate[19]=board_group";
      const populateEmploymentInformation =
        "populate[20]=currentJob.sector&populate[21]=currentJob.employment_type";
      const populate = `${populateDefaultAddress}&${populateDefaultPhone}&${populateCurrentJob}&${populateAddressMeta}&${populatePersonalReferences}&${populateBeneficiaries}&${populateBankAccounts}&${populateDefaultBankAccount}&${populateGender}&${populateMaritalStatus}&${populateBoardPosition}&${populateBoardGroup}&${populateEmploymentInformation}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.ME}?${populate}`;

      const response = await authFetch(url); // authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates the authenticated user's information.
   *
   * @param {string} userId - The ID of the user to update.
   * @param {object} data - The updated user data.
   * @return {object} The updated user's data.
   */
  async updateMe(userId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.UPDATE}/${userId}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
