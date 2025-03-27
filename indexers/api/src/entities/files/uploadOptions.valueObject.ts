export type UploadOptions = {
  compression?: CompressionOptions;
  encryption?: EncryptionOptions;
};

export type CompressionOptions = {
  algorithm: CompressionAlgorithm;
  level?: number;
  chunkSize?: number;
};

export type EncryptionOptions = {
  algorithm: EncryptionAlgorithm;
  chunkSize?: number;
};

export enum EncryptionAlgorithm {
  AES_256_GCM = 'AES_256_GCM',
}

export enum CompressionAlgorithm {
  ZLIB = 'ZLIB',
}
