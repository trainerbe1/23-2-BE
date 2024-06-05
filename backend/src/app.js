import { config } from './utils/config.js';
import { web } from './library/web.js';
import { logger } from './log/log.js';

web.get('/', (req, res) => {
  res.send('Hello World!');
});

web.listen(config.app.port, () => {
  logger.info(`MealMastery app listening on port ${config.app.port}`);
});
