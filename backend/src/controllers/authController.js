import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import transactionModel from '../models/transactionModel.js';

export const signUpAction = async (req, res) => {
  const midtransUrl = process.env.MIDTRANS_URL;
  const midtransAuthString = process.env.MIDTRANS_AUTH_STRING;

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

    const transaction = new transactionModel({
      user: user._id,
      price: 280000,
    });

    const midtrans = await fetch(midtransUrl, {
      method: 'POST',
      body: JSON.stringify({
        transaction_details: {
          order_id: transaction._id.toString(),
          gross_amount: transaction.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
        callbacks: {
          finish: 'http://localhost:5173/success-checkout',
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${midtransAuthString}`,
      },
    });

    const resMidtrans = await midtrans.json();

    await user.save();
    await transaction.save();

    return res.status(201).json({
      message: 'Sign up success',
      data: {
        midtrans_payment_url: resMidtrans.redirect_url,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ massage: 'Internal server error' });
  }
};
