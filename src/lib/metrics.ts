import { logger } from '@/lib/logger';
import StatsD from 'hot-shots';

const metricsErrorHandler = function (error: any) {
  logger.warn("There was an error", error);
}

export const metricsClient = new StatsD({
  host: 'default.main.great-jarzyna-f1rlbvu.cribl-staging.cloud',
  port: 9514,
  errorHandler: metricsErrorHandler
});
