export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  badge?: string;
  description: string;
  imageUrl: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_vision_pro",
    title: "Quantum Vision Pro AR Glasses",
    category: "electronics",
    price: 899.99,
    rating: 4.9,
    badge: "Trending AI",
    description: "Next-gen spatial augmented reality headset with real-time neural engine processing.",
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod_cyber_headphones",
    title: "Aura Studio Noise-Canceling Headphones",
    category: "audio",
    price: 349.50,
    rating: 4.8,
    badge: "Best Seller",
    description: "Lossless spatial audio with adaptive ANC tuned by acoustic artificial intelligence.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod_smartwatch_ultra",
    title: "Apex Horizon Titanium Smartwatch",
    category: "wearables",
    price: 499.00,
    rating: 4.7,
    description: "Bio-metric tracking smartwatch with predictive health telemetry and ECG monitoring.",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod_mechanical_kb",
    title: "CyberDeck RGB Custom Mechanical Keyboard",
    category: "electronics",
    price: 189.99,
    rating: 4.9,
    badge: "Staff Pick",
    description: "Hot-swappable tactile mechanical switches with per-key dynamic RGB lighting.",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod_ergonomic_chair",
    title: "ErgoMatrix Lumbar Gaming Throne",
    category: "furniture",
    price: 649.00,
    rating: 4.6,
    description: "Adaptive lumbar memory foam with cooling gel mesh and multi-axis 4D armrests.",
    imageUrl: "https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod_drone_4k",
    title: "AeroGlide 4K HDR Camera Drone",
    category: "electronics",
    price: 799.00,
    rating: 4.8,
    badge: "New Arrival",
    description: "Compact foldable drone featuring AI obstacle avoidance and 30-minute flight endurance.",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80",
  },
];
