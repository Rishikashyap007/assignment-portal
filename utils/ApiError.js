class ApiError extends Error{
    constructor(
        statuscode,
        message="something went wrong",
        errors=[],
        stack= " "
    ){
        super(message)
       this.statuscode = statuscode,
        this.message=message,
        this.errors = errors,
        this.stack = stack,
        this.success = false,
        this.data = null
    }
}

export default ApiError