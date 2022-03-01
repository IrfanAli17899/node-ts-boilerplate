import expressJwt from 'express-jwt';
import jwks from 'jwks-rsa';

import { authConfig } from ':config';

export default expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.authApiUrl}/.well-known/jwks.json`,
  }),
  issuer: `https://${authConfig.authApiUrl}/`,
  algorithms: ['RS256'],
  credentialsRequired: false,
});
