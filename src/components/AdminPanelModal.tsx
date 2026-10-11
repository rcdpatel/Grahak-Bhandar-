import React, { useState } from 'react';
import { 
  X, 
  Shield, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Search, 
  Download, 
  Terminal, 
  Database, 
  Copy, 
  Check, 
  Plus, 
  Filter,
  RefreshCw,
  ExternalLink,
  Code
} from 'lucide-react';
import { PickupOrder, RegisteredStudent } from '../types/store';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: PickupOrder[];
  students: RegisteredStudent[];
  onUpdateOrderStatus: (orderNumber: string, status: PickupOrder['status']) => void;
  onAddSimulatedOrder: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  orders,
  students,
  onUpdateOrderStatus,
  onAddSimulatedOrder,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'students' | 'vscode-guide'>('orders');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Derived metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrdersCount = orders.filter((o) => o.status !== 'Completed').length;
  const readyOrdersCount = orders.filter((o) => o.status === 'Ready for Pickup').length;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) {
      return false;
    }
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.studentId.toLowerCase().includes(q) ||
        o.phoneNumber.includes(q)
      );
    }
    return true;
  });

  const handleCopy = (snippetId: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = ['OrderNumber', 'CustomerName', 'StudentID', 'Phone', 'PickupLocation', 'ItemsCount', 'Total', 'Payment', 'Status', 'Date'];
    const rows = orders.map((o) => [
      o.orderNumber,
      `"${o.customerName}"`,
      o.studentId,
      o.phoneNumber,
      `"${o.pickupLocation}"`,
      o.items.length,
      o.total.toFixed(2),
      `"${o.paymentMethod}"`,
      o.status,
      o.timestamp,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `grahak_bhandar_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const firebaseSnippet = `// 1. Install Firebase in your exported project:
// npm install firebase

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "grahak-bhandar.firebaseapp.com",
  projectId: "grahak-bhandar",
  storageBucket: "grahak-bhandar.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Real-Time Listeners for Student Orders & Registrations:
export function subscribeToOrders(callback) {
  const ordersRef = collection(db, 'orders');
  return onSnapshot(ordersRef, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(orders);
  });
}

export async function createStudentOrder(orderData) {
  return await addDoc(collection(db, 'orders'), {
    ...orderData,
    createdAt: new Date().toISOString()
  });
}`;

  const vscodeCommands = `# 1. Clone or extract the exported zip folder:
cd grahak-bhandar-store

# 2. Open inside VS Code:
code .

# 3. Install all dependencies:
npm install

# 4. Run the local development server:
npm run dev

# Server will launch at: http://localhost:3000 (or http://localhost:5173)`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Admin Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-display">
                  Grahak Bhandar · Store Admin Portal
                </h2>
                <span className="text-[10px] font-mono uppercase bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                  Live Counter
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Track student orders, registered student customers & manage physical desk pickups
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close Admin Portal"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-Time Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Total Orders Placed</span>
              <ShoppingBag className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {orders.length}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">
              {readyOrdersCount} ready for counter pickup
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Registered Students</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {students.length}
            </div>
            <div className="text-[11px] text-slate-500">
              Verified campus card holders
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Orders Value</span>
              <DollarSign className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              ${totalRevenue.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-500">
              Subsidized student rates
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Pending Desk Handover</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-amber-800">
              {pendingOrdersCount}
            </div>
            <div className="text-[11px] text-slate-500">
              Avg prep time: ~18 mins
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-6 pt-4 border-b border-slate-200 flex items-center gap-4 bg-white">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Live Queue ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'students'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registered Students Directory ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vscode-guide')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'vscode-guide'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-amber-700" />
            <span>VS Code & Realtime DB Guide</span>
          </button>
        </div>

        {/* Tab 1: Orders Queue */}
        {activeTab === 'orders' && (
          <div className="p-5 sm:p-6 space-y-4">
            
            {/* Search, Filter & Actions Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by student name, ID, or #QD-..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="Ready for Pickup">Ready for Pickup</option>
                  <option value="Processing at Desk">Processing at Desk</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onAddSimulatedOrder}
                  className="px-3 py-1.5 text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  title="Test a simulated incoming student order"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Simulate Order</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Order Token</th>
                      <th className="py-3 px-4">Student Name & ID</th>
                      <th className="py-3 px-4">Items Summary</th>
                      <th className="py-3 px-4">Pickup Time / Location</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Desk Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.orderNumber} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                            #{order.orderNumber}
                            <span className="block text-[10px] text-slate-400 font-sans font-normal">
                              {order.timestamp}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-semibold text-slate-900">{order.customerName}</div>
                            <div className="font-mono text-[11px] text-slate-500">{order.studentId}</div>
                            <div className="text-[10px] text-slate-400">{order.phoneNumber}</div>
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <div className="space-y-0.5 line-clamp-2">
                              {order.items.map((it, idx) => (
                                <div key={idx} className="truncate text-slate-700">
                                  {it.quantity}x {it.title}
                                  {it.selectedSize ? ` (${it.selectedSize})` : ''}
                                  {it.customization?.customText ? ` · [Print: ${it.customization.customText}]` : ''}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-medium text-slate-800">{order.pickupTimeSlot}</div>
                            <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                              {order.pickupLocation}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono tabular-nums font-bold text-slate-900 whitespace-nowrap">
                            ${order.total.toFixed(2)}
                            <span className="block text-[10px] font-sans text-slate-400 font-normal">
                              {order.paymentMethod.includes('Desk') ? 'Pay at Counter' : 'Pre-Paid'}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                onUpdateOrderStatus(order.orderNumber, e.target.value as PickupOrder['status'])
                              }
                              className={`text-xs font-semibold px-2 py-1 rounded-md border cursor-pointer focus:outline-hidden ${
                                order.status === 'Ready for Pickup'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : order.status === 'Processing at Desk'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              <option value="Processing at Desk">Processing at Desk</option>
                              <option value="Ready for Pickup">Ready for Pickup</option>
                              <option value="Completed">Completed / Handed Over</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No orders matching query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Registered Students Directory */}
        {activeTab === 'students' && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Registered Campus Student Directory
                </h3>
                <p className="text-xs text-slate-500">
                  Students eligible for subsidized pricing and 10% campus store discount
                </p>
              </div>
              <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">
                Total: {students.length} students
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Student ID</th>
                      <th className="py-3 px-4">Full Name</th>
                      <th className="py-3 px-4">Department / School</th>
                      <th className="py-3 px-4">Contact Phone</th>
                      <th className="py-3 px-4">Orders Placed</th>
                      <th className="py-3 px-4">Total Purchases</th>
                      <th className="py-3 px-4">Registration Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((student) => (
                      <tr key={student.studentId} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {student.studentId}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                          {student.name}
                        </td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                          {student.department || 'School of Engineering & Computing'}
                        </td>
                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                          {student.phoneNumber}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums text-slate-900 whitespace-nowrap">
                          {student.ordersCount} orders
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums font-bold text-emerald-700 whitespace-nowrap">
                          ${student.totalSpent.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                          {student.registeredDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Export to VS Code & Realtime Database Guide */}
        {activeTab === 'vscode-guide' && (
          <div className="p-5 sm:p-6 space-y-6">
            
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 font-display">
                How to Export Grahak Bhandar to VS Code & Add a Real-Time Database
              </h3>
              <p className="text-xs text-slate-600">
                Follow these instructions to run this project in Visual Studio Code and synchronize student orders across physical counter devices in real time.
              </p>
            </div>

            {/* Step 1: Export & Run in VS Code */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-800" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Step 1: Exporting & Running in VS Code
                  </h4>
                </div>
                <button
                  onClick={() => handleCopy('vscode-cmds', vscodeCommands)}
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  {copiedSnippet === 'vscode-cmds' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedSnippet === 'vscode-cmds' ? 'Copied' : 'Copy Commands'}</span>
                </button>
              </div>

              <ol className="text-xs text-slate-700 space-y-2 list-decimal pl-4">
                <li>
                  <strong>Download / Export Project:</strong> In the AI Studio interface, click the <em>Export / Download Zip</em> button or clone the repository to your computer.
                </li>
                <li>
                  <strong>Open in VS Code:</strong> Launch Visual Studio Code, click <em>File → Open Folder</em>, and select this project directory.
                </li>
                <li>
                  <strong>Run in Terminal:</strong> Open the VS Code integrated terminal (<kbd className="font-mono bg-slate-200 px-1 rounded">Ctrl + `</kbd> or <kbd className="font-mono bg-slate-200 px-1 rounded">Cmd + `</kbd>) and execute:
                </li>
              </ol>

              <pre className="bg-slate-900 text-slate-100 p-3.5 rounded-lg text-[11px] font-mono overflow-x-auto leading-relaxed">
                {vscodeCommands}
              </pre>
            </div>

            {/* Step 2: Adding a Real-Time Database (Firebase Firestore or Supabase) */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-700" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Step 2: Connecting a Real-Time Cloud Database (Firebase Firestore)
                  </h4>
                </div>
                <button
                  onClick={() => handleCopy('firebase-code', firebaseSnippet)}
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  {copiedSnippet === 'firebase-code' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedSnippet === 'firebase-code' ? 'Copied' : 'Copy Firebase Code'}</span>
                </button>
              </div>

              <div className="text-xs text-slate-700 space-y-2">
                <p>
                  For real-time sync between student phones and the Grahak Bhandar physical store counter desk, <strong>Firebase Firestore</strong> or <strong>Supabase Realtime</strong> is recommended:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Go to <strong>firebase.google.com</strong> and create a free project named <em>grahak-bhandar</em>.</li>
                  <li>Enable <strong>Firestore Database</strong> in test/production mode.</li>
                  <li>Install the SDK: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[11px]">npm install firebase</code></li>
                  <li>Paste the configuration snippet below in <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[11px]">src/lib/firebase.ts</code>:</li>
                </ul>
              </div>

              <pre className="bg-slate-900 text-slate-100 p-3.5 rounded-lg text-[11px] font-mono overflow-x-auto leading-relaxed max-h-56">
                {firebaseSnippet}
              </pre>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950">
                <strong>How the live store updates work:</strong> When a student places an order on their phone, Firestore triggers the <code className="font-mono">onSnapshot()</code> listener. The Grahak Bhandar desk counter screen dings and updates instantly without refreshing!
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
