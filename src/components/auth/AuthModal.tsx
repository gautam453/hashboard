import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Building2, Mail, Shield, Users, Zap, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, onSignIn }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { toast } = useToast();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              project_name: projectName,
              due_date: dueDate,
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user) {
          toast({
            title: "Account created successfully!",
            description: "Please check your email to verify your account.",
          });
          onSignIn(data.user);
          onClose();
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        if (data.user) {
          toast({
            title: "Welcome back!",
            description: "Successfully signed in to your account.",
          });
          onSignIn(data.user);
          onClose();
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'azure') => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Building2, title: "Digital Twin Visualization", desc: "Real-time 3D project models" },
    { icon: Users, title: "Multi-Agent Coordination", desc: "Intelligent project management agents" },
    { icon: Zap, title: "Predictive Analytics", desc: "AI-powered risk assessment" },
    { icon: Shield, title: "Enterprise Security", desc: "Bank-level data protection" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Left Side - Branding & Features */}
          <div className="bg-gradient-primary p-8 text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">TwinFlow</h1>
                    <p className="text-white/80 text-sm">Digital Twin Project Management</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-4">
                  Transform Your Projects with AI
                </h2>
                <p className="text-white/90 mb-8 text-lg">
                  Experience next-generation project management with intelligent agents, 
                  real-time visualization, and predictive analytics.
                </p>

                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <feature.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-white/80 text-sm">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
          </div>

          {/* Right Side - Authentication */}
          <div className="p-8 bg-background">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full flex flex-col justify-center"
            >
              <DialogHeader className="text-center mb-8">
                <DialogTitle className="text-2xl font-bold">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </DialogTitle>
                <p className="text-muted-foreground">
                  {isSignUp 
                    ? 'Set up your digital twin workspace'
                    : 'Sign in to access your digital twin workspace'
                  }
                </p>
              </DialogHeader>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {isSignUp && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input
                        id="projectName"
                        placeholder="Enter your project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Project Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="space-y-3">
                <Button
                  onClick={() => handleOAuthSignIn('google')}
                  variant="outline"
                  size="lg"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Continue with Google
                </Button>

                <Button
                  onClick={() => handleOAuthSignIn('azure')}
                  variant="outline"
                  size="lg"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  <Building2 className="w-5 h-5 mr-3" />
                  Continue with Microsoft
                </Button>
              </div>

              <div className="text-center mt-6">
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"
                  }
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    SOC 2 Compliant
                  </span>
                  <span>•</span>
                  <span>GDPR Ready</span>
                  <span>•</span>
                  <span>Enterprise Grade</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}