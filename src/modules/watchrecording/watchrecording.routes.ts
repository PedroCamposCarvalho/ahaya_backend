/* eslint-disable no-loop-func */
import { Router } from 'express';

const watchRecordingRouter = Router();

interface IConnectedUsersProps {
  pin: string;
  id_user: string;
  created_at: Date;
}

const connectedUsers: IConnectedUsersProps[] = [];

watchRecordingRouter.get('/requestPin', (request, response) => {
  let objIndex = 0;
  let pin = 0;
  while (objIndex > -1) {
    pin = Math.floor(100000 + Math.random() * 900000);
    objIndex = connectedUsers.findIndex(item => item.pin === String(pin));
  }
  connectedUsers.push({
    pin: String(pin),
    id_user: '',
    created_at: new Date(),
  });
  response.json({ pin });
  console.log(connectedUsers);
});

watchRecordingRouter.post('/createPin', (request, response) => {
  const { pin } = request.query;
  connectedUsers.push({
    pin: String(pin),
    id_user: '',
    created_at: new Date(),
  });
  response.send('PIN criado!');
  console.log(connectedUsers);
});

watchRecordingRouter.post('/connectUser', (request, response) => {
  const { pin, id_user } = request.query;
  const objIndex = connectedUsers.findIndex(item => item.pin === String(pin));

  if (objIndex > -1) {
    connectedUsers[objIndex].id_user = String(id_user);
    response.json('Usuário conectado!');
    request.io.emit(String(pin));
  } else {
    response.status(401).json('PIN não encontrado');
  }

  console.log(connectedUsers);
});

watchRecordingRouter.put('/takePhoto', (request, response) => {
  console.log(request.connectedUsers);
  const { pin } = request.query;
  const objIndex = connectedUsers.findIndex(item => item.pin === String(pin));

  if (objIndex > -1) {
    const ownerSocket =
      request.connectedUsers[connectedUsers[objIndex].id_user];

    if (ownerSocket) {
      request.io.to(ownerSocket).emit('take_photo');
      response.send('Mensagem enviada');
      console.log('enviou a mensagem');
    }
  } else {
    response.send('PIN não encontrado');
  }
  console.log(connectedUsers);
});

watchRecordingRouter.put('/startRecording', (request, response) => {
  console.log(request.connectedUsers);
  const { pin } = request.query;
  const objIndex = connectedUsers.findIndex(item => item.pin === String(pin));

  if (objIndex > -1) {
    const ownerSocket =
      request.connectedUsers[connectedUsers[objIndex].id_user];

    if (ownerSocket) {
      request.io.to(ownerSocket).emit('start_recording');
      response.send('Mensagem enviada');
      console.log('enviou a mensagem');
    }
  } else {
    response.send('PIN não encontrado');
  }
  console.log(connectedUsers);
});

watchRecordingRouter.put('/stopRecording', (request, response) => {
  console.log(request.connectedUsers);
  const { pin } = request.query;
  const objIndex = connectedUsers.findIndex(item => item.pin === String(pin));

  if (objIndex > -1) {
    const ownerSocket =
      request.connectedUsers[connectedUsers[objIndex].id_user];

    if (ownerSocket) {
      request.io.to(ownerSocket).emit('stop_recording');
      response.send('Mensagem enviada');
      console.log('enviou a mensagem');
    }
  } else {
    response.send('PIN não encontrado');
  }
  console.log(connectedUsers);
});

export default watchRecordingRouter;
