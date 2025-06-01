import * as Sentry from "@sentry/react-router";
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: "https://28a5ad5f732f9c9b748651e77fe1bf34@o4509417941630976.ingest.de.sentry.io/4509423761162320",
  
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  profilesSampleRate: 1.0, // profile every transaction
});
