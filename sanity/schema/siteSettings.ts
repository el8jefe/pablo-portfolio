import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "aboutHeading",
      title: "About Heading",
      type: "string",
      description: 'E.g. "Born in Medellín.\\nBuilt in the U.S." — use \\n for line break',
    }),
    defineField({
      name: "aboutBio1",
      title: "Bio Paragraph 1",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "aboutBio2",
      title: "Bio Paragraph 2",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "stats",
      title: "Stats Row",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
