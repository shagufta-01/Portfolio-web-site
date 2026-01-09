import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

const enquirySchema = z.object({
  clientName: z.string().min(1, "Client name is required").max(255),
  projectName: z.string().min(1, "Project name is required").max(255),
  phoneNumber: z.string().min(1, "Phone number is required").max(20),
  projectDescription: z.string().min(10, "Description must be at least 10 characters"),
  budget: z.string().min(1, "Budget is required").max(100),
  relevantLinks: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createEnquiry = trpc.enquiry.create.useMutation();

  const form = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      clientName: "",
      projectName: "",
      phoneNumber: "",
      projectDescription: "",
      budget: "",
      relevantLinks: "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    try {
      await createEnquiry.mutateAsync(data);
      toast.success("Enquiry submitted successfully! We'll get back to you soon.");
      form.reset();
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to submit enquiry. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Tell me about your project and let's discuss how I can help.
          </p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-lg border border-border p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Client Name */}
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Project Name */}
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Website Redesign"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Project Description */}
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your project, goals, and vision..."
                        className="resize-none"
                        rows={6}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum 10 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Budget */}
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$5,000 - $10,000"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a budget range or your budget limit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Relevant Links */}
              <FormField
                control={form.control}
                name="relevantLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant Links (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="GitHub: https://github.com/...
Figma: https://figma.com/...
Drive: https://drive.google.com/..."
                        className="resize-none"
                        rows={4}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Add links to GitHub, Figma, Drive, or other relevant resources
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || createEnquiry.isPending}
              >
                {isSubmitting || createEnquiry.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enquiry"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-muted-foreground">contact@portfolio.com</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📍</span>
            </div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-sm text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
