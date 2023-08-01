const products = [
  {
    id: 'R100NF9',
    name: 'Brick slips Feldhaus Klinker R100NF9 perla liso',
    availability: 'In Stock',
    filepath: 'R100NF9.html',
    priceCentsM2: 5240, //In cents
    priceCentsPc: 219, //In cents
    supplierPriceType: 'm2',
    isM2: true,
    isLinearMeter: false,

    specs: {
      piecesInSquareMeterCm: 4800,
      piecesInPack: 48, //Whole number
      squareMetersInPallet: 60, //Whole number
      recommendedJointSpacing: '10-12',
      thickness: 9,
      format: '240 x 71 x 9',
      recommendedDryMortarVolume: '4-6',
      weightOf1PieceGramm: 52,
      weightOf1SquareMeter: 17.5, //Is not used in calculations
      weightOf1PackGramm: 1750, //In gramms
      manufacturer: 'Feldhaus Klinker',
      countryOfOrigin: 'Germany',
    },

    image: 'img/thumbnails/r100nf.jpg',
    image_1: 'img/thumbnails/r100nf-side.jpg',

    image_thumbnail: [
      'img/images/R100NF/thumbnails/R100NF_full.jpg', 
      'img/images/R100NF/thumbnails/R100NF_full_side.jpg', 
      'img/images/R100NF/thumbnails/R100NF_house_day.jpeg', 
      'img/images/R100NF/thumbnails/R100NF_house_night.jpeg', 
      'img/images/R100NF/thumbnails/R100NF_fasade.jpg', 
      // 'img/images/R100NF/thumbnails/R100NF_fasade.jpg', 
    ],
    image_original: [
      'img/images/R100NF/original/R100NF_full.jpg', 
      'img/images/R100NF/original/R100NF_full_side.jpg', 
      'img/images/R100NF/original/R100NF_house_day.jpeg', 
      'img/images/R100NF/original/R100NF_house_night.jpeg', 
      'img/images/R100NF/original/R100NF_fasade.jpg', 
      // 'img/images/R100NF/original/R100NF_fasade.jpg', 
    ]
    
  }, {
    id: 'R303NF9',
    name: 'Brick slips Feldhaus Klinker R303NF9 ardor liso',
    availability: 'In stock',
    filepath: 'R303NF9.html',
    // priceCentsM2: 4321,
    priceCentsPc: 219, //example
    supplierPriceType: 'pc',
    isM2: true,
    isLinearMeter: false,

    specs: {
      piecesInSquareMeterCm: 4800,
      piecesInPack: 39,
      piecesInPallet: 1200, //Example
      recommendedJointSpacing: '10-12',
      thickness: 9,
      format: '240 x 71 x 9',
      recommendedDryMortarVolume: '4-6',
      weightOf1PieceGramm: 52,
      weightOf1SquareMeter: 25,
      weightOf1PackGramm: 2500,
      manufacturer: 'Feldhaus Klinker',
      countryOfOrigin: 'Germany',
    },

    image: 'img/thumbnails/r303nf.jpg',
    image_1: 'img/thumbnails/r303nf-side.jpg',

    image_thumbnail: [
      'img/images/R100NF/thumbnails/R100NF_full.jpg', 
      'img/images/R100NF/thumbnails/R100NF_full_side.jpg', 
      'img/images/R100NF/thumbnails/R100NF_house_day.jpeg', 
      'img/images/R100NF/thumbnails/R100NF_house_night.jpeg', 
      'img/images/R100NF/thumbnails/R100NF_fasade.jpg', 
      // 'img/images/R100NF/thumbnails/R100NF_fasade.jpg', 
    ],
    image_original: [
      'img/images/R100NF/original/R100NF_full.jpg', 
      'img/images/R100NF/original/R100NF_full_side.jpg', 
      'img/images/R100NF/original/R100NF_house_day.jpeg', 
      'img/images/R100NF/original/R100NF_house_night.jpeg', 
      'img/images/R100NF/original/R100NF_fasade.jpg', 
      // 'img/images/R100NF/original/R100NF_fasade.jpg', 
    ]
    
  }, {
    id: 'R404NF5',
    name: 'Linear meter R404',
    availability: 'In stock',
    filepath: 'R404NF5.html',
    priceCentsPc: 1001, //example
    supplierPriceType: 'pc',
    isM2: false,
    isLinearMeter: false,

    specs: {
      piecesInLinearMeter: 330,
      piecesInPack: 48,
      recommendedJointSpacing: '10-12',
      thickness: 9,
      format: '240 x 71 x 9',
      recommendedDryMortarVolume: '4-6',
      weightOf1PieceGramm: 52,
      weightOf1SquareMeter: 25,
      weightOf1PackGramm: 25,
      manufacturer: 'Feldhaus Klinker',
      countryOfOrigin: 'Germany',
    },

    image: 'img/thumbnails/r303nf.jpg',
    image_1: 'img/thumbnails/r303nf-side.jpg',

    image_thumbnail: [
      'img/images/R100NF/thumbnails/R100NF_full.jpg', 
      'img/images/R100NF/thumbnails/R100NF_full_side.jpg', 
      'img/images/R100NF/thumbnails/R100NF_house_day.jpeg', 
      'img/images/R100NF/thumbnails/R100NF_house_night.jpeg', 
      'img/images/R100NF/thumbnails/R100NF_fasade.jpg', 
      // 'img/images/R100NF/thumbnails/R100NF_fasade.jpg', 
    ],
    image_original: [
      'img/images/R100NF/original/R100NF_full.jpg', 
      'img/images/R100NF/original/R100NF_full_side.jpg', 
      'img/images/R100NF/original/R100NF_house_day.jpeg', 
      'img/images/R100NF/original/R100NF_house_night.jpeg', 
      'img/images/R100NF/original/R100NF_fasade.jpg', 
      // 'img/images/R100NF/original/R100NF_fasade.jpg', 
    ]
    
  }, {
    id: 'R406NF1',
    name: 'EURAMIC CAVAR 4817 294 x 175 x 52 x 10',
    availability: 'In stock',
    filepath: 'R406NF1.html',
    priceCentsPc: 2698,
    supplierPriceType: 'pc',
    isM2: false,
    isLinearMeter: true,

    specs: {
      piecesInLinearMeterCm: 330,
      piecesInPack: 6,
      piecesInPallet: 192,
      recommendedJointSpacing: '10-12',
      thickness: 9,
      format: '240 x 71 x 9',
      recommendedDryMortarVolume: '4-6',
      weightOf1PieceGramm: 153,
      weightOf1PackGramm: 916,
      manufacturer: 'Feldhaus Klinker',
      countryOfOrigin: 'Germany',
    },

    image: 'img/thumbnails/r303nf.jpg',
    image_1: 'img/thumbnails/r303nf-side.jpg',

    image_thumbnail: [
      'img/images/R100NF/thumbnails/R100NF_full.jpg', 
      'img/images/R100NF/thumbnails/R100NF_full_side.jpg', 
      'img/images/R100NF/thumbnails/R100NF_house_day.jpeg', 
      'img/images/R100NF/thumbnails/R100NF_house_night.jpeg', 
      'img/images/R100NF/thumbnails/R100NF_fasade.jpg', 
      // 'img/images/R100NF/thumbnails/R100NF_fasade.jpg', 
    ],
    image_original: [
      'img/images/R100NF/original/R100NF_full.jpg', 
      'img/images/R100NF/original/R100NF_full_side.jpg', 
      'img/images/R100NF/original/R100NF_house_day.jpeg', 
      'img/images/R100NF/original/R100NF_house_night.jpeg', 
      'img/images/R100NF/original/R100NF_fasade.jpg', 
      // 'img/images/R100NF/original/R100NF_fasade.jpg', 
    ]
    
  }, {
    id: 'R682NF14',
    image: 'img/thumbnails/r682nf.jpg',
    image_1: 'img/thumbnails/r682nf-side.jpg',
    name: 'Brick slips Feldhaus Klinker R682NF14 sintra argo blanco',
    priceCentsM2: 8158,
    manufacturer: 'Feldhaus Klinker',
    country: 'Germany',
    format: '240 x 71 x 14',
    piecesPerM2: 48,
    thickness: 14,
    availability: 'In stock'
  }, {
    id: 'R690NF14',
    image: 'img/thumbnails/r690nf.jpg',
    image_1: 'img/thumbnails/r690nf-side.jpg',
    name: 'Brick slips Feldhaus Klinker R690NF14 sintra ardor blanca',
    priceCentsM2: 7903,
    manufacturer: 'Feldhaus Klinker',
    country: 'Germany',
    format: '240 x 71 x 14',
    piecesPerM2: 48,
    thickness: 14,
    availability: 'In stock'
  }, {
    id: 'R694NF14',
    image: 'img/thumbnails/r694nf.jpg',
    image_1: 'img/thumbnails/r694nf-side.jpg',
    name: 'Brick slips Feldhaus Klinker R694NF14 sintra carmesi',
    priceCentsM2: 7903,
    manufacturer: 'Feldhaus Klinker',
    country: 'Germany',
    format: '240 x 71 x 14',
    piecesPerM2: 48,
    thickness: 14,
    availability: 'In stock'
  }, {
    id: 'R766NF14',
    image: 'img/thumbnails/r766nf.jpg',
    image_1: 'img/thumbnails/r766nf-side.jpg',
    name: 'Brick slips Feldhaus Klinker R766NF14 vascu sabiosa rotado',
    priceCentsM2: 8365,
    manufacturer: 'Feldhaus Klinker',
    country: 'Germany',
    format: '240 x 71 x 14',
    piecesPerM2: 48,
    thickness: 14,
    availability: 'In stock'
  }, {
    id: 'R767NF14',
    image: 'img/thumbnails/r767nf.jpg',
    image_1: 'img/thumbnails/r767nf-side.jpg',
    name: 'Brick slips Feldhaus Klinker R767NF14 vascu terracota locata',
    priceCentsM2: 8365,
    manufacturer: 'Feldhaus Klinker',
    country: 'Germany',
    format: '240 x 71 x 14',
    piecesPerM2: 48,
    thickness: 14,
    availability: 'In stock'
  }, {
    id: 'R773NF14',
    image: 'img/thumbnails/r773nf.jpg',
    image_1: 'img/thumbnails/r773nf-side.jpg',
    name: 'Brick slips Feldhaus Klinker R773NF14 vascu argo antrablanca',
    priceCentsM2: 8365,
    manufacturer: 'Feldhaus Klinker',
    country: 'Germany',
    format: '240 x 71 x 14',
    piecesPerM2: 48,
    thickness: 14,
    availability: 'In stock'
  }
];