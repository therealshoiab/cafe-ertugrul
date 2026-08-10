export const MENU_CATEGORIES = [
  { id: 'all', name: 'All Categories', count: 91, icon: 'Utensils' },
  { id: 'biryani-rice', name: 'Biryani And Rice', count: 12, icon: 'Flame' },
  { id: 'non-veg-pizza', name: 'Non Veg Pizza', count: 6, icon: 'Pizza' },
  { id: 'veg-pizza', name: 'Veg Pizza', count: 8, icon: 'Pizza' },
  { id: 'house-of-tandoor', name: 'House Of Tandoor', count: 3, icon: 'Drumstick' },
  { id: 'momo-hut', name: 'Momo Hut', count: 5, icon: 'Soup' },
  { id: 'main-course-non-veg', name: 'Main Course Non Veg', count: 9, icon: 'UtensilsCrossed' },
  { id: 'main-course-veg', name: 'Main Course Veg', count: 8, icon: 'Salad' },
  { id: 'kanti-kebab', name: 'Kanti And Kebab', count: 4, icon: 'Flame' },
  { id: 'kathi-rolls', name: 'Kathi Rolls', count: 3, icon: 'Sandwich' },
  { id: 'mocktails-shakes', name: 'Mocktails And Shakes', count: 7, icon: 'Coffee' },
  { id: 'snacks-light-munchies', name: 'Snacks Light Munchies', count: 8, icon: 'Cookie' },
  { id: 'noodles', name: 'Noodles', count: 4, icon: 'Soup' },
  { id: 'salad', name: 'Salad', count: 2, icon: 'Salad' },
  { id: 'bread-naan', name: 'Bread And Naan', count: 4, icon: 'Wheat' },
  { id: 'pasta', name: 'Pasta', count: 2, icon: 'Utensils' },
  { id: 'combos', name: "Combo's (Save Extra Upto 30% Off)", count: 6, icon: 'Gift', special: true },
];

