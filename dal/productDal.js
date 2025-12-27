const productDal = new Object()
const productModel = require("../model/productModel")
const mongoose = require("mongoose")
const { Types } = mongoose

//post
productDal.createProduct = async (req) => {
    try {
        let payload = productModel(req)
        let result = await payload.save()
        if (result) {
            return { status: true, message: "created", data: result }
        }
        return { status: false, message: "failed", data: {} }
    }
    catch (err) {
        return { status: false, message: err ? err.message : "Interl Server Error", data: {} }
    }
}

//get all
productDal.getProduct = async (req) => {
    try {
        let result = await productModel.find({ deleted: false })
        if (result) {
            return { status: true, message: "Product Get Successfolly", data: result}
        }
        return { status: false, message: "Failed", data: {} }
    }
    catch (err) {
        return { status: false, message: err ? err.message : "Internal Server Error" }
    }
}

//get gingle product
productDal.getOneProduct = async (id) => {
    try {
        let result = await productModel.findOne({_id: id,deleted: false});
        if (result) {
            return { status: true, message: "success", data: result };
        }

        return { status: false, message: "Product not found", data: {} };
    } catch (err) {
        return { status: false, message: err.message };
    }
};

//update
productDal.updateProduct = async (id, data) => {
    try {
        let result = await productModel.findByIdAndUpdate({ _id: id }, data, { new: true }).exec()
        if (result) {
            return { status: true, message: "Product Updated Successfolly", data: result}
        }
        return { status: false, message: "failed", data: {} }
    }
    catch (err) {
        return { status: false, message: err ? err.message : "Inernal Server Error", data: {} }
    }
}

//
productDal.getProductByNameOrCategory = async (params) => {
    try {
        let query = [{ deleted: false }]

        if (params?.name) {
            query.push({
                name: { $regex: params.name, $options: "i" } // partial + case insensitive
            })
        }

        if (params?.category) {
            query.push({ category: params.category })
        }
        
        let result = await productModel.aggregate([
            {$match: {$and: query}},
            {$sort: { createdAt: -1 }
            }
        ])

        if (result.length > 0) {
            return {status: true,message: "Fetch successfully",data: result}
        }
        return {status: false,message: "No products found",data: []}

    } catch (err) {
        return {status: false,message: err.message,data: {}}
    }
}

productDal.getAllProductsWithPagination = async (page, limit) => {
    try {
        let skip = (page - 1) * limit;
        let query = { deleted: false };
        let totalCount = await productModel.countDocuments(query);
        let result = await productModel
            .find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        if (result.length === 0) {
            return {
                status: false,
                message: "No products found",
                data: [],
                pagination: {}
            };
        }

        return {
            status: true,
            message: "success",
            data:result,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalRecords: totalCount,
                limit
            }
        };

    } catch (err) {
        return {
            status: false,
            message: err.message
        };
    }
};


module.exports = productDal