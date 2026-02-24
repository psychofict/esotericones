import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "latestReleaseTitle",
      title: "Latest Release Title",
      type: "string",
    }),
    defineField({
      name: "latestReleaseUrl",
      title: "Latest Release URL",
      type: "url",
    }),
    defineField({
      name: "announcementBanner",
      title: "Announcement Banner",
      type: "text",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "spotify",
          title: "Spotify",
          type: "url",
        }),
        defineField({
          name: "appleMusic",
          title: "Apple Music",
          type: "url",
        }),
        defineField({
          name: "soundcloud",
          title: "SoundCloud",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
        }),
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter",
          type: "url",
        }),
        defineField({
          name: "youtube",
          title: "YouTube",
          type: "url",
        }),
      ],
    }),
  ],
});
