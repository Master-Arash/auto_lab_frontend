import {Routes, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import SamplesPage from "./pages/SamplesPage.jsx";
import AddSamplePage from "./pages/AddSamplePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MainLayout from "./MainLayout.jsx";

function App() {
    return (<MainLayout><Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/samples" element={<ProtectedRoute>
            <SamplesPage/>
        </ProtectedRoute>}/>
        <Route path="/add-sample" element={<ProtectedRoute>
            <AddSamplePage/>
        </ProtectedRoute>}/>
    </Routes></MainLayout>);
}

export default App;
