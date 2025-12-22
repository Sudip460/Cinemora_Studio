import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type ContactInput } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin } from "lucide-react";
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

export default function Contact() {
  const submitContact = useSubmitContact();
  
  const form = useForm<ContactInput>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      serviceType: "reel",
    },
  });

  function onSubmit(data: ContactInput) {
    submitContact.mutate(data, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-mono text-sm tracking-widest uppercase block mb-4">Get in touch</span>
            <h1 className="text-5xl md:text-6xl font-display font-black text-foreground mb-8">
              Let's Create <br/>
              <span className="text-gradient">Something Epic.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Ready to elevate your content? Fill out the form and tell us about your project. We typically respond within 24 hours.
            </p>

            <div className="space-y-8">
              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 4 }}
              >
                <div className="p-3 bg-primary/20 dark:bg-primary/30 border border-primary/30 rounded-lg text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-foreground font-bold text-lg">Email Us</h3>
                  <p className="text-muted-foreground">hello@cinemora.studio</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 4 }}
              >
                <div className="p-3 bg-secondary/20 dark:bg-secondary/30 border border-secondary/30 rounded-lg text-secondary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-foreground font-bold text-lg">Location</h3>
                  <p className="text-muted-foreground">Los Angeles, CA<br/>(Working Globally Remote)</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-card border-2 border-foreground/10 p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">Project Inquiry</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="bg-background border-foreground/20 text-foreground placeholder:text-muted-foreground focus:border-primary h-11"
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
                      <FormLabel className="text-foreground font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="john@example.com" 
                          type="email" 
                          {...field} 
                          className="bg-background border-foreground/20 text-foreground placeholder:text-muted-foreground focus:border-primary h-11"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || "reel"}>
                        <FormControl>
                          <SelectTrigger className="bg-background border-foreground/20 text-foreground h-11" data-testid="select-service">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-foreground/10">
                          <SelectItem value="reel">⚡ Reel / Short Form</SelectItem>
                          <SelectItem value="full-length">🎬 Full Length / Documentary</SelectItem>
                          <SelectItem value="other">✨ Other Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your vision, timeline, and budget..." 
                          className="bg-background border-foreground/20 text-foreground placeholder:text-muted-foreground focus:border-primary min-h-[150px] resize-none" 
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={submitContact.isPending}
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold text-base tracking-wide transition-all hover:shadow-lg"
                  data-testid="button-submit"
                >
                  {submitContact.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    "SEND MESSAGE"
                  )}
                </Button>

                {submitContact.isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-700 dark:text-green-300 text-sm"
                  >
                    ✓ Message sent! We'll get back to you soon.
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
