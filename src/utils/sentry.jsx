import * as Sentry from '@sentry/browser';

const AgroMatchSentry =
  process.env.REACT_APP_NODE_ENV === 'production' &&
  Sentry.init({
    // In dev REACT_APP_SENTRY_DSN should be undefined
    dsn: process.env.REACT_APP_SENTRY_DSN,
  });

export default AgroMatchSentry;
