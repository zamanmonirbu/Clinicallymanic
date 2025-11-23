import { Router } from "express";
import NewsletterController from "./newsletter.controller";

const router = Router();

router.post("/subscribe", NewsletterController.subscribe);
router.get("/", NewsletterController.getAll);
router.delete("/:id", NewsletterController.delete);

export const newsletterRoutes = router;