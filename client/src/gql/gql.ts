/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query Blocks($limit: Int!, $offset: Int!) {\n    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {\n      hash\n      height\n      timestamp\n      validator\n      stateRoot\n      events {\n        id\n      }\n      extrinsics {\n        id\n      }\n    }\n  }\n": types.BlocksDocument,
    "\n  query Extrinsics($limit: Int!, $offset: Int!) {\n    extrinsics(limit: $limit, offset: $offset, orderBy: block_height_DESC) {\n      hash\n      id\n      success\n      pos\n      block {\n        height\n        timestamp\n      }\n      call {\n        name\n      }\n    }\n  }\n": types.ExtrinsicsDocument,
};

export function graphql(source: "\n  query Blocks($limit: Int!, $offset: Int!) {\n    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {\n      hash\n      height\n      timestamp\n      validator\n      stateRoot\n      events {\n        id\n      }\n      extrinsics {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Blocks($limit: Int!, $offset: Int!) {\n    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {\n      hash\n      height\n      timestamp\n      validator\n      stateRoot\n      events {\n        id\n      }\n      extrinsics {\n        id\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query Extrinsics($limit: Int!, $offset: Int!) {\n    extrinsics(limit: $limit, offset: $offset, orderBy: block_height_DESC) {\n      hash\n      id\n      success\n      pos\n      block {\n        height\n        timestamp\n      }\n      call {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Extrinsics($limit: Int!, $offset: Int!) {\n    extrinsics(limit: $limit, offset: $offset, orderBy: block_height_DESC) {\n      hash\n      id\n      success\n      pos\n      block {\n        height\n        timestamp\n      }\n      call {\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;