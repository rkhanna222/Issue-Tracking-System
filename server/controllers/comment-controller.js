
import * as userService from "../services/user-service.js";
import * as ticketService from "../services/ticket-service.js";

//boiler plate for error response
const setErrorResponse = (error, response, status) => {
    response.status(status);
    response.json(error)

}

// @route   POST /api/tickets/comments/:id
// @desc    Create Comment
// @access  private
export const createComment = async(request,response) => {
    try {
        const ticketId = request.params.id;
        const userId = request.id;
        const userData = await userService.getUserById(userId);

        const commentText = request.body.commentText;

        if(!userData){
            setErrorResponse({msg : "User not found"},response,404);
            return;
        }

        const ticket = await ticketService.getTicketById(ticketId); //always write await

        if(!ticket){
            setErrorResponse({msg : "Ticket not found"},response,404);
            return;

        }

        const payload = {
            firstname : userData.firstname,
            lastname : userData.lastname,
            userId : userId,
            commentText : commentText,
            createdTime : Date.now()
        }

        ticket.comments.unshift(payload);

        await ticket.save();

        response.status(200).json(ticket.comments);
        
    } catch (error) {
        console.error(error.message);
        setErrorResponse(error,response,500);
    }
}

export const getComments = async(request, response) => {
    try {
        const ticketId = request.params.id;
        const ticket = await ticketService.getTicketById(ticketId); //always write await

        if(!ticket){
            setErrorResponse({msg : "Ticket not found"},response,404);
            return;

        }
        response.status(200).json(ticket.comments);
        
    } catch (error) {
        console.error(error.message);
        setErrorResponse(error,response,500);
    }
}

export const removeComment = async(request, response) => {
    try{
        const ticketId = request.params.ticketId;
        const ticket = await ticketService.getTicketById(ticketId);

        if(!ticket){
            setErrorResponse({msg : "Ticket not found"},response,404);
            return;

        }

        ticket.comments = ticket.comments.filter(
            ({ id }) => id !== request.params.commentId
          );

        await ticket.save();

        response.status(200).send({msg : "Comment deleted successfully"});

    } catch(error){
        console.error(error.message);
        setErrorResponse(error,response,500);
    }
}