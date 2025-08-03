import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Clock, Users, Target } from "lucide-react";

const Analytics = () => {
  const performanceData = [
    { name: 'Jan', projects: 12, completed: 10 },
    { name: 'Feb', projects: 19, completed: 16 },
    { name: 'Mar', projects: 15, completed: 14 },
    { name: 'Apr', projects: 22, completed: 18 },
    { name: 'May', projects: 18, completed: 15 },
    { name: 'Jun', projects: 25, completed: 22 },
  ];

  const pieData = [
    { name: 'Completed', value: 65, color: 'hsl(var(--success))' },
    { name: 'In Progress', value: 25, color: 'hsl(var(--primary))' },
    { name: 'Delayed', value: 10, color: 'hsl(var(--warning))' },
  ];

  const metrics = [
    { icon: Target, label: "Project Success Rate", value: "87%", trend: "+5.2%", isPositive: true },
    { icon: Clock, label: "Avg. Completion Time", value: "12.5 days", trend: "-2.1 days", isPositive: true },
    { icon: Users, label: "Team Productivity", value: "94%", trend: "+7.8%", isPositive: true },
    { icon: Activity, label: "Resource Utilization", value: "78%", trend: "-3.2%", isPositive: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gradient">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive project performance insights</p>
          </div>
          <Button onClick={() => window.history.back()} variant="outline">
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className={`flex items-center gap-1 text-sm ${
                        metric.isPositive ? 'text-success' : 'text-warning'
                      }`}>
                        {metric.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {metric.trend}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <metric.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Project Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="projects" fill="hsl(var(--primary))" />
                  <Bar dataKey="completed" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Project Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;