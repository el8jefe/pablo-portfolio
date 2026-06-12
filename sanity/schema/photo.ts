import { defineField, defineType } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Untitled photo", media };
    },
  },
});
