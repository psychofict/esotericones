import { defineType, defineField } from "sanity";

export default defineType({
  name: "epkAsset",
  title: "EPK Asset",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Press Photos", value: "Press Photos" },
          { title: "One Sheet", value: "One Sheet" },
          { title: "Logo Assets", value: "Logo Assets" },
          { title: "Technical Rider", value: "Technical Rider" },
        ],
      },
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
