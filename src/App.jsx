import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SamplesPage from "./pages/SamplesPage.jsx";
import AddSamplePage from "./pages/AddSamplePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MainLayout from "./MainLayout.jsx";
import TestsPage from "./pages/TestsPage.jsx";
import AddTestPage from "./pages/AddTestsPage.jsx";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/samples"
          element={
            <ProtectedRoute>
              <SamplesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tests"
          element={
            <ProtectedRoute>
              <TestsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-sample"
          element={
            <ProtectedRoute>
              <AddSamplePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-test"
          element={
            <ProtectedRoute>
              <AddTestPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
