import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SamplesPage from "./pages/SamplesPage.jsx";
import AddSamplePage from "./pages/AddSamplePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MainLayout from "./MainLayout.jsx";
import TestsPage from "./pages/TestsPage.jsx";
import AddTestPage from "./pages/AddTestPage.jsx";
import AddCategoryPage from "./pages/AddCategoryPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import EditCategoryPage from "./pages/EditCategoryPage.jsx";
import EditTestPage from "./pages/EditTestPage.jsx";
import EditSamplePage from "./pages/EditSamplePage.jsx";
import UnitsPage from "./pages/UnitsPage.jsx";
import AddUnitPage from "./pages/AddUnitPage.jsx";
import EditUnitPage from "./pages/EditUnitPage.jsx";

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
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/units"
          element={
            <ProtectedRoute>
              <UnitsPage />
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
        <Route
          path="/add-category"
          element={
            <ProtectedRoute>
              <AddCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-unit"
          element={
            <ProtectedRoute>
              <AddUnitPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-category/:id"
          element={
            <ProtectedRoute>
              <EditCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-unit/:id"
          element={
            <ProtectedRoute>
              <EditUnitPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-test/:id"
          element={
            <ProtectedRoute>
              <EditTestPage />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/edit-sample/:id"
          element={
            <ProtectedRoute>
              <EditSamplePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
