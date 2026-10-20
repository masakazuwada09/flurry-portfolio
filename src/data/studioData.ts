import { PortfolioItem, ServiceOption, ToolMastery, Certification } from '../types';

export const STUDIO_META = {
  name: 'Flurrygraphy Design Studio',
  tagline: 'Expressive Design Solutions, Tailor Fit to Your Vision.',
  director: 'Fhlori Ann Maye V. Luna',
  directorShort: 'Flurry',
  email: 'flurrygraphystudio@gmail.com',
  turnaround: 'Prompt reply within 24 business hours',
  scope: 'Worldwide commissions welcome',
  socialHandles: {
    instagram: '@flurrygraphy',
    behance: 'behance.net/flurrygraphy',
    pinterest: 'pinterest.com/flurrygraphy'
  },
  heroBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrwCJceP3AT5BsmClFQy_hT4_9FEIwSoB-mCVvG5bUy2Mm9WGcHrpY9JTLpJu1Fb5orRghvmtARFFY-bwPuzhzpIvzrbzUVSGWxapTVXvMXfD5Z2too0wvP_GofyIuYzwTQS44aBf6gd6AkvEELmr0xxshJnrdII--NuddTnF0ljRlDIZzHkJnNnl5Kpk_q2kaF3MviaTQ-PUnIZ84Cb1_cksAjUOCORMStjLOqt63i8Nx8gnX5cCBS4HVp3UauCaCVws',
  directorBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArrNddFXdjgUD0b73vIhhbsdjgUD0b73vIhhbsdxP9i1V6svAMAoPSynNjFOhG6oYvytlKSFoa5AQVoEvLSh8TmGmB7WzyGfXUA1i-KF-W5fkcsVJuNYAWOlole-eCMRWzYA0b-e0iJFUfHG3HzSvrRJYzzDrkvXtECwof5zMRJoIPQ1TweLzmGAgWVVCUqSE2hWKfD67LNFRx-i8_LGd8gy-I4xzAbrofWbGJNyRf5DGRDlrJyGUiySHFAtUYlqfrR4PGOTPJZIv9VSuIF8',
  toolsBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5rZ_gz7uLZkhG9LyVlYhf7KfY911wsHE6V6qy9PCJJBXMVkS8W-eSddQLpBOhgNot65ent3wmn7kZ8EGv871j2CXxEFfYqqCOyIMZI3MWu2Zh_sY-TKBurUSZ9ZqgnoIDOY-zdfsDTFv5jEWugJxBg6vLKA3-926JeDZLZFR-_JU-MVVSyXLx1Uj3fChpYGRmeu5x9Um4Ww6VJwIk9u6jLeG7Ss8eGvaI5Vq4VgVE8_uljCXAQAwRGAVZGcRfX2X5hPU',
  certificatesBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-Cc_Tj8tH4Qx-lTSm0AZoUX3x1LsegOXGCuLY92ckO47RTwX7KWLW984PlsfUeatDGu_QaUne-FcAeNyHA7DV2xLPBm27zh9ykKSrGOQ1uVGwDtNZEZD3R6U_PYAfsrgjKdjJjedCosCdY9Smnqxk0fU-dhezF5mgtwMJPSjAj4C3ZmQECAvuoh1iSjz2khX7_r69NglOI23c2OJvGCS9tQPn2uMbkXDo1CFvc5SSXxrpV3B94N1xPUwAtkmXA79QNp8',
  contactBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuWwaGRVax7_j5L7eBzgJNaovGGObXcBdA7gs-PrfqNfzc95Zp6k0OGD-Pw1bsvx243OH3PZ4AokgbmeHihMmcIf5gpU8guMmJOLDLtsnih6oQ_qQn9n6yZcrey9Qhxh9okcIC7NdI5XQpbKetqhLJmZQepOAPQkC0VDrYqDFB24Bn84ai-HJF_Z0I1N6bvhJSupq0lXYO9MFP7BbMye6WvWk_6Pn_J2hG3Ii1o0rvloQrJaOpc-dCKY4oIhcIFfdWcKg'
};

