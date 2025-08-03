import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Filter, Search, Calendar, User, Flag } from "lucide-react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Update project timeline",
      description: "Review and adjust project milestones based on latest requirements",
      priority: "high",
      status: "in-progress",
      assignee: "John Doe",
      dueDate: "2024-02-01",
      completed: false
    },
    {
      id: 2,
      title: "Design system review",
      description: "Conduct comprehensive review of current design system components",
      priority: "medium",
      status: "pending",
      assignee: "Sarah Smith",
      dueDate: "2024-02-03",
      completed: false
    },
    {
      id: 3,
      title: "Security audit",
      description: "Perform security assessment of all project components",
      priority: "high",
      status: "in-progress",
      assignee: "Mike Johnson",
      dueDate: "2024-01-30",
      completed: false
    },
    {
      id: 4,
      title: "Documentation update",
      description: "Update technical documentation for new features",
      priority: "low",
      status: "completed",
      assignee: "Lisa Chen",
      dueDate: "2024-01-28",
      completed: true
    }
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        description: "",
        priority: "medium",
        status: "pending",
        assignee: "Unassigned",
        dueDate: new Date().toISOString().split('T')[0],
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, status: !task.completed ? 'completed' : 'pending' }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-primary';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gradient">Task Manager</h1>
            <p className="text-muted-foreground">Organize and track project tasks</p>
          </div>
          <Button onClick={() => window.history.back()} variant="outline">
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Task Creation */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter task title..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                className="flex-1"
              />
              <Button onClick={addTask}>Add Task</Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search tasks..." className="w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="flex gap-2">
                <Badge variant="outline">All ({tasks.length})</Badge>
                <Badge variant="outline">Pending ({tasks.filter(t => t.status === 'pending').length})</Badge>
                <Badge variant="outline">In Progress ({tasks.filter(t => t.status === 'in-progress').length})</Badge>
                <Badge variant="outline">Completed ({tasks.filter(t => t.completed).length})</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`glass transition-all hover:shadow-medium ${task.completed ? 'opacity-75' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {task.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(task.priority)}>
                            <Flag className="w-3 h-3 mr-1" />
                            {task.priority}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {task.assignee}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Due: {task.dueDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;