export const MENU_ITEMS = [
  // Biryani And Rice (12)
  {
    id: 1,
    name: "Special Kashmiri Mutton Biryani",
    category: "biryani-rice",
    price: 380,
    isVeg: false,
    description: "Slow-cooked tender Kashmiri mutton layered with saffron basmati rice, aromatic spices, and fried onions.",
    image: "/images/biryani.png",
    popular: true,
    rating: 4.9
  },
  {
    id: 2,
    name: "Ertugrul Royal Chicken Biryani",
    category: "biryani-rice",
    price: 320,
    isVeg: false,
    description: "Chef's signature chicken biryani infused with saffron, cardamom, and roasted cashews.",
    image: "/images/biryani.png",
    popular: true,
    rating: 4.8
  },
  {
    id: 3,
    name: "Tandoori Chicken Tikka Biryani",
    category: "biryani-rice",
    price: 340,
    isVeg: false,
    description: "Charcoal-grilled chicken tikka chunks dum-cooked with fragrant long-grain rice.",
    rating: 4.7
  },
  {
    id: 4,
    name: "Kashmiri Wazwan Rista Biryani",
    category: "biryani-rice",
    price: 420,
    isVeg: false,
    description: "Authentic pounded meatball Rista cooked in saffron gravy and layered over royal basmati.",
    rating: 4.9
  },
  {
    id: 5,
    name: "Hyderabadi Dum Mutton Biryani",
    category: "biryani-rice",
    price: 390,
    isVeg: false,
    description: "Spicy & flavorful layered mutton biryani prepared in traditional sealed handi.",
    rating: 4.7
  },
  {
    id: 6,
    name: "Veg Saffron Pulao",
    category: "biryani-rice",
    price: 220,
    isVeg: true,
    description: "Fragrant basmati rice tossed with Kashmiri saffron, dry fruits, green peas, and ghee.",
    rating: 4.6
  },
  {
    id: 7,
    name: "Paneer Tikka Dum Biryani",
    category: "biryani-rice",
    price: 270,
    isVeg: true,
    description: "Marinated cottage cheese cubes layered with caramelized onions and aromatic herbs.",
    rating: 4.7
  },
  {
    id: 8,
    name: "Egg Dum Biryani",
    category: "biryani-rice",
    price: 240,
    isVeg: false,
    description: "Boiled fried eggs simmered in rich gravy layered with seasoned basmati rice.",
    rating: 4.5
  },
  {
    id: 9,
    name: "Jeera Fried Rice",
    category: "biryani-rice",
    price: 160,
    isVeg: true,
    description: "Fluffy basmati rice tempered with roasted cumin seeds and fresh coriander.",
    rating: 4.4
  },
  {
    id: 10,
    name: "Kashmiri Sweet Shahi Pulao",
    category: "biryani-rice",
    price: 280,
    isVeg: true,
    description: "Traditional sweet pulao loaded with almonds, walnuts, raisins, and aromatic spices.",
    rating: 4.8
  },
  {
    id: 11,
    name: "Chicken Fried Rice",
    category: "biryani-rice",
    price: 240,
    isVeg: false,
    description: "Wok-tossed basmati rice with tender chicken strips, scrambled egg, and spring onions.",
    rating: 4.6
  },
  {
    id: 12,
    name: "Steamed Basmati Rice",
    category: "biryani-rice",
    price: 130,
    isVeg: true,
    description: "Long-grain Himalayan basmati rice cooked to fluffy perfection.",
    rating: 4.3
  },

  // Non Veg Pizza (6)
  {
    id: 13,
    name: "Ertugrul Chicken Feast Pizza",
    category: "non-veg-pizza",
    price: 450,
    isVeg: false,
    description: "Loaded with grilled chicken tikka, spicy minced chicken, pepperoni, bell peppers, and mozzarella.",
    popular: true,
    rating: 4.9
  },
  {
    id: 14,
    name: "Chicken Tikka Supreme Pizza",
    category: "non-veg-pizza",
    price: 390,
    isVeg: false,
    description: "Smoky tandoori chicken, red onions, capsicum, and makhani drizzle on hand-tossed crust.",
    rating: 4.8
  },
  {
    id: 15,
    name: "BBQ Smoked Chicken Pizza",
    category: "non-veg-pizza",
    price: 410,
    isVeg: false,
    description: "Tangy hickory BBQ sauce base topped with smoked chicken, jalapenos, and melted cheddar.",
    rating: 4.7
  },
  {
    id: 16,
    name: "Kebab Special Pizza",
    category: "non-veg-pizza",
    price: 440,
    isVeg: false,
    description: "Authentic sliced mutton seekh kebab, green chilies, mint cream, and double mozzarella.",
    rating: 4.9
  },
  {
    id: 17,
    name: "Spicy Peri-Peri Chicken Pizza",
    category: "non-veg-pizza",
    price: 380,
    isVeg: false,
    description: "Fiery peri-peri chicken chunks, spicy sauce, red paprika, and stretchy cheese.",
    rating: 4.6
  },
  {
    id: 18,
    name: "Chicken Sausage & Pepperoni Pizza",
    category: "non-veg-pizza",
    price: 420,
    isVeg: false,
    description: "Classic Italian style crisp crust topped with chicken sausage, smoked pepperoni & oregano.",
    rating: 4.7
  },

  // Veg Pizza (8)
  {
    id: 19,
    name: "Classic Margherita Pizza",
    category: "veg-pizza",
    price: 280,
    isVeg: true,
    description: "Rich San Marzano tomato sauce, fresh basil leaves, extra virgin olive oil & double mozzarella.",
    rating: 4.7
  },
  {
    id: 20,
    name: "Paneer Tikka Passion Pizza",
    category: "veg-pizza",
    price: 350,
    isVeg: true,
    description: "Marinated spiced paneer cubes, crisp capsicum, caramelized red onions & coriander.",
    popular: true,
    rating: 4.8
  },
  {
    id: 21,
    name: "Farmhouse Veggie Deluxe",
    category: "veg-pizza",
    price: 340,
    isVeg: true,
    description: "Black olives, crunchy bell peppers, sweet corn, mushrooms, red onion, and mozzarella.",
    rating: 4.6
  },
  {
    id: 22,
    name: "Four Cheese Garden Feast",
    category: "veg-pizza",
    price: 390,
    isVeg: true,
    description: "Rich blend of Mozzarella, Cheddar, Processed Cheese & Parmesan with garlic butter crust.",
    rating: 4.8
  },
  {
    id: 23,
    name: "Spicy Jalapeno & Mushroom Pizza",
    category: "veg-pizza",
    price: 330,
    isVeg: true,
    description: "Sauteed button mushrooms, pickled jalapenos, paprika flakes, and spicy tomato glaze.",
    rating: 4.5
  },
  {
    id: 24,
    name: "Mexican Veggie Volcano",
    category: "veg-pizza",
    price: 360,
    isVeg: true,
    description: "Sweet corn, black beans, salsa drizzle, capsicum, green chillies & melted cheese.",
    rating: 4.6
  },
  {
    id: 25,
    name: "Corn & Cheese Delight",
    category: "veg-pizza",
    price: 290,
    isVeg: true,
    description: "Golden juicy sweet corn paired with liquid cheese sauce and mozzarella base.",
    rating: 4.5
  },
  {
    id: 26,
    name: "Kashmiri Herb & Cheese Special",
    category: "veg-pizza",
    price: 320,
    isVeg: true,
    description: "Infused with local Kashmiri herbs, roasted garlic, sun-dried tomatoes, and cheese.",
    rating: 4.7
  },

  // House Of Tandoor (3)
  {
    id: 27,
    name: "Full Tandoori Chicken Grill",
    category: "house-of-tandoor",
    price: 520,
    isVeg: false,
    description: "Whole chicken marinated overnight in yogurt & royal tandoori spices, charcoal roasted.",
    image: "/images/kebabs.png",
    popular: true,
    rating: 4.9
  },
  {
    id: 28,
    name: "Half Tandoori Chicken Grill",
    category: "house-of-tandoor",
    price: 290,
    isVeg: false,
    description: "Half charcoal roasted chicken infused with Kashmiri red chili and lemon.",
    image: "/images/kebabs.png",
    rating: 4.8
  },
  {
    id: 29,
    name: "Afghani Malai Tandoori Chicken",
    category: "house-of-tandoor",
    price: 360,
    isVeg: false,
    description: "Succulent chicken leg & breast pieces steeped in rich cashew cream and green cardamom.",
    rating: 4.9
  },

  // Momo Hut (5)
  {
    id: 30,
    name: "Steamed Chicken Momos (8 Pcs)",
    category: "momo-hut",
    price: 180,
    isVeg: false,
    description: "Juicy minced chicken steamed in paper-thin dumplings served with fiery garlic chili dip.",
    popular: true,
    rating: 4.8
  },
  {
    id: 31,
    name: "Kurkure Fried Chicken Momos (8 Pcs)",
    category: "momo-hut",
    price: 220,
    isVeg: false,
    description: "Crispy outer cornflake crust filled with tender seasoned chicken filling.",
    rating: 4.9
  },
  {
    id: 32,
    name: "Steamed Veg Paneer Momos (8 Pcs)",
    category: "momo-hut",
    price: 160,
    isVeg: true,
    description: "Soft dumplings packed with spiced grated paneer, cabbage, and spring herbs.",
    rating: 4.6
  },
  {
    id: 33,
    name: "Tandoori Gravy Momos (8 Pcs)",
    category: "momo-hut",
    price: 240,
    isVeg: false,
    description: "Charcoal-tossed momos slathered in rich creamy makhani gravy and chat masala.",
    rating: 4.9
  },
  {
    id: 34,
    name: "Chili Schezwan Veg Momos (8 Pcs)",
    category: "momo-hut",
    price: 190,
    isVeg: true,
    description: "Pan-fried veg momos tossed in spicy Schezwan sauce, peppers, and onions.",
    rating: 4.7
  },

  // Main Course Non Veg (9)
  {
    id: 35,
    name: "Butter Chicken Special",
    category: "main-course-non-veg",
    price: 380,
    isVeg: false,
    description: "Tender tandoori chicken pieces simmered in rich creamy tomato and butter gravy.",
    popular: true,
    rating: 4.9
  },
  {
    id: 36,
    name: "Kashmiri Mutton Rogan Josh",
    category: "main-course-non-veg",
    price: 440,
    isVeg: false,
    description: "Signature Kashmiri mutton curry stewed with alkanet root, fennel, and aromatic spices.",
    popular: true,
    rating: 4.95
  },
  {
    id: 37,
    name: "Kashmiri Chicken Kanti Gravy",
    category: "main-course-non-veg",
    price: 360,
    isVeg: false,
    description: "Pan-seared spiced chicken pieces cooked with onions, tomatoes, and local spices.",
    rating: 4.8
  },
  {
    id: 38,
    name: "Kadai Chicken Peshawari",
    category: "main-course-non-veg",
    price: 350,
    isVeg: false,
    description: "Chicken braised in coarse spice powder, capsicum, and thick tomato onion masala.",
    rating: 4.7
  },
  {
    id: 39,
    name: "Chicken Korma Shahi",
    category: "main-course-non-veg",
    price: 370,
    isVeg: false,
    description: "Royal white gravy made from almond cashew paste, cream, and tender chicken.",
    rating: 4.8
  },
  {
    id: 40,
    name: "Mutton Wazwan Gushtaba",
    category: "main-course-non-veg",
    price: 460,
    isVeg: false,
    description: "Pounded mutton meatballs cooked in flavorful spiced yogurt gravy.",
    rating: 4.9
  },
  {
    id: 41,
    name: "Chicken Tikka Masala",
    category: "main-course-non-veg",
    price: 370,
    isVeg: false,
    description: "Smoky chicken tikka chunks tossed in spicy medium thick onion-tomato gravy.",
    rating: 4.7
  },
  {
    id: 42,
    name: "Mutton Bhuna Gosht",
    category: "main-course-non-veg",
    price: 430,
    isVeg: false,
    description: "Slow-roasted mutton cooked with whole spices until dark and intensely flavorful.",
    rating: 4.8
  },
  {
    id: 43,
    name: "Egg Curry Special",
    category: "main-course-non-veg",
    price: 240,
    isVeg: false,
    description: "Boiled golden fried eggs simmered in rich gravy with green chili coriander garnishing.",
    rating: 4.5
  },

  // Main Course Veg (8)
  {
    id: 44,
    name: "Paneer Butter Masala",
    category: "main-course-veg",
    price: 310,
    isVeg: true,
    description: "Fresh cottage cheese cubes in silky smooth tomato, butter, and cashew cream gravy.",
    popular: true,
    rating: 4.8
  },
  {
    id: 45,
    name: "Kadai Paneer Royal",
    category: "main-course-veg",
    price: 300,
    isVeg: true,
    description: "Cottage cheese tossed with crushed spices, capsicum, and diced onions.",
    rating: 4.7
  },
  {
    id: 46,
    name: "Dal Makhani Shahi",
    category: "main-course-veg",
    price: 270,
    isVeg: true,
    description: "Overnight slow-cooked black lentils enriched with butter, cream, and aromatic herbs.",
    rating: 4.9
  },
  {
    id: 47,
    name: "Kashmiri Dum Aloo",
    category: "main-course-veg",
    price: 250,
    isVeg: true,
    description: "Baby potatoes deep fried and simmered in spicy Kashmiri red chili fennel yogurt gravy.",
    rating: 4.8
  },
  {
    id: 48,
    name: "Malai Kofta Sweet Gravy",
    category: "main-course-veg",
    price: 320,
    isVeg: true,
    description: "Soft paneer & potato dumplings served in velvety golden cashew gravy.",
    rating: 4.7
  },
  {
    id: 49,
    name: "Mix Vegetable Jalfrzi",
    category: "main-course-veg",
    price: 240,
    isVeg: true,
    description: "Assorted garden veggies stir-fried with sweet peppers and tang spice blend.",
    rating: 4.5
  },
  {
    id: 50,
    name: "Yellow Dal Tadka",
    category: "main-course-veg",
    price: 210,
    isVeg: true,
    description: "Arhar dal tempered with ghee, cumin seeds, garlic, and fresh green chilies.",
    rating: 4.6
  },
  {
    id: 51,
    name: "Palak Paneer Special",
    category: "main-course-veg",
    price: 290,
    isVeg: true,
    description: "Blanched spinach puree seasoned with garlic and soft fresh paneer cubes.",
    rating: 4.6
  },

  // Kanti And Kebab (4)
  {
    id: 52,
    name: "Authentic Kashmiri Mutton Kanti",
    category: "kanti-kebab",
    price: 420,
    isVeg: false,
    description: "Boneless mutton pieces pan-fried with onions, tomatoes, green chillies & local spices.",
    image: "/images/kebabs.png",
    popular: true,
    rating: 4.95
  },
  {
    id: 53,
    name: "Srinagar Special Chicken Kanti",
    category: "kanti-kebab",
    price: 340,
    isVeg: false,
    description: "Sizzling boneless chicken stir-fried with bell peppers, chili oil, and fresh herbs.",
    image: "/images/kebabs.png",
    rating: 4.85
  },
  {
    id: 54,
    name: "Tandoori Mutton Seekh Kebab (4 Pcs)",
    category: "kanti-kebab",
    price: 390,
    isVeg: false,
    description: "Minced mutton skewers seasoned with royal spices and cooked over white hot coals.",
    image: "/images/kebabs.png",
    rating: 4.9
  },
  {
    id: 55,
    name: "Chicken Malai Reshmi Kebab (4 Pcs)",
    category: "kanti-kebab",
    price: 350,
    isVeg: false,
    description: "Melt-in-mouth chicken skewers marinated in cream, cheese, and white pepper.",
    rating: 4.8
  },

  // Kathi Rolls (3)
  {
    id: 56,
    name: "Ertugrul Special Chicken Tikka Roll",
    category: "kathi-rolls",
    price: 190,
    isVeg: false,
    description: "Flaky paratha stuffed with spicy chicken tikka, sliced onions, and mint mayo.",
    popular: true,
    rating: 4.8
  },
  {
    id: 57,
    name: "Mutton Seekh Kebab Roll",
    category: "kathi-rolls",
    price: 230,
    isVeg: false,
    description: "Smoky mutton seekh kebab wrapped with egg paratha, chutney, and spicy salad.",
    rating: 4.9
  },
  {
    id: 58,
    name: "Paneer Tikka Roll",
    category: "kathi-rolls",
    price: 160,
    isVeg: true,
    description: "Soft roomali wrap loaded with grilled paneer, peppers, garlic sauce, and chat spices.",
    rating: 4.6
  },

  // Mocktails And Shakes (7)
  {
    id: 59,
    name: "Kashmiri Saffron Almond Shake",
    category: "mocktails-shakes",
    price: 220,
    isVeg: true,
    description: "Pure saffron infused cold milk blended with soaked almonds, pistachio & ice cream.",
    image: "/images/drinks.png",
    popular: true,
    rating: 4.95
  },
  {
    id: 60,
    name: "Ertugrul Blue Lagoon Mocktail",
    category: "mocktails-shakes",
    price: 180,
    isVeg: true,
    description: "Refreshing blue curaçao, lemon juice, mint leaves, and sparkling sprite.",
    image: "/images/drinks.png",
    rating: 4.8
  },
  {
    id: 61,
    name: "Virgin Mint Mojito",
    category: "mocktails-shakes",
    price: 160,
    isVeg: true,
    description: "Muddled fresh mint leaves, lime juice, brown sugar, and soda water.",
    rating: 4.7
  },
  {
    id: 62,
    name: "Belgian Chocolate Overload Shake",
    category: "mocktails-shakes",
    price: 210,
    isVeg: true,
    description: "Thick chocolate milk blend topped with whipped cream, chocochips, and chocolate drizzle.",
    rating: 4.9
  },
  {
    id: 63,
    name: "Strawberry Cream Delight Shake",
    category: "mocktails-shakes",
    price: 190,
    isVeg: true,
    description: "Real strawberry crush whipped with cold milk and vanilla ice cream scoop.",
    rating: 4.6
  },
  {
    id: 64,
    name: "Watermelon Mint Cooler",
    category: "mocktails-shakes",
    price: 170,
    isVeg: true,
    description: "Freshly pressed watermelon juice topped with black salt and crushed ice.",
    rating: 4.7
  },
  {
    id: 65,
    name: "Oreo Brownie Thickshake",
    category: "mocktails-shakes",
    price: 220,
    isVeg: true,
    description: "Crumbled Oreo cookies and chocolate brownie blended to thick perfection.",
    rating: 4.85
  },

  // Snacks Light Munchies (8)
  {
    id: 66,
    name: "Crispy Peri-Peri French Fries",
    category: "snacks-light-munchies",
    price: 140,
    isVeg: true,
    description: "Golden fried potato fries tossed in fiery African peri-peri seasoning.",
    rating: 4.6
  },
  {
    id: 67,
    name: "Cheesy Loaded Nachos",
    category: "snacks-light-munchies",
    price: 190,
    isVeg: true,
    description: "Crisp tortilla chips baked with warm jalapeno cheese sauce, salsa, and olives.",
    rating: 4.7
  },
  {
    id: 68,
    name: "Chicken Nuggets (8 Pcs)",
    category: "snacks-light-munchies",
    price: 210,
    isVeg: false,
    description: "Crispy golden breaded chicken bite-sized nuggets with cocktail dip.",
    rating: 4.7
  },
  {
    id: 69,
    name: "Cheese Garlic Bread Sticks",
    category: "snacks-light-munchies",
    price: 170,
    isVeg: true,
    description: "Freshly baked bread toasted with garlic butter and pull-apart mozzarella.",
    rating: 4.8
  },
  {
    id: 70,
    name: "Crispy Fried Chicken Wings (6 Pcs)",
    category: "snacks-light-munchies",
    price: 260,
    isVeg: false,
    description: "Juicy chicken wings coated in crunchy batter and spicy BBQ dip.",
    popular: true,
    rating: 4.9
  },
  {
    id: 71,
    name: "Veg Cheese Finger Crisp",
    category: "snacks-light-munchies",
    price: 160,
    isVeg: true,
    description: "Deep-fried cheese and potato fingers served hot with chili dip.",
    rating: 4.5
  },
  {
    id: 72,
    name: "Chicken Lollipop (6 Pcs)",
    category: "snacks-light-munchies",
    price: 270,
    isVeg: false,
    description: "Frenched chicken winglets marinated in hot Indo-Chinese spices.",
    rating: 4.8
  },
  {
    id: 73,
    name: "Corn & Cheese Balls (8 Pcs)",
    category: "snacks-light-munchies",
    price: 180,
    isVeg: true,
    description: "Melted cheese and sweet corn balls encased in a crunchy breadcrumb coating.",
    rating: 4.6
  },

  // Noodles (4)
  {
    id: 74,
    name: "Chicken Hakka Noodles",
    category: "noodles",
    price: 230,
    isVeg: false,
    description: "Stir-fried wheat noodles tossed with shredded chicken, peppers, and garlic soy glaze.",
    popular: true,
    rating: 4.8
  },
  {
    id: 75,
    name: "Veg Schezwan Noodles",
    category: "noodles",
    price: 190,
    isVeg: true,
    description: "Spicy wok-tossed noodles packed with colorful vegetables and hot Schezwan paste.",
    rating: 4.6
  },
  {
    id: 76,
    name: "Egg Chili Garlic Noodles",
    category: "noodles",
    price: 210,
    isVeg: false,
    description: "Noodles fried with scrambled eggs, burnt garlic, green chilies, and scallions.",
    rating: 4.7
  },
  {
    id: 77,
    name: "Ertugrul Special Mix Noodles",
    category: "noodles",
    price: 260,
    isVeg: false,
    description: "Combination of chicken, egg, and fresh veggies wok-tossed in signature Oriental sauce.",
    rating: 4.9
  },

  // Salad (2)
  {
    id: 78,
    name: "Fresh Green Garden Salad",
    category: "salad",
    price: 120,
    isVeg: true,
    description: "Sliced cucumbers, tomatoes, carrots, onions, lemon wedges, and green chilies.",
    rating: 4.4
  },
  {
    id: 79,
    name: "Grilled Chicken Caesar Salad",
    category: "salad",
    price: 220,
    isVeg: false,
    description: "Crisp iceberg lettuce, grilled chicken breast, garlic croutons, and Caesar dressing.",
    rating: 4.8
  },

  // Bread And Naan (4)
  {
    id: 80,
    name: "Butter Garlic Naan",
    category: "bread-naan",
    price: 70,
    isVeg: true,
    description: "Tandoor baked unleavened bread topped with minced garlic and melted butter.",
    popular: true,
    rating: 4.9
  },
  {
    id: 81,
    name: "Butter Naan Shahi",
    category: "bread-naan",
    price: 60,
    isVeg: true,
    description: "Soft tandoor baked bread brushed generously with pure butter.",
    rating: 4.8
  },
  {
    id: 82,
    name: "Cheese Stuffed Naan",
    category: "bread-naan",
    price: 110,
    isVeg: true,
    description: "Refined flour dough stuffed with seasoned gooey mozzarella and spices.",
    rating: 4.85
  },
  {
    id: 83,
    name: "Tandoori Roti Butter",
    category: "bread-naan",
    price: 30,
    isVeg: true,
    description: "Whole wheat bread baked in clay tandoor smeared with fresh butter.",
    rating: 4.5
  },

  // Pasta (2)
  {
    id: 84,
    name: "Creamy Chicken Alfredo Penne",
    category: "pasta",
    price: 290,
    isVeg: false,
    description: "Penne pasta tossed in rich white parmesan cheese sauce with grilled chicken strips.",
    popular: true,
    rating: 4.85
  },
  {
    id: 85,
    name: "Spicy Arrabbiata Veg Pasta",
    category: "pasta",
    price: 240,
    isVeg: true,
    description: "Penne pasta tossed in spicy Italian tomato sauce with crushed chili and black olives.",
    rating: 4.6
  },

  // Combo's (Save Extra Upto 30% Off) (6)
  {
    id: 86,
    name: "Ertugrul Royal Feast Combo (Save 30%)",
    category: "combos",
    originalPrice: 950,
    price: 665,
    isVeg: false,
    description: "Includes: 1 Special Kashmiri Mutton Biryani + 1 Half Tandoori Chicken + 2 Butter Naan + 2 Coke.",
    image: "/images/biryani.png",
    popular: true,
    rating: 4.98
  },
  {
    id: 87,
    name: "Mutton Kanti & Biryani Mega Combo (Save 30%)",
    category: "combos",
    originalPrice: 880,
    price: 615,
    isVeg: false,
    description: "Includes: 1 Authentic Kashmiri Mutton Kanti + 1 Ertugrul Chicken Biryani + 2 Butter Garlic Naan.",
    image: "/images/kebabs.png",
    popular: true,
    rating: 4.95
  },
  {
    id: 88,
    name: "Non-Veg Pizza Party Combo (Save 25%)",
    category: "combos",
    originalPrice: 860,
    price: 645,
    isVeg: false,
    description: "Includes: 1 Ertugrul Chicken Feast Pizza + 1 Crispy Fried Wings (6 Pcs) + 2 Virgin Mojitos.",
    rating: 4.88
  },
  {
    id: 89,
    name: "Veg Butter Masala Family Combo (Save 30%)",
    category: "combos",
    originalPrice: 720,
    price: 504,
    isVeg: true,
    description: "Includes: 1 Paneer Butter Masala + 1 Dal Makhani + 4 Butter Naan + 1 Jeera Rice.",
    rating: 4.85
  },
  {
    id: 90,
    name: "Kathi Roll & Shake Duo Combo (Save 25%)",
    category: "combos",
    originalPrice: 410,
    price: 307,
    isVeg: false,
    description: "Includes: 1 Ertugrul Special Chicken Roll + 1 Belgian Chocolate Overload Shake.",
    rating: 4.8
  },
  {
    id: 91,
    name: "Momo & Noodle Street Combo (Save 25%)",
    category: "combos",
    originalPrice: 410,
    price: 307,
    isVeg: false,
    description: "Includes: 1 Kurkure Fried Chicken Momos (8 Pcs) + 1 Chicken Hakka Noodles + 1 Lemonade.",
    rating: 4.82
  }
];

export const RESTAURANT_INFO = {
  name: "Cafe Ertugrul",
  tagline: "Authentic Kashmiri Cuisine & Royal Ottoman Hospitality",
  address: "Solina Bazar, Airport Rd, Srinagar, Jammu and Kashmir 190008",
  phone: "07006609580",
  formattedPhone: "+91 70066 09580",
  googleMapsUrl: "https://www.google.com/maps/dir/34.0566784,74.8034679/Caf%C3%A9+Ertu%C4%9Frul,+Solina+bazar,+Airport+Rd,+Srinagar,+Jammu+and+Kashmir+190008/@34.056706,74.8008476,17z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x38e18fe7109e003f:0x71219bfac96fc42b!2m2!1d74.8033622!2d34.0566941!3e0?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D",
  instagram: "https://www.instagram.com/cafe.ertugrul",
  facebook: "https://www.facebook.com/cafe.ertugrul",
  hours: "Monday - Sunday: 11:30 AM - 10:30 PM",
  mapsEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.658764047605!2d74.8008476!3d34.056706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18fe7109e003f%3A0x71219bfac96fc42b!2sCaf%C3%A9%20Ertu%C4%9Frul!5e0!3m2!1sen!2sin!4v1723200000000!5m2!1sen!2sin"
};
