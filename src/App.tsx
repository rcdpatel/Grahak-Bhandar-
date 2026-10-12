/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, ProductCategory, SchoolDepartment, CartItem, PickupOrder, RegisteredStudent } from './types/store';
import { PRODUCTS, SCHOOLS } from './data/products';
import { Header } from './components/Header';
import { PhysicalStoreBanner } from './components/PhysicalStoreBanner';
import { Hero } from './components/Hero';
import { DepartmentSpotlight } from './components/DepartmentSpotlight';
import { SchoolFilterBar } from './components/SchoolFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { TShirtCustomizerModal } from './components/TShirtCustomizerModal';
import { CalculatorCheckerModal } from './components/CalculatorCheckerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { PhysicalStoreSection } from './components/PhysicalStoreSection';
import { Footer } from './components/Footer';
import { WebCornerLogo } from './components/WebCornerLogo';
import { Sparkles, Layers, RefreshCw, Shield } from 'lucide-react';

const CART_STORAGE_KEY = 'grahak_bhandar_cart_v2';
const ORDERS_STORAGE_KEY = 'grahak_bhandar_orders_v2';
const STUDENTS_STORAGE_KEY = 'grahak_bhandar_students_v2';
const STUDENT_DISCOUNT_KEY = 'grahak_bhandar_discount_v2';

