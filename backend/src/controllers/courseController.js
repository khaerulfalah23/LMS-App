import courseModel from '../models/courseModel.js';

export const getCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find({
        manager: req.user?._id,
      })
      .select('name thumbnail')
      .populate({
        path: 'category',
        select: 'name -_id',
      })
      .populate({
        path: 'students',
        select: 'name',
      });

    const imageUrl = process.env.APP_URL + '/uploads/courses/';

    const response = courses.map((item) => {
      return {
        ...item.toObject(),
        thumbnail_url: imageUrl + item.thumbnail,
        total_students: item.students.length,
      };
    });

    return res.json({
      message: 'Get Courses Success',
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
