import express from "express";

import {
  createData,
  deleteData,
  getAllData,
  getDataDetail,
  updateData,
} from "../controllers/data.controller.js";

const router = express.Router();

router.route("/").get(getAllData);
router.route("/:id").get(getDataDetail);
router.route("/").post(createData);
router.route("/:id").patch(updateData);
router.route("/:id").delete(deleteData);

export default router;