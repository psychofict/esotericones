import { defineType, defineField } from "sanity";

export default defineType({
  name: "album",
  title: "Album",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "artwork",
      title: "Artwork",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tracks",
      title: "Number of Tracks",
      type: "number",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Album", value: "album" },
          { title: "Single", value: "single" },
          { title: "Remix", value: "remix" },
        ],
      },
    }),
    defineField({
      name: "tracklist",
      title: "Tracklist",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "trackNumber",
              title: "Track Number",
              type: "number",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "string",
            }),
            defineField({
              name: "featuredArtists",
              title: "Featured Artists",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "streamingLinks",
      title: "Streaming Links",
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
          name: "youtube",
          title: "YouTube",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "credits",
      title: "Credits",
      type: "text",
    }),
    defineField({
      name: "featuredArtists",
      title: "Featured Artists",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
