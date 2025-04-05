import mongoose from 'mongoose';
import courseDetailModel from './courseDetailModel.js';
import categoryModel from './categoryModel.js';

const courseModel = mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseDetail',
    },
  ],
});

courseModel.post('findOneAndDelete', async (doc) => {
  if (doc) {
    await categoryModel.findByIdAndUpdate(doc.category, {
      $pull: {
        courses: doc._id,
      },
    });

    await courseDetailModel.deleteMany({
      course: doc._id,
    });

    doc.students?.map(async (std) => {
      await userModel.findByIdAndUpdate(std._id, {
        $pull: {
          courses: doc._id,
        },
      });
    });
  }
});

courseModel.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (docToUpdate) {
    this._prevCategory = docToUpdate.category;
  }
  next();
});

// Post: Update array courses di kategori lama & baru
courseModel.post('findOneAndUpdate', async function (doc) {
  if (doc) {
    const prevCategory = this._prevCategory;
    const newCategory = doc.category;

    if (String(prevCategory) !== String(newCategory)) {
      // Hapus dari kategori lama
      await categoryModel.findByIdAndUpdate(prevCategory, {
        $pull: { courses: doc._id },
      });

      // Tambahkan ke kategori baru
      await categoryModel.findByIdAndUpdate(newCategory, {
        $push: { courses: doc._id },
      });
    }
  }
});

export default mongoose.model('Course', courseModel);
