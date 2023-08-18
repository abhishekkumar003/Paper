
import docModel from "../models/docModel.js";

export const getDoc = async (id) => {
    if (id === null) return;

    const document = await docModel.findById(id);

    if (document) return document;

    return await docModel.create({ _id: id, data: "" });
}

export const updateDoc = async (id, data) => {
    return await docModel.findByIdAndUpdate(id, { data });
}

// export default {getDoc, updateDoc};