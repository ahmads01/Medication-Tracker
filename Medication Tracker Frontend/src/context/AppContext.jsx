import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({ remindersEnabled: true });

  // Load data from localStorage or fallback
  useEffect(() => {
    const localHistory = localStorage.getItem("mr_history");
    const localSettings = localStorage.getItem("mr_settings");

    if (localHistory) setHistory(JSON.parse(localHistory));
    if (localSettings) setSettings(JSON.parse(localSettings));
  }, []);

  useEffect(() => localStorage.setItem("mr_history", JSON.stringify(history)), [history]);
  useEffect(() => localStorage.setItem("mr_settings", JSON.stringify(settings)), [settings]);

  return (
    <AppContext.Provider value={{ history, setHistory, settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
}
