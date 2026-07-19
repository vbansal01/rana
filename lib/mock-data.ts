import type { Event, Sponsor } from "./types";

// - RANA Events - sourced from rana.org -
// All imageUrls are real rana.org photos or thematically appropriate rana.org
// images for events where a specific photo was not published online.
// -
export const MOCK_EVENTS: Event[] = [
  // - 2026 -
  {
    id: "yosemite-2026",
    title: "RANA Yosemite Camping Summit 2026",
    description:
      "Three days of hiking, yoga, campfire evenings, Rajasthani food, and community bonds forged under the stars of Yosemite Valley. Join the RANA family for our annual camping summit at Housekeeping Camp — where the John Muir Trail meets Khamma Ghani.",
    date: "2026-09-11",
    location: "Housekeeping Camp, Yosemite National Park, CA",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&q=80",
    category: "Camping",
    featured: true,
  },
  {
    id: "holi-2026",
    title: "RANA Holi Hungama 2026",
    description:
      "Celebrate the Festival of Colors at the Bay Area's biggest Holi! All-inclusive event with vibrant colors, live music, delicious food, and refreshing drinks. Wear white - get colorful! Open to all ages.",
    date: "2026-03-15",
    location: "ICC Community Center (Outdoor), 525 Los Coches St, Milpitas, CA 95035",
    imageUrl: "https://rana.org/wp-content/uploads/2026/02/rana-holi-2.jpg",
    category: "Holi",
    ticketUrl: "https://www.tickettailor.com/events/rana/2034665",
    featured: true,
  },

  // - 2025 -
  {
    id: "holi-2025",
    title: "RANA Bay Area Holi 2025",
    description:
      "Bay Area's vibrant Holi 2025 - a colorful journey to remember! RANA brought together hundreds of families for an unforgettable festival of colors, music, food, and community spirit at ICC Milpitas.",
    date: "2025-03-23",
    location: "ICC Community Center, Milpitas, CA",
    imageUrl: "https://rana.org/wp-content/uploads/2025/02/RANA-Holi-Event.png",
    category: "Holi",
    featured: true,
  },

  // - 2024 -
  {
    id: "diwali-2024",
    title: "Light Up the Night - RANA Diwali 2024",
    description:
      "RANA's spectacular Diwali 2024 celebration lighting up the Bay Area with live music performances, Rajasthani folk dance, a royal dinner, and the joy of the Festival of Lights shared with family and friends.",
    date: "2024-11-02",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2023/10/diwali2023Live-1.jpg",
    category: "Diwali",
    featured: true,
  },
  {
    id: "holi-2024",
    title: "RANA Holi Hungama 2024 - Just Play Holi",
    description:
      "Dive into colors and joy at Holi Hungama 2024! Epic colors, live music, delicious food, and an energy-filled celebration with the entire Bay Area Rajasthani community.",
    date: "2024-03-23",
    location: "Bay Area, California",
    imageUrl:
      "https://rana.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-11-at-07.16.48_5e2c7d96-950x750.jpg",
    category: "Holi",
  },

  // - 2023 -
  {
    id: "diwali-2023",
    title: "Rajasthani Rhythms - Diwali Folk Music Fiesta & Royal Feast 2023",
    description:
      "A magical evening of Rajasthani folk music, live performances, and a royal dinner. RANA's Diwali Musical Night 2023 featured acclaimed artists and brought the grandeur of Rajasthan to the Bay Area.",
    date: "2023-11-18",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2023/10/diwali2023Live-1.jpg",
    category: "Diwali",
  },
  {
    id: "holi-milan-2023",
    title: "RANA Holi Milan 2023",
    description:
      "A beautiful Holi Milan celebration featuring traditional Rajasthani cooking from scratch in the green fields of Lake Elizabeth. The community came together for homemade food, live music, and vibrant colors.",
    date: "2023-03-25",
    location: "Lake Elizabeth, Fremont, CA",
    imageUrl:
      "https://rana.org/wp-content/uploads/2023/10/IMG-20230326-WA0001-1160x653.jpg",
    category: "Holi",
  },

  // - 2022 -
  {
    id: "diwali-2022",
    title: "RANA Royal Diwali 2022",
    description:
      "A grand Royal Diwali celebration at Shannon Center, Dublin featuring outstanding performances from RANA families, live music, a royal dinner, and special awards recognizing RANA EC members and youth for their contributions.",
    date: "2022-11-05",
    location: "Shannon Center, Dublin, CA",
    imageUrl:
      "https://rana.org/wp-content/uploads/2022/05/2CA14A72-5B7C-4A79-856C-AE9E9E844FED-Ajay-Jain-Bhutoria-scaled-360x203.jpeg",
    category: "Diwali",
  },
  {
    id: "holi-milan-2022",
    title: "RANA Holi Milan 2022",
    description:
      "A cherished Holi Milan tradition - community members gathered at Lake Elizabeth to cook traditional Daal Baati Churma from scratch in the open fields, followed by Holi celebrations and live music.",
    date: "2022-03-12",
    location: "Lake Elizabeth, Fremont, CA",
    imageUrl:
      "https://rana.org/wp-content/uploads/2022/05/IMGP0366-scaled-1160x653.jpg",
    category: "Holi",
  },

  // - 2019 -
  {
    id: "holi-hungama-2019",
    title: "RANA Holi Hungama 2019",
    description:
      "RANA's spectacular Holi Hungama 2019 brought the Bay Area community together for a massive festival of colors with live entertainment, food, and non-stop dancing. One of the biggest Holi events in Bay Area history.",
    date: "2019-03-23",
    location: "Bay Area, California",
    imageUrl:
      "https://rana.org/wp-content/uploads/2018/02/rana_holi_2018_color_festival_bay_area.jpg",
    category: "Holi",
  },

  // - 2018 -
  {
    id: "holi-2018",
    title: "RANA Holi 2018",
    description:
      "A landmark Holi celebration bringing together thousands of Bay Area residents in a joyful, colorful festival. RANA Holi 2018 remains one of the community's most beloved events, captured beautifully on YouTube.",
    date: "2018-03-17",
    location: "Bay Area, California",
    imageUrl:
      "https://rana.org/wp-content/uploads/2018/02/rana_holi_2018_color_festival_bay_area.jpg",
    category: "Holi",
  },

  // - 2016 -
  {
    id: "meet-greet-2016",
    title: "RANA Meet, Greet & Eat 2016",
    description:
      "An intimate members-only gathering to kick off the year - reconnecting with old friends, welcoming new members, and enjoying great food together as a community. A tradition that captures the warmth of RANA's spirit.",
    date: "2016-02-21",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/9-360x203.jpg",
    category: "Community",
  },

  // - 2015 -
  {
    id: "diwali-2015",
    title: "RANA Rajasthani Diwali Celebrations 2015",
    description:
      "A vibrant Diwali celebration showcasing the best of Rajasthani culture with traditional performances, decorations, and a festive dinner bringing the community together for the Festival of Lights.",
    date: "2015-11-07",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/4-360x203.jpg",
    category: "Diwali",
  },
  {
    id: "yosemite-2015",
    title: "RANA Yosemite Camping Trip 2015",
    description:
      "A memorable members-only camping weekend at Yosemite National Park - bonding over campfires, hikes through stunning scenery, and Rajasthani food under the stars. A beloved RANA community tradition.",
    date: "2015-09-18",
    location: "Yosemite National Park, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=60",
    category: "Community",
  },
  {
    id: "gangaur-2015",
    title: "RANA Gangaur Festival 2015",
    description:
      "A beautiful celebration of the traditional Gangaur festival honoring Goddess Gauri - with women dressed in traditional Rajasthani attire, folk songs, and cultural rituals recreating the spirit of Rajasthan.",
    date: "2015-03-28",
    location: "Dublin, CA",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/12-360x203.jpg",
    category: "Cultural",
  },
  {
    id: "holi-2015",
    title: "RANA Holi 2015",
    description:
      "Bay Area's beloved Holi celebration returned to Milpitas in 2015 with thousands joining the festival of colors. A joyous event filled with music, dance, and community spirit.",
    date: "2015-03-14",
    location: "Milpitas, CA",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/10-360x203.jpg",
    category: "Holi",
  },

  // - 2014 -
  {
    id: "dandiya-2014",
    title: "RANA at SEF Dandiya 2014",
    description:
      "RANA participated in the South Bay Energy Fair's Dandiya night - representing Rajasthani culture through traditional Garba and Dandiya performances that captivated the audience.",
    date: "2014-10-04",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/8-360x203.jpg",
    category: "Cultural",
  },
  {
    id: "diwali-2014",
    title: "RANA Diwali Celebrations 2014",
    description:
      "RANA lit up Newark for Diwali 2014 with a grand celebration of the Festival of Lights featuring cultural performances, traditional sweets, and a spectacular evening of community togetherness.",
    date: "2014-10-17",
    location: "Newark, CA",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/4-360x203.jpg",
    category: "Diwali",
  },
  {
    id: "parade-2014",
    title: "RANA Independence Day Parade 2014",
    description:
      "RANA proudly marched in the Independence Day Parade representing the Rajasthani community with colorful floats, traditional attire, and performances celebrating India's heritage in America.",
    date: "2014-08-17",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/7-360x203.jpg",
    category: "Community",
  },
  {
    id: "mirage-2014",
    title: "In Search of Mirage 2014",
    description:
      "A unique RANA cultural event exploring the mystical and artistic heritage of Rajasthan - an evening of storytelling, Rajasthani folk music, and the evocative spirit of the Thar Desert.",
    date: "2014-04-19",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/5-360x203.jpg",
    category: "Cultural",
  },
  {
    id: "gangaur-2014",
    title: "RANA Gangaur Festival 2014",
    description:
      "Celebrating the auspicious Gangaur festival in true Rajasthani tradition - prayers, folk songs, and festivities honoring Goddess Gauri in a warm members-only gathering.",
    date: "2014-04-06",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/12-360x203.jpg",
    category: "Cultural",
  },
  {
    id: "holi-2014",
    title: "RANA Holi Festival of Colors 2014",
    description:
      "Thousands celebrated Holi at Baylands in Sunnyvale - one of the Bay Area's biggest Holi events of the year. A colorful, joyful, all-inclusive festival that made headlines in India Abroad.",
    date: "2014-03-22",
    location: "Baylands Park, Sunnyvale, CA",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/1-360x203.jpg",
    category: "Holi",
  },

  // - 2012 -
  {
    id: "diwali-2012",
    title: "RANA Diwali 2012 & Silver Jubilee",
    description:
      "A landmark celebration marking RANA's silver jubilee alongside Diwali 2012 - a grand evening honoring 25 years of Rajasthani community building in North America with performances and awards.",
    date: "2012-11-10",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/6-360x203.jpg",
    category: "Diwali",
  },
  {
    id: "parade-2012",
    title: "Independence Day Parade 2012 - 3rd Best Float Award",
    description:
      "RANA won the 3rd Best Float award in the Independence Day Parade, showcasing Rajasthani culture with a magnificent display that drew cheers from thousands of spectators.",
    date: "2012-08-15",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/7-360x203.jpg",
    category: "Community",
  },
  {
    id: "holi-2012",
    title: "RANA Holi 2012",
    description:
      "Thousands celebrated Holi in the Bay Area with RANA, as covered by India Abroad. A beloved annual tradition that has been bringing the community together since RANA's founding.",
    date: "2012-03-10",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/2-360x203.jpg",
    category: "Holi",
  },

  // - 2010 -
  {
    id: "bappi-lahiri-2010",
    title: "Rajasthan Speaker & Bappi Lahiri Honored by RANA",
    description:
      "A prestigious evening where RANA honored the Speaker of Rajasthan and the legendary Bollywood musician Bappi Lahiri, bringing together dignitaries and community leaders in a memorable cultural exchange.",
    date: "2010-09-01",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2015/02/3-360x203.jpg",
    category: "Community",
  },

  // - 2009 -
  {
    id: "founding-2009",
    title: "RANA Founded - Forging Cultural Ties",
    description:
      "The historic founding of the Rajasthan Alliance of North America - bringing together Rajasthanis across California to preserve cultural heritage and foster community ties between Rajasthan and the United States.",
    date: "2009-07-17",
    location: "Bay Area, California",
    imageUrl: "https://rana.org/wp-content/uploads/2025/10/Rana_logo.jpg",
    category: "Community",
  },
];

// - Sponsors -
export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: "1",
    name: "Horizon Financial",
    logoUrl: "",
    websiteUrl: "https://example.com",
    tier: "platinum",
    tagline: "Your Trusted Financial Partner",
  },
  {
    id: "2",
    name: "TechBridge Solutions",
    logoUrl: "",
    websiteUrl: "https://example.com",
    tier: "gold",
    tagline: "Connecting Communities with Technology",
  },
  {
    id: "3",
    name: "Spice Garden Restaurant",
    logoUrl: "",
    websiteUrl: "https://example.com",
    tier: "gold",
    tagline: "Authentic Flavors, Modern Experience",
  },
  {
    id: "4",
    name: "Midwest Law Group",
    logoUrl: "",
    websiteUrl: "https://example.com",
    tier: "silver",
    tagline: "Legal Excellence for Our Community",
  },
  {
    id: "5",
    name: "Sunrise Realty",
    logoUrl: "",
    websiteUrl: "https://example.com",
    tier: "silver",
    tagline: "Home is Where Community Is",
  },
  {
    id: "6",
    name: "Heritage Travel",
    logoUrl: "",
    websiteUrl: "https://example.com",
    tier: "community",
    tagline: "Explore Your Roots",
  },
];
