import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { photo } from "@/sanity/schema/photo";
import { project } from "@/sanity/schema/project";
import { journal } from "@/sanity/schema/journal";

export default defineConfig({
  name: "pablo-portfolio",
  title: "Pablo Rincon — Portfolio CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [photo, project, journal],
  },
});
