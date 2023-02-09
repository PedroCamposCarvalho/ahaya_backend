import app from './app';

const port = process.env.ENV === 'dev' ? 8888 : 8888;

app.listen(port, () => {
  console.log('Server started on port', port);
});
