import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';  // Add useNavigate here
import Counter from './counter';
import UserForm from './UserForm';
import RichTextEditor from './RichTextEditor';
import Dashboard from './Dashboard'; // Import Dashboard
import User from './user'; // Import User
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute

import './App.css';

const Home = () => {
  const navigate = useNavigate(); // Now it will work after the import

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, Welcome</h1>
        <p>Please find the assignment task, select or press each button to know more.</p>
        
        <div className="button-container">
          <button className="btn" onClick={() => navigate('/counter')}>Counter Component</button>
          <button className="btn" onClick={() => navigate('/user-form')}>User Data Form</button>
          <button className="btn" onClick={() => navigate('/rich-text')}>Rich Text Editor</button>
          <button className="btn" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
          <button className="btn" onClick={() => navigate('/user')}>Go to User Page</button>
        </div>
      </header>
    </div>
  );
};

function App() {
  return (
    <Router> {/* Router is now wrapping the whole app */}
      <AuthProvider> {/* AuthProvider inside Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/rich-text" element={<RichTextEditor />} />
          <Route path="/user" element={<User />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
