import { Request, Response } from "express";
import NewsletterService from "./newsletter.service";

class NewsletterController {
  async subscribe(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const result = await NewsletterService.subscribe(email);

      res.status(201).json({
        success: true,
        message: "Subscribed successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const newsletters = await NewsletterService.getAll();

      res.status(200).json({
        success: true,
        data: newsletters,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("Newsletter ID is required");
      }

      await NewsletterService.deleteById(id);

      res.status(200).json({
        success: true,
        message: "Newsletter deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new NewsletterController();