export const STUDIO_METRICS = [
  {
    value: '100+',
    label: 'Projects Delivered',
    description: 'Global clientele across beauty, culinary, lifestyle & wellness.',
    colorClass: 'text-[#803d1d]'
  },
  {
    value: '100%',
    label: 'Bespoke Curation',
    description: 'Tailored identity typography, tone & tactile palette formulations.',
    colorClass: 'text-[#8e4d32]'
  },
  {
    value: '5+',
    label: 'Accreditations',
    description: "Gov't Medalist & Adobe/Canva Certified Designer credentials.",
    colorClass: 'text-[#6d4820]'
  },
  {
    value: '4.9/5',
    label: 'Client Satisfaction',
    description: 'Consistent praise for swift turnaround & refined warm elegance.',
    colorClass: 'text-[#803d1d]'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'case-01',
    caseNumber: 'Case 01',
    title: 'Eunoia Coffee & R.A. Bravo Identity Kits',
    category: 'branding',
    categoryLabel: 'Identity Systems',
    badgeColorClass: 'text-[#803d1d] bg-[#f8ebe6]',
    subtitle: 'Full Brand Architecture & Stationery',
    description: 'Complete brand architecture for two distinct concepts: Eunoia Artisan Specialty Coffee and R.A. Bravo Real Estate Consultancy. Included typography system guidelines, tactile earthy color palettes, business cards, menu boards, and comprehensive social media templates.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEL3xExeCZe9ZnNK5FuMPzJ15Gk2QMH4MTcRuQXQhXUu7BsKNzWgB63axFaIIjpZ0m_4JnZm7OTyBRkrQt1objePqjZ5xPVUTEGB4QeVKEaaA6itvKs_sYW5ULjTl1dS2t4Y9A6zNM2Md3P6lzTaA8fwuQfSdsdovFGSMFM52hhFazqU7KrkCS6oRhvfKqzFTOcFTuWOIcYDJlHP1CIpJyg7QAIjzsaJ5MbMQc_QTQNWUPpHxASUJE-_tJ1fvGZWguHG4',
    colSpanDesktop: 'lg:col-span-8',
    client: 'Eunoia Coffeehouse & R.A. Bravo Real Estate',
    timeline: '3 Weeks Delivery',
    deliverables: ['Primary & Secondary Logotypes', 'Color Palette & Typography Guidelines', 'Brand Guidelines Book (28 Pages)', 'Print-Ready Stationery & Packaging Mockups'],
    swatches: [
      { name: 'Warm Terracotta', hex: '#803D1D' },
      { name: 'Roasted Almond', hex: '#8E4D32' },
      { name: 'Ivory Cream', hex: '#FFF8F6' },
      { name: 'Espresso Bean', hex: '#201A18' }
    ],
    typographyUsed: ['Playfair Display', 'DM Sans Medium', 'Bodoni Moda'],
    keyHighlights: [
      'Comprehensive vector logo assets for high-precision print and digital embroidery',
      'Harmonized natural tactile tones with unbleached parchment accents',
      'Complete social grid layout templates ready for daily posting'
    ]
  },
  {
    id: 'case-02',
    caseNumber: 'Case 02',
    title: 'Logo & Monogram Collection',
    category: 'branding',
    categoryLabel: 'Marks & Emblems',
    badgeColorClass: 'text-[#8e4d32] bg-[#f8ebe6]',
    subtitle: 'Curated Logotypes & Monograms',
    description: 'Curated emblem collection spanning multiple lifestyle verticals: Eunoia Artisan Coffee, Belle Âme Skincare, Aeri Beauty Organics, HIIT High Performance Studio, and Coffee Avenue roasters.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoYZlRhGx4Ah9BhuIh7YATagcFvWYvJVxqOfMoMvqhLk3bJCtfrh6YnQs5pWGFOuKdLqXs4BtpWDPqyrw1TnKJmB1R25w6L5aY_yZ4v33yu7mid1P8c08tvA-6grpNaY4wTjj3UZzDPoqvza-ensUl2_grWsf0iZO-KDzTRKiDwhRRzv1G2tL1AIgtsv1TidLA5eYZfUojRdzX9uZa5fXKWy7hZSFNC_TEQw6IeEDmDUGwXT4xGPbobPEPpKGKnXFfUDs',
    colSpanDesktop: 'lg:col-span-4',
    client: 'Boutique Lifestyle Founders Collective',
    timeline: 'Ongoing Curation',
    deliverables: ['Custom Hand Lettered Logotypes', 'Scalable Vector Monograms', 'Favicons & Social Profile Marks', 'Sub-mark Stamp Designs'],
    swatches: [
      { name: 'Pure Clay', hex: '#9E5432' },
      { name: 'Golden Wheat', hex: '#D4A373' },
      { name: 'Linen Parchment', hex: '#FAF6F0' }
    ],
    typographyUsed: ['Cormorant Garamond', 'DM Sans', 'Syne'],
    keyHighlights: [
      'Each mark designed from pencil drafts to mathematical Bézier curve vectors',
      'Optimized for extreme downscaling on mobile screens and social avatars',
      'Included horizontal, vertical, and sub-stamp layout variations'
    ]
  },
  {
    id: 'case-03',
    caseNumber: 'Case 03',
    title: 'Packaging Mockup Suite',
    category: 'print',
    categoryLabel: 'Packaging & Goods',
    badgeColorClass: 'text-[#6d4820] bg-[#f8ebe6]',
    subtitle: 'Tactile Physical Product Prototypes',
    description: 'Embossed gold foil journals, luxury jewelry sliding boxes, botanical tea tins, and bespoke stationery prototypes created for upscale retail collections.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB51mD4sUzb-321p8HlQ4BZ1gsBHY4Cm0EsAvv5TL3fzSaSKXrJcWTReeeVVbNtaoQNSGvlyrwDfdp9S4EpD-rer7sB8oqPhQm00KFnTY9RC-AQ4sBKi8B4f_GPPJig7ml7Y7lZCVePoxLiwMkA_v7rkKQCBe1-sSeBwAyJBf8tXc3RQZBTFtQSwR4lWdrxqzPI3-C_sQKBedmJUTmAnGA9M6XI9LlQ3NVVBv-OBa5DWhZ2SQKh-EQzjKtREVkEEUuy7qk',
    colSpanDesktop: 'lg:col-span-6',
    client: 'Atelier Maison & Curated Objects',
    timeline: '2.5 Weeks Delivery',
    deliverables: ['3D Box Packaging Mockups', 'Foil Stamping Production Dielines', 'Journal Debossing Templates', 'Barcode & Label Compliance'],
    swatches: [
      { name: 'Burnt Ochre', hex: '#803D1D' },
      { name: 'Antique Gold', hex: '#C59E5F' },
      { name: 'Warm Cream', hex: '#FDF1EC' }
    ],
    typographyUsed: ['Playfair Display', 'DM Sans'],
    keyHighlights: [
      'Engineered with exact 3mm bleed tolerances for commercial printing',
      'Photorealistic studio lighting render for e-commerce pre-orders',
      'Tactile paper weight and deboss depth simulations'
    ]
  },
  {
    id: 'case-04',
    caseNumber: 'Case 04',
    title: 'Botanical Notebooks & Bookmarks',
    category: 'print',
    categoryLabel: 'Stationery & Prints',
    badgeColorClass: 'text-[#803d1d] bg-[#f8ebe6]',
    subtitle: 'Intricately Patterned Paper Goods',
    description: 'Delicate floral pattern illustrations applied across bound journals, daily planners, and bespoke gift bookmarks for bibliophiles and quiet lifestyle moments.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDor7NuGUwTnUaYL-EYsB9hb4QkItSd6-PuiCE2zSMontd81tO1b9krC9dJ0mLhbC00dbL8DJY6DafllCm5RuxPcJOVYqc2KO9QnqJHD6kYv-Xm9PAOgGqZRHeW8baAzkHF2iKpW0Xhhqh3G3IRtpsGaV3OSRX62KNThCYlGMklKvFizP12vWvDelSfI81UM7Aq95TZg0Tggni8hf1BKcOY74FFajS1ctmoCoijIZ-0XCWnNl6n8gIAuxkwYeGWcDrp5Ac',
    colSpanDesktop: 'lg:col-span-6',
    client: 'Wildflower Press Stationery',
    timeline: '10 Days Delivery',
    deliverables: ['Seamless Botanical Repeat Patterns', 'Hardcover Journal Dieline', 'Metallic Foil Bookmark Series', 'Print PDF with CMYK Separation'],
    swatches: [
      { name: 'Sage Green', hex: '#586A55' },
      { name: 'Blush Terracotta', hex: '#DF9F82' },
      { name: 'Earthy Sand', hex: '#F8EBE6' }
    ],
    typographyUsed: ['Playfair Display Italic', 'DM Sans Light'],
    keyHighlights: [
      'Original hand-drawn botanical sketches converted to vector motifs',
      'Color tested for matte recycled 120gsm paper reproduction',
      'Sold out 500 limited editions upon launch'
    ]
  },
  {
    id: 'case-05',
    caseNumber: 'Case 05',
    title: 'Tactile Business Collateral & Card Presentation',
    category: 'print',
    categoryLabel: 'Collateral Suite',
    badgeColorClass: 'text-[#201a18] bg-[#f2e6e1]',
    subtitle: 'Executive Stationery & Textured Paper Suite',
    description: 'Premium heavyweight cotton paper presentations with blind deboss and warm terracotta edge gilding for creative directors, architects, and private consultants.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmpcatIN9DYYtYr3PO-GSa2s53mAQYBbQSs1AcgJrvsKKtYQ43XwHTVlMdVXwuDuONhO2kuL3JEgFzs3yI9Ic_NMtpWEVH0kbpbtR3KBoQNsFYfpwo9DiQfBcpEC1ESDtlZreRowdm2mLzIaFyk7-AO4qxqlrM5h-hx4VjPuM7Gwp4-vUbxLNlCEH4vPvrQvaBtrl74Wds94Ge1UEQWZ9ShV0JOc14-P5XyLrqZYHfF5UdK_noUV9k7EIXggVWCQCNhLM',
    colSpanDesktop: 'lg:col-span-12',
    client: 'Luna Architecture & Creative Consultancy',
    timeline: '2 Weeks Delivery',
    deliverables: ['Business Card Variations (Standard & Square)', 'Letterhead & Invoice Template', 'Wax Seal Stamp Engraving', 'Presentation Folder Dieline'],
    swatches: [
      { name: 'Charcoal Espresso', hex: '#201A18' },
      { name: 'Warm Terracotta', hex: '#803D1D' },
      { name: 'Cotton White', hex: '#FFF8F6' }
    ],
    typographyUsed: ['DM Sans Bold', 'Playfair Display'],
    keyHighlights: [
      'Micro-typography tracking calibrated for maximum executive poise',
      'Prepared for letterpress, hot foil, and double-thick 600gsm stock',
      'Dual orientation layouts with QR code integration'
    ]
  },
  {
    id: 'case-06',
    caseNumber: 'Case 06',
    title: 'Coffee Avenue Menu Design',
    category: 'social',
    categoryLabel: 'Culinary & Editorial',
    badgeColorClass: 'text-[#803d1d] bg-[#f8ebe6]',
    subtitle: 'Editorial Specialty Menu Boards & Cards',
    description: 'Warm cafe menu cards, wall counter boards, and takeout drink menus engineered for quick scanning, high visual charm, and seasonal beverage highlights.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYwX7ZmsxrkxTye2RsXc49BFifbHLFIrEnFdeYpM2BXn5HsWBcXVsFmObXNIGpz8lLtmeK9KHjt5RPSR4Q-_yv0iBIG4W2n5j2fGao8qp-WyMeCMQBYv_Os1Zzmf9TGQbi48mjNR51KY-AqYqjMFtzqXQOk9fPi6eCsepTt0x5lNkdFjzB_LJcr5mU6rF5TgdSJXz0CFVBhwyhWIP03z6dgrSZyOCUIu3U-_pdlmwy76X6wysZOlYEXQzwV5hwh1oG8Fk',
    colSpanDesktop: 'lg:col-span-6',
    client: 'Coffee Avenue Specialty Roasters',
    timeline: '8 Days Delivery',
    deliverables: ['A3 Wall Menu Boards', 'Folded Tabletop Tri-folds', 'QR Digital Menu Mobile Web Layout', 'Seasonal Promo Inserts'],
    swatches: [
      { name: 'Toasted Caramel', hex: '#886036' },
      { name: 'Espresso', hex: '#201A18' },
      { name: 'Steamed Milk Cream', hex: '#FDF1EC' }
    ],
    typographyUsed: ['DM Sans', 'Playfair Display SemiBold'],
    keyHighlights: [
      'Engineered clear visual hierarchy for fast cashier throughput',
      'Icons denoting dairy-free, single origin, and vegan options',
      'Laminated moisture-resistant finish ready print files'
    ]
  },
  {
    id: 'case-07',
    caseNumber: 'Case 07',
    title: 'Promotional Flyers & Seasonal Campaigns',
    category: 'social',
    categoryLabel: 'Marketing Collateral',
    badgeColorClass: 'text-[#8e4d32] bg-[#f8ebe6]',
    subtitle: 'Vibrant Foot-Traffic Drivers & Posters',
    description: 'High-contrast promotional flyers, store opening invitations, loyalty punch cards, and seasonal product announcement handbills.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMRc-6OLHMG6q3kyPL8PYgmEc3j7VFI966dSc_x32iMOPTX5TDwpS_AqJxfvuVmCRJPrJoDogwKUEKF5uWMwdcbZZ9URHHZiYS4TWsT19YldqHnKDnnEDocuYcpHWqgMqY9U6Br7Eig55ZIxK97Rm9xq61WhK9ZU8-tDXxPPwIs9aTt6SWcwuj4BsvGdFBCuVV67oEESI82IRe5Sq2Naz2FIKRwF1iMac6Fmvbe1BOmb-hQCZklIgovw76CvEOB-IYaEk',
    colSpanDesktop: 'lg:col-span-6',
    client: 'Coffee Avenue & Retail Partners',
    timeline: '5 Days Delivery',
    deliverables: ['DL Single & Double Sided Handbills', 'Instagram Story Ad Adaptations', 'Store Window Decal Graphics', 'Voucher Stamp Layout'],
    swatches: [
      { name: 'Roasted Sienna', hex: '#9E5432' },
      { name: 'Warm Cream', hex: '#FFF8F6' },
      { name: 'Dark Roast', hex: '#360F00' }
    ],
    typographyUsed: ['DM Sans Black', 'Playfair Display'],
    keyHighlights: [
      'Bold typographic anchors driving 38% higher foot traffic redemption',
      'Multi-format delivery for digital display screens and physical letterbox drops',
      'Quick-edit editable source templates provided in Canva Pro'
    ]
  },
  {
    id: 'case-08',
    caseNumber: 'Case 08',
    title: 'Comprehensive Post Templates',
    category: 'social',
    categoryLabel: 'Feed Curation',
    badgeColorClass: 'text-[#803d1d] bg-[#f8ebe6]',
    subtitle: 'Instagram Grid Aesthetic Mastery',
    description: 'Seamless multi-square feed systems, quote frames, testimonial banners, and educational graphics designed for effortless brand cohesion on social feeds.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw26T-PnjVSKrSpzp1-4phX9hMqvO9jwkPn7nCMq5mzPfCeBTTZLlQpCdW9rS7QVO-LGie680Iydtq7gqWCN5MOzYJvdfmEqoZzdivqRr6I09FQtvIlAxcI9uRWDp0fjuHezv9I6r45aSoDDWGqRzEt-Cdc0fWL-cTs72hZHuwCTvg1qcRMcxd13pqNKrrTY4-A-upjgGI2LOMIF3f9GggJd4LceH-TlqkbpOjMfpsugHjs2VspMEm8K2mRsF0NLdVf4E',
    colSpanDesktop: 'lg:col-span-4',
    client: 'Lifestyle Influencers & Wellness Coaches',
    timeline: '1 Week Delivery',
    deliverables: ['30 Reusable Canva Pro Templates', 'Custom Frame Elements', 'Highlight Story Covers (12 Pack)', 'Grid Planning Roadmap'],
    swatches: [
      { name: 'Terracotta', hex: '#803D1D' },
      { name: 'Beige Mist', hex: '#ECE0DB' },
      { name: 'Espresso', hex: '#201A18' }
    ],
    typographyUsed: ['DM Sans Medium', 'Playfair Display Italic'],
    keyHighlights: [
      'Zero-hassle one-click editable templates for fast creator publishing',
      'Harmonious warm palette designed for high save and share velocity',
      'Includes cohesive carousel slide progression system'
    ]
  },
  {
    id: 'case-09',
    caseNumber: 'Case 09',
    title: 'Event & Ministry Posters',
    category: 'social',
    categoryLabel: 'Event Announcements',
    badgeColorClass: 'text-[#6d4820] bg-[#f8ebe6]',
    subtitle: 'Dramatic Atmospheric Compositions',
    description: 'Dynamic typographic layering, dramatic lighting, and evocative compositions for conferences, community gatherings, and musical worship nights.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtZhkDmnCKcq_AAGcrMlWVaaAKS3dBZFe8h2UTH-97XH1SttRs2gZhrEvxwi-LEQBVi6Hbr0yJuM3qMd1_FHwpfCYLWI97Uxdyk2xOmd8EhrTsVER4hIz7m91ErqtHuMFaoK4ZQY6RS2EyVgJJqU2hj75gWlPbxS74bOXDvf98Hbt-0mYeKo9upUFtsDlmvSt8cxcbQQx7E7j5TRvpRwI2x47u-SpuDiQULaWF9LGjLmIdgli0qYykKSrMPx6-OnI_JLc',
    colSpanDesktop: 'lg:col-span-4',
    client: 'Faith & Cultural Events Foundation',
    timeline: '6 Days Delivery',
    deliverables: ['A1 Event Posters', 'LED Stage Screen Visual Backdrops (16:9)', 'Social Countdown Teasers', 'Event Program Booklets'],
    swatches: [
      { name: 'Golden Glow', hex: '#F0BD8B' },
      { name: 'Deep Earth', hex: '#370E00' },
      { name: 'Warm Cream', hex: '#FFF8F6' }
    ],
    typographyUsed: ['Playfair Display', 'DM Sans Bold'],
    keyHighlights: [
      'Atmospheric depth blending custom photography with typography masks',
      'Designed for large-format print visibility from 20+ feet away',
      'Adapted for synchronized widescreen stage LED wall projections'
    ]
  },
  {
    id: 'case-10',
    caseNumber: 'Case 10',
    title: 'Seamless Narrative Carousels',
    category: 'social',
    categoryLabel: 'Carousels',
    badgeColorClass: 'text-[#8e4d32] bg-[#f8ebe6]',
    subtitle: 'Swipe-Stopping Educational Storytelling',
    description: 'Multi-slide seamless carousel graphics with connecting visual lines, interactive quizzes, and micro-content slides engineered to maximize dwell time.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzxkoq3Wc8dZhBvN2MYH3xSCfibmrj2aRo2BrU9KsEXINmpWOSY64F9PO9NaXq2F5U65p_MneAf8ubOtYw4nTbIWx88tcDEbDWbnbjzJoEVdQcBF5y-SkNqSZqMdLsdDDKfcaawxHRcbHoACNuwhVTKdhjsGnTW_q8jID8sv_zXJkl2J9nogONZwv6_yzeKPFGuzX5L6B0lCyOqsBbENvk6XPpkPHI_gLI3isPHJG5BrHysGSrrmEmQUx_9G4DJa8DCRw',
    colSpanDesktop: 'lg:col-span-4',
    client: 'Modern Mind & Wellbeing Collective',
    timeline: '4 Days Delivery',
    deliverables: ['10-Slide Panorama Seamless Graphic', 'Reel Thumbnail Cover', 'Call-to-Action Slide Architecture', 'Story Slice Export Automation'],
    swatches: [
      { name: 'Warm Sand', hex: '#DAC2B9' },
      { name: 'Terracotta Tone', hex: '#803D1D' },
      { name: 'Soft Surface', hex: '#FDF1EC' }
    ],
    typographyUsed: ['DM Sans', 'Playfair Display Italic'],
    keyHighlights: [
      'Seamless graphics flow continuously from slide to slide without seams',
      'Retention rates increased by over 45% on educational carousel series',
      'Engineered with thumb-accessible text safe zones'
    ]
  },
  {
    id: 'case-11',
    caseNumber: 'Case 11',
    title: 'Digital Art & Botanical Portraits',
    category: 'art',
    categoryLabel: 'Handcrafted Illustration',
    badgeColorClass: 'text-[#803d1d] bg-[#f8ebe6]',
    subtitle: 'Fine-Art Organic Digital Illustration',
    description: 'Delicate expressive line-work, custom botanical fauna, romantic female portraits, and textured organic flora rendered via freehand Apple Pencil technique.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxfbD0Y8gEo2hRqaDmyMuD4p0e5j7r1g4zB8JtkA2W1zx2zWifSnwtEbk4w-snoMDJVNEGzlnLfQj_Y6sY2HkCBpAda_9ObwLOscqz1K9VbYgwd2JBw88K2gkdMJEKH-PlqX1zcBTukzbyMHSDlLQakaU9-BUrFjJ_hMLB5bAtdQNw_r27-lSJDh5ONX8HhKELSSa7VckfxcVr23Pgx72x5blVzpFXdH7pUz3lrSaIcfygwSr-cShC5Eoo1K9__EiWQHE',
    colSpanDesktop: 'lg:col-span-6',
    client: 'Private Art Collectors & Editorial Publications',
    timeline: '2 Weeks Commission',
    deliverables: ['High-Resolution 300DPI Giclée Print Art', 'Vector SVG Silhouette Adaptations', 'Book Chapter Frontispiece Art', 'Certificate of Authenticity'],
    swatches: [
      { name: 'Warm Clay', hex: '#9E5432' },
      { name: 'Sepia Ink', hex: '#54433C' },
      { name: 'Linen Parchment', hex: '#FFF8F6' }
    ],
    typographyUsed: ['Custom Hand Lettered Script', 'Playfair Display'],
    keyHighlights: [
      'Drawn stroke by stroke in Procreate with custom watercolor brushes',
      'Exported in archival 8000x8000px resolution suitable for gallery canvas prints',
      'Versatile aesthetic suitable for luxury wine labels and cosmetic packaging'
    ]
  },
  {
    id: 'case-12',
    caseNumber: 'Case 12',
    title: 'Calligraphy & Hand Lettering Works',
    category: 'art',
    categoryLabel: 'Fine Calligraphy',
    badgeColorClass: 'text-[#6d4820] bg-[#f8ebe6]',
    subtitle: 'Custom Modern Script & Script Ligatures',
    description: 'Custom bespoke lettering for luxury wedding invitation suites, greeting cards, quote prints, and artisanal brand logos that require authentic pen stroke grace.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtdo3UJGNWyeko0fDh3dKbngZTstc3A1I49O4Nlno56h4eMBW5hJIFyIDIHfOLYq0BYDPGAFUS7jRPxca5-vijrZB5i_EWZHyPxUia7zmWA4RHu4oJUFqbkamAXsJeY9tYKEckQeRsZlXOvvfsBp3t-Er5cC3zX-Y0RfGvJ9-VHgEh8jnOY-ghBBW5wA8VvRPIbv87qYNrdp9Btfq6ZG0lfDO0Vp9RdplOLO71WVvzMlgJ3o3h6irgqYrw2lM8yvUNZAw',
    colSpanDesktop: 'lg:col-span-6',
    client: 'Boutique Wedding Planners & Artisanal Brands',
    timeline: '10 Days Delivery',
    deliverables: ['Custom Monogram Script Vector', 'Wedding Suite Envelope Addressing Calligraphy', 'Laminated Gold Foil Greetings Card Range', 'Vector Font Glyph Expansion'],
    swatches: [
      { name: 'Chocolate Umber', hex: '#623F18' },
      { name: 'Toasted Cream', hex: '#F8EBE6' },
      { name: 'Terracotta', hex: '#803D1D' }
    ],
    typographyUsed: ['Bespoke Flourished Calligraphy', 'DM Sans'],
    keyHighlights: [
      'Authentic pressure-sensitive copperplate and modern brush pen techniques',
      'Digitized with surgical clean anchor point optimization for vinyl plotting',
      'Featured in national luxury wedding editorial showcases'
    ]
  },
  {
    id: 'case-13',
    caseNumber: 'Case 13',
    title: 'Corporate Swag & Apparel Branding',
    category: 'multimedia',
    categoryLabel: 'Merchandise & Swags',
    badgeColorClass: 'text-[#8e4d32] bg-[#f8ebe6]',
    subtitle: 'Wearable Brand Storytelling & Merch',
    description: 'Custom screen-printed graphic t-shirts, organic canvas tote bags, embroidered caps, and corporate onboarding welcome kits with high aesthetic appeal.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzStIdnHsoVVssnEsjt-QVsvEKjGdl4X7pQLcNzv_dLHrKjbbzwb_fCl_GwcbACpE_5cl7c9b2hP8UlIcSqd1EgRkIZxUjhgXd85p3wpHP2qehE-TLa0M6_Vba1KWzmIskFMfUvCCyP2agJzlOQH1EcAWJSbD2toM0ArPfyplW4XrVeIWxLZvqnvUqZJldWpgSAqXMdgKJwmmcKNu_Mw1SB_PwPSJ8E14OMC7Cta7q6nNMcHvUjM9o98l0z1DLmdrSbxY',
    colSpanDesktop: 'lg:col-span-6',
    client: 'Creative Agencies & Startup Onboarding',
    timeline: '12 Days Delivery',
    deliverables: ['Garment Mockups (Front, Back & Detail)', 'Screen Print Color Separation Files (Pantone TCX)', 'Embroidery DST File Conversion', 'Hang Tag & Neck Label Artwork'],
    swatches: [
      { name: 'Oatmeal Natural', hex: '#ECE0DB' },
      { name: 'Deep Espresso', hex: '#201A18' },
      { name: 'Warm Spice', hex: '#803D1D' }
    ],
    typographyUsed: ['DM Sans Bold', 'Playfair Display'],
    keyHighlights: [
      'Pantone matched for accurate textile screen printing and dye bath consistency',
      'Merchandise loved by employees and customers with 0% throwaway rate',
      'Production guide with recommended GSM garment suppliers included'
    ]
  },
  {
    id: 'case-14',
    caseNumber: 'Case 14',
    title: 'Video Gallery & Motion Clips',
    category: 'multimedia',
    categoryLabel: 'Motion & Video',
    badgeColorClass: 'text-[#803d1d] bg-[#f8ebe6]',
    subtitle: 'Cinematic Reel Pacing & Animated Marks',
    description: 'Dynamic short-form video reels, animated logo reveals, kinetic typography teasers, and sound-synced video edits created for Instagram and TikTok.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdsSsVBHgHPMANpLyfh4-kPX-NT57U6JCLoxaM0kuBVbQot2PkAMyN21Aua9EIhKabGVLmBCCJHS9PKUHrkv6n_OlDAo1UH3TD4JM-IMp967zpptYjgE8iujDvZAzhwoxtw9rJJT85HkjBVgfqIMY1bGuBXplngUlxxN7yWm2K1elZkw7wPyP8x64EXcDSWBQhhijwnCiQD1Pn0AlFt7l15Wgn1aWBJfQ3B-89pU9lM8w2CkqTPckOq9pDhKvPcAg6iHw',
    colSpanDesktop: 'lg:col-span-6',
    client: 'Lifestyle Influencer Brands & Boutiques',
    timeline: '1 Week Delivery',
    deliverables: ['1080x1920 60FPS Video Reels', 'Animated Logo Sting (MP4 & Transparent MOV)', 'Subtitled Video Captions (SRT)', 'BGM & Audio Mix Normalization'],
    swatches: [
      { name: 'Warm Cinnamon', hex: '#8E4D32' },
      { name: 'Amber Glow', hex: '#FFDCBD' },
      { name: 'Ink Night', hex: '#201A18' }
    ],
    typographyUsed: ['DM Sans SemiBold', 'Playfair Display Italic'],
    keyHighlights: [
      'Sound design curated to match subtle visual transitions and logo reveals',
      'Rendered in vertical 9:16 optimized for viral algorithmic reach',
      'Dynamic typography pacing to keep retention through the final second'
    ]
  }
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'branding-kit',
    name: 'Branding Kit & Identity Suite',
    basePrice: 650,
    description: 'Comprehensive brand architecture: Primary & secondary logotypes, marks, font pairings, color formulas, and complete brand guidelines document.',
    typicalDuration: '2 - 3 Weeks'
  },
  {
    id: 'print-packaging',
    name: 'Print, Packaging & Goods',
    basePrice: 480,
    description: 'Bespoke packaging boxes, labels, debossed notebooks, and commercial stationery engineered with exact print bleeds and dielines.',
    typicalDuration: '1 - 2 Weeks'
  },
  {
    id: 'social-templates',
    name: 'Social Media Feed & Carousels',
    basePrice: 380,
    description: 'Custom multi-post templates, seamless carousels, quote frames, story covers, and Canva Pro editable suites for daily posting.',
    typicalDuration: '5 - 7 Days'
  },
  {
    id: 'calligraphy-art',
    name: 'Artisan Calligraphy & Fine Art',
    basePrice: 420,
    description: 'Handcrafted copperplate and modern lettering, botanical sketches, and custom fine-art digital illustrations for upscale collateral.',
    typicalDuration: '1 - 2 Weeks'
  },
  {
    id: 'corporate-apparel',
    name: 'Corporate Apparel & Swag Kit',
    basePrice: 350,
    description: 'Screen-print ready graphics, tote bags, embroidered caps, and onboarding merchandise with full pantone color separations.',
    typicalDuration: '1 Week'
  },
  {
    id: 'video-motion',
    name: 'Video Gallery & Motion Reels',
    basePrice: 450,
    description: 'Animated brand logo reveals, short-form Reels/TikTok cinematic edits, subtitled storytelling clips, and sound design pacing.',
    typicalDuration: '5 - 7 Days'
  }
];

