import cluster from 'cluster';

import { initServer } from './index';
import { availableParallelism } from 'os';

if (cluster.isPrimary) {
  initServer(0);
  for (let i = 0; i < availableParallelism() - 1; i++) {
    cluster.fork();
  }
} else {
  initServer(cluster.worker?.id);
}
