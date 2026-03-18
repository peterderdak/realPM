import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const githubUsername = "peterderdak";
const githubRepo = "realPM";
const isUserSite = githubRepo === `${githubUsername}.github.io`;

export default defineConfig({
  output: "static",
  site: isUserSite
    ? `https://${githubUsername}.github.io`
    : `https://${githubUsername}.github.io/${githubRepo}`,
  base: isUserSite ? "/" : `/${githubRepo}`,
  vite: {
    plugins: [tailwindcss()],
  },
});
