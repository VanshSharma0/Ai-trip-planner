// src/components/FeaturedDestinations.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; 
import { 
  Card,
  Typography,
  Image, 
} from "@/components/ui/index";
import { Carousel } from 'react-responsive-carousel'; 
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const FeaturedDestinations = () => {
  const navigate = useNavigate();
  const { isAuthenticated }  = useContext(AuthContext);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Fetch featured destinations data from API
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations/featured'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch featured destinations');
        }
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        // Handle error, e.g., display an error message
      }
    };

    fetchDestinations();
  }, []); 

  const handleDestinationClick = (destinationId) => {
    if (isAuthenticated) {
      navigate(`/destinations/${destinationId}`); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <section className="py-8"> 
      <Typography variant="h2" className="text-3xl font-bold mb-4 text-center">
        Featured Destinations
      </Typography>
      <Carousel
        autoPlay={true} 
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false} 
        centerMode={true}
        centerSlidePercentage={50} // Adjust the width of the center slide
        className="max-w-5xl mx-auto"
      >
        {destinations.map((destination) => (
          <div key={destination.id} onClick={() => handleDestinationClick(destination.id)} className="cursor-pointer">
            <Card className="mx-4"> {/* Add margin between carousel items */}
              <Image
                src={destination.imageUrl} 
                alt={destination.name}
                width={500} 
                height={300}
                className="object-cover rounded-md" 
              />
              <div className="p-4">
                <Typography variant="h4" className="text-xl font-semibold">
                  {destination.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="line-clamp-2">
                  {destination.description} 
                </Typography>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default FeaturedDestinations;
