import * as express from 'express';
import employeesRoutes from './routes/employees';

const app = express();
const PORT = 3000;

// middleware для джейсона
app.use(express.json());

app.get('/', (req, res) => {
  res.send('воскресенский hello world');
});

// роуты
app.use('/api/employees', employeesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
