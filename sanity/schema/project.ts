import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "tags",
      title: "Tech Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({
      name: "impact",
      title: "What I Learned / Impact",
      type: "text",
      rows: 2,
      description: "One or two lines on the outcome or key lesson.",
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", media: "image" },
  },
});
