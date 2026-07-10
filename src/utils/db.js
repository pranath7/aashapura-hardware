const DEFAULT_CATEGORIES = [
  { id: 'kitchen-accessories', name: 'Kitchen Accessories', shortName: 'Kitchen', emoji: '🍳', img: '/images/kitchen_fittings.png', desc: 'Premium soft-close tandem drawer systems and wire baskets.', stamp: 'RANGE 01' },
  { id: 'pvd-profile', name: 'PVD Profile', shortName: 'PVD Profile', emoji: '📏', img: '/images/glass_fittings.png', desc: 'Decorative luxury gold T-profiles, U-trims, and border channels.', stamp: 'RANGE 02' },
  { id: 'wardrobe-accessories', name: 'Wardrobe Accessories', shortName: 'Wardrobe', emoji: '🛋️', img: '/images/doors_plywood.png', desc: 'Smart wardrobe pull-out shoe racks, hangers, and slides.', stamp: 'RANGE 03' },
  { id: 'sliding-fitting', name: 'Sliding Fitting', shortName: 'Sliding', emoji: '🛞', img: '/images/doors_plywood.png', desc: 'Heavy-duty wardrobe door rollers and guide rails.', stamp: 'RANGE 04' },
  { id: 'door-closer', name: 'Door Closer', shortName: 'Door Closer', emoji: '🚪', img: '/images/door_handles.png', desc: 'Hydraulic door closers, concealed dampers, and pivots.', stamp: 'RANGE 05' },
  { id: 'hinges', name: 'Hinges', shortName: 'Hinges', emoji: '⚙️', img: '/images/door_handles.png', desc: 'SS304 butt hinges, soft-close cabinet hinges, and door stops.', stamp: 'RANGE 06' },
  { id: 'telescopic-channel', name: 'Telescopic Drawer Channel', shortName: 'Drawer Channel', emoji: '🎞️', img: '/images/kitchen_fittings.png', desc: 'Heavy-duty ball bearing slides and push-to-open rails.', stamp: 'RANGE 07' }
];

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Modular Kitchen Wire Basket", category: "kitchen-accessories", img: "/images/kitchen_wire_basket.png" },
  { id: 2, name: "Premium Pantry Pull-Out System", category: "kitchen-accessories", img: "/images/pantry_pullout.png" },
  { id: 3, name: "Soft-Close Corner Carousel", category: "kitchen-accessories", img: "/images/corner_carousel.png" },
  { id: 4, name: "Luxury Gold T-Profile Metal Insert", category: "pvd-profile", img: "/images/gold_t_profile.png" },
  { id: 5, name: "Stainless Steel U-Channel Profile", category: "pvd-profile", img: "/images/ss_u_channel.png" },
  { id: 6, name: "Smart Wardrobe Pull-Out Shoe Rack", category: "wardrobe-accessories", img: "/images/wardrobe_shoe_rack.png" },
  { id: 7, name: "Hydraulic Wardrobe Clothes Lift", category: "wardrobe-accessories", img: "/images/wardrobe_clothes_lift.png" },
  { id: 8, name: "Heavy-Duty Wardrobe Sliding Rollers", category: "sliding-fitting", img: "/images/sliding_rollers.png" },
  { id: 9, name: "Synchronized Sliding Door System", category: "sliding-fitting", img: "/images/synchronized_sliding.png" },
  { id: 10, name: "SS304 Premium Overhead Door Closer", category: "door-closer", img: "/images/overhead_closer.png" },
  { id: 11, name: "Concealed Hydraulic Door Damper", category: "door-closer", img: "/images/concealed_closer.png" },
  { id: 12, name: "SS304 Soft-Close Cabinet Hinge", category: "hinges", img: "/images/cabinet_hinge.png" },
  { id: 13, name: "Heavy Duty Concealed Pivot Hinge", category: "hinges", img: "/images/pivot_hinge.png" },
  { id: 14, name: "Magnetic Door Stopper Catch", category: "hinges", img: "/images/magnetic_stopper.png" },
  { id: 15, name: "Telescopic Ball Bearing Drawer Slides", category: "telescopic-channel", img: "/images/telescopic_slides.png" },
  { id: 16, name: "Push-To-Open Heavy Drawer Channels", category: "telescopic-channel", img: "/images/push_open_runners.png" }
];

// Initialize database in localStorage if not exists
if (!localStorage.getItem('ah_categories')) {
  localStorage.setItem('ah_categories', JSON.stringify(DEFAULT_CATEGORIES));
}
if (!localStorage.getItem('ah_products')) {
  localStorage.setItem('ah_products', JSON.stringify(DEFAULT_PRODUCTS));
}

export const getCategories = () => {
  return JSON.parse(localStorage.getItem('ah_categories')) || DEFAULT_CATEGORIES;
};

export const saveCategories = (categories) => {
  localStorage.setItem('ah_categories', JSON.stringify(categories));
  window.dispatchEvent(new Event('ah_db_update'));
};

export const addCategory = (category) => {
  const categories = getCategories();
  const newCategory = {
    ...category,
    id: category.id || category.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') // safe url slug
  };
  categories.push(newCategory);
  saveCategories(categories);
  return newCategory;
};

export const updateCategory = (updatedCategory) => {
  let categories = getCategories();
  categories = categories.map(c => c.id === updatedCategory.id ? updatedCategory : c);
  saveCategories(categories);
};

export const deleteCategory = (id) => {
  let categories = getCategories();
  categories = categories.filter(c => c.id !== id);
  saveCategories(categories);
  
  // Clean up products belonging to deleted category
  let products = getProducts();
  products = products.filter(p => p.category !== id);
  saveProducts(products);
};

export const getProducts = () => {
  return JSON.parse(localStorage.getItem('ah_products')) || DEFAULT_PRODUCTS;
};

export const saveProducts = (products) => {
  localStorage.setItem('ah_products', JSON.stringify(products));
  window.dispatchEvent(new Event('ah_db_update'));
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now() // Unique ID
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (updatedProduct) => {
  let products = getProducts();
  products = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
  saveProducts(products);
};

export const deleteProduct = (id) => {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
};

export const resetDB = () => {
  localStorage.setItem('ah_categories', JSON.stringify(DEFAULT_CATEGORIES));
  localStorage.setItem('ah_products', JSON.stringify(DEFAULT_PRODUCTS));
  window.dispatchEvent(new Event('ah_db_update'));
};
