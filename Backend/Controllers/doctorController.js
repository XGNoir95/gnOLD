import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Doctor updated successfully", data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update." });
    }
};
export const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        await Doctor.findByIdAndDelete(id,);
        res.status(200).json({ success: true, message: "Doctor deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete." });
    }
};
export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;
    try {
      const doctor = await Doctor.findById(id)
        .populate('reviews')
        .select("-password");
  
      if (!doctor) {
        return res.status(404).json({ success: false, message: "No doctor found with that ID." });
      }
  
      res.status(200).json({ success: true, message: "Doctor found successfully", data: doctor });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to retrieve doctor.", error: err.message });
    }
  };
export const getallDoctor = async (req, res) => {
    try {
        const { query } = req.query;
        let doctors;
        if (query) {
            doctors = await Doctor.find({ isApproved: "approved", $or: [{ name: { $regex: query, $options: "i" }, specialization: { $regex: query, $options: "i" } },], }).select("-password");
        }else {
            doctors = await Doctor.find({ }).select("-password");
        }
        doctors = await Doctor.find({}).select("-password");
        res.status(200).json({ success: true, message: "Doctors found successfully", data: doctors });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found any doctors1." });
    }
};

export const getDoctorProfile = async(req,res)=>{
    const doctorId = req.user.id;

    try {
        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found." })
        }

        const { password, ...rest } = doctor._doc;
        const appointments = await Booking.find({doctor: doctorId})

        res.status(200).json({ success: true, message: 'Profile info is laoding', data: { ...rest,appointments } })

    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to load user profile" });
    }
}