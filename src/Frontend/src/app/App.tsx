import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import "./styles/App.css";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
