
import responseHelper from "@/app/helpers/responseHelper";


class ResponseService {
    constructor(statusCode, message) {
    }

    sendResponse = (statusCode = null, message = null, apiVersion = null, data = null) => {
        let obj = { status: false, apiVersion: apiVersion || 'No Version', statusCode, ...responseHelper(statusCode), data };
        if (message) {
            obj['message'] = message;
            obj['_message'] = 'Custom Message';
        }
        return obj;
    };

    buildResponse = ({ statusCode, message, data }) => {
        console.log('responseHelper(statusCode)', responseHelper(statusCode))
        return {
            status: false,
            statusCode,
            ...responseHelper(statusCode),
            message,
            data: data
        };
    }
};


const responseService = new ResponseService();
export default responseService;
