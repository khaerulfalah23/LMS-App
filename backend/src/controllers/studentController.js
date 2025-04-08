import userModel from '../models/userModel.js';

export const getStudents = async (req, res) => {
  try {
    const students = await userModel
      .find({
        role: 'student',
        manager: req.user._id,
      })
      .select('name courses photo');

    const photoUrl = process.env.APP_URL + '/uploads/students/';

    const response = students.map((item) => {
      return {
        ...item.toObject(),
        photo_url: photoUrl + item.photo,
      };
    });

    return res.json({
      message: 'Get Students success',
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
