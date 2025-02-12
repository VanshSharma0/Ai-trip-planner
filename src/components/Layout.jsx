// src/components/Layout.jsx
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Assuming you have an AuthContext
import {
  Card,
  Navbar,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  Button,
} from "@/components/ui/index";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Call the logout function from your AuthContext
    navigate('/'); // Redirect to home or login after logout
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar className="bg-white p-4 border-b"> {/* Added background color and border */}
        <Link to="/" className="font-bold text-lg">
          TripWise
        </Link>
        <div className="flex items-center"> {/* Align menu items to the right */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="mr-4">
                Explore
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/hotels">Hotels</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/flights">Flights</Link>
              </DropdownMenuItem>
              {/* Add more explore options as needed */}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            // User is logged in - show logout button
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            // User is not logged in - show login/signup
            <div className="flex">
              <Link to="/login" className="mr-2">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </Navbar>

      <div className="container mx-auto mt-10 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar (Optional) */}
          <div className="md:w-1/4">
            {/* You can add filters or itinerary here */}
            <Card className="p-4"> {/* Added padding */}
              <h2 className="text-lg font-semibold">Filters</h2>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:w-3/4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
