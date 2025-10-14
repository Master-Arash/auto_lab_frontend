import {Routes, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import SamplesPage from "./pages/SamplesPage.jsx";
import ProtectedRoute from "./components/ProtectedRout";
import MainLayout from "./MainLayout.jsx";

function App() {
    return (<MainLayout><Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/samples" element={<ProtectedRoute>
            <SamplesPage/>
        </ProtectedRoute>}/>
    </Routes></MainLayout>);
}

export default App;
