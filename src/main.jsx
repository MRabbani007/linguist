import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

const isProduction = false;

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // </React.StrictMode>
  <Provider store={store}>
    <BrowserRouter
      basename={isProduction ? process?.env?.PUBLIC_URL : "/linguist"}
    >
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
