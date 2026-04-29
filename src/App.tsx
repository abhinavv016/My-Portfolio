import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ProfilePage from "./pages/ProfilePage";

function App() {
  useEffect(() => {
    document.title = "Abhinav – Search";
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/profiles/leetcode" element={<ProfilePage id="leetcode" />} />
            <Route path="/profiles/codechef" element={<ProfilePage id="codechef" />} />
            <Route path="/profiles/codeforces" element={<ProfilePage id="codeforces" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;