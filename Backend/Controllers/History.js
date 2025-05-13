import { addHistory } from "../Services/History.js";

export const addHistoryController = async (req, res) => {
    const { clientId, adminId, itemId,action } = req.body;

    if (!clientId || !adminId || !action) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await addHistory(clientId, adminId,itemId, action);
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