import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "x1vbhp4a",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  deployment: {
    // Existing Sanity-managed Studio (sanity.io/@oNJma15JT/studio/...).
    // Hard-coding the appId keeps `sanity deploy` non-interactive in CI
    // and ensures pushes update this Studio instead of creating a new one.
    appId: "wyl0n311xor3noumxnuj27sj",
    autoUpdates: true,
  },
});
