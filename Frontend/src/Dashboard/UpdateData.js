import axios from "axios";

export const UpdateData = async (amount, id) => {
  try {
    const response = await axios.put(`http://localhost:5000/updateQuantity/${id}`, {
      "quantity": amount
    });


    console.log("Update response:", response.data);
    
  } catch (error) {  // Changed from 'e' to 'error' for consistency
    const serverMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         error.message;
    
    ;
  }
};


export const UpdateMinAmount = async (amount, id) => {
  try {
    const response = await axios.put(`http://localhost:5000/updateMinAmount/${id}`, {
      "minimumAmount": amount
    });


    console.log("Update response:", response.data);
    
  } catch (error) {  // Changed from 'e' to 'error' for consistency
    const serverMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         error.message;
    
    ;
  }
};


export const DeleteItem = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/deleteItem/${id}`);
    console.log("Delete response:", response.data);
  } catch (error) {
    const serverMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         error.message;
    
    console.error("Delete error:", serverMessage);
  }
}