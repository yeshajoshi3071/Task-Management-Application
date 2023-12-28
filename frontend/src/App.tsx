
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import HomeScreen from "./components/pages/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./components/Boards/Board";
import PageNotFound from './components/pages/PageNotFound';
import AuthLayout from "./components/Auth/AuthLayout";
import LoginPage from "./components/Auth/LoginPage";
import SignUpPage from "./components/Auth/SignUpPage";

/**
 * The main component of the application.
 * Renders the application routes and layout components.
 *
 * @returns The rendered application component.
 */
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
          <Route path="/board" element={<HomeScreen />}>
            <Route path=":id" element={<Board />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


