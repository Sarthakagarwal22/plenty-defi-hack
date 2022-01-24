import eventsModel from '../models/events.js';

export const getCategoryonDate = async (date) => {
    if(!date){
        throw new Error('Date is required');
    }
    let events = await eventsModel.find({date: date});
    if(events.length === 0){
        throw new Error('No events found on this date');
    }
    return events;
}

export const updateCategoryonDate = async (date, category) => {
    if(!date || !category){
        throw new Error('Invalid Request');
    }
    await eventsModel.findOneAndUpdate({date: date}, {category: category.split(' ').join('')});
    return {
        status: "OK",
        message: "Category updated successfully"
    };
}