import { defineType, defineField } from "sanity";

export default defineType({
  name: "press",
  title: "Press",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "outlet",
      title: "Outlet",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "text",
    }),
  ],
});
