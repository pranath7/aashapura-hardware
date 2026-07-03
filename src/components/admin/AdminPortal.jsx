import React, { useState, useEffect } from 'react';
import { Lock, Settings, Plus, Trash2, Edit2, LogOut, Database, UploadCloud, Check, AlertCircle, X, Search, FolderPlus, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProducts, getCategories, addProduct, updateProduct, deleteProduct, resetDB, addCategory, deleteCategory } from '../../utils/db';

export default function AdminPortal() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // Dashboard navigation
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'edit', 'settings', 'categories'
  
  // Dynamic State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Product Form State
  const [editingProduct, setEditingProduct] = useState(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formImg, setFormImg] = useState('');

  // Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatShortName, setNewCatShortName] = useState('');
  const [newCatEmoji, setNewCatEmoji] = useState('⚙️');
  
  // Storage Providers Configuration
  const [cloudName, setCloudName] = useState('');
  const [uploadPreset, setUploadPreset] = useState('');
  const [imgbbApiKey, setImgbbApiKey] = useState('');
  const [uploadProvider, setUploadProvider] = useState('imgbb'); // 'imgbb' or 'cloudinary'
  
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  // Notifications
  const [notification, setNotification] = useState('');

  // Load data on mount
  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
    setCloudName(localStorage.getItem('ah_cloudinary_cloud_name') || '');
    setUploadPreset(localStorage.getItem('ah_cloudinary_preset') || '');
    
    // Pre-fill user's provided ImgBB API Key
    const savedKey = localStorage.getItem('ah_imgbb_api_key');
    if (!savedKey) {
      localStorage.setItem('ah_imgbb_api_key', '6265da19a3b97e9c455c7b7f3f254f8a');
      setImgbbApiKey('6265da19a3b97e9c455c7b7f3f254f8a');
    } else {
      setImgbbApiKey(savedKey);
    }

    setUploadProvider(localStorage.getItem('ah_upload_provider') || 'imgbb');
  }, []);

  // Listen to DB updates
  useEffect(() => {
    const handleUpdate = () => {
      setProducts(getProducts());
      setCategories(getCategories());
    };
    window.addEventListener('ah_db_update', handleUpdate);
    return () => window.removeEventListener('ah_db_update', handleUpdate);
  }, []);

  // Trigger brief alert notifications
  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Authenticate Passcode
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator passcode. Please try again.');
      setPasscode('');
    }
  };

  // Configure Storage Settings
  const handleSettingsSave = (e) => {
    e.preventDefault();
    localStorage.setItem('ah_cloudinary_cloud_name', cloudName);
    localStorage.setItem('ah_cloudinary_preset', uploadPreset);
    localStorage.setItem('ah_imgbb_api_key', imgbbApiKey);
    localStorage.setItem('ah_upload_provider', uploadProvider);
    triggerNotification('Image Upload Settings Saved!');
  };

  // Handle Dynamic Image Upload (ImgBB vs Cloudinary)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess(false);
    setUploadError('');

    if (uploadProvider === 'imgbb') {
      if (!imgbbApiKey) {
        setUploadError('Configure your ImgBB API Key in settings first!');
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('ImgBB upload failed. Verify your API key.');
        }

        const resData = await response.json();
        if (resData.success && resData.data) {
          // Select optimized image version (medium/compressed) to load extremely quick on main store catalog
          const optimizedUrl = resData.data.medium?.url || resData.data.display_url || resData.data.url;
          setFormImg(optimizedUrl);
          setUploadSuccess(true);
          triggerNotification('Image Uploaded & Web-Optimized!');
        } else {
          throw new Error('Invalid ImgBB upload response.');
        }
      } catch (err) {
        console.error(err);
        setUploadError(err.message || 'ImgBB upload failed.');
      } finally {
        setUploading(false);
      }

    } else {
      // Cloudinary
      if (!cloudName || !uploadPreset) {
        setUploadError('Configure your Cloudinary Cloud Name and Upload Preset in settings first!');
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('Cloudinary direct upload failed. Verify settings.');
        }

        const data = await response.json();
        setFormImg(data.secure_url);
        setUploadSuccess(true);
        triggerNotification('Image Uploaded to Cloudinary!');
      } catch (err) {
        console.error(err);
        setUploadError(err.message || 'Cloudinary upload failed.');
      } finally {
        setUploading(false);
      }
    }
  };

  // Trigger Add Product Form
  const triggerAddProduct = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory(categories[0]?.id || '');
    setFormImg('');
    setUploadSuccess(false);
    setUploadError('');
    setActiveTab('edit');
  };

  // Trigger Edit Product Form
  const triggerEditProduct = (prod) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormImg(prod.img);
    setUploadSuccess(false);
    setUploadError('');
    setActiveTab('edit');
  };

  // Save / Submit Product Form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formCategory || !formImg) {
      triggerNotification('Please complete all form fields!');
      return;
    }

    const payload = {
      name: formName,
      category: formCategory,
      img: formImg,
    };

    if (editingProduct) {
      // Update
      updateProduct({ ...payload, id: editingProduct.id });
      triggerNotification('Product Updated Successfully!');
    } else {
      // Add
      addProduct(payload);
      triggerNotification('New Product Added Successfully!');
    }

    setActiveTab('list');
  };

  // Delete Product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this hardware product?')) {
      deleteProduct(id);
      triggerNotification('Product Deleted Successfully!');
    }
  };

  // Add Dynamic Category Form Submit
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCatName || !newCatShortName) {
      triggerNotification('Please complete all category fields!');
      return;
    }

    addCategory({
      name: newCatName,
      shortName: newCatShortName,
      emoji: newCatEmoji,
    });

    setNewCatName('');
    setNewCatShortName('');
    setNewCatEmoji('⚙️');
    triggerNotification('New Category Created Successfully!');
  };

  // Delete Category (cascade clean)
  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category? All associated products will be deleted as well!')) {
      deleteCategory(id);
      triggerNotification('Category and associated products deleted!');
    }
  };

  // Reset database back to default initial values
  const handleResetDB = () => {
    if (window.confirm('WARNING: This will restore the catalog back to its default 16 products. All custom uploads will be cleared. Proceed?')) {
      resetDB();
      triggerNotification('Database Reset to Factory Defaults!');
    }
  };

  // Search Filter
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    categories.find(c => c.id === p.category)?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Authentication Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E0E0F] text-white flex items-center justify-center font-sans px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[#1B1A18] border border-[#4A4845] rounded-2xl p-8 space-y-6 shadow-2xl"
        >
          <div className="text-center space-y-2">
            <div className="h-14 w-14 bg-[#B8723C]/10 text-[#D98E4A] rounded-xl flex items-center justify-center mx-auto border border-[#B8723C]/30 shadow-inner">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="font-display font-black text-3xl tracking-wider text-white uppercase">ADMIN GATEWAY</h2>
            <p className="text-xs font-mono text-[#D98E4A] uppercase tracking-wider">Aashapura Hardware Console</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Administrator Passcode</label>
              <input 
                type="password"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                className="w-full p-3 bg-[#0E0E0F] border border-[#4A4845] text-center text-sm font-mono tracking-widest text-white focus:border-[#B8723C] outline-none rounded-xl"
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 rounded-xl">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-3 bg-[#B8723C] hover:bg-[#D98E4A] text-black font-display font-black text-sm uppercase tracking-widest transition-all rounded-xl shadow-lg"
            >
              Verify Passcode
            </button>
          </form>

          <div className="text-center">
            <a href="#" className="text-xs text-slate-400 hover:text-white underline">Return to Live Website</a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard Interface Screen
  return (
    <div className="min-h-screen bg-[#0E0E0F] text-white flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-[#1B1A18] border-b md:border-b-0 md:border-r border-[#4A4845] p-6 flex flex-col justify-between flex-shrink-0 space-y-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo_white.png" 
              alt="Aashapura Hardware Logo" 
              className="h-10 w-auto object-contain" 
            />
            <span className="text-[10px] font-mono bg-black/60 px-2 py-0.5 border border-[#B8723C]/20 text-[#D98E4A] uppercase tracking-wider rounded">
              CONSOLE
            </span>
          </div>

          {/* Nav Items */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('list')}
              className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'list'
                  ? 'bg-white text-black'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" /> Product Inventory
            </button>
            <button
              onClick={triggerAddProduct}
              className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'edit' && !editingProduct
                  ? 'bg-white text-black'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'categories'
                  ? 'bg-white text-black'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FolderPlus className="w-4 h-4" /> Category Registry
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 pt-6 border-t border-slate-800">
          <button
            onClick={handleResetDB}
            className="w-full py-2 bg-red-950/20 hover:bg-red-950/60 border border-red-500/20 text-red-400 text-[10px] font-mono uppercase tracking-wider rounded-lg transition-all"
          >
            Reset Catalog
          </button>
          <a
            href="#"
            className="w-full flex items-center justify-center gap-2 py-2 bg-[#2A2927] hover:bg-[#3E3D3A] text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Return to Site
          </a>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full text-left">
        
        {/* Floating Notification */}
        {notification && (
          <div className="fixed top-6 right-6 z-50 bg-[#F5F2ED] text-black border border-[#B8723C]/35 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider animate-bounce">
            <Check className="w-4 h-4 text-green-600" />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab CONTENT: List of Products */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-3xl uppercase tracking-wider">PRODUCT INVENTORY</h2>
                <p className="text-xs text-slate-400">Total Products Registered: {products.length}</p>
              </div>
              <button
                onClick={triggerAddProduct}
                className="py-2.5 px-5 bg-[#B8723C] hover:bg-[#D98E4A] text-black font-display font-black text-sm uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Hardware Product
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search by product name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#B8723C] transition-colors"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>

            {/* Products Inventory Grid */}
            <div className="bg-[#1B1A18]/30 border border-[#4A4845] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#1B1A18] border-b border-[#4A4845] text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      <th className="p-4">Image</th>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-xs">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4">
                          <img 
                            src={p.img} 
                            alt={p.name} 
                            className="h-10 w-10 object-cover rounded-lg border border-slate-800" 
                          />
                        </td>
                        <td className="p-4 font-bold text-white max-w-xs truncate">{p.name}</td>
                        <td className="p-4 text-slate-400 uppercase tracking-wider font-mono">
                          {categories.find(c => c.id === p.category)?.shortName || p.category}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => triggerEditProduct(p)}
                            className="p-2 bg-slate-800 hover:bg-[#B8723C] text-slate-300 hover:text-black rounded-lg transition-all"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-2 bg-slate-850 hover:bg-red-600 text-slate-300 hover:text-white rounded-lg transition-all"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-slate-500 font-medium">
                          No matching hardware products found in index.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab CONTENT: Add / Edit Product Form */}
        {activeTab === 'edit' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="font-display font-black text-3xl uppercase tracking-wider">
                {editingProduct ? 'EDIT HARDWARE PRODUCT' : 'REGISTER NEW PRODUCT'}
              </h2>
              <p className="text-xs text-slate-400">Specify details and direct inquire targets below.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6 bg-[#1B1A18] p-6 sm:p-8 border border-[#4A4845] rounded-2xl">
              
              {/* Product Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Hardware Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Designer Gold Mortise Lock" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required 
                  className="w-full p-3 bg-[#0E0E0F] border border-[#4A4845] text-white text-xs focus:border-[#B8723C] outline-none rounded-xl font-bold" 
                />
              </div>

              {/* Product Category */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Product Category</label>
                <select 
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  required
                  className="w-full p-3 bg-[#0E0E0F] border border-[#4A4845] text-white text-xs focus:border-[#B8723C] outline-none rounded-xl font-bold"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
                  ))}
                </select>
              </div>

              {/* ImgBB Direct Uploader */}
              <div className="space-y-3 p-4 bg-[#0E0E0F] border border-[#4A4845] rounded-xl relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">ImgBB Media Desk</label>
                  {!imgbbApiKey ? (
                    <span className="text-[8px] font-mono text-amber-500 uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> API Key Missing
                    </span>
                  ) : (
                    <span className="text-[8px] font-mono text-green-500 uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-3 h-3" /> API Ready
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <label className="w-full sm:w-auto px-4 py-3 bg-[#1B1A18] hover:bg-slate-800 text-slate-300 font-mono text-xs uppercase tracking-wider border border-slate-700/60 rounded-xl cursor-pointer text-center flex items-center justify-center gap-2 flex-shrink-0 transition-colors">
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload to ImgBB</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden" 
                    />
                  </label>
                  <div className="text-left w-full">
                    {uploading && (
                      <p className="text-xs text-amber-400 font-mono animate-pulse">Uploading file to ImgBB...</p>
                    )}
                    {uploadSuccess && (
                      <p className="text-xs text-green-400 font-mono flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Direct upload completed successfully.
                      </p>
                    )}
                    {uploadError && (
                      <p className="text-xs text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {uploadError}
                      </p>
                    )}
                    {!uploading && !uploadSuccess && !uploadError && (
                      <p className="text-[10px] text-slate-500">Supports JPG, PNG, WEBP files. Saves to ImgBB automatically.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Image URL */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Product Image URL</label>
                <input 
                  type="text" 
                  placeholder="/images/door_handles.png or secure Cloudinary URL" 
                  value={formImg}
                  onChange={(e) => setFormImg(e.target.value)}
                  required 
                  className="w-full p-3 bg-[#0E0E0F] border border-[#4A4845] text-white text-xs focus:border-[#B8723C] outline-none rounded-xl font-mono" 
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#B8723C] hover:bg-[#D98E4A] text-black font-display font-black text-sm uppercase tracking-widest transition-all rounded-xl shadow-lg"
                >
                  {editingProduct ? 'Save Product Changes' : 'Register New Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs uppercase tracking-widest transition-all rounded-xl"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}



        {/* Tab CONTENT: Category Management */}
        {activeTab === 'categories' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-3xl uppercase tracking-wider">CATEGORY REGISTRY</h2>
                <p className="text-xs text-slate-400">Manage and register architectural product lines.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Form: Add Category */}
              <div className="lg:col-span-5 bg-[#1B1A18] p-6 border border-[#4A4845] rounded-2xl space-y-4">
                <h3 className="font-display font-black text-xl text-[#F5F2ED] uppercase tracking-wider">CREATE CATEGORY</h3>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Category Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Glass Fittings" 
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      required 
                      className="w-full p-3 bg-[#0E0E0F] border border-[#4A4845] text-white text-xs focus:border-[#B8723C] outline-none rounded-xl font-bold" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Short Name (Sidebar tag)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Glass" 
                      value={newCatShortName}
                      onChange={(e) => setNewCatShortName(e.target.value)}
                      required 
                      className="w-full p-3 bg-[#0E0E0F] border border-[#4A4845] text-white text-xs focus:border-[#B8723C] outline-none rounded-xl font-bold" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Category Emoji Icon</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 💎 or 📐" 
                      value={newCatEmoji}
                      onChange={(e) => setNewCatEmoji(e.target.value)}
                      required 
                      className="w-full p-3 bg-[#0E0E0F] border border-[#4A4845] text-white text-xs focus:border-[#B8723C] outline-none rounded-xl text-center text-lg" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 bg-[#B8723C] hover:bg-[#D98E4A] text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Create Category
                  </button>
                </form>
              </div>

              {/* Right Table: List Categories */}
              <div className="lg:col-span-7 bg-[#1B1A18]/30 border border-[#4A4845] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#4A4845] bg-[#1B1A18]">
                  <h3 className="font-display font-black text-lg uppercase tracking-wider text-[#F5F2ED]">ACTIVE CATEGORIES</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-[#1B1A18] border-b border-[#4A4845] text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        <th className="p-4">Icon</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Short Name</th>
                        <th className="p-4">Models</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-xs">
                      {categories.map((cat) => {
                        const modelCount = products.filter(p => p.category === cat.id).length;
                        return (
                          <tr key={cat.id} className="hover:bg-slate-900/40 transition-colors">
                            <td className="p-4 text-lg">{cat.emoji}</td>
                            <td className="p-4 font-bold text-white">{cat.name}</td>
                            <td className="p-4 text-slate-400 font-mono">{cat.shortName}</td>
                            <td className="p-4 font-mono font-bold text-[#D98E4A]">{modelCount}</td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteCategory(cat.id)}
                                className="p-2 bg-slate-850 hover:bg-red-600 text-slate-350 hover:text-white rounded-lg transition-all"
                                title="Delete Category"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
