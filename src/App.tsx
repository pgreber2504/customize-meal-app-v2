import Meals from "./views/Meals/Meals";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Meals />} />
        <Route path="/logout" element={} />
        <Route path="/auth" element={} />
        <Route path="/orders" element={} />
        <Route path="/checkout" element={} />
      </Routes>
    </Layout>
  );
}

export default App;
