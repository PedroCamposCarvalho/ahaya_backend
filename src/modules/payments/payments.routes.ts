import { Router } from 'express';
import createCustomer from './methods/createCustomer';
import createPaymentProfile from './methods/createPaymentProfile';
import createSignature from './methods/createSignature';
import payBill from './methods/payBill';
import refundCharge from './methods/refundCharge';
import payPix from './methods/payPix';
import verifyCustomerExists from './methods/verifyCustomerExists';
import consultCharge from './methods/consultCharge';

const paymentsRouter = Router();

paymentsRouter.post('/createProfile', createCustomer);
paymentsRouter.post('/createPaymentProfile', createPaymentProfile);
paymentsRouter.post('/payBill', payBill);
paymentsRouter.post('/createSignature', createSignature);
paymentsRouter.post('/refundCharge', refundCharge);
paymentsRouter.post('/payPix', payPix);
paymentsRouter.get('/verifyCustomerExists', verifyCustomerExists);
paymentsRouter.get('/consultCharge', consultCharge);

export default paymentsRouter;
