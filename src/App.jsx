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
import EditReferenceStandardPage from "./pages/EditReferenceStandardPage.jsx";
import AddReferenceStandardPage from "./pages/AddReferenceStandardPage.jsx";
import ReferenceStandardsPage from "./pages/ReferenceStandardsPage.jsx";
import EditRequesterPage from "./pages/EditRequesterPage.jsx";
import AddRequesterPage from "./pages/AddRequesterPage.jsx";
import RequestersPage from "./pages/RequestersPage.jsx";
import SelectTechnicianPage from "./pages/SelectTechnicianPage.jsx";
import TechnicianAbilitiesPage from "./pages/TechnicianAbilitiesPage.jsx";
import AddFormulaPage from "./pages/AddFormulaPage.jsx";
import FormulasPage from "./pages/FormulasPage.jsx";
import EditFormulaPage from "./pages/EditFormulaPage.jsx";

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
          path="/formulas"
          element={
            <ProtectedRoute>
              <FormulasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requesters"
          element={
            <ProtectedRoute>
              <RequestersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reference-standards"
          element={
            <ProtectedRoute>
              <ReferenceStandardsPage />
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
          path="/add-formula"
          element={
            <ProtectedRoute>
              <AddFormulaPage />
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
          path="/add-requester"
          element={
            <ProtectedRoute>
              <AddRequesterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-reference-standard"
          element={
            <ProtectedRoute>
              <AddReferenceStandardPage />
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
          path="/edit-formula/:id"
          element={
            <ProtectedRoute>
              <EditFormulaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-requester/:id"
          element={
            <ProtectedRoute>
              <EditRequesterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-reference-standard/:id"
          element={
            <ProtectedRoute>
              <EditReferenceStandardPage />
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
        />
        <Route
          path="/edit-sample/:id"
          element={
            <ProtectedRoute>
              <EditSamplePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-technician"
          element={
            <ProtectedRoute>
              <SelectTechnicianPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technician-abilities/:id"
          element={
            <ProtectedRoute>
              <TechnicianAbilitiesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
