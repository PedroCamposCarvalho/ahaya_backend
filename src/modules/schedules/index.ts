import * as cron from 'node-cron';
import base64 from 'base-64';
import fetch, { Headers } from 'node-fetch';
import white_label from '../../white_label';

export default function projectSchedules(): void {
  const url =
    process.env.ENV === 'sdev'
      ? 'http://localhost:8888'
      : white_label().backend_url;

  cron.schedule('* * * * * *', () => {
    // console.log('Executando schedule de agendamento de aulas...');
    // fetch(`${url}/experimentalClasses/scheduleCreate`);
  });

  // cron.schedule('0 4 * * *', async function () {
  //   // console.log('Executando schedule de limpeza das cobranças...');
  //   const password = '';
  //   fetch('https://app.vindi.com.br/api/v1/bills?query=status:pending', {
  //     headers: new Headers({
  //       Authorization: `Basic ${base64.encode(
  //         `${white_label().payment_private_api_key}:${password}`,
  //       )}`,
  //     }),
  //   })
  //     .then(function (u) {
  //       return u.json();
  //     })
  //     .then(function (json) {
  //       for (let i = 0; i < json.bills.length; i++) {
  //         fetch(`https://app.vindi.com.br/api/v1/bills/${json.bills[i].id}`, {
  //           method: 'DELETE',
  //           headers: new Headers({
  //             Authorization: `Basic ${base64.encode(
  //               `${white_label().payment_private_api_key}:${password}`,
  //             )}`,
  //           }),
  //         });
  //       }
  //     });
  // });

  cron.schedule('*/10 * * * * *', async function () {
    // console.log('Executando schedule do pagamento do pix do day use...');
    fetch(`${url}/dayUse/schedulePixPayment`);
  });

  // cron.schedule('* * * * * *', async function () {
  //   fetch(`${url}/appointments/sendScheduleNotification`);
  // });

  cron.schedule('*/10 * * * * *', async function () {
    // console.log('Executando schedule do pagamento do pix das reservas...');
    fetch(`${url}/appointments/schedulePixPayment`);
  });
}
