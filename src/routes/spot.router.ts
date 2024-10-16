import express from "express";
import {
  shareSlice,
  findNearbySpot,
  getTopCreatorsOfTheWeek,
} from "../controllers/spot.controller";
const router = express.Router();

router.post("/share-a-slice", shareSlice);
router.get("/hunger", findNearbySpot);
router.get("/top-creators", getTopCreatorsOfTheWeek);
export default router;
