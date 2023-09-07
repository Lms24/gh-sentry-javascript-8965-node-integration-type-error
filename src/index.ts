console.log("hi");

import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import { ProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://3c8943a77b6847daad5dce31a0305f27@o447951.ingest.sentry.io/5429215",
  integrations: [
    new RewriteFrames(),
    new Sentry.Integrations.Http({ tracing: true }),
    new ProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  debug: true,
});

const txn = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

Sentry.withScope((scope) => {
  scope.setSpan(txn);
  txn.setTag("foo", "bar");
  txn.finish();
});

Sentry.flush(2000).then(() => process.exit(0));

throw new Error("Test");
