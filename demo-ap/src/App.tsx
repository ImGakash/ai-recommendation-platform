import { Header } from "./components/Header";
import { SDKToolbar } from "./components/SDKToolbar";
import { ProductCard } from "./components/ProductCard";
import { RecommendationsWidget } from "./components/RecommendationsWidget";
import { LogConsole } from "./components/LogConsole";
import { MOCK_PRODUCTS } from "./data/mockProducts";
import { ShoppingBag, Zap } from "lucide-react";

export function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main className="main-layout">
        <div>
          {/* SDK Developer Configuration Toolbar */}
          <SDKToolbar />

          {/* AI Recommendations Section */}
          <RecommendationsWidget />

          {/* Customer E-Commerce Catalog */}
          <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 className="section-title">
              <ShoppingBag size={22} color="#818cf8" />
              <span>Store Product Catalog</span>
            </h2>
            <div style={{ fontSize: "0.85rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Zap size={15} color="#ec4899" />
              <span>Every interaction triggers real-time SDK telemetry</span>
            </div>
          </div>

          <div className="product-grid">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Live SDK Log Console Sidebar */}
        <aside>
          <LogConsole />
        </aside>
      </main>
    </div>
  );
}

export default App;
