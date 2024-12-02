class ApiResponse {
    /**
     * A class to structure the response sent to the client. It standardizes API responses,
     * making it easy to send consistent responses across your application.
     *
     * @param {number} statusCode - The HTTP status code representing the result of the request (e.g., 200 for success, 404 for not found).
     * @param {any} data - The data to send back in the response body (e.g., result of a database query or an object).
     * @param {string} message - A message describing the result of the request (default: "Success").
     */
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode; 
        // HTTP status code, e.g., 200 (success), 400 (bad request), 500 (internal server error)
        
        this.message = message; 
        // A brief message describing the result of the request (e.g., "Success" or error details)
        
        this.data = data; 
        // The actual data returned in the response (could be any object, array, or primitive value)
        
        this.success = statusCode < 400; 
        // Boolean indicating whether the operation was successful.
        // Success is true if the status code is less than 400 (i.e., 2xx or 3xx responses)
    }
}

export default ApiResponse;
