class ApiError extends Error {
    /**
     * Custom error class extending the built-in JavaScript Error class.
     * Used for handling application-specific errors with additional details.
     *
     * @param {number} statuscode - HTTP status code representing the error type (e.g., 404, 500).
     * @param {string} message - A brief description of the error (default: "something went wrong").
     * @param {Array} errors - Additional error details, such as validation errors (default: empty array).
     * @param {string} stack - Stack trace for debugging purposes (default: empty string).
     */
    constructor(
        statuscode,
        message = "something went wrong",
        errors = [],
        stack = " "
    ) {
        super(message); 
        // Call the parent `Error` class constructor with the error message

        this.statuscode = statuscode; 
        // HTTP status code representing the error type (e.g., 401 for unauthorized)

        this.message = message; 
        // Descriptive error message for client-side or debugging purposes

        this.errors = errors; 
        // Array to hold additional error details, such as validation issues

        this.stack = stack; 
        // Stack trace information, useful for debugging (optional)

        this.success = false; 
        // Indicates the operation was not successful (default: false)

        this.data = null; 
        // Placeholder for any data, typically null when an error occurs
    }
}

export default ApiError; 
// Exporting the `ApiError` class for use in other parts of the application
