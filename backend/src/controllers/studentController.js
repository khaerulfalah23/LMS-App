import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import { studentSchema } from '../utils/schema.js';

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

export const postStudent = async (req, res) => {
  try {
    const body = req.body;

    const parse = studentSchema.safeParse(body);

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);

      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }

      return res.status(500).json({
        message: 'Error Validation',
        data: null,
        errors: errorMessages,
      });
    }

    const hashPassword = bcrypt.hashSync(body.password, 12);

    const student = new userModel({
      name: parse.data.name,
      email: parse.data.email,
      password: hashPassword,
      photo: req.file?.filename,
      manager: req.user?._id,
      role: 'student',
    });

    await student.save();

    return res.json({
      message: 'Create student success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
