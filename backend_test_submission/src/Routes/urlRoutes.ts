import { Router } from "express";
import { getOriginalUrlController, shortenUrlController } from "../Controller/urlController";
const router = Router();

router.route("/").post(shortenUrlController);
router.route("/:shortCode").get(getOriginalUrlController);

export default router