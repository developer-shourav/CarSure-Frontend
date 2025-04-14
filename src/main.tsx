import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import router from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <RouterProvider router={router}></RouterProvider>
          </ThemeProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
