import { Router } from "express";
import stateCount from "../controllers/stateCount.js";
import byKeyword from "../controllers/byKeyword.js";
import getSchemesByGender from "../controllers/byGender.js";
import allSchemes   from "../controllers/allSchemes.js"
const router = Router();

router.get("/bygender", getSchemesByGender);
router.get("/scount", stateCount);
router.get("/bykey",byKeyword);
router.get("/all",allSchemes);

export default router;
