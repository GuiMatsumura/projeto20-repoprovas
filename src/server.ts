import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = Number(process.env.PORT) || 8197;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
