import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { type ContactInput } from "@shared/routes";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DynamicBackground } from "@/components/DynamicBackground";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Instagram } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const servicePlans = {
  reel: [
    { value: "basic-reel", label: "Basic Reel - ₹500" },
    { value: "pro-reel", label: "Pro Reel - ₹1000" },
  ],
  "full-length": [
    { value: "youtube-standard", label: "YouTube Standard - ₹1500" },
    { value: "cinematic-doc", label: "Cinematic Documentary - ₹2000+" },
  ],
};

export default function Contact() {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<"reel" | "full-length" | "other" | null>("reel");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactInput>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNo: "",
      message: "",
      serviceType: "reel",
      servicePlan: "",
    },
  });

  // Watch for serviceType changes
  const serviceType = form.watch("serviceType");
  useEffect(() => {
    setSelectedService(serviceType as "reel" | "full-length" | "other" | null);
    if (serviceType !== "reel" && serviceType !== "full-length") {
      form.setValue("servicePlan", "");
    }
  }, [serviceType, form]);

  async function onSubmit(data: ContactInput) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("access_key", "c4f36f8b-b45c-4080-8ee5-f1d93accdbb1");
      formData.append("to_email", "cinemorastudio460@gmail.com");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("contactNo", data.contactNo);
      formData.append("serviceType", data.serviceType || "");
      formData.append("servicePlan", data.servicePlan || "");
      formData.append("message", data.message);
      formData.append("from_name", "Cinemora Studio Website");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "We'll be in touch with you shortly.",
          variant: "default",
        });
        form.reset();
        setSelectedService("reel");
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <div className="relative pt-32 pb-20 container mx-auto px-4 md:px-6">
        <DynamicBackground />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start relative z-10">
          
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-accent font-mono text-sm tracking-widest uppercase block mb-6 font-bold"
              whileInView={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ Get in Touch
            </motion.span>
            
            <h1 className="text-6xl md:text-7xl font-serif font-black text-foreground mb-8 leading-tight">
              Let's Create <br/>
              <span className="text-gradient">Something Epic.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-14 leading-relaxed font-medium">
              Ready to elevate your content? Tell us about your project, vision, and timeline. We typically respond within 24 hours.
            </p>

            <div className="space-y-10">
              <motion.div 
                className="group flex items-start gap-5"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 bg-gradient-to-br from-accent/30 to-accent/10 border-2 border-accent/40 rounded-xl text-accent shrink-0 group-hover:scale-110 transition-transform">
                  <Instagram size={28} />
                </div>
                <div>
                  <h3 className="text-foreground font-black text-2xl mb-2">Instagram</h3>
                  <p className="text-muted-foreground text-lg font-medium">@cinemora_studio_</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="group flex items-start gap-5"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40 rounded-xl text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-foreground font-black text-2xl mb-2">Email</h3>
                      <p className="text-muted-foreground text-lg font-medium">cinemorastudio460@gmail.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="group flex items-start gap-5"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-secondary/40 rounded-xl text-secondary shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-foreground font-black text-2xl mb-2">Location</h3>
                  <p className="text-muted-foreground text-lg font-medium">Bengaluru, India<br/>(Working Globally Remote)</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="artistic-card bg-gradient-to-br from-card via-card/90 to-background border-2 border-foreground/10 p-10 md:p-12 shadow-2xl"
          >
            <h2 className="text-3xl font-serif font-black text-foreground mb-10">Project Inquiry</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-black text-sm">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="bg-background border-2 border-foreground/10 text-foreground placeholder:text-muted-foreground focus:border-primary h-12 font-medium"
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-black text-sm">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="john@example.com" 
                          type="email" 
                          {...field} 
                          className="bg-background border-2 border-foreground/10 text-foreground placeholder:text-muted-foreground focus:border-primary h-12 font-medium"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-black text-sm">Contact Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="xx xxxx xxxx" 
                          type="tel" 
                          {...field} 
                          className="bg-background border-2 border-foreground/10 text-foreground placeholder:text-muted-foreground focus:border-primary h-12 font-medium"
                          data-testid="input-contact"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-black text-sm">Service</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value || "reel"}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-2 border-foreground/10 text-foreground h-12 font-medium" data-testid="select-service">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-2 border-foreground/10">
                            <SelectItem value="reel">⚡ Reel / Short Form</SelectItem>
                            <SelectItem value="full-length">🎬 Full Length / Documentary</SelectItem>
                            <SelectItem value="other">✨ Other Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(selectedService === "reel" || selectedService === "full-length") && (
                    <FormField
                      control={form.control}
                      name="servicePlan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-black text-sm">Service Plan</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                            <FormControl>
                              <SelectTrigger className="bg-background border-2 border-foreground/10 text-foreground h-12 font-medium" data-testid="select-plan">
                                <SelectValue placeholder="Select plan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-2 border-foreground/10">
                              {servicePlans[selectedService as "reel" | "full-length"]?.map((plan) => (
                                <SelectItem key={plan.value} value={plan.value}>
                                  {plan.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-black text-sm">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your vision, timeline, budget, and creative direction..." 
                          className="bg-background border-2 border-foreground/10 text-foreground placeholder:text-muted-foreground focus:border-primary min-h-[160px] resize-none font-medium" 
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-primary to-orange-600 dark:to-orange-500 hover:shadow-lg text-white font-black text-base tracking-wider transition-all"
                    data-testid="button-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" /> SENDING...
                      </>
                    ) : (
                      "SEND MESSAGE"
                    )}
                  </Button>
                </motion.div>

                {form.formState.isDirty && !isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-blue-500/20 dark:bg-blue-500/30 border-2 border-blue-500/50 rounded-lg text-blue-700 dark:text-blue-300 text-center font-black text-sm"
                  >
                    Ready to send your inquiry
                  </motion.div>
                )}
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
