import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactFormSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (_req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      return res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Filter products
  app.get("/api/products/filter", async (req: Request, res: Response) => {
    try {
      const { area, type, brand, priceRange } = req.query;
      
      const products = await storage.getProductsByFilter({
        area: area as string,
        type: type as string,
        brand: brand as string,
        priceRange: priceRange as string
      });
      
      return res.json(products);
    } catch (error) {
      console.error("Error filtering products:", error);
      return res.status(500).json({ error: "Failed to filter products" });
    }
  });

  // Get all services
  app.get("/api/services", async (_req: Request, res: Response) => {
    try {
      const services = await storage.getAllServices();
      return res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      return res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Get all FAQs
  app.get("/api/faqs", async (_req: Request, res: Response) => {
    try {
      const faqs = await storage.getAllFaqs();
      return res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      return res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  // Get all benefits
  app.get("/api/benefits", async (_req: Request, res: Response) => {
    try {
      const benefits = await storage.getAllBenefits();
      return res.json(benefits);
    } catch (error) {
      console.error("Error fetching benefits:", error);
      return res.status(500).json({ error: "Failed to fetch benefits" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const formData = req.body;
      
      try {
        const validatedData = insertContactFormSchema.parse(formData);
        const submitResult = await storage.submitContactForm(validatedData);
        return res.status(201).json(submitResult);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationError = fromZodError(error);
          return res.status(400).json({ error: validationError.message });
        }
        throw error;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      return res.status(500).json({ error: "Failed to submit form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
