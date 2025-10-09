// lib/prefill.js
// Curated catalogs for Gift Card Brand (what card it is) and Retailer (where it was purchased).
// Slugs map to /public/logos/{kind}/{slug}.svg

export const BRANDS = [
  // General prepaid / major marketplaces / tech
  { slug: "amazon", name: "Amazon" },
  { slug: "visa-prepaid", name: "Visa Prepaid" },
  { slug: "mastercard-prepaid", name: "Mastercard Prepaid" },
  { slug: "american-express-prepaid", name: "American Express Prepaid" },
  { slug: "apple", name: "Apple / iTunes" },
  { slug: "google-play", name: "Google Play" },
  { slug: "netflix", name: "Netflix" },
  { slug: "spotify", name: "Spotify" },
  { slug: "pandora", name: "Pandora" },
  { slug: "siriusxm", name: "SiriusXM" },
  { slug: "apple-music", name: "Apple Music" },
  { slug: "amazon-prime-video", name: "Amazon Prime Video" },

  // Big box store cards (as brands)
  { slug: "target", name: "Target" },
  { slug: "walmart", name: "Walmart" },
  { slug: "best-buy", name: "Best Buy" },
  { slug: "costco", name: "Costco" },
  { slug: "sams-club", name: "Sam's Club" },
  { slug: "bjs-wholesale-club", name: "BJ's Wholesale Club" },

  // Grocery / drugstore brands (as cards)
  { slug: "safeway", name: "Safeway" },
  { slug: "cvs-pharmacy", name: "CVS Pharmacy" },
  { slug: "rite-aid", name: "Rite Aid" },
  { slug: "walgreens", name: "Walgreens" },
  { slug: "whole-foods", name: "Whole Foods" },

  // Gaming & entertainment
  { slug: "playstation-network", name: "PlayStation Network" },
  { slug: "xbox-microsoft-store", name: "Xbox / Microsoft Store" },
  { slug: "steam", name: "Steam" },
  { slug: "fandango", name: "Fandango" },
  { slug: "cinemark", name: "Cinemark" },
  { slug: "stubhub", name: "StubHub" },
  { slug: "gamestop", name: "GameStop" },

  // Travel
  { slug: "southwest-airlines", name: "Southwest Airlines" },
  { slug: "delta-airlines", name: "Delta Airlines" },
  { slug: "american-airlines", name: "American Airlines" },
  { slug: "hotels-com", name: "Hotels.com" },
  { slug: "expedia", name: "Expedia" },
  { slug: "airbnb", name: "Airbnb" },
  { slug: "uber", name: "Uber" },
  { slug: "doordash", name: "DoorDash" },
  { slug: "grubhub", name: "Grubhub" },
  { slug: "instacart", name: "Instacart" },

  // Home improvement
  { slug: "lowes", name: "Lowe's" },
  { slug: "home-depot", name: "Home Depot" },
  { slug: "crate-and-barrel", name: "Crate & Barrel" },
  { slug: "bed-bath-and-beyond", name: "Bed Bath & Beyond" },
  { slug: "container-store", name: "Container Store" },
  { slug: "wayfair", name: "Wayfair" },

  // Apparel / retail brands
  { slug: "nike", name: "Nike" },
  { slug: "adidas", name: "Adidas" },
  { slug: "lululemon", name: "Lululemon" },
  { slug: "h-and-m", name: "H&M" },
  { slug: "gap", name: "GAP" },
  { slug: "old-navy", name: "Old Navy" },
  { slug: "banana-republic", name: "Banana Republic" },
  { slug: "dsw", name: "DSW" },
  { slug: "forever-21", name: "Forever 21" },
  { slug: "abercrombie-and-fitch", name: "Abercrombie & Fitch" },
  { slug: "neiman-marcus", name: "Neiman Marcus" },
  { slug: "saks-fifth-avenue", name: "Saks Fifth Avenue" },
  { slug: "finish-line", name: "Finish Line" },
  { slug: "foot-locker", name: "Foot Locker" },
  { slug: "bloomingdales", name: "Bloomingdale's" },
  { slug: "macys", name: "Macy's" },
  { slug: "jcpenney", name: "JCPenney" },
  { slug: "kohls", name: "Kohl's" },
  { slug: "nordstrom", name: "Nordstrom" },
  { slug: "rei", name: "REI" },
  { slug: "burlington", name: "Burlington" },
  { slug: "dicks-sporting-goods", name: "Dick's Sporting Goods" },

  // Outdoor / specialty retail
  { slug: "bass-pro-shops", name: "Bass Pro Shops" },
  { slug: "cabelas", name: "Cabela's" },
  { slug: "michaels", name: "Michaels" },
  { slug: "barnes-and-noble", name: "Barnes & Noble" },
  { slug: "petsmart", name: "PetSmart" },
  { slug: "petco", name: "Petco" },
  { slug: "vitamin-shoppe", name: "Vitamin Shoppe" },
  { slug: "qvc", name: "QVC" },
  { slug: "office-depot", name: "Office Depot" },
  { slug: "staples", name: "Staples" },

  // Beauty
  { slug: "sephora", name: "Sephora" },
  { slug: "ulta-beauty", name: "Ulta Beauty" },
  { slug: "bath-and-body-works", name: "Bath & Body Works" },

  // Restaurants / food
  { slug: "starbucks", name: "Starbucks" },
  { slug: "dunkin", name: "Dunkin'" },
  { slug: "chick-fil-a", name: "Chick-fil-A" },
  { slug: "subway", name: "Subway" },
  { slug: "dominos", name: "Domino's" },
  { slug: "panera-bread", name: "Panera Bread" },
  { slug: "chipotle", name: "Chipotle" },
  { slug: "taco-bell", name: "Taco Bell" },
  { slug: "burger-king", name: "Burger King" },
  { slug: "mcdonalds", name: "McDonald's" },
  { slug: "sonic", name: "Sonic" },
  { slug: "pizza-hut", name: "Pizza Hut" },
  { slug: "buffalo-wild-wings", name: "Buffalo Wild Wings" },
  { slug: "sweetgreen", name: "Sweetgreen" },
  { slug: "applebees", name: "Applebee's" },
  { slug: "olive-garden", name: "Olive Garden" },
  { slug: "red-lobster", name: "Red Lobster" },
  { slug: "yogurtland", name: "Yogurtland" },
  { slug: "raising-canes", name: "Raising Cane's" },
  { slug: "shake-shack", name: "Shake Shack" },
  { slug: "ben-and-jerrys", name: "Ben & Jerry's" },

  // Dept/specialty store cards (as brands)
  { slug: "tjx", name: "TJX (TJ Maxx, Marshalls, HomeGoods)" },
  { slug: "whole-foods-market", name: "Whole Foods Market" },
];

