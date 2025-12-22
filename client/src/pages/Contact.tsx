import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type ContactInput } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DynamicBackground } from "@/components/DynamicBackground";
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
                <div className="p-4 bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40 rounded-xl text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-foreground font-black text-2xl mb-2">Email</h3>
                  <p className="text-muted-foreground text-lg font-medium">hello@cinemora.studio</p>
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
                  <p className="text-muted-foreground text-lg font-medium">Los Angeles, CA<br/>(Working Globally Remote)</p>
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
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-black text-sm">Service Type</FormLabel>
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
                    disabled={submitContact.isPending}
                    className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 dark:to-purple-500 hover:shadow-lg text-white font-black text-base tracking-wider transition-all"
                    data-testid="button-submit"
                  >
                    {submitContact.isPending ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" /> SENDING...
                      </>
                    ) : (
                      "SEND MESSAGE"
                    )}
                  </Button>
                </motion.div>

                {submitContact.isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 dark:bg-green-500/30 border-2 border-green-500/50 rounded-lg text-green-700 dark:text-green-300 text-center font-black"
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
