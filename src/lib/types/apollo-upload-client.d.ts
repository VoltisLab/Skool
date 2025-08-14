// global.d.ts
declare module 'apollo-upload-client' {
  import { ApolloLink } from '@apollo/client/core';
  export interface UploadLinkOptions {
    uri?: string;
    fetch?: any;
    fetchOptions?: any;
    credentials?: string;
    headers?: Record<string, string>;
  }
  export function createUploadLink(options?: UploadLinkOptions): ApolloLink;
}