export const TOOLS_MASTERY: ToolMastery[] = [
  {
    name: 'Canva Pro (Verified Specialist & Medalist)',
    category: 'all',
    proficiency: 100,
    tag: 'Govt Medalist Standard',
    description: 'Accredited specialist speed, advanced templating, custom dimension layouts, brand kits, and multi-asset team collaboration.',
    color: '#803d1d'
  },
  {
    name: 'Adobe Illustrator & Vector Precision',
    category: 'vector',
    proficiency: 96,
    tag: 'Industry Vector Core',
    description: 'Mathematical Bézier curves, complex emblem typography, pantone spot color separation, and scalable print assets.',
    color: '#8e4d32'
  },
  {
    name: 'Procreate & Hand Calligraphy',
    category: 'raster',
    proficiency: 94,
    tag: 'Artisan Freehand',
    description: 'Expressive Apple Pencil line weight, custom botanical brush textures, portraiture, and copperplate lettering.',
    color: '#6d4820'
  },
  {
    name: 'Adobe Photoshop & Raster Retouching',
    category: 'raster',
    proficiency: 95,
    tag: 'Editorial Grade',
    description: 'High-end frequency separation, photorealistic packaging mockup rendering, lighting balance, and shadow blending.',
    color: '#803d1d'
  },
  {
    name: 'Adobe InDesign & CorelDraw',
    category: 'editorial',
    proficiency: 90,
    tag: 'Multi-Page Publication',
    description: 'Master pages, typographic grids, editorial books, lookbooks, menus, and prepress prep for offset lithography.',
    color: '#8e4d32'
  },
  {
    name: 'CapCut, Filmora & Premiere Pro',
    category: 'motion',
    proficiency: 88,
    tag: 'Social Motion Dynamic',
    description: 'Keyframe kinetic text, beat-matched cutaways, audio normalization, vertical framing, and 4K export presets.',
    color: '#6d4820'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-01',
    badge: 'Govt Medalist Distinction',
    title: 'DICT digitaljobsPH Graphic Design Specialist',
    issuer: 'Department of Information and Communications Technology',
    distinction: 'National Medalist Honor',
    description: 'Awarded highest distinction in specialized graphic design, corporate branding strategy, and digital production management across extensive government training assessment.',
    year: 'Certified Credential',
    icon: 'military_tech',
    accentColor: '#803d1d'
  },
  {
    id: 'cert-02',
    badge: 'International Technical Standard',
    title: 'Microsoft Office Specialist (MOS)',
    issuer: 'Certiport / Microsoft Worldwide',
    distinction: 'Certified Specialist',
    description: 'Official international Microsoft accreditation verifying technical competency, publication formatting, structured presentation layouts, and office architecture.',
    year: 'Global Verification',
    icon: 'verified',
    accentColor: '#8e4d32'
  },
  {
    id: 'cert-03',
    badge: 'Creative Leadership',
    title: 'Adobe Creative Educator Level 1',
    issuer: 'Adobe Education Exchange',
    distinction: 'Certified Educator',
    description: 'Recognized for advanced digital literacy, visual storytelling pedagogy, design ethics, and empowering creative culture through Adobe Creative Suite solutions.',
    year: 'Adobe Accreditation',
    icon: 'school',
    accentColor: '#6d4820'
  },
  {
    id: 'cert-04',
    badge: 'Advanced Design Competency',
    title: 'Canva Design Essentials & Professional Masterclass',
    issuer: 'Canva Certified Design Authority',
    distinction: 'Advanced Certified',
    description: 'Mastery of design hierarchy, color psychology, modern typographic rhythm, social algorithm content pacing, and high-velocity multi-channel asset creation.',
    year: 'Certified Expert',
    icon: 'workspace_premium',
    accentColor: '#803d1d'
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    quote: "Fhlori transformed our cafe's brand completely. From our coffee bag packaging to our physical menus and Instagram feed, our customers constantly comment on how warm and elevated everything feels.",
    author: 'Elena Vance',
    role: 'Founder, Eunoia Specialty Coffee',
    rating: 5,
    location: 'Melbourne / Manila'
  },
  {
    quote: 'The attention to detail on our corporate cards and real estate branding was second to none. The gold foil specs and typography choices gave us an immediate competitive advantage.',
    author: 'Rafael Bravo',
    role: 'Principal, R.A. Bravo Real Estate Group',
    rating: 5,
    location: 'Singapore'
  },
  {
    quote: 'Working with Flurrygraphy felt like having a true artist in our corner. The hand-drawn botanical illustrations and calligraphy are so distinct—no generic templates anywhere.',
    author: 'Chloe M.',
    role: 'Creative Lead, Wildflower Press',
    rating: 5,
    location: 'Vancouver'
  }
];
