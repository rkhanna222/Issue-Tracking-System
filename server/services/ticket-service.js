import Ticket from "../models/Ticket.js";

export const post = (ticket) => {
    const newTicket = new Ticket(ticket);
    return newTicket.save();
}

export const getTickets = (projectId) => {
    return Ticket.find({ projectId: projectId })
}


export const removeTicket = (id) => {

    return Ticket.findByIdAndDelete(id).exec();
}

export const getTicketById = (id) => {
    return Ticket.findById(id).exec();
}
export const getAllTickets = () => {
    return Ticket.find().exec();
}

export const returnTypeCount = (value) => {
    return Ticket.countDocuments({ticketType: value}).exec();

}

export const returnPriorityCount = (value) => {
    return Ticket.countDocuments({priority: value}).exec();
}

export const returnStatusCount = (value) => {
    return Ticket.countDocuments({ticketStatus: value}).exec();
}

export const deleteTicketsByProject = (id) => {
    return Ticket.deleteMany({ 'projectId': id });
}

export const updateTicket = (id, payload) => {
    return Ticket.findByIdAndUpdate(id, payload);
}