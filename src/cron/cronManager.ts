import cron from "node-cron";

// Declare global registry to avoid duplicates on dev refresh!


declare global {
    // eslint-disable-next-line no-var
    var __registered_cron_jobs__: Set<string> | undefined;
}

const globalRegistry =
  globalThis.__registered_cron_jobs__ ?? new Set<string>();

globalThis.__registered_cron_jobs__ = globalRegistry;

export function registerCronJob(name: string, schedule: string, job: () => void) {
  if (globalRegistry.has(name)) {
    console.log(`global duplicate bug in dev server`);
    return;
  }
  cron.schedule(schedule, job);
  globalRegistry.add(name);
}
