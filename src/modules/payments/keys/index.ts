import white_label from '../../../white_label';

interface IPaymentKeys {
  sandbox_private_key: string;
  sandbox_public_key: string;
  production_private_key: string;
  production_public_key: string;
}

export default (): IPaymentKeys => {
  return {
    sandbox_private_key: white_label().payment_sandbox_private_api_key,
    sandbox_public_key: white_label().payment_sandbox_public_api_key,
    production_private_key: white_label().payment_private_api_key,
    production_public_key: white_label().payment_public_api_key,
  };
};
