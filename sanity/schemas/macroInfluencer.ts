import { defineType, defineField } from "sanity";

export default defineType({
  name: "macroInfluencer",
  title: "Macro Influencer",
  type: "document",
  fields: [
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
    }),
  ],
});
