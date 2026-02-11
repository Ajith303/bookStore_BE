const productController = new Object()
const productDal = require("../dal/productDal")

//post
productController.createProduct = async (req) => {
    try {
        let body = req.body
        if (!body.description) {
            return { status: false, message: "please enter product description" }
        }
        if (!body.image) {
            return { status: false, message: "please enter product image" }
        }
        if (!body.seller) {
            return { status: false, message: "please enter product seller" }
        }
        if (!body.stock) {
            return { status: false, message: "please enter product stock" }
        }
        if (body.stock > 20) {
            return { status: false, message: "product stock canot exceed 20" }
        }
        if (!body.category) {
            return { status: false, nessage: "please enter product category" }
        }
        let result = await productDal.createProduct(body)
        if (result) {
            console.log(result, "resultFromDal")
            return { code: 201, status: true, message: result.message, data: result.data }
        }
        return { code: 400, status: false, message: result.message, data: {} }
    }
    catch (err) {
        return { code: 500, status: false, message: err ? err.message : "Internal Server error" }
    }
}

//get all
productController.getProduct = async (req) => {
    try {
        let result = await productDal.getProduct(req)
        if (result) {
            return { code: 200, status: true, productCount: result.data.length, message: "Product Fetch to Successfully!", data: result.data }
        }
        return { code: 400, status: false, message: "Product Fetch to Failed", data: {} }
    }
    catch (err) {
        return { code: 500, status: false, message: err ? err.message : "Internal Server Eroor", data: result.data }

    }
}

//get single product
productController.getSingleProduct = async (req) => {
    try {
        let body = req.body
        let result = await productDal.getOneProduct(body._id);

        if (!result.status) {
            return { code: 404, status: false, message: "Product not found" };
        }
        return { code: 200, status: true, message: "Product fetched successfully", data: result.data };
    } catch (err) {
        return { code: 500, status: false, message: err.message };
    }
};

//update
productController.updateProduct = async (req) => {
    try {
        let body = req.body
        let result = await productDal.updateProduct(body._id, body)
        if (result) {
            return { code: 200, status: true, message: "Product Updated Successfully", data: result.data }
        }
        return { code: 400, status: false, message: "failed to update data", data: result.data }
    }
    catch (err) {
        return { code: 500, status: true, message: err ? err.message : "Internal Server Error", data: {} }
    }
}

//delete
productController.deleteProduct = async (req) => {
    try {
        let body = req.body
        let data = {
            deleted: true
        }
        let result = await productDal.updateProduct(body._id, data)
        if (result) {
            return { code: 200, status: true, message: "Product Deleted Successfully!", data: result.data }
        }
        return { code: 400, status: false, message: "Product Deleted failed." }
    }
    catch (err) {
        return { code: 500, status: true, message: err ? err.message : "Internal Server Error" }
    }
}


// get by name
productController.searchProduct = async (req) => {
    try {
        let { name, category } = req.query;

        if (!name && !category) {
            return { code: 400, status: false, message: "wrong" }
        }

        let result = await productDal.getProductByNameOrCategory({ name, category });

        if (!result.status) {
            return { code: 404, status: false, message: result.message }
        }
        return { code: 200, status: true, message: "Products found", data: result.data }
    } catch (err) {
        return { code: 500, status: false, message: err.message }
    }
}

////
productController.getAllProducts = async (req) => {
    try {
        let page = Number(req.query.page) || 1;
        let limit = 5;

        let result = await productDal.getAllProductsWithPagination(
            page,
            limit
        );

        if (!result.status) {
            return { code: 404, status: false, message: result.message };
        }

        return {
            code: 200,
            status: true,
            count: result.data.length,
            message: "Products fetched successfully",
            data: result.data,
            pagination: result.pagination
        };

    } catch (err) {
        return {
            code: 500, status: false, message: err.message
        };
    }
};


module.exports = productController



