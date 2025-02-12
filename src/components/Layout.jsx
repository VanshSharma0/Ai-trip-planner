// src/components/Layout.jsx
import { React } from 'react';
import {
  Card,
  Navbar,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent
} from "@/components/ui/index";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen"> 
      {/* Navbar  */}
      <Navbar>
        <a href="/" className="font-bold text-lg">TripWise</a>
        <DropdownMenu>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <a href="/about">About</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/contact">Contact</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Navbar>
      
      <div className="container mx-auto mt-10 px-4 md:px-0"> 
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar (Optional) */}
          <div className="md:w-1/4"> 
            {/* You can add filters or itinerary here */}
            <Card>
              <h2 className="text-lg font-semibold">Filters</h2>
            </Card>
          </div>
  
          {/* Main Content Area */}
          <div className="md:w-3/4">
            {children} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

