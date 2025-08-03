
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  HelpCircle,
  Building2,
  Clock,
  Users,
  Activity
} from "lucide-react";

interface DashboardHeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onThemeToggle: () => void;
  isDark: boolean;
  onStartTutorial: () => void;
  projectDueDate: Date;
}

export function DashboardHeader({ 
  user = { name: "John Doe", email: "john@company.com" }, 
  onThemeToggle, 
  isDark,
  onStartTutorial,
  projectDueDate 
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const [notifications] = useState(3);

  const timeUntilDue = Math.ceil((projectDueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isUrgent = timeUntilDue <= 7;

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleSignOut = () => {
    localStorage.removeItem('twinflow_auth');
    localStorage.removeItem('twinflow_provider');
    window.location.reload();
  };

  return (
    <header className="glass border-b sticky top-0 z-50 h-16">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left Section - Logo & Project Status */}
        <div className="flex items-center gap-6">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">TwinFlow</h1>
              <p className="text-xs text-muted-foreground">Digital Twin PM</p>
            </div>
          </motion.div>

          {/* Project Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div className="text-sm">
              <span className="text-muted-foreground">Due in </span>
              <Badge variant={isUrgent ? "destructive" : "secondary"} className="font-medium">
                {timeUntilDue} days
              </Badge>
            </div>
          </motion.div>

          {/* Active Agents Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-success" />
            <div className="text-sm">
              <span className="text-muted-foreground">Agents </span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                4 Active
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center gap-4">
          {/* Tutorial Button */}
          <Button
            onClick={onStartTutorial}
            variant="ghost"
            size="icon-sm"
            className="relative"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>

          {/* Theme Toggle */}
          <Button
            onClick={onThemeToggle}
            variant="ghost"
            size="icon-sm"
            className="relative"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon-sm" className="relative">
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center"
              >
                {notifications}
              </motion.div>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Users className="w-4 h-4 mr-2" />
                Team Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick}>
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
