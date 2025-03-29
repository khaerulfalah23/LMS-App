import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

export const signUpAction = async (req, res) => {
  try {
    const body = req.body;

    const hashPassword = await bcrypt.hash(body.password, 10);

    const user = new userModel({
      name: body.name,
      email: body.email,
      photo: 'default.png',
      password: hashPassword,
      role: 'manager',
    });

    await user.save();

    return res.status(201).json({
      message: 'Sign up success',
      data: { midtrans_payment_url: 'https://midtrans.com/' },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ massage: 'Internal server error' });
  }
};
