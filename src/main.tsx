import "./index.css";
import "./locales/index.ts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import Geocode from "react-geocode";

import App from "./App";

const queryClient = new QueryClient();

Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

Geocode.setLanguage("ko");

Geocode.setRegion("kr");

Geocode.setLocationType("ROOFTOP");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