const INITIAL_SAMPLE_ORDERS: PickupOrder[] = [
  {
    orderNumber: 'QD-7412',
    timestamp: '10:45 AM',
    customerName: 'Aarav Sharma',
    studentId: 'STU-2024-1049',
    phoneNumber: '+91 98201 44521',
    pickupLocation: 'Express Pickup Desk (Student Activity Center, Room 104)',
    pickupTimeSlot: 'Today: 1:00 PM – 2:30 PM (Express Counter)',
    items: [
      {
        id: 'order-imrd-bca-1',
        productId: 'imrd-bca-uniform',
        title: 'IMRD College BCA Official Tailored Uniform Set (Shirt + Trousers + Crest + Tie)',
        price: 1199,
        image: PRODUCTS[0].image,
        quantity: 1,
        selectedSize: 'L (42)',
        selectedColor: 'IMRD BCA Light Blue & Charcoal',
        storeLocation: 'Aisle 1 · Rack A (IMRD Uniforms)',
      },
      {
        id: 'order-rcpit-tee-1',
        productId: 'tee-rcpit-engineering',
        title: 'R. C. Patel Institute of Technology (RCPIT) Heavyweight Engineering Varsity T-Shirt',
        price: 449,
        image: PRODUCTS[8].image,
        quantity: 1,
        selectedSize: 'L',
        selectedColor: 'RCPIT Royal Blue',
        storeLocation: 'Front Display · Table 1 (RCPIT Apparel)',
      },
    ],
    subtotal: 1648,
    discount: 165,
    total: 1483,
    paymentMethod: 'Campus Student Card Account (Direct Charge)',
    pickupCode: 'QD-7412',
    status: 'Ready for Pickup',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    orderNumber: 'QD-8921',
    timestamp: '11:15 AM',
    customerName: 'Priya Patel',
    studentId: 'STU-2024-3382',
    phoneNumber: '+91 97120 89312',
    pickupLocation: 'Express Pickup Desk (Student Activity Center, Room 104)',
    pickupTimeSlot: 'Today: 2:30 PM – 4:00 PM (Express Counter)',
    items: [
      {
        id: 'order-rcpacs-bca-1',
        productId: 'rcpacs-bca-uniform',
        title: 'RCPACS College BCA Official Computer Applications Uniform Set (Shirt + Trousers)',
        price: 1150,
        image: PRODUCTS[3].image,
        quantity: 1,
        selectedSize: 'M (40)',
        selectedColor: 'RCPACS Sky Blue & Charcoal',
        storeLocation: 'Aisle 1 · Rack C (RCPACS Uniforms)',
      },
      {
        id: 'order-rcpacs-bsc-tee',
        productId: 'tee-rcpacs-bsc',
        title: 'RCPACS College BSc Faculty of Science Heavyweight Departmental T-Shirt',
        price: 419,
        image: PRODUCTS[4].image,
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Forest Emerald',
        storeLocation: 'Aisle 2 · Rack B (RCPACS Apparel)',
      },
    ],
    subtotal: 1569,
    discount: 157,
    total: 1412,
    paymentMethod: 'Pay in Person at Physical Counter (Room 104)',
    pickupCode: 'QD-8921',
    status: 'Processing at Desk',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    orderNumber: 'QD-5501',
    timestamp: 'Yesterday 4:20 PM',
    customerName: 'Rohan Deshmukh',
    studentId: 'STU-2023-8819',
    phoneNumber: '+91 98920 12044',
    pickupLocation: '24/7 Smart Campus Lockers (Quad East Walkway)',
    pickupTimeSlot: 'Yesterday Afternoon',
    items: [
      {
        id: 'order-polytechnic-1',
        productId: 'polytechnic-workshop-uniform',
        title: 'R. C. Patel Polytechnic Official Engineering Workshop Drill Uniform Set',
        price: 899,
        image: PRODUCTS[7].image,
        quantity: 1,
        selectedSize: 'L (42)',
        storeLocation: 'Aisle 1 · Rack E (Workshop Wear)',
      },
      {
        id: 'order-polytechnic-tee',
        productId: 'tee-polytechnic-tech',
        title: 'R. C. Patel Polytechnic College Technical Workshop & Diploma Engineering T-Shirt',
        price: 439,
        image: PRODUCTS[6].image,
        quantity: 1,
        selectedSize: 'L',
        selectedColor: 'Charcoal Asphalt',
        storeLocation: 'Aisle 2 · Rack C (Polytechnic Apparel)',
      },
    ],
    subtotal: 1338,
    discount: 134,
    total: 1204,
    paymentMethod: 'UPI / Online (GPay/PhonePe)',
    pickupCode: 'QD-5501',
    status: 'Completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const INITIAL_SAMPLE_STUDENTS: RegisteredStudent[] = [
  {
    studentId: 'STU-2024-1049',
    name: 'Aarav Sharma',
    phoneNumber: '+91 98201 44521',
    registeredDate: 'Sep 2024',
    ordersCount: 3,
    totalSpent: 3450,
    department: 'IMRD College (BCA)',
  },
  {
    studentId: 'STU-2024-3382',
    name: 'Priya Patel',
    phoneNumber: '+91 97120 89312',
    registeredDate: 'Oct 2024',
    ordersCount: 2,
    totalSpent: 1680,
    department: 'RCPACS College (BCA / BSc)',
  },
  {
    studentId: 'STU-2023-8819',
    name: 'Rohan Deshmukh',
    phoneNumber: '+91 98920 12044',
    registeredDate: 'Aug 2023',
    ordersCount: 5,
    totalSpent: 4200,
    department: 'R. C. Patel Polytechnic College',
  },
  {
    studentId: 'STU-2024-5821',
    name: 'Saksham Verma',
    phoneNumber: '+91 98234 11092',
    registeredDate: 'Jan 2025',
    ordersCount: 1,
    totalSpent: 1698,
    department: 'R. C. Patel Institute of Technology (RCPIT)',
  },
];

export default function App() {
  // Navigation & Filtering State
  // Categories: 't-shirts', 'uniforms', 'generals'
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedSchool, setSelectedSchool] = useState<SchoolDepartment | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'price-low' | 'price-high' | 'featured' | 'rating'

  // Modals & Panels State
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerProduct, setCustomizerProduct] = useState<Product | null>(null);
  const [isCalcCheckerOpen, setIsCalcCheckerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PickupOrder | null>(null);

  // Cart & Discount State
  const [hasStudentDiscount, setHasStudentDiscount] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STUDENT_DISCOUNT_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    // Initial starter item
    return [
      {
        id: 'initial-imrd-uniform',
        productId: 'imrd-bca-uniform',
        title: 'IMRD College BCA Official Tailored Uniform Set (Shirt + Trousers + Crest + Tie)',
        price: 1199,
        image: PRODUCTS[0].image,
        quantity: 1,
        selectedSize: 'L (42)',
        selectedColor: 'IMRD BCA Light Blue & Charcoal',
        storeLocation: 'Aisle 1 · Rack A (IMRD Uniforms)',
      },
    ];
  });

  // Orders State (for Admin Panel)
  const [orders, setOrders] = useState<PickupOrder[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_SAMPLE_ORDERS;
  });

  // Registered Students State (for Admin Panel)
  const [students, setStudents] = useState<RegisteredStudent[]>(() => {
    try {
      const stored = localStorage.getItem(STUDENTS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_SAMPLE_STUDENTS;
  });

  const [checkoutData, setCheckoutData] = useState<{
    pickupLocation: string;
    discountAmount: number;
  }>({
    pickupLocation: 'Express Pickup Desk (Student Activity Center, Room 104)',
    discountAmount: 0,
  });

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [cartItems]);

  // Persist Orders
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [orders]);

  // Persist Students
  useEffect(() => {
    try {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [students]);

  // Persist Discount
  useEffect(() => {
    try {
      localStorage.setItem(STUDENT_DISCOUNT_KEY, String(hasStudentDiscount));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [hasStudentDiscount]);

  // Cart Management Handlers
  const handleAddToCart = (product: Product, size?: string, color?: string, qty: number = 1) => {
    const entryId = `${product.id}-${size || 'default'}-${color || 'default'}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === entryId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        const newItem: CartItem = {
          id: entryId,
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: qty,
          selectedSize: size,
          selectedColor: color,
          storeLocation: product.storeLocation,
        };
        return [...prev, newItem];
      }
    });
  };

  const handleAddCustomizedToCart = (
    product: Product,
    size: string,
    color: string,
    qty: number,
    customData: { customText: string; gradYear: string }
  ) => {
    const entryId = `${product.id}-${size}-${color}-${customData.customText}-${Date.now()}`;
    const newItem: CartItem = {
      id: entryId,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: qty,
      selectedSize: size,
      selectedColor: color,
      customization: customData,
      storeLocation: product.storeLocation,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyStudentCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (
      normalized === 'CAMPUS10' ||
      normalized.startsWith('STU-') ||
      normalized.startsWith('CAMPUS') ||
      normalized.length >= 6
    ) {
      setHasStudentDiscount(true);
      return true;
    }
    return false;
  };

  // Checkout Handlers
  const handleProceedToCheckout = (pickupLocation: string, discountAmount: number) => {
    setCheckoutData({ pickupLocation, discountAmount });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (newOrder: PickupOrder) => {
    setIsCheckoutOpen(false);
    setCompletedOrder(newOrder);

    // Add to orders list for Admin Panel
    setOrders((prev) => [newOrder, ...prev]);

    // Register or update student record
    setStudents((prev) => {
      const existing = prev.find((s) => s.studentId === newOrder.studentId);
      if (existing) {
        return prev.map((s) =>
          s.studentId === newOrder.studentId
            ? {
                ...s,
                ordersCount: s.ordersCount + 1,
                totalSpent: s.totalSpent + newOrder.total,
              }
            : s
        );
      } else {
        const newStudent: RegisteredStudent = {
          studentId: newOrder.studentId,
          name: newOrder.customerName,
          phoneNumber: newOrder.phoneNumber,
          registeredDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          ordersCount: 1,
          totalSpent: newOrder.total,
          department: 'General Collegiate',
        };
        return [newStudent, ...prev];
      }
    });

    setCartItems([]); // Clear cart
  };

  // Admin Panel Action Handlers
  const handleUpdateOrderStatus = (orderNumber: string, status: PickupOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o))
    );
  };

  const handleAddSimulatedOrder = () => {
    const randomNum = Math.floor(2000 + Math.random() * 7000);
    const demoOrder: PickupOrder = {
      orderNumber: `QD-${randomNum}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerName: 'Ananya Verma',
      studentId: `STU-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      phoneNumber: '+91 98330 91823',
      pickupLocation: 'Express Pickup Desk (Student Activity Center, Room 104)',
      pickupTimeSlot: 'Today: 4:00 PM – 5:30 PM',
      items: [
        {
          id: `sim-item-${Date.now()}`,
          productId: 'imrd-bca-uniform',
          title: 'IMRD College BCA Official Tailored Uniform Set (Shirt + Trousers + Crest + Tie)',
          price: 1199,
          image: PRODUCTS[0].image,
          quantity: 1,
          selectedSize: 'M (40)',
          selectedColor: 'IMRD BCA Light Blue & Charcoal',
          storeLocation: 'Aisle 1 · Rack A (IMRD Uniforms)',
        },
      ],
      subtotal: 1199,
      discount: 120,
      total: 1079,
      paymentMethod: 'Campus Student Card Account (Direct Charge)',
      pickupCode: `QD-${randomNum}`,
      status: 'Ready for Pickup',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [demoOrder, ...prev]);

    // Update students
    setStudents((prev) => {
      const exists = prev.find((s) => s.studentId === demoOrder.studentId);
      if (!exists) {
        return [
          {
            studentId: demoOrder.studentId,
            name: demoOrder.customerName,
            phoneNumber: demoOrder.phoneNumber,
            registeredDate: 'Just Now',
            ordersCount: 1,
            totalSpent: demoOrder.total,
            department: 'Faculty of Science & Mathematics',
          },
          ...prev,
        ];
      }
      return prev;
    });
  };

  // Filtered & Sorted Catalog (Search by Name, Category filter, Price Low-High / High-Low)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter: 't-shirts' | 'uniforms' | 'generals'
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // School / Department filter
      if (selectedSchool !== 'all' && item.school !== selectedSchool) {
        return false;
      }
      // In stock filter
      if (onlyInStock && item.stockCount <= 0) {
        return false;
      }
      // Search by product name (and description/school)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesShortTitle = item.shortTitle.toLowerCase().includes(q);
        const matchesSchool = item.schoolName?.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSubCategory = item.subCategory?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesShortTitle && !matchesSchool && !matchesDesc && !matchesSubCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      // Price: Low to High
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      // Price: High to Low
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      // Highest Rated
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // Featured / Default
      return 0;
    });
  }, [selectedCategory, selectedSchool, onlyInStock, searchQuery, sortBy]);

  const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* 1. Slim Physical Store Alert & Student Discount Banner */}
      <PhysicalStoreBanner
        onOpenCalcChecker={() => setIsCalcCheckerOpen(true)}
        onApplyStudentCode={() => setHasStudentDiscount(true)}
        hasStudentDiscount={hasStudentDiscount}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* 2. Top Bar (Top Bar Contract: 3 zones separated by gap-8) */}
      <Header
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectSchool={(school) => {
          setSelectedSchool(school);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomizer={() => {
          setCustomizerProduct(null);
          setIsCustomizerOpen(true);
        }}
        onOpenCalcChecker={() => setIsCalcCheckerOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        activeCategory={selectedCategory}
        ordersCount={orders.length}
      />

      {/* 3. Hero Section (Grahak Bhandar Brand Focus & Physical Store Visuals) */}
      <Hero
        onShopCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreDepartmentTees={() => {
          setSelectedCategory('t-shirts');
          setSelectedSchool('all');
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomizer={() => {
          setCustomizerProduct(null);
          setIsCustomizerOpen(true);
        }}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* 4. Individual College / Department Spotlight */}
      <DepartmentSpotlight
        onSelectSchool={(schoolId) => {
          setSelectedSchool(schoolId);
          setSelectedCategory('t-shirts');
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomizerForSchool={(schoolId) => {
          setSelectedSchool(schoolId);
          const baseTee = PRODUCTS.find(
            (p) => (p.category === 't-shirts' || p.category === 'generals') && p.school === schoolId
          );
          setCustomizerProduct(baseTee || null);
          setIsCustomizerOpen(true);
        }}
        onSelectProduct={(p) => setActiveProductModal(p)}
      />

      {/* 5. Sticky Campus Filter & Search Bar with Categories, Search by Name, and Price Sorting */}
      <div id="catalog-section">
        <SchoolFilterBar
          selectedSchool={selectedSchool}
          onSelectSchool={(school) => setSelectedSchool(school)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          onlyInStock={onlyInStock}
          onToggleInStock={() => setOnlyInStock(!onlyInStock)}
          sortBy={sortBy}
          onSortChange={(s) => setSortBy(s)}
          onOpenCustomizer={() => {
            setCustomizerProduct(null);
            setIsCustomizerOpen(true);
          }}
          totalFilteredCount={filteredProducts.length}
        />
      </div>

      {/* 6. Main Product Grid Section (3-column desktop grid with generous whitespace) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
        
        {/* Active Filter State Summary & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-900 font-display text-sm">
              Grahak Bhandar Products ({filteredProducts.length} items)
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Category: <strong className="text-slate-900 uppercase">{selectedCategory === 'all' ? 'All Catalog' : selectedCategory.replace('-', ' ')}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Faculty: <strong className="text-slate-900">{selectedSchool === 'all' ? 'All Faculties' : selectedSchool}</strong>
            </span>
            {searchQuery && (
              <>
                <span aria-hidden="true">·</span>
                <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-medium">
                  Search query: "{searchQuery}"
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>
              Sort: <strong className="text-slate-900 font-medium">
                {sortBy === 'price-low' ? 'Price: Low to High' : sortBy === 'price-high' ? 'Price: High to Low' : 'Featured'}
              </strong>
            </span>
          </div>

          {(selectedCategory !== 'all' || selectedSchool !== 'all' || searchQuery || onlyInStock || sortBy !== 'featured') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSchool('all');
                setSearchQuery('');
                setOnlyInStock(false);
                setSortBy('featured');
              }}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setActiveProductModal(p)}
                onAddToCart={(p, size, color) => handleAddToCart(p, size, color)}
                onOpenCustomizerForProduct={(p) => {
                  setCustomizerProduct(p);
                  setIsCustomizerOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 font-display">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No items found for "{searchQuery}". Try selecting "All Products" or resetting the category filter.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSchool('all');
                setSearchQuery('');
                setOnlyInStock(false);
                setSortBy('featured');
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* 7. Physical Store Walk-in & Aisle Directory Section */}
      <PhysicalStoreSection />

      {/* 8. Quiet Editorial Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectSchool={(school) => {
          setSelectedSchool(school);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCalcChecker={() => setIsCalcCheckerOpen(true)}
        onOpenCustomizer={() => {
          setCustomizerProduct(null);
          setIsCustomizerOpen(true);
        }}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* --- MODALS & DRAWERS --- */}

      {/* Product Detail Modal (PDP) */}
      <ProductModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onAddToCart={(product, size, color, qty) => {
          handleAddToCart(product, size, color, qty);
        }}
        onOpenCustomizer={(product) => {
          setActiveProductModal(null);
          setCustomizerProduct(product);
          setIsCustomizerOpen(true);
        }}
      />

      {/* Department T-Shirt Customizer & Personalizer */}
      <TShirtCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        initialProduct={customizerProduct}
        onAddToCart={(product, size, color, qty, customData) => {
          handleAddCustomizedToCart(product, size, color, qty, customData);
        }}
      />

      {/* Campus Calculator Exam Approval Tool */}
      <CalculatorCheckerModal
        isOpen={isCalcCheckerOpen}
        onClose={() => setIsCalcCheckerOpen(false)}
        onSelectProduct={(p) => setActiveProductModal(p)}
      />

      {/* Shopping / Campus Pickup Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        hasStudentDiscount={hasStudentDiscount}
        onApplyStudentCode={handleApplyStudentCode}
      />

      {/* Campus Store Pickup Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0)}
        discount={checkoutData.discountAmount}
        pickupLocation={checkoutData.pickupLocation}
        onOrderComplete={handleOrderComplete}
      />

      {/* Digital Campus Pickup Pass & Confirmation Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Store Admin Panel & VS Code / Real-Time DB Guide */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        orders={orders}
        students={students}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onAddSimulatedOrder={handleAddSimulatedOrder}
      />

      {/* Official SES Logo in Web Corner as requested */}
      <WebCornerLogo />

    </div>
  );
}