export const RETAILERS = [
  // Massive online / marketplaces
  { slug: "amazon", name: "Amazon (online)" },
  { slug: "ebay", name: "eBay (online & retail)" },
  { slug: "giftcards-com", name: "GiftCards.com (online)" },
  { slug: "gift-card-granny", name: "Gift Card Granny (online)" },
  { slug: "raise-com", name: "Raise.com (online)" },
  { slug: "toasty", name: "Toasty (online)" },
  { slug: "paypal-digital-gifts", name: "PayPal Digital Gifts (online)" },
  { slug: "bitrefill", name: "Bitrefill (online)" },
  { slug: "coingate", name: "CoinGate (online)" },

  // Big box & chains
  { slug: "target", name: "Target (in-store & online)" },
  { slug: "walmart", name: "Walmart (in-store & online)" },
  { slug: "best-buy", name: "Best Buy (in-store & online)" },
  { slug: "costco", name: "Costco (in-store)" },
  { slug: "sams-club", name: "Sam's Club (in-store)" },
  { slug: "bjs-wholesale", name: "BJ's Wholesale (in-store)" },

  // Drugstores
  { slug: "cvs", name: "CVS (in-store & online)" },
  { slug: "walgreens", name: "Walgreens (in-store & online)" },
  { slug: "rite-aid", name: "Rite Aid (in-store)" },

  // Office supply
  { slug: "staples", name: "Staples (in-store & online)" },
  { slug: "office-depot-officemax", name: "Office Depot & OfficeMax (in-store & online)" },

  // Grocery / supermarkets
  { slug: "kroger", name: "Kroger (in-store)" },
  { slug: "safeway", name: "Safeway (in-store)" },
  { slug: "publix", name: "Publix (in-store)" },
  { slug: "hy-vee", name: "Hy-Vee (in-store)" },
  { slug: "giant", name: "Giant (in-store)" },
  { slug: "wegmans", name: "Wegmans (in-store)" },
  { slug: "fred-meyer", name: "Fred Meyer (in-store)" },
  { slug: "heb", name: "H-E-B (in-store)" },
  { slug: "vons", name: "Vons (in-store)" },
  { slug: "whole-foods", name: "Whole Foods (in-store)" },
  { slug: "whole-foods-market", name: "Whole Foods Market (in-store)" },
  { slug: "food-lion", name: "Food Lion (in-store)" },
  { slug: "winn-dixie", name: "Winn-Dixie (in-store)" },
  { slug: "food-city", name: "Food City (in-store)" },
  { slug: "qfc", name: "QFC (in-store)" },
  { slug: "key-foods", name: "Key Foods (in-store)" },
  { slug: "martins", name: "Martin's (in-store)" },
  { slug: "fairway-market", name: "Fairway Market (in-store)" },
  { slug: "three-forks-market", name: "Three Forks Market (in-store)" },
  { slug: "village-market", name: "Village Market (in-store)" },
  { slug: "midway-market", name: "Midway Market (in-store)" },
  { slug: "royal-farms", name: "Royal Farms (in-store)" },

  // Convenience / fuel
  { slug: "7eleven", name: "7-Eleven (in-store)" },
  { slug: "sheetz", name: "Sheetz (in-store)" },
  { slug: "wawa", name: "Wawa (in-store)" },
  { slug: "lidl", name: "LIDL (in-store)" },
  { slug: "quickchek", name: "QuickChek (in-store)" },
  { slug: "sunoco", name: "Sunoco (in-store)" },
  { slug: "shell", name: "Shell (in-store)" },
  { slug: "bp", name: "BP (in-store)" },
  { slug: "thorntons", name: "Thorntons (in-store)" },
  { slug: "flying-j", name: "Flying J (in-store)" },
  { slug: "dash-in", name: "Dash In (in-store)" },
  { slug: "ez-mart", name: "EZ Mart (in-store)" },
  { slug: "family-express", name: "Family Express (in-store)" },
  { slug: "quickstop", name: "QuickStop (in-store)" },

  // Dollar / discount
  { slug: "dollar-general", name: "Dollar General (in-store)" },
  { slug: "family-dollar", name: "Family Dollar (in-store)" },
  { slug: "dollar-tree", name: "Dollar Tree (in-store)" },
  { slug: "burlington", name: "Burlington (in-store)" },

  // Department / apparel
  { slug: "macys", name: "Macy's (in-store)" },
  { slug: "nordstrom", name: "Nordstrom (in-store)" },
  { slug: "jcpenney", name: "JCPenney (in-store)" },
  { slug: "kohls", name: "Kohl's (in-store)" },
  { slug: "lowes", name: "Lowe's (in-store)" },
  { slug: "home-depot", name: "Home Depot (in-store)" },
  { slug: "hobby-lobby", name: "Hobby Lobby (in-store)" },
  { slug: "michaels", name: "Michaels (in-store)" },
  { slug: "bed-bath-and-beyond", name: "Bed Bath & Beyond (in-store)" },
  { slug: "bath-and-body-works", name: "Bath & Body Works (in-store)" },
  { slug: "banana-republic", name: "Banana Republic (in-store)" },
  { slug: "gap", name: "GAP (in-store)" },
  { slug: "old-navy", name: "Old Navy (in-store)" },
  { slug: "crate-and-barrel", name: "Crate & Barrel (in-store)" },
  { slug: "dsw", name: "DSW (in-store)" },
  { slug: "lululemon", name: "Lululemon (in-store)" },
  { slug: "h-and-m", name: "H&M (in-store)" },
  { slug: "forever-21", name: "Forever 21 (in-store)" },
  { slug: "abercrombie-and-fitch", name: "Abercrombie & Fitch (in-store)" },
  { slug: "sam-ash", name: "Sam Ash (in-store)" },
  { slug: "petco", name: "Petco (in-store)" },
  { slug: "petsmart", name: "PetSmart (in-store)" },

  // Outdoor / specialty
  { slug: "bass-pro-shops", name: "Bass Pro Shops (in-store)" },
  { slug: "cabelas", name: "Cabela's (in-store)" },
  { slug: "rei", name: "REI (in-store)" },
  { slug: "pc-richard-and-son", name: "P.C. Richard & Son (in-store)" },

  // Postal / gov
  { slug: "usps", name: "USPS (in-store)" },

  // Regional / misc (from your list)
  { slug: "pavilions", name: "Pavilions (in-store)" },
  { slug: "aaa-club-alliance", name: "AAA Club Alliance (in-store)" },
  { slug: "a-and-a-market", name: "A&A Market (in-store)" },
  { slug: "apples-market", name: "Apples Market (in-store)" },
  { slug: "foodtown", name: "Foodtown (in-store)" },
  { slug: "harris-teeter", name: "Harris Teeter (in-store)" },
  { slug: "jacksons", name: "Jacksons (in-store)" },
  { slug: "maverik", name: "Maverik (in-store)" },

  // Entertainment / digital (as retailers selling codes)
  { slug: "cinemark-theatres", name: "Cinemark Theatres (in-store & online)" },
  { slug: "pandora-online", name: "Pandora (online)" },
  { slug: "spotify-online", name: "Spotify (online)" },

  // Gaming (retailer)
  { slug: "gamestop", name: "GameStop (in-store & online)" },
];
