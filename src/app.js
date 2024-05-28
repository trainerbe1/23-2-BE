import { config } from './utils/config.js';
import { web } from './library/web.js';

web.get('/', (req, res) => {
  res.send('Hello World!');
});

web.listen(config.app.port, () => {
  console.log(`MealMastery app listening on port ${config.app.port}`);
});
