import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Clock, Users, TrendingUp } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Weekly Project Summary",
      type: "Performance",
      date: "2024-01-28",
      status: "Ready",
      description: "Comprehensive overview of all active projects and their progress"
    },
    {
      id: 2,
      title: "Team Productivity Analysis",
      type: "Analytics",
      date: "2024-01-27",
      status: "Processing",
      description: "Detailed analysis of team performance and resource utilization"
    },
    {
      id: 3,
      title: "Risk Assessment Report",
      type: "Risk Management",
      date: "2024-01-26",
      status: "Ready",
      description: "Identification and analysis of potential project risks"
    },
    {
      id: 4,
      title: "Budget Utilization Report",
      type: "Financial",
      date: "2024-01-25",
      status: "Ready",
      description: "Current budget status and spending patterns across projects"
    }
  ];

  const quickStats = [
    { icon: FileText, label: "Total Reports", value: "24" },
    { icon: Clock, label: "Avg. Generation Time", value: "2.3 min" },
    { icon: Users, label: "Team Members", value: "12" },
    { icon: TrendingUp, label: "Efficiency Gain", value: "+15%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gradient">Reports Center</h1>
            <p className="text-muted-foreground">Generate and manage project reports</p>
          </div>
          <Button onClick={() => window.history.back()} variant="outline">
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="font-semibold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Generate New Report */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Generate New Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col">
                <TrendingUp className="w-6 h-6 mb-2" />
                Performance Report
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Users className="w-6 h-6 mb-2" />
                Team Analysis
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Calendar className="w-6 h-6 mb-2" />
                Schedule Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{report.type}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {report.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={report.status === 'Ready' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                    {report.status === 'Ready' && (
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;