// Define response messages for successful operations
const SUCCESS_RESPONSES = {
   ADD: "Added successfully.",
   UPDATE: "Updated successfully.",
   DELETE: "Deleted successfully.",
   FETCH: "Fetched data successfully.",
};

// Define response messages for common error scenarios
const ERROR_RESPONSES = {
   UNAUTHORIZED: "Unauthorized access. Please log in first.",
   UNPROCESSABLE_ENTITY: "Unprocessable Content or Environment already exists.",
   INTERNAL_SERVER_ERROR: "Internal server error.",
   RESOURCE_NOT_FOUND: "Resource not found.",
   BAD_REQUEST: "Bad request.",
   GENERIC_ERROR: "An error occurred. Please try again later.",
};
