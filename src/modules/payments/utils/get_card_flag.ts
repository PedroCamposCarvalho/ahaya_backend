export default function get_card_flag(number: string): string {
  let re = new RegExp('^4');
  if (number.match(re) != null) return 'visa';

  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number,
    )
  )
    return 'mastercard';

  // AMEX
  re = new RegExp('^3[47]');
  if (number.match(re) != null) return 'american_express';

  // Discover

  // Diners
  re = new RegExp('^36');
  if (number.match(re) != null) return 'diners_club';

  // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])');
  if (number.match(re) != null) return 'jcb';

  return '';
}
