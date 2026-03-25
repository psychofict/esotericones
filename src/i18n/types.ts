export type Locale = "en" | "ko" | "fr";

export type TranslationKeys = {
  // Nav
  "nav.artists": string;
  "nav.releases": string;
  "nav.news": string;
  "nav.tour": string;
  "nav.merch": string;
  "nav.about": string;
  "nav.submitDemo": string;
  "nav.openMenu": string;
  "nav.closeMenu": string;
  "nav.allArtists": string;
  "nav.allReleases": string;
  "nav.aboutTheLabel": string;
  "nav.tourDates": string;
  "nav.events": string;
  "nav.contact": string;

  // Common
  "common.viewAll": string;
  "common.backToHome": string;
  "common.notifyMe": string;
  "common.subscribe": string;
  "common.subscribed": string;
  "common.tryAgain": string;
  "common.comingSoon": string;
  "common.skipToContent": string;
  "common.all": string;
  "common.type": string;
  "common.year": string;
  "common.genre": string;
  "common.album": string;
  "common.ep": string;
  "common.single": string;
  "common.sending": string;
  "common.openInSpotify": string;
  "common.resetFilters": string;
  "common.showingResults": string;

  // Stats
  "stats.artists": string;
  "stats.totalStreams": string;
  "stats.countries": string;
  "stats.releases": string;

  // Home
  "home.hero.description": string;
  "home.hero.meetArtists": string;
  "home.hero.browseReleases": string;
  "home.latestRelease": string;
  "home.viewDetails": string;
  "home.ourRoster": string;
  "home.featuredArtists": string;
  "home.stayConnected": string;
  "home.joinCircle": string;
  "home.joinCircleDesc": string;
  "home.gotMusic": string;
  "home.submitYourDemo": string;
  "home.submitDemoDesc": string;
  "home.submitADemo": string;
  "home.behindTheScenes": string;
  "home.lifeAtTheLabel": string;
  "home.featuredInPartners": string;

  // About
  "about.ourStory": string;
  "about.aboutTheLabel": string;
  "about.aboutDesc": string;
  "about.ourMission": string;
  "about.missionText": string;
  "about.timeline": string;
  "about.ourSound": string;
  "about.theFounder": string;
  "about.founderBio": string;
  "about.viewArtistProfile": string;
  "about.wantToBePart": string;
  "about.lookingForArtists": string;
  "about.submitADemo": string;
  "about.getInTouch": string;
  "about.gallery": string;
  "about.partnersCollaborators": string;

  // About timeline
  "about.timeline.2023": string;
  "about.timeline.2024": string;
  "about.timeline.2025": string;

  // Artists
  "artists.ourRoster": string;
  "artists.title": string;
  "artists.description": string;
  "artists.noResults": string;

  // Artist detail
  "artist.backToArtists": string;
  "artist.joined": string;
  "artist.listen": string;
  "artist.discography": string;
  "artist.relatedArtists": string;
  "artist.gallery": string;

  // Releases
  "releases.catalog": string;
  "releases.title": string;
  "releases.description": string;
  "releases.noResults": string;

  // Release detail
  "release.backToReleases": string;
  "release.listenOnSpotify": string;
  "release.tracklist": string;
  "release.credits": string;
  "release.featuring": string;
  "release.lyrics": string;
  "release.trackOfTotal": string;

  // Purchase / Download
  "release.buyDigital": string;
  "release.redirecting": string;
  "download.title": string;
  "download.success": string;
  "download.downloadButton": string;
  "download.emailSent": string;
  "download.linkExpiry": string;
  "download.backToReleases": string;
  "download.expired": string;
  "download.error": string;

  // Contact
  "contact.getInTouch": string;
  "contact.title": string;
  "contact.description": string;
  "contact.email": string;
  "contact.location": string;
  "contact.inquiryType": string;
  "contact.general": string;
  "contact.licensing": string;
  "contact.press": string;
  "contact.partnerships": string;
  "contact.booking": string;
  "contact.name": string;
  "contact.emailField": string;
  "contact.subject": string;
  "contact.subjectPlaceholder": string;
  "contact.message": string;
  "contact.messagePlaceholder": string;
  "contact.namePlaceholder": string;
  "contact.sending": string;
  "contact.sendMessage": string;
  "contact.successMessage": string;

  // Demos
  "demos.joinRoster": string;
  "demos.title": string;
  "demos.description": string;
  "demos.whatWeLookFor": string;
  "demos.lookFor1": string;
  "demos.lookFor2": string;
  "demos.lookFor3": string;
  "demos.lookFor4": string;
  "demos.howItWorks": string;
  "demos.step1": string;
  "demos.step2": string;
  "demos.step3": string;
  "demos.step4": string;
  "demos.artistName": string;
  "demos.artistNamePlaceholder": string;
  "demos.emailField": string;
  "demos.country": string;
  "demos.countryPlaceholder": string;
  "demos.genre": string;
  "demos.selectGenre": string;
  "demos.demoLinks": string;
  "demos.socialLinks": string;
  "demos.socialLinksPlaceholder": string;
  "demos.shortBio": string;
  "demos.bioPlaceholder": string;
  "demos.submitting": string;
  "demos.submitDemo": string;
  "demos.successMessage": string;
  "demos.faq": string;
  "demos.faq1q": string;
  "demos.faq1a": string;
  "demos.faq2q": string;
  "demos.faq2a": string;
  "demos.faq3q": string;
  "demos.faq3a": string;
  "demos.faq4q": string;
  "demos.faq4a": string;

  // News
  "news.title": string;
  "news.description": string;
  "news.backToNews": string;
  "news.moreNews": string;
  "news.readMore": string;
  "news.category.release": string;
  "news.category.label": string;
  "news.category.artist": string;
  "news.category.event": string;

  // Tour
  "tour.liveShows": string;
  "tour.title": string;
  "tour.description": string;
  "tour.bookNow": string;
  "tour.bookHeading": string;
  "tour.bookDescription": string;
  "tour.pastEvents": string;

  // Merch
  "merch.title": string;
  "merch.description": string;
  "merch.preview": string;

  // Events
  "events.title": string;
  "events.description": string;
  "events.bookAnArtist": string;

  // Footer
  "footer.description": string;
  "footer.navigate": string;
  "footer.connect": string;
  "footer.home": string;
  "footer.contact": string;
  "footer.submitADemo": string;
  "footer.newsletter": string;
  "footer.newsletterDesc": string;
  "footer.allRights": string;
};

export type Translations = Record<Locale, TranslationKeys>;
