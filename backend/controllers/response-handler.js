/**
 * Sets the response status to 200 and sends the provided data as JSON.
 * @param {any} data - The data to be sent as the response.
 * @param {object} response - The response object.
 * @returns {void}
 */
export const setResponse  = (data, response) => {
    response.status(200)
        .json(data);
}

/**
 * Sets an error response with the given error message.
 * @param {Error} error - The error object.
 * @param {Object} response - The response object.
 */
export const setErrorResponse  = (error, response) => {

    response.status(500)
        .json({
            code: "ServiceError",
            message: error.message
        })
}