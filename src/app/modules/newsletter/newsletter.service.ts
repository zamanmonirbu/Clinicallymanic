import Newsletter, { INewsletter } from "./newsletter.model";

class NewsletterService {
  async subscribe(email: string): Promise<INewsletter> {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      throw new Error("Email already subscribed");
    }

    return await Newsletter.create({ email });
  }

  async getAll(): Promise<INewsletter[]> {
    return await Newsletter.find().sort({ createdAt: -1 });
  }

  async deleteById(id: string): Promise<void> {
    await Newsletter.findByIdAndDelete(id);
  }
}

export default new NewsletterService();
