// src/components/ItineraryItem.jsx
import React from 'react';
import { 
  ListItem, 
  ListItemText, 
  Typography,
  IconButton, 
  // ... other components you need from your UI library
} from "@/components/ui/index"; 
import { EditIcon, DeleteIcon } from '@radix-ui/react-icons'; // Or icons from your UI library

const ItineraryItem = ({ item, onEdit, onRemove }) => { 
  // Assuming 'item' has properties like: 
  // id, name, type (hotel, flight, activity), startDate, endDate, price, etc.

  return (
    <ListItem className="flex items-center justify-between"> 
      <ListItemText
        primary={
          <Typography variant="subtitle1"> 
            {item.name} 
          </Typography>
        }
        secondary={
          <div>
            <Typography variant="body2" color="text.secondary">
              {item.type} 
              {/* Add more details (dates, price, etc.) as needed */}
            </Typography>
          </div>
        }
      />

      <div>
        <IconButton onClick={() => onEdit(item)} aria-label="Edit" color="primary" size="small">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onRemove(item.id)} aria-label="Delete" color="error" size="small"> 
          <DeleteIcon /> 
        </IconButton>
      </div>
    </ListItem>
  );
};

export default ItineraryItem;
