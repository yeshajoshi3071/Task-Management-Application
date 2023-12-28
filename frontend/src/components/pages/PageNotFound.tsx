import { NavLink } from "react-router-dom";

/**
 * Renders the PageNotFound component.
 * 
 * @returns The JSX element representing the PageNotFound component.
 */
function PageNotFound() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">404 Page Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, the page you requested could not be found.
      </p>
      <NavLink
        className="inline-block px-4 py-2 bg-gray-800 rounded-md text-sm font-medium text-white hover:bg-gray-700"
        to="/"
      >
        Go back to Home
      </NavLink>
    </div>
  );
}

export default PageNotFound;