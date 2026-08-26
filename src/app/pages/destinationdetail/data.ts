export const destinationData = [
  {
    slug: 'serengeti',
    name: 'Serengeti National Park',
    region: 'Northern Tanzania',
    heroImg: '/images/956A4274.webp',
    tagline: 'The endless plains where life plays out in full.',
    history: [
      'The name "Serengeti" comes from the Maasai word Siringet  meaning "the place where the land runs on forever." For thousands of years, Maasai pastoralists grazed their cattle across these plains alongside lion, elephant, and wildebeest, developing a coexistence with wildlife that shaped the entire ecosystem.',
      'In 1929, the British colonial government declared the area a partial game reserve, and in 1951 the Serengeti became Tanzania\'s first national park. The work of naturalists Bernhard and Michael Grzimek  whose 1959 film "Serengeti Shall Not Die" won an Academy Award  brought the park to global attention and helped establish its final boundaries.',
      'Today the Serengeti is recognised as one of the Seven Natural Wonders of Africa and a UNESCO World Heritage Site. Its 14,763 km² of savanna, woodland, and riverine forest sustain the largest terrestrial mammal migration on earth  over 1.5 million wildebeest, 500,000 gazelle, and 200,000 zebra moving in a continuous clockwise circuit in search of rain and grass.',
    ],
    facts: { size: '14,763 km²', bestTime: 'June – October', animals: 'Lion · Cheetah · Leopard · Elephant · Buffalo · Wildebeest' },
    highlights: ['Great Migration', 'Big Five', 'Hot Air Balloon Safaris', 'Kopjes & Rock Formations', 'Predator Concentrations'],
    story: {
      bigImages: ['/images/956A3225.webp', '/images/956A4274.webp'],
      bigVignette: {
        eyebrow: 'Great Migration',
        headline: 'Follow the herds',
        blurb: 'Over 1.5 million wildebeest move in a continuous clockwise circuit through the Serengeti each year, trailed by lion, cheetah and hyena — one of the last truly wild spectacles left on earth.',
        cta: { label: 'Plan This Safari', href: '/safaris' },
      },
      secondary: [
        {
          img: '/images/956A3123.webp',
          vignette: {
            eyebrow: 'Predator Concentrations',
            headline: 'Where the hunters gather',
            blurb: 'Lion, leopard, cheetah and hyena all share these plains, drawn by the same herds that never stop moving.',
            cta: { label: 'Inquire About Game Drives', href: '/booking' },
          },
        },
        {
          img: '/images/956A2874.webp',
          vignette: {
            eyebrow: 'Big Five',
            headline: 'Face to face with a lion',
            blurb: '"You don\'t forget the first time a lion looks straight at your vehicle."',
            quote: true,
          },
        },
      ],
    },
    relatedTours: [
      { id: 2, name: '3 Days Classic Serengeti Safari', duration: '3 Days / 2 Nights', img: '/images/956A2358.webp' },
      { id: 4, name: '6 Days Best of Tanzania Safari', duration: '6 Days / 5 Nights', img: '/images/956A3309.webp' },
      { id: 5, name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', img: '/images/956A2613.webp' },
      { id: 6, name: '8 Days Wildebeest Migration River Crossing', duration: '8 Days / 7 Nights', img: '/images/956A4274.webp' },
    ],
  },
  {
    slug: 'ngorongoro',
    name: 'Ngorongoro Conservation Area',
    region: 'Northern Tanzania',
    heroImg: '/images/IMG_1226.webp',
    tagline: 'A world within a crater  ancient, intact, and unforgettable.',
    history: [
      'Ngorongoro Crater was formed around three million years ago when a giant volcano exploded and collapsed inward, creating one of the largest intact calderas on earth. The crater floor  roughly 260 km²  became a self-contained world, sheltering an extraordinary density of wildlife within its 600-metre-high walls.',
      'The Maasai people have lived alongside wildlife in the Ngorongoro highlands for centuries, grazing their cattle on the crater rim and the surrounding plains. When Tanzania\'s national park system was established in the 1950s, the Maasai retained rights within Ngorongoro  making it one of the only protected areas in the world where indigenous communities and wildlife share the same land.',
      'Declared a UNESCO World Heritage Site in 1979, Ngorongoro is also home to Olduvai Gorge  the "Cradle of Mankind"  where paleoanthropologist Louis Leakey discovered some of the oldest hominin fossils ever found, placing human origins in this very landscape.',
    ],
    facts: { size: '8,292 km²', bestTime: 'Year-round', animals: 'Black Rhino · Lion · Elephant · Hippo · Flamingo · Hyena' },
    highlights: ['Volcanic Caldera', 'Black Rhino Sightings', 'Big Five in One Day', 'Olduvai Gorge', 'Maasai Culture'],
    story: {
      bigImages: ['/images/956A4243.webp', '/images/IMG_1256.webp'],
      bigVignette: {
        eyebrow: 'Volcanic Caldera',
        headline: 'A world inside a crater',
        blurb: 'Roughly three million years old and walled in on every side, the crater floor holds one of the highest concentrations of wildlife anywhere on the continent.',
        cta: { label: 'Plan This Safari', href: '/safaris' },
      },
      secondary: [
        {
          img: '/images/956A2874.webp',
          vignette: {
            eyebrow: 'Big Five in One Day',
            headline: 'Every icon, one descent',
            blurb: 'Lion, elephant, rhino, buffalo and leopard all move within the same 260 km² floor — a single day inside the crater can outshine a week anywhere else.',
            cta: { label: 'Inquire About the Crater Tour', href: '/booking' },
          },
        },
        {
          img: '/images/IMG_1068.webp',
          vignette: {
            eyebrow: 'Meet Your Team',
            headline: 'Guides who grew up on this rim',
            blurb: '"Our driver-guides know this crater the way most people know their own street."',
            quote: true,
          },
        },
      ],
    },
    relatedTours: [
      { id: 1, name: '1 Day Ngorongoro Crater Safari', duration: '1 Day', img: '/images/IMG_1226.webp' },
      { id: 4, name: '6 Days Best of Tanzania Safari', duration: '6 Days / 5 Nights', img: '/images/956A3309.webp' },
      { id: 5, name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', img: '/images/956A2613.webp' },
    ],
  },
  {
    slug: 'zanzibar',
    name: 'Zanzibar Archipelago',
    region: 'Indian Ocean Islands',
    heroImg: '/images/nakupenda-beach.webp',
    tagline: 'A thousand years of trade, spice, and ocean breeze.',
    history: [
      'Zanzibar\'s story is one of the most layered in the world. For over a thousand years the island sat at the crossroads of Indian Ocean trade routes, drawing Arab merchants, Persian sailors, Indian traders, and Portuguese explorers  each leaving a mark on its language, architecture, food, and culture.',
      'In the 19th century, Zanzibar became the capital of the Omani Sultanate and one of the most important ports in East Africa  a centre for the clove trade and, tragically, the Arab slave trade. The old slave market in Stone Town  now a cathedral and memorial  bears silent witness to that history.',
      'British rule brought abolition in 1873, and in 1963 Zanzibar became independent before merging with Tanganyika to form Tanzania in 1964. Stone Town was designated a UNESCO World Heritage Site in 2000. Beyond the history, Zanzibar\'s beaches  Nungwi, Kendwa, Paje  rank among the finest in the world.',
    ],
    facts: { size: '2,643 km²', bestTime: 'June – October & Jan – February', animals: 'Humpback Whale · Dolphin · Sea Turtle · Red Colobus Monkey' },
    highlights: ['Stone Town UNESCO Heritage', 'Kendwa & Nungwi Beaches', 'Spice Farm Tours', 'Dolphin Watching', 'Swahili Cuisine'],
    story: {
      bigImages: ['/images/nakupenda-beach.webp', '/images/prison.webp'],
      bigVignette: {
        eyebrow: 'Kendwa & Nungwi Beaches',
        headline: 'Where the sand runs white',
        blurb: "Zanzibar's northern coast is ringed by warm, shallow water and sand that stays cool underfoot even at midday — postcard water, without needing a filter.",
        cta: { label: 'Plan This Safari', href: '/safaris' },
      },
      secondary: [
        {
          img: '/images/stone-town.webp',
          vignette: {
            eyebrow: 'Stone Town UNESCO Heritage',
            headline: 'A thousand years of trade',
            blurb: "Narrow coral-stone alleys, carved doors and a skyline that's barely changed in two centuries — Stone Town has been a UNESCO World Heritage Site since 2000.",
            cta: { label: 'Inquire About the City Tour', href: '/booking' },
          },
        },
        {
          img: '/images/Darajani_Market.jpg',
          vignette: {
            eyebrow: 'Swahili Cuisine',
            headline: 'Bought and cooked the same day',
            blurb: '"Every spice, bean and fruit you\'ll eat this week was probably sold a few metres from here this morning."',
            quote: true,
          },
        },
      ],
    },
    relatedTours: [
      { id: 9, name: '4 Days Zanzibar Kendwa Beach & Stone Town Tour', duration: '4 Days / 3 Nights', img: '/images/stone-town.webp' },
      { id: 10, name: '8 Days Tanzania Cultural Tour', duration: '8 Days / 7 Nights', img: '/images/IMG_2493.webp' },
    ],
  },
  {
    slug: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    region: 'Northern Tanzania',
    heroImg: '/images/kilimanjaro-graded.jpg',
    tagline: "Africa's roof  a summit that changes everyone who climbs it.",
    history: [
      'Kilimanjaro is the highest free-standing mountain in the world, rising 5,895 metres above sea level from the surrounding plains of northern Tanzania. Its three volcanic cones  Kibo, Mawenzi, and Shira  were formed over a million years ago, and Kibo\'s crater still shows signs of geothermal activity.',
      'The Chagga people have lived on Kilimanjaro\'s fertile slopes for centuries, farming coffee, bananas, and maize in the rich volcanic soil. The mountain holds deep spiritual significance in their culture  it is home to their ancestors and the source of rivers that sustain entire communities.',
      'The first recorded summit was reached in 1889 by Hans Meyer and Ludwig Purtscheller. Today over 50,000 people attempt the climb each year via routes including the Lemosho, Machame, Marangu, and Rongai trails  each passing through five distinct climatic zones from tropical rainforest to arctic summit.',
    ],
    facts: { size: '756 km² (park)', bestTime: 'January – March & June – October', animals: 'Elephant · Buffalo · Leopard · Colobus Monkey · Sunbird' },
    highlights: ['Uhuru Peak at 5,895m', 'Five Climatic Zones', 'Glacier Views', 'Chagga Culture', 'Lemosho & Machame Routes'],
    story: {
      // Kilimanjaro doesn't yet have enough distinct verified real photography
      // in the library for a second staggered pairing — one honest photo
      // beats two mismatched ones, see project convention on verifying image
      // content before trusting it (CLAUDE.md, Images section).
      bigImages: ['/images/kilimanjaro-graded.jpg'],
      bigVignette: {
        eyebrow: 'Uhuru Peak at 5,895m',
        headline: "Africa's roof, one climb at a time",
        blurb: 'Six ecological zones in a single ascent, from tropical rainforest to arctic summit, ending at the highest point on the continent.',
        cta: { label: 'Plan This Climb', href: '/safaris' },
      },
    },
    relatedTours: [
      { id: 5, name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', img: '/images/956A2613.webp' },
      { id: 10, name: '8 Days Tanzania Cultural Tour', duration: '8 Days / 7 Nights', img: '/images/IMG_2493.webp' },
    ],
  },
  {
    slug: 'tarangire',
    name: 'Tarangire National Park',
    region: 'Northern Tanzania',
    heroImg: '/images/IMG_0227.webp',
    tagline: 'Ancient baobabs, elephant herds, and a river that never runs dry.',
    history: [
      'Tarangire takes its name from the Tarangire River  the only permanent water source in the region during Tanzania\'s long dry season. This single fact shapes the entire ecosystem: every dry season, thousands of animals converge on the riverbanks in one of the most dramatic wildlife concentrations in Africa.',
      'The park was established in 1970, covering 2,850 km² of savanna, woodland, and seasonal swamp. Its character is defined by two things  elephants and baobabs. Tarangire has one of the highest elephant densities in Tanzania, with herds of 300 or more a common sight during the dry season. The ancient baobab trees, some over 1,000 years old, give the landscape a primordial quality unlike any other park in East Africa.',
      'The park hosts exceptional birdlife  over 550 recorded species  making it a favourite among birding enthusiasts. The local Barbaig and Maasai communities have used the surrounding land for centuries, and their relationship with the wildlife corridors connecting Tarangire to the greater ecosystem remains critical to conservation.',
    ],
    facts: { size: '2,850 km²', bestTime: 'June – October', animals: 'Elephant · Lion · Leopard · Gerenuk · Oryx · Python' },
    highlights: ['Giant Elephant Herds', 'Ancient Baobab Trees', '550+ Bird Species', 'Swamp Wildlife', 'Dry Season Spectacle'],
    story: {
      bigImages: ['/images/IMG_0227.webp', '/images/956A3309.webp'],
      bigVignette: {
        eyebrow: 'Giant Elephant Herds',
        headline: 'Three hundred strong, and counting',
        blurb: 'Tarangire has one of the highest elephant densities in Tanzania — herds like this one gather along the river that never runs dry through the long dry season.',
        cta: { label: 'Plan This Safari', href: '/safaris' },
      },
      secondary: [
        {
          img: '/images/956A2613.webp',
          vignette: {
            eyebrow: 'Ancient Baobab Trees',
            headline: 'Some older than the nearest town',
            blurb: 'Baobabs over a thousand years old rise out of the grassland here, giving Tarangire a primordial quality unlike any other northern park.',
            cta: { label: 'Inquire About Tarangire', href: '/booking' },
          },
        },
        {
          img: '/images/IMG_2444.jpg',
          vignette: {
            eyebrow: 'Dry Season Spectacle',
            headline: 'The river everyone needs',
            blurb: '"By September, almost everything in the park has found its way back to the water."',
            quote: true,
          },
        },
      ],
    },
    relatedTours: [
      { id: 3, name: '4 Nights / 5 Days Northern Safari', duration: '5 Days / 4 Nights', img: '/images/IMG_0227.webp' },
      { id: 4, name: '6 Days Best of Tanzania Safari', duration: '6 Days / 5 Nights', img: '/images/956A3309.webp' },
      { id: 5, name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', img: '/images/956A2613.webp' },
    ],
  },
  {
    slug: 'arusha',
    name: 'Arusha National Park',
    region: 'Northern Tanzania',
    heroImg: '/images/IMG_1068.webp',
    tagline: 'A wild gem hiding in plain sight  37km from the city.',
    history: [
      'Arusha National Park is the smallest but perhaps the most ecologically diverse park in Tanzania. Established in 1960 and covering just 137 km², it packs an extraordinary range of habitats into a compact space  from the forests of Ngurdoto Crater to the glittering Momella Lakes and the dramatic slopes of Mount Meru, Tanzania\'s second-highest peak at 4,566 metres.',
      'The park sits just 37km east of Arusha town  the safari capital of East Africa  making it the most accessible wilderness in the country. Despite its proximity to the city, Arusha receives a fraction of the visitors that flock to the Serengeti or Ngorongoro, preserving a quiet, intimate atmosphere that is increasingly rare in Tanzanian parks.',
      'The Momella Lakes, fed by underground streams from Mount Meru, attract large flocks of flamingo and other waterbirds. The forests shelter the striking black-and-white colobus monkey, while the open grasslands host giraffe, buffalo, zebra, and waterbuck. On clear days, Kilimanjaro is visible on the horizon  a reminder of the extraordinary landscapes that surround this small but remarkable park.',
    ],
    facts: { size: '137 km²', bestTime: 'October – April (birding)', animals: 'Colobus Monkey · Giraffe · Buffalo · Hippo · Flamingo · Leopard' },
    highlights: ['Ngurdoto Crater', 'Momella Lakes', 'Mount Meru Climb', 'Walking Safaris', 'Kilimanjaro Views'],
    story: {
      // No dedicated verified photo of Arusha NP itself is in the library
      // yet — using a real, honest photo of Gillead's own fleet instead of
      // a mismatched park photo, since Arusha genuinely is where every
      // safari (not just this one) starts.
      bigImages: ['/images/IMG_1068.webp'],
      bigVignette: {
        eyebrow: 'Your Gateway',
        headline: 'Every safari starts here',
        blurb: 'Arusha is where our own guides and vehicles are based — 37km from Arusha National Park itself, and the first stop on almost every itinerary we run.',
        cta: { label: 'Plan Your Safari', href: '/safaris' },
      },
    },
    relatedTours: [
      { id: 2, name: '3 Days Classic Serengeti Safari', duration: '3 Days / 2 Nights', img: '/images/956A2358.webp' },
      { id: 3, name: '4 Nights / 5 Days Northern Safari', duration: '5 Days / 4 Nights', img: '/images/IMG_0227.webp' },
      { id: 5, name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', img: '/images/956A2613.webp' },
    ],
  },
  {
    slug: 'manyara',
    name: 'Lake Manyara National Park',
    region: 'Northern Tanzania',
    heroImg: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1200&h=800&fit=crop&auto=format',
    tagline: 'A narrow strip of forest, lake and escarpment where lions climb trees.',
    history: [
      "Lake Manyara sits at the base of the Great Rift Valley's western escarpment, a narrow strip of groundwater forest, acacia woodland and alkaline lake squeezed between a 600-metre wall of rock and the water's edge. Early twentieth-century travel writers, including Ernest Hemingway after a 1930s safari through the area, wrote admiringly of the view from the escarpment road above the lake.",
      "In the 1960s the park became a pioneering site for elephant research: biologist Iain Douglas-Hamilton spent years here developing techniques for identifying individual elephants by their ears and tusks, work that laid the foundation for elephant conservation science across the continent.",
      "The lake itself is alkaline and shallow, expanding and contracting with the rains — when conditions are right, it draws vast flocks of lesser flamingo that turn its shallows pink. But Manyara's best-known residents are its lions, which have developed the unusual habit of climbing into acacia and sausage trees, a behaviour rarely seen anywhere else in Africa.",
    ],
    facts: { size: '648 km²', bestTime: 'June – October', animals: 'Tree-Climbing Lion · Flamingo · Hippo · Elephant · Blue Monkey' },
    highlights: ['Tree-Climbing Lions', 'Groundwater Forest', 'Maji Moto Hot Springs', 'Flamingo-Lined Soda Lake', 'Rift Valley Escarpment Views'],
    story: {
      // No verified real photography of Manyara itself is in the library yet
      // (it isn't part of our own photo set) — one honest stock photo beats
      // a mismatched real one, see project convention on verifying image
      // content before trusting it (CLAUDE.md, Images section).
      bigImages: ['https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1200&h=800&fit=crop&auto=format'],
      bigVignette: {
        eyebrow: 'Tree-Climbing Lions',
        headline: 'A habit found almost nowhere else',
        blurb: "Manyara's lions regularly rest in the branches of acacia and sausage trees — one of only a few places in Africa where this behaviour is reliably seen.",
        cta: { label: 'Plan This Safari', href: '/safaris' },
      },
    },
    relatedTours: [
      { id: 4, name: '6 Days Best of Tanzania Safari', duration: '6 Days / 5 Nights', img: '/images/956A3309.webp' },
      { id: 6, name: '8 Days Wildebeest Migration River Crossing', duration: '8 Days / 7 Nights', img: '/images/956A4274.webp' },
    ],
  },
  {
    slug: 'ruaha',
    name: 'Ruaha National Park',
    region: 'Southern Tanzania',
    heroImg: '/images/956A3701.webp',
    tagline: "Where East and Southern Africa's wildlife meet, and almost no one else is watching.",
    history: [
      "Ruaha takes its name from the Great Ruaha River, whose sand-choked bed becomes the region's only reliable water source through the long dry season. As the river shrinks to a chain of pools between July and November, elephant, buffalo and huge prides of lion converge along its banks in numbers that make Ruaha home to some of the largest lion prides recorded anywhere in Africa.",
      "Following a 2008 boundary expansion that absorbed the neighbouring Usangu Game Reserve, Ruaha grew to roughly 22,000 km² — larger than the Serengeti — yet still receives only a small fraction of the visitors. Ruaha sits at a genuine ecological crossing point: species typical of East Africa's Rift Valley, like greater kudu, share the same ground as southern miombo-woodland species like sable antelope, a mix found almost nowhere else in Tanzania.",
      "The park is also one of the last strongholds of the African wild dog, with one of the largest known populations left on the continent. Rugged, baobab-lined valleys and near-total remoteness are what draw the safari-goers who make the long journey south.",
    ],
    facts: { size: '22,000 km²', bestTime: 'June – November', animals: 'African Wild Dog · Lion · Elephant · Greater Kudu · Sable Antelope' },
    highlights: ['Great Ruaha River', 'Largest Lion Prides in Tanzania', 'African Wild Dog Stronghold', 'East-Meets-South Wildlife Mix', 'Remote, Uncrowded Safaris'],
    story: {
      // Only two verified real photos of Ruaha are in the library (the
      // lodge photography from accommodation/lodges.ts) — using both, no
      // secondary pairing forced from unrelated generic wildlife shots.
      bigImages: ['/images/956A3701.webp', '/images/956A2236.webp'],
      bigVignette: {
        eyebrow: 'Great Ruaha River',
        headline: 'Where the dry season concentrates everything',
        blurb: "As the river shrinks to scattered pools between July and November, elephant, buffalo and some of Tanzania's largest lion prides converge along its banks.",
        cta: { label: 'Plan This Safari', href: '/safaris' },
      },
    },
    relatedTours: [
      { id: 8, name: '6 Days Ruaha, Mikumi & Udzungwa National Park', duration: '6 Days / 5 Nights', img: '/images/956A3701.webp' },
    ],
  },
  {
    slug: 'selous',
    name: 'Selous Game Reserve',
    region: 'Southern Tanzania',
    heroImg: '/images/956A2192.webp',
    tagline: 'A wilderness the size of Switzerland, explored by boat, on foot, and almost never by crowd.',
    history: [
      "Selous takes its name from Frederick Courteney Selous, the English explorer and big-game hunter who died here during the East African campaign of the First World War and is buried within its boundaries. Established in 1922 and declared a UNESCO World Heritage Site in 1982, it remains one of the largest protected wilderness areas on the continent — roughly the size of Switzerland.",
      "The Rufiji River is what sets Selous apart from almost every other Tanzanian park: it is one of the very few places in the country where boat safaris are a normal part of the itinerary, gliding past pods of hippo and basking crocodile in numbers few other rivers can match. Walking safaris are permitted here too, a rarer privilege that puts guests on foot in genuine wilderness rather than behind a windscreen.",
      "In 2019 the Tanzanian government split the reserve, converting the northern, tourism-focused section into Nyerere National Park while the remaining southern area kept the Selous name as a hunting concession. Most of the camps and boat safaris travellers know as \"Selous\" now sit within that renamed northern section, though the Selous name has stuck in how the region is marketed and remembered.",
    ],
    facts: { size: '54,600 km²', bestTime: 'June – October', animals: 'African Wild Dog · Hippo · Crocodile · Elephant · Lion' },
    highlights: ['Rufiji River Boat Safaris', 'Walking Safaris', 'African Wild Dog Stronghold', 'UNESCO World Heritage Site', 'Vast, Untouched Wilderness'],
    story: {
      // Both images already verified as Selous in accommodation/lodges.ts
      // (Selous Migration Camp's own primary + secondary photos).
      bigImages: ['/images/956A2192.webp', '/images/956A2874.webp'],
      bigVignette: {
        eyebrow: 'Rufiji River Boat Safaris',
        headline: 'The river safari almost nowhere else offers',
        blurb: 'Boat safaris along the Rufiji River bring guests close to hippo pods and basking crocodile in one of the only parts of Tanzania where this is a normal part of the itinerary.',
        cta: { label: 'Plan This Safari', href: '/safaris' },
      },
    },
    relatedTours: [
      { id: 7, name: '5 Days Selous Game Reserve & Mikumi National Park', duration: '5 Days / 4 Nights', img: '/images/956A2192.webp' },
    ],
  },
];
