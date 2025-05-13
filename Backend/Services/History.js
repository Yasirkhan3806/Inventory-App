import HistoryModel from "../Models/HistorySchema.js";


export const addHistory = async (clientId, adminId,itemId, action) => {
    try {
        const newHistory = new HistoryModel({
            clientId,
            adminId,
            itemId,
            date: new Date(),
            action,

        });

        await newHistory.save();
        return { success: true, message: "History added successfully" };
    } catch (error) {
        console.error("Error adding history:", error);
        return { success: false, message: "Failed to add history" };
    }
}