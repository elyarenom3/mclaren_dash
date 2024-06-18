// import Data from "../mongodb/models/data.js";
// import User from "../mongodb/models/user.js";
// import mongoose from "mongoose";
// import * as dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// const getAllData = async (req, res) => {
//   const { _end, _order = 'asc', _start, _sort = 'createdAt', title_like = "", DataType = "" } = req.query;

//   const query = {};

//   if (DataType !== "") {
//     query.DataType = DataType;
//   }

//   if (title_like) {
//     query.title = { $regex: title_like, $options: "i" };
//   }

//   try {
//     const count = await Data.countDocuments(query);
//     const data = await Data.find(query).limit(_end).skip(_start).sort({ [_sort]: _order });

//     res.header("x-total-count", count);
//     res.header("Access-Control-Expose-Headers", "x-total-count");
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getDataDetail = async (req, res) => {
//   const { id } = req.params;
//   const DataExists = await Data.findOne({ _id: id }).populate("creator");

//   if (DataExists) {
//     res.status(200).json(DataExists);
//   } else {
//     res.status(404).json({ message: "DataSet not found" });
//   }
// };

// const createData = async (req, res) => {
//   try {
//     const { title, description, datatype, location, formula, datafile, email, filename } = req.body;

//     if (!title || !description || !datatype || !location || !formula || !datafile || !email) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     const user = await User.findOne({ email }).session(session);

//     if (!user) throw new Error("User not found");

//     const fileUrl = await cloudinary.uploader.upload(datafile, {
//       resource_type: "raw",
//       secure: true,
//     });

//     const newData = await Data.create({
//       title,
//       description,
//       datatype,
//       location,
//       formula,
//       datafile: fileUrl.secure_url, filename,
//       creator: user._id,
//     });

//     if (!user.allData) user.allData = [];
//     user.allData.push(newData._id);
//     await user.save({ session });

//     await session.commitTransaction();

//     res.status(200).json({ message: "DataSet created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateData = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, datatype, location, formula, datafile, email, filename } = req.body;

//     const fileUrl = await cloudinary.uploader.upload(datafile, {
//       resource_type: "raw",
//       secure: true,
//     });

//     await Data.findByIdAndUpdate(
//       { _id: id },
//       {
//         title,
//         description,
//         datatype,
//         location,
//         formula,
//         datafile: fileUrl.secure_url, filename,
//       },
//     );

//     res.status(200).json({ message: "DataSet updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteData = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // console.log(`Deleting dataset with id: ${id}`);

//     const dataToDelete = await Data.findById({ _id: id }).populate("creator");
//     if (!dataToDelete) {
//       console.error(`Dataset with id: ${id} not found`);
//       throw new Error("DataSet not found");
//     }

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     await dataToDelete.remove({ session });
//     dataToDelete.creator.allData.pull(dataToDelete);

//     await dataToDelete.creator.save({ session });
//     await session.commitTransaction();

//     // console.log(`Dataset with id: ${id} deleted successfully`);
//     res.status(200).json({ message: "Dataset deleted successfully" });
//   } catch (error) {
//     // console.error(`Error deleting dataset with id: ${id}`, error);
//     res.status(500).json({ message: error.message }); 
//   }
// };

// export {
//   getAllData,
//   getDataDetail,
//   createData,
//   updateData,
//   deleteData,
// };

import Data from "../mongodb/models/data.js";
import User from "../mongodb/models/user.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const getAllData = async (req, res) => {
  const {
    _end,
    _order = 'desc',
    _start,
    _sort = 'createdAt',
    title_like = "",
    DataType = "",
  } = req.query;


  const query = {};

  if (DataType !== "") {
    query.DataType = DataType;
  }

  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }

  try {
    const count = await Data.countDocuments(query);

    const data = await Data.find(query).limit(_end).skip(_start).sort({ [_sort]: _order });


    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDataDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const DataExists = await Data.findOne({ _id: id }).populate("creator");

    if (DataExists) {
      res.status(200).json(DataExists);
    } else {
      res.status(404).json({ message: "DataSet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createData = async (req, res) => {
  try {
    const { title, description, datatype, location, formula, datafile, email, filename } = req.body;

    if (!title || !description || !datatype || !location || !formula || !datafile || !email || !filename) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const fileUrl = await cloudinary.uploader.upload(datafile, {
      resource_type: "raw",
      use_filename: true, // Ensure the file name is preserved
      unique_filename: false, // Prevent renaming
    });

    const newData = await Data.create({
      title,
      description,
      datatype,
      location,
      formula,
      datafile: fileUrl.secure_url,
      filename,
      creator: user._id,
    });

    if (!user.allData) user.allData = [];
    user.allData.push(newData._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "DataSet created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, datatype, location, formula, datafile, email, filename } = req.body;

    const fileUrl = await cloudinary.uploader.upload(datafile, {
      resource_type: "raw",
      secure: true,
    });

    await Data.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        datatype,
        location,
        formula,
        datafile: fileUrl.secure_url, filename,
      },
    );

    res.status(200).json({ message: "DataSet updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    const dataToDelete = await Data.findById({ _id: id }).populate("creator");

    if (!dataToDelete) throw new Error("DataSet not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    await dataToDelete.remove({ session });
    dataToDelete.creator.allData.pull(dataToDelete);

    await dataToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Dataset deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllData,
  getDataDetail,
  createData,
  updateData,
  deleteData,
};
