import categoryModel from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    return res.json({
      message: 'Get categories success',
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
