import { addHistory ,getHistoryService } from "../Services/History.js";

export const addHistoryController = async (req, res) => {
    // console.log(req.body)
    const { clientId, adminId, itemId,actionType,amount } = req.body;

    if ( !adminId || !actionType || !amount) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await addHistory(clientId, adminId,itemId, actionType,amount);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        } else {
            return res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error in addHistoryController:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getHistoryController = async (req, res) => {
  try {
    const { itemId, clientId } = req.query;
    const result = await getHistoryService({ itemId, clientId });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message,
        error: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in getHistoryController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unexpected error occurred while retrieving history.',
    });
  }
};