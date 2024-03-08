import { inject } from '@loopback/context';
import { AuthenticationMetadata } from '@loopback/authentication';

export const AUTHENTICATION_METADATA_KEY = 'authentication';

export function authenticate(metadata: AuthenticationMetadata = {
    strategy: ''
}) {
  return inject(AUTHENTICATION_METADATA_KEY, metadata);
}