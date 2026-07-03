const DEFAULT_CATEGORIES = [
  { id: 'kitchen-accessories', name: 'Kitchen Accessories', shortName: 'Kitchen', emoji: '🍳' },
  { id: 'pvd-profile', name: 'PVD Profile', shortName: 'PVD Profile', emoji: '📏' },
  { id: 'wardrobe-accessories', name: 'Wardrobe Accessories', shortName: 'Wardrobe', emoji: '🛋️' },
  { id: 'sliding-fitting', name: 'Sliding Fitting', shortName: 'Sliding', emoji: '🛞' },
  { id: 'door-closer', name: 'Door Closer', shortName: 'Door Closer', emoji: '🚪' },
  { id: 'hinges', name: 'Hinges', shortName: 'Hinges', emoji: '⚙️' },
  { id: 'telescopic-channel', name: 'Telescopic Drawer Channel', shortName: 'Drawer Channel', emoji: '🎞️' }
];

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Modular Kitchen Wire Basket", category: "kitchen-accessories", img: "/images/kitchen_fittings.png" },
  { id: 2, name: "Premium Pantry Pull-Out System", category: "kitchen-accessories", img: "/images/kitchen_fittings.png" },
  { id: 3, name: "Soft-Close Corner Carousel", category: "kitchen-accessories", img: "/images/kitchen_fittings.png" },
  { id: 4, name: "Luxury Gold T-Profile Metal Insert", category: "pvd-profile", img: "/images/glass_fittings.png" },
  { id: 5, name: "Stainless Steel U-Channel Profile", category: "pvd-profile", img: "/images/glass_fittings.png" },
  { id: 6, name: "Smart Wardrobe Pull-Out Shoe Rack", category: "wardrobe-accessories", img: "/images/doors_plywood.png" },
  { id: 7, name: "Hydraulic Wardrobe Clothes Lift", category: "wardrobe-accessories", img: "/images/doors_plywood.png" },
  { id: 8, name: "Heavy-Duty Wardrobe Sliding Rollers", category: "sliding-fitting", img: "/images/door_handles.png" },
  { id: 9, name: "Synchronized Sliding Door System", category: "sliding-fitting", img: "/images/door_handles.png" },
  { id: 10, name: "SS304 Premium Overhead Door Closer", category: "door-closer", img: "/images/door_handles.png" },
  { id: 11, name: "Concealed Hydraulic Door Damper", category: "door-closer", img: "/images/door_handles.png" },
  { id: 12, name: "SS304 Soft-Close Cabinet Hinge", category: "hinges", img: "/images/kitchen_fittings.png" },
  { id: 13, name: "Heavy Duty Concealed Pivot Hinge", category: "hinges", img: "/images/door_handles.png" },
  { id: 14, name: "Magnetic Door Stopper Catch", category: "hinges", img: "/images/door_handles.png" },
  { id: 15, name: "Telescopic Ball Bearing Drawer Slides", category: "telescopic-channel", img: "/images/kitchen_fittings.png" },
  { id: 16, name: "Push-To-Open Heavy Drawer Channels", category: "telescopic-channel", img: "/images/kitchen_fittings.png" }
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
    id: category.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') // safe url slug
  };
  categories.push(newCategory);
  saveCategories(categories);
  return newCategory;
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
