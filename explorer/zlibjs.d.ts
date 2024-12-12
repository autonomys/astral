declare module 'zlibjs/bin/zlib_and_gzip.min.js' {
  export namespace Zlib {
    enum CompressionType {
      NONE = 0,
      FIXED = 1,
      DYNAMIC = 2,
    }

    export namespace Gzip {
      interface Options {
        deflateOptions: {
          compressionType: Zlib.CompressionType
        }
        flags: {
          fname: boolean // use filename?
          comment: boolean // use comment?
          fhcrc: boolean // use file checksum?
        }
        filename: string // filename
        comment: string
      }
    }

    export namespace Deflate {
      interface Options {
        compressionType: CompressionType
      }
    }

    export namespace Inflate {
      enum BufferType {
        BLOCK = 0,
        ADAPTIVE = 1,
      }
      interface Options {
        index: number // start position in input buffer
        bufferSize: number // initial output buffer size
        bufferType: Zlib.Inflate.BufferType // buffer expantion type
        resize: boolean // resize buffer(ArrayBuffer) when end of decompression (default: false)
        verify: boolean // verify decompression result (default: false)
      }
    }

    export class Gzip {
      constructor(data: Array<number> | Uint8Array, options: Gzip.Options)
      public compress(): Uint8Array
    }

    export class Gunzip {
      constructor(data: Array<number> | Uint8Array)
      public decompress(): Uint8Array
    }

    export class Deflate {
      constructor(data: Array<number> | Uint8Array, options: Deflate.Options)
      public compress(): Uint8Array
    }

    export class Inflate {
      constructor(data: Array<number> | Uint8Array, options: Inflate.Options)
      public decompress(): Uint8Array
    }
  }
}
