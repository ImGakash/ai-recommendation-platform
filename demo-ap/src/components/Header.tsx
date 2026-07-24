import React from "react";
import { Sparkles, Terminal, Activity } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="brand-logo">
        <Sparkles size={24} style={{ color: "#818cf8" }} />
        <span>CyberMart Store</span>
        <span className="sdk-badge">Demo Customer App</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.85rem", color: "#9ca3af" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Activity size={16} color="#10b981" />
          <span>SDK Status: Active</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Terminal size={16} color="#6366f1" />
          <span>v1.0.0</span>
        </div>
      </div>
    </header>
  );
};
