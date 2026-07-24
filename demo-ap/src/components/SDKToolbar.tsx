import React, { useState, useEffect } from "react";
import { User, Key, Server, CheckCircle2 } from "lucide-react";
import { sdkManager } from "../services/sdkManager";

const PRESET_USERS = ["user_alex", "user_sarah", "user_jordan"];

export const SDKToolbar: React.FC = () => {
  const [endpoint, setEndpoint] = useState(sdkManager.currentEndpoint);
  const [apiKey, setApiKey] = useState(sdkManager.currentApiKey);
  const [currentUser, setCurrentUser] = useState(sdkManager.currentUserId || "user_alex");
  const [customUser, setCustomUser] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Auto init & identify default user on mount
    sdkManager.initSDK(endpoint, apiKey);
    sdkManager.identifyUser(currentUser);
  }, []);

  const handleApplyConfig = (e: React.FormEvent) => {
    e.preventDefault();
    sdkManager.initSDK(endpoint, apiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSelectUser = (userId: string) => {
    setCurrentUser(userId);
    sdkManager.identifyUser(userId);
  };

  const handleAddCustomUser = () => {
    if (customUser.trim()) {
      handleSelectUser(customUser.trim());
      setCustomUser("");
    }
  };

  return (
    <div className="glass-panel toolbar-card">
      <form onSubmit={handleApplyConfig} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
        <div className="toolbar-group">
          <Server size={18} color="#818cf8" />
          <span className="input-label">Endpoint:</span>
          <input
            type="text"
            className="custom-input"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            style={{ width: "200px" }}
          />
        </div>

        <div className="toolbar-group">
          <Key size={18} color="#ec4899" />
          <span className="input-label">API Key:</span>
          <input
            type="text"
            className="custom-input"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ width: "210px" }}
          />
        </div>

        <button type="submit" className="btn-primary" style={{ padding: "0.45rem 0.9rem", fontSize: "0.825rem" }}>
          {isSaved ? <CheckCircle2 size={16} /> : "Update Config"}
        </button>
      </form>

      <div className="toolbar-group">
        <User size={18} color="#3b82f6" />
        <span className="input-label">Identified User:</span>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {PRESET_USERS.map((u) => (
            <button
              key={u}
              type="button"
              className={`user-btn ${currentUser === u ? "active" : ""}`}
              onClick={() => handleSelectUser(u)}
            >
              {u}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.25rem", marginLeft: "0.5rem" }}>
          <input
            type="text"
            className="custom-input"
            placeholder="Custom ID..."
            value={customUser}
            onChange={(e) => setCustomUser(e.target.value)}
            style={{ width: "110px", fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
          />
          <button
            type="button"
            className="btn-primary"
            onClick={handleAddCustomUser}
            style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};
