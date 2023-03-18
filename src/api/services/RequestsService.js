const Request = require('../../models/Request');

class RequestService {
    static async createRequest(requestData) {
        try {
            return await Request.create(requestData);
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered request with this ID.";
            }
            return err;
        }
    }

    static async findAllRequests() {
        try {
            return await Request.find({}).populate('products').populate('author').populate('customer');
        } catch (err) {
            return err;
        }
    }

    static async findRequestByAuthor(author) {
        try {
            return await Request.find({ author }).populate('products').populate('author').populate('customer');
        } catch (err) {
            return err;
        }
    }

    static async findRequestByCod(cod) {
        try {
            return await Request.findOne({ cod }).populate('products').populate('author').populate('customer');
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered request with this ID.";
            }
            return err;
        }
    }

    static async findRequestById(id) {
        try {
            return await Request.findOne({ _id: id }).populate('products').populate('author').populate('customer');
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered request with this ID.";
            }
            return err;
        }
    }

    static async updateRequestById(id, newData) {
        try {
            return await Request.updateOne({ _id: id }, { $set: newData });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered request with this ID.";
            }
            return err;
        }
    }

    static async deleteRequestById(id) {
        try {
            return await Request.deleteOne({ _id: id });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered request with this ID.";
            }
            return err;
        }
    }
}

module.exports = RequestService;
