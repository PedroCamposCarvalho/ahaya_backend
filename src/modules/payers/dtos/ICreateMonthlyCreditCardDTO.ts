export interface ICreateMonthlyCreditCardRequestDTO {
  id_user: string;
  ssn: string;
  holder: string;
  number: string;
  expiry: string;
  cvc: string;
}

export interface ICreateMonthlyCreditCardDatabaseDTO {
  id_user: string;
  flag: string;
  last4digits: string;
  payment_profile: string;
}
