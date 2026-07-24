import React, { useEffect, useState } from "react";
import { Terminal, Trash2, Activity } from "lucide-react";
import type { LogEntry } from "../services/sdkManager";
import { sdkManager } from "../services/sdkManager";

export const LogConsole: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const unsubscribe = sdkManager.subscribe((updatedLogs) => {
      setLogs(updatedLogs);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="glass-panel sidebar-panel">
      <div className="log-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Terminal size={18} color="#818cf8" />
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700 }}>SDK Live Telemetry Log</h3>
        </div>

        <button
          onClick={() => sdkManager.clearLogs()}
          style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: "0.2rem" }}
          title="Clear Logs"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="log-stream">
        {logs.length === 0 ? (
          <div style={{ textAlign: "center", color: "#6b7280", padding: "2rem 1rem", fontSize: "0.85rem" }}>
            <Activity size={24} style={{ opacity: 0.3, marginBottom: "0.5rem" }} />
            <p>No SDK telemetry events recorded yet.</p>
            <p style={{ fontSize: "0.75rem", marginTop: "0.25rem", color: "#4b5563" }}>
              Perform actions (view, click, save, buy) to generate SDK calls.
            </p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={`log-entry type-${log.type}`}>
              <div className="log-meta">
                <span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.68rem", color: "#818cf8" }}>
                  {log.type}
                </span>
                <span className="log-time">{log.timestamp}</span>
              </div>
              <div className="log-title">{log.title}</div>
              <pre className="log-json">{JSON.stringify(log.details, null, 2)}</pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
