class Service {
    constructor(model) {
        this.model = model;
    }

    static async create(requestData) {
        try {
            return await this.model.create(requestData);
        } catch (err) {
            return err;
        }
    }

    static async findAll() {
        try {
            console.log(this.model);
            return await this.model.find({});
        } catch (err) {
            return err;
        }
    }

    static async findById(id) {
        try {
            return await this.model.findOne({ _id: id });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't register with this ID.";
            }
            return err;
        }
    }

    static async updateById(id, newData) {
        try {
            return await this.model.updateOne({ _id: id }, { $set: newData });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't register with this ID.";
            }
            return err;
        }
    }

    static async deleteById(id) {
        try {
            return await this.model.deleteOne({ _id: id });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't register with this ID.";
            }
            return err;
        }
    }
}

module.exports = Service;
