import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "student-07b",
  project: "reacttravelagency",
  // An auth token is required for uploading source maps.
  authToken: "Click to generate token (DO NOT commit)"
  // ...
};



export default defineConfig(config => {
  return {
  plugins: [tailwindcss(), tsconfigPaths(),reactRouter(),sentryReactRouter(sentryConfig, config)],
  sentryConfig,
  ssr: {
    noExternal: [/@syncfusion/]
  }
  };
});
