/**
 * Monitoring utilities for tracking processing performance
 */

export interface ProcessingMetrics {
  taskType: string;
  totalTasks: number;
  successfulTasks: number;
  failedTasks: number;
  startTime: number;
  endTime?: number;
  averageTimePerTask?: number;
  parallelism: number;
}

export class PerformanceMonitor {
  private metrics: Map<string, ProcessingMetrics> = new Map();

  /**
   * Start tracking a batch processing operation
   */
  startBatch(batchId: string, taskType: string, totalTasks: number, parallelism: number): void {
    this.metrics.set(batchId, {
      taskType,
      totalTasks,
      successfulTasks: 0,
      failedTasks: 0,
      startTime: Date.now(),
      parallelism,
    });
  }

  /**
   * End tracking and log results
   */
  endBatch(batchId: string, successCount: number): void {
    const metric = this.metrics.get(batchId);
    if (!metric) return;

    metric.endTime = Date.now();
    metric.successfulTasks = successCount;
    metric.failedTasks = metric.totalTasks - successCount;
    metric.averageTimePerTask = (metric.endTime - metric.startTime) / metric.totalTasks;

    const duration = metric.endTime - metric.startTime;
    const throughput = (metric.totalTasks / duration) * 1000; // tasks per second

    console.log(`[${metric.taskType}] Batch ${batchId} completed:
      - Total tasks: ${metric.totalTasks}
      - Successful: ${metric.successfulTasks}
      - Failed: ${metric.failedTasks}
      - Duration: ${duration}ms
      - Avg time per task: ${metric.averageTimePerTask.toFixed(2)}ms
      - Throughput: ${throughput.toFixed(2)} tasks/sec
      - Parallelism: ${metric.parallelism}`);

    // Clean up old metrics
    if (this.metrics.size > 100) {
      const oldestKey = Array.from(this.metrics.keys())[0];
      this.metrics.delete(oldestKey);
    }
  }

  /**
   * Get current processing statistics
   */
  getStats(): {
    [taskType: string]: { totalProcessed: number; avgTimePerTask: number; successRate: number };
  } {
    const stats: {
      [taskType: string]: { totalProcessed: number; avgTimePerTask: number; successRate: number };
    } = {};

    for (const metric of this.metrics.values()) {
      if (!metric.endTime) continue;

      if (!stats[metric.taskType]) {
        stats[metric.taskType] = {
          totalProcessed: 0,
          avgTimePerTask: 0,
          successRate: 0,
        };
      }

      const taskStats = stats[metric.taskType];
      const prevTotal = taskStats.totalProcessed;

      taskStats.totalProcessed += metric.totalTasks;
      taskStats.avgTimePerTask =
        (taskStats.avgTimePerTask * prevTotal +
          (metric.averageTimePerTask || 0) * metric.totalTasks) /
        taskStats.totalProcessed;
      taskStats.successRate =
        (taskStats.successRate * prevTotal +
          (metric.successfulTasks / metric.totalTasks) * metric.totalTasks) /
        taskStats.totalProcessed;
    }

    return stats;
  }
}

export const monitor = new PerformanceMonitor();
