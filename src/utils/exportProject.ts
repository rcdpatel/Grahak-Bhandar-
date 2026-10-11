import JSZip from 'jszip';

// Raw string imports of all core source files so JSZip can generate a complete standalone project
import packageJsonRaw from '../../package.json?raw';
import tsconfigRaw from '../../tsconfig.json?raw';
import viteConfigRaw from '../../vite.config.ts?raw';
import indexHtmlRaw from '../../index.html?raw';
import envExampleRaw from '../../.env.example?raw';
import mainTsxRaw from '../main.tsx?raw';
import indexCssRaw from '../index.css?raw';
import appTsxRaw from '../App.tsx?raw';
import typesStoreRaw from '../types/store.ts?raw';
import dataProductsRaw from '../data/products.ts?raw';
import headerTsxRaw from '../components/Header.tsx?raw';
import bannerTsxRaw from '../components/PhysicalStoreBanner.tsx?raw';
import heroTsxRaw from '../components/Hero.tsx?raw';
import deptSpotlightTsxRaw from '../components/DepartmentSpotlight.tsx?raw';
import filterBarTsxRaw from '../components/SchoolFilterBar.tsx?raw';
import productCardTsxRaw from '../components/ProductCard.tsx?raw';
import productModalTsxRaw from '../components/ProductModal.tsx?raw';
import customizerTsxRaw from '../components/TShirtCustomizerModal.tsx?raw';
import calcCheckerTsxRaw from '../components/CalculatorCheckerModal.tsx?raw';
import cartDrawerTsxRaw from '../components/CartDrawer.tsx?raw';
import checkoutModalTsxRaw from '../components/CheckoutModal.tsx?raw';
import orderSuccessModalTsxRaw from '../components/OrderSuccessModal.tsx?raw';
import adminPanelModalTsxRaw from '../components/AdminPanelModal.tsx?raw';
import physicalStoreSectionTsxRaw from '../components/PhysicalStoreSection.tsx?raw';
import footerTsxRaw from '../components/Footer.tsx?raw';

const README_CONTENT = `# Grahak Bhandar (ग्राहक भण्डार) - Campus Cooperative E-Commerce Store

Official online store for campus apparel, department t-shirts, scientific calculators, academic sets, and physical store campus pickup.

## Quick Start (Run Locally in VS Code)

1. Open this folder in Visual Studio Code:
   \`\`\`bash
   code .
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser at:
   \`http://localhost:3000\`

---

## Connecting a Real-Time Database (Firebase Firestore)

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Enable Firestore Database.
3. Install Firebase in terminal:
   \`\`\`bash
   npm install firebase
   \`\`\`
4. Create \`src/lib/firebase.ts\` with your project keys:
   \`\`\`typescript
   import { initializeApp } from 'firebase/app';
   import { getFirestore, collection, onSnapshot, addDoc } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "SENDER_ID",
     appId: "APP_ID"
   };

   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   \`\`\`
5. In \`src/App.tsx\`, replace local storage updates with \`onSnapshot()\` to receive real-time order notifications on the admin counter!

© 2026 Grahak Bhandar Campus Store.
`;

export async function downloadProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root configuration files
  zip.file('package.json', packageJsonRaw);
  zip.file('tsconfig.json', tsconfigRaw);
  zip.file('vite.config.ts', viteConfigRaw);
  zip.file('index.html', indexHtmlRaw);
  zip.file('.env.example', envExampleRaw);
  zip.file('.gitignore', 'node_modules\ndist\n.env\n*.local\n');
  zip.file('README.md', README_CONTENT);

  // Source files
  const src = zip.folder('src');
  if (src) {
    src.file('main.tsx', mainTsxRaw);
    src.file('index.css', indexCssRaw);
    src.file('App.tsx', appTsxRaw);

    const types = src.folder('types');
    if (types) {
      types.file('store.ts', typesStoreRaw);
    }

    const data = src.folder('data');
    if (data) {
      data.file('products.ts', dataProductsRaw);
    }

    const components = src.folder('components');
    if (components) {
      components.file('Header.tsx', headerTsxRaw);
      components.file('PhysicalStoreBanner.tsx', bannerTsxRaw);
      components.file('Hero.tsx', heroTsxRaw);
      components.file('DepartmentSpotlight.tsx', deptSpotlightTsxRaw);
      components.file('SchoolFilterBar.tsx', filterBarTsxRaw);
      components.file('ProductCard.tsx', productCardTsxRaw);
      components.file('ProductModal.tsx', productModalTsxRaw);
      components.file('TShirtCustomizerModal.tsx', customizerTsxRaw);
      components.file('CalculatorCheckerModal.tsx', calcCheckerTsxRaw);
      components.file('CartDrawer.tsx', cartDrawerTsxRaw);
      components.file('CheckoutModal.tsx', checkoutModalTsxRaw);
      components.file('OrderSuccessModal.tsx', orderSuccessModalTsxRaw);
      components.file('AdminPanelModal.tsx', adminPanelModalTsxRaw);
      components.file('PhysicalStoreSection.tsx', physicalStoreSectionTsxRaw);
      components.file('Footer.tsx', footerTsxRaw);
    }
  }

  // Generate blob and trigger browser download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'grahak-bhandar-vscode-project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
