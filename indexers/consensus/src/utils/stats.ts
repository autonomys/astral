// Stats tracking for indexer performance
export interface StatsState {
  blocksProcessed: number;
  lastReportTime: number;
  lastBlock: number;
  blocksPerReport: number;
}

// Initialize stats tracking state
export const initStats = (): StatsState => {
  return {
    blocksProcessed: 0,
    lastReportTime: Date.now(),
    lastBlock: 0,
    blocksPerReport: 20,
  };
};

// Update last known chain height
export const updateLastBlock = (
  stats: StatsState,
  blockHeight: number
): void => {
  stats.lastBlock = blockHeight;
};

// Track processed block and report if needed
export const trackProcessedBlock = (
  stats: StatsState,
  currentBlockNumber: number
): boolean => {
  stats.blocksProcessed++;
  return stats.blocksProcessed >= stats.blocksPerReport;
};

// Format time duration from seconds to human-readable string
export const formatTimeDuration = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`, `${secs}s`);

  return parts.join(" ");
};

// Generate performance report
export const generateReport = (
  stats: StatsState,
  currentBlockNumber: number
): string => {
  const currentTime = Date.now();
  const elapsedSeconds = (currentTime - stats.lastReportTime) / 1000;
  const blocksPerSecond = stats.blocksProcessed / elapsedSeconds;

  // Calculate estimated time left
  const timeEstimateLeft =
    (stats.lastBlock - currentBlockNumber) / blocksPerSecond;
  const timeLeftFormatted = formatTimeDuration(timeEstimateLeft);

  // Reset tracking stats
  stats.blocksProcessed = 0;
  stats.lastReportTime = currentTime;

  return `Last processed block: ${currentBlockNumber.toLocaleString()}, Target: ${stats.lastBlock.toLocaleString()}, Performance: ${blocksPerSecond.toFixed(2)} blocks/sec (estimated time left: ${timeLeftFormatted})`;
};
