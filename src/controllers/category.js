const Category = require('../models/category');
const slugify = require('slugify');

const createCategory = async (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    };

    if(req.file) {
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    if(req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const newCategory = await Category.create(categoryObj);

    if (newCategory) {
        return res.status(200).json({
            message: "Category Created Successfully"
        })
    } else {
        return res.status(400).json({
            message: "Something went Wrong"
        })
    }
};

const addCategory = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if(parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }
    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: addCategory(categories, cat._id)
        });
    }
    return categoryList;
};

const getCategories = async (req, res) => {
    const allCategories = await Category.find();

    if (allCategories) {

        const categoryList = addCategory(allCategories);

        return res.status(200).json({ categoryList });
    } else {
        return res.status(400).json({
            message: "Something went Wrong"
        })
    }
};

module.exports = { createCategory, getCategories };