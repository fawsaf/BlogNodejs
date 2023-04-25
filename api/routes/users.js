import express  from "express";
const router = express.Router()
import { addUsers} from "../controllers/user.js";
router.get('/test', addUsers)

export default router