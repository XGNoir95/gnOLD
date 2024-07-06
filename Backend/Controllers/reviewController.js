import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate('user','name photo').populate('doctor','name');
    res.status(200).json({ success: true, message: 'Successful', data: reviews });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Not Found', error: err.message });
  }
};

export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  //if (!req.body.user) req.body.user = req.params.userId;
    req.body.user = req.userId;

  console.log('Doctor ID:', req.body.doctor);
  console.log('User ID:', req.body.user);

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();
    console.log('Saved Review:', savedReview);
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id }
    });

    res.status(200).json({ success: true, message: 'Successful review', data: savedReview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
