import React, { useState } from "react";
import { Sparkles, RefreshCw, AlertCircle, ShoppingBag } from "lucide-react";
import { sdkManager } from "../services/sdkManager";

export const RecommendationsWidget: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await sdkManager.getRecommendations();
      setRecommendations(res);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rec-box glass-panel">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ background: "rgba(236, 72, 153, 0.2)", padding: "0.5rem", borderRadius: "10px" }}>
            <Sparkles size={22} color="#ec4899" />
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>
              Personalized Recommendations (SDK API)
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
              Powered by real-time user event telemetry for <span style={{ color: "#818cf8", fontWeight: 600 }}>{sdkManager.currentUserId || "active user"}</span>
            </p>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={fetchRecommendations}
          disabled={loading}
          style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
        >
          <RefreshCw size={16} className={loading ? "spin" : ""} />
          <span>{loading ? "Analyzing..." : "Get AI Recommendations"}</span>
        </button>
      </div>

      {error && (
        <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "0.75rem", borderRadius: "8px", color: "#fca5a5", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {recommendations && (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.5rem", fontWeight: 600 }}>
            SDK Response Payload:
          </div>
          <pre className="log-json" style={{ maxHeight: "200px" }}>
            {JSON.stringify(recommendations, null, 2)}
          </pre>
        </div>
      )}

      {!recommendations && !error && !loading && (
        <div style={{ textAlign: "center", padding: "1.5rem", color: "#6b7280", fontSize: "0.875rem" }}>
          <ShoppingBag size={28} style={{ opacity: 0.4, marginBottom: "0.5rem" }} />
          <p>Click "Get AI Recommendations" to query the AI Platform SDK endpoint for real-time recommendations.</p>
        </div>
      )}
    </div>
  );
};
