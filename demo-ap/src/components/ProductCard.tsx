import React, { useState } from "react";
import { Eye, MousePointerClick, Bookmark, ShoppingBag, Star, Check } from "lucide-react";
import type { Product } from "../data/mockProducts";
import { sdkManager } from "../services/sdkManager";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleTrack = async (eventType: "view" | "click" | "save" | "purchase") => {
    setActiveAction(eventType);
    try {
      await sdkManager.trackEvent({
        eventType,
        entityId: product.id,
        category: product.category,
        metadata: {
          title: product.title,
          price: product.price,
          timestamp: Date.now(),
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setActiveAction(null), 1000);
    }
  };

  return (
    <div className="glass-panel product-card">
      <div className="product-img-wrapper">
        <img src={product.imageUrl} alt={product.title} className="product-img" />
        {product.badge && <span className="product-tag">{product.badge}</span>}
      </div>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.title}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <div className="product-rating">
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>{product.rating}</span>
          </div>
        </div>

        <div className="product-actions">
          <button
            className="action-btn btn-view"
            onClick={() => handleTrack("view")}
            title="Track View Event"
          >
            {activeAction === "view" ? <Check size={14} color="#10b981" /> : <Eye size={14} />}
            <span>View</span>
          </button>

          <button
            className="action-btn btn-click"
            onClick={() => handleTrack("click")}
            title="Track Click Event"
          >
            {activeAction === "click" ? <Check size={14} color="#10b981" /> : <MousePointerClick size={14} />}
            <span>Click</span>
          </button>

          <button
            className="action-btn btn-save"
            onClick={() => handleTrack("save")}
            title="Track Save Event"
          >
            {activeAction === "save" ? <Check size={14} color="#10b981" /> : <Bookmark size={14} />}
            <span>Save</span>
          </button>

          <button
            className="action-btn btn-purchase"
            onClick={() => handleTrack("purchase")}
            title="Track Purchase Event"
          >
            {activeAction === "purchase" ? <Check size={14} color="#10b981" /> : <ShoppingBag size={14} />}
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
