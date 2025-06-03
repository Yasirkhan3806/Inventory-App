import HistoryModel from "../Models/HistorySchema.js";


export const addHistory = async (clientId, adminId,itemId, action,amount) => {
    try {
      console.log(clientId)
      const filteredClientID = clientId === ''?null:clientId
        const newHistory = new HistoryModel({
            clientId:filteredClientID,
            adminId,
            itemId,
            date: new Date(),
            action,
            amount

        });

        await newHistory.save();
        return { success: true, message: "History added successfully" };
    } catch (error) {
        console.error("Error adding history:", error);
        return { success: false, message: "Failed to add history" };
    }
}



export const getHistoryService = async (query = {}) => {
  try {
    const filter = {};
    if (query.itemId) {
      filter.itemId = query.itemId;
    }

    if (query.clientId) {
      filter.clientId = query.clientId;
    }

    const histories = await HistoryModel.find(filter)
      .populate('clientId', 'name email') // populate only selected fields if needed
      .populate('adminId', 'name email')
      .populate('itemId', 'name') // adjust fields according to your Inventory schema
      .sort({ date: -1 }); // optional: latest history first

    return {
      success: true,
      data: histories,
    };
  } catch (error) {
    console.error('Error fetching history:', error);
    return {
      success: false,
      message: 'Failed to retrieve history.',
      error: error.message,
    };
  }
};


