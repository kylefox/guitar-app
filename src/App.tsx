import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GuitarList from './pages/GuitarList';
import AddGuitar from './pages/AddGuitar';
import GuitarDetail from './pages/GuitarDetail';
import EditGuitar from './pages/EditGuitar';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<GuitarList />} />
          <Route path="/add" element={<AddGuitar />} />
          <Route path="/guitar/:id" element={<GuitarDetail />} />
          <Route path="/guitar/:id/edit" element={<EditGuitar />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;