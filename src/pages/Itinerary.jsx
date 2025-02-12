// src/pages/Itinerary.jsx
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, } from "@/components/ui/index";
import ItineraryList from '../components/ItineraryList';

const Itinerary = () => {
  const [itineraryData, setItineraryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch itinerary data from local storage on component mount
  useEffect(() => {
    const storedItinerary = localStorage.getItem('itinerary');
    if (storedItinerary) {
      setItineraryData(JSON.parse(storedItinerary));
    }
  }, []);

  // Save itinerary data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('itinerary', JSON.stringify(itineraryData));
  }, [itineraryData]);

  const handleRemoveItem = (itemId) => {
    setItemToDelete(itemId);
    setIsModalOpen(true);
  };

  const confirmDeleteItem = () => {
    // Filter out the item to be deleted from the itineraryData array
    const updatedItinerary = itineraryData.filter(item => item.id !== itemToDelete);
    setItineraryData(updatedItinerary);
    setIsModalOpen(false);
  };

  const cancelDeleteItem = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-0">
        <Card className="p-6 rounded-lg shadow-md"> 
          <Typography variant="h2" className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"> 
            My Itinerary
          </Typography>

          {itineraryData.length === 0 ? (
            <p>Your itinerary is empty. Start planning your trip!</p> 
          ) : (
            <ItineraryList 
              items={itineraryData} 
              onRemoveItem={handleRemoveItem} 
            />
          )}
        </Card>
      </div>

      {/* Confirmation Modal for Deleting Itinerary Items */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogTrigger asChild>
          <span></span> {/* Hidden trigger, activated by onRemoveItem */}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <Typography fontWeight="bold">Confirm Deletion</Typography>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Typography>
              Are you sure you want to remove this item from your itinerary?
            </Typography>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant="ghost" onClick={cancelDeleteItem}>
              Cancel
            </Button>
            <Button onClick={confirmDeleteItem}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Itinerary;

