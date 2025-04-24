export enum MetadataKey {
  // The current last block number of the chain
  TargetHeight = "targetHeight",
  // The last block number that has been indexed
  LastProcessedHeight = "lastProcessedHeight",
  // The last block number that is probably finalized (after 10 blocks)
  LastProbablyFinalizedHeight = "lastProbablyFinalizedHeight",
  // The last block number that has been finalized (after 100 blocks)
  LastFinalizedHeight = "lastFinalizedHeight",
}
