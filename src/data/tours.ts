export interface Tour {
    id: string;
    title: string;
    description: string;
    fullDescription?: string;
    duration: string;
    price: string;
    image: string;
    gallery?: string[]; // Additional images for the tour
    highlights: string[];
    whatToBring?: string[];
    included?: string[];
    itinerary?: { time: string; activity: string }[];
    coordinates?: [number, number]; // [lat, lng]
    route?: [number, number][]; // Array of coordinates for the path
}

export const tours: Tour[] = [
    {
        id: "hot-tub",
        title: "Floating hot tub among icebergs",
        description: "An exclusive once in a lifetime experience for adventurers! Relax in a warm hot tub while drifting through the freezing Arctic waters surrounding majestic icebergs.",
        fullDescription: "Imagine sitting in a 38-degree Celsius hot tub, sipping a glass of champagne, while massive icebergs float by just meters away. This is our signature experience. We tow a custom-built floating hot tub out to the Icefjord, where you can soak in the silence and beauty of the Arctic in complete comfort.",
        duration: "3 hours",
        price: "DKK 1495",
        image: "/hottub_1.png",
        gallery: ["/hottub_1.png", "/hottub_2.png", "/hottub_3.png", "/hottub_4.png"],
        highlights: ["Exclusive experience", "Hot tub", "Icebergs", "Refreshments"],
        whatToBring: ["Swimsuit", "Warm hat", "Warm clothes for before/after", "Camera"],
        included: ["Towels", "Bathrobe", "Refreshments", "Guide", "Safety equipment"],
        itinerary: [
            { time: "00:00", activity: "Departure from Ilulissat Harbor" },
            { time: "00:30", activity: "Arrival at the secret hot tub location" },
            { time: "00:45", activity: "Hot tub time! Enjoy 1.5 hours in the warm water" },
            { time: "02:15", activity: "Return journey with sightseeing" },
            { time: "03:00", activity: "Arrival back in Ilulissat" },
        ],
        coordinates: [69.22059336934468, -51.09383180224058], // Noah Mølgaardsvej
        route: [
            [69.22059336934468, -51.09383180224058], // Noah Mølgaardsvej (Start)
            [69.2200, -51.1100],
            [69.2250, -51.1200], // Moving out
            [69.2300, -51.1300], // Hot tub spot
            [69.2280, -51.1250],
            [69.22059336934468, -51.09383180224058]  // Return
        ]
    },
    {
        id: "icefjord-safari",
        title: "Ilulissat Icefjord Safari",
        description: "Navigate through the massive icebergs of the UNESCO World Heritage site. Witness the sheer scale of nature as you cruise past ice giants.",
        fullDescription: "The Ilulissat Icefjord is a UNESCO World Heritage site and one of the most active glaciers in the world. On this tour, we navigate our boat through the maze of colossal icebergs that have calved from the Sermeq Kujalleq glacier. The colors, shapes, and sizes of the ice are constantly changing, making every trip unique.",
        duration: "2.5 hours",
        price: "DKK 895",
        image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2078",
        highlights: ["UNESCO Site", "Massive Icebergs", "Photo Opportunities"],
        whatToBring: ["Warm jacket", "Hat and gloves", "Sunglasses", "Camera"],
        included: ["Hot coffee/tea", "Guide", "Warm overalls if needed"],
        itinerary: [
            { time: "00:00", activity: "Departure from Ilulissat Harbor" },
            { time: "00:20", activity: "Entering the mouth of the Icefjord" },
            { time: "01:00", activity: "Cruising among the giant icebergs" },
            { time: "02:00", activity: "Heading back to harbor" },
            { time: "02:30", activity: "Arrival in Ilulissat" },
        ],
        coordinates: [69.22059336934468, -51.09383180224058], // Noah Mølgaardsvej
        route: [
            [69.22059336934468, -51.09383180224058], // Noah Mølgaardsvej (Start)
            [69.2100, -51.1000],
            [69.2000, -51.0900], // Mouth of fjord
            [69.1900, -51.0800],
            [69.1800, -51.0700], // Deep in icefjord mouth
            [69.1850, -51.0850],
            [69.22059336934468, -51.09383180224058] // Return
        ]
    },
    {
        id: "whale-watching",
        title: "Whale Watching Adventure",
        description: "Get up close with the gentle giants of the sea. Spot Humpback, Fin, and Minke whales feeding in the nutrient-rich waters of Disko Bay.",
        fullDescription: "Greenland is one of the best places in the world to see whales. In summer, the Disko Bay is full of krill and small fish, attracting Humpback, Fin, and Minke whales. We use our fast and agile boat to safely approach these magnificent creatures, giving you an unforgettable encounter.",
        duration: "3 hours",
        price: "DKK 995",
        image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=2073",
        highlights: ["Humpback Whales", "Marine Wildlife", "Disko Bay"],
        whatToBring: ["Warm clothes (layers)", "Binoculars (optional)", "Camera with zoom lens"],
        included: ["Hot drinks", "Guide", "Warm overalls"],
        itinerary: [
            { time: "00:00", activity: "Departure and search begins" },
            { time: "00:45", activity: "Arriving at known feeding grounds" },
            { time: "01:00", activity: "Whale watching (keeping safe distance)" },
            { time: "02:30", activity: "Return trip" },
            { time: "03:00", activity: "Back in harbor" },
        ],
        coordinates: [69.22059336934468, -51.09383180224058], // Noah Mølgaardsvej
        route: [
            [69.22059336934468, -51.09383180224058], // Noah Mølgaardsvej (Start)
            [69.2200, -51.1200],
            [69.2400, -51.1500], // Open water
            [69.2600, -51.1800], // Disko Bay
            [69.2500, -51.2000],
            [69.2800, -51.2200], // Further out
            [69.22059336934468, -51.09383180224058] // Return
        ]
    },
    {
        id: "midnight-sun",
        title: "Midnight Sun Cruise",
        description: "Experience the endless golden hour. Watch the icebergs glow in different shades of orange and pink as the sun refuses to set.",
        fullDescription: "Between late May and late July, the sun never sets in Ilulissat. This phenomenon creates a magical light that transforms the icebergs into sculptures of gold and pink. A midnight cruise is a peaceful and surreal experience that defines the Arctic summer.",
        duration: "2.5 hours",
        price: "DKK 795",
        image: "https://images.unsplash.com/photo-1504788363733-507549153474?q=80&w=2067",
        highlights: ["Golden Hour", "Calm Waters", "Magical Lighting"],
        whatToBring: ["Warm jacket", "Sunglasses", "Camera"],
        included: ["Champagne or warm drink", "Guide", "Blankets"],
        itinerary: [
            { time: "22:00", activity: "Late evening departure" },
            { time: "23:00", activity: "Cruising the Icefjord in golden light" },
            { time: "00:00", activity: "Midnight moment among icebergs" },
            { time: "00:30", activity: "Return to Ilulissat" },
        ],
        coordinates: [69.22059336934468, -51.09383180224058], // Noah Mølgaardsvej
        route: [
            [69.22059336934468, -51.09383180224058], // Noah Mølgaardsvej (Start)
            [69.2150, -51.1050],
            [69.2050, -51.1100], // Scenic coastal route
            [69.1950, -51.1000],
            [69.1900, -51.0900], // Icefjord edge
            [69.22059336934468, -51.09383180224058] // Return
        ]
    },
];
