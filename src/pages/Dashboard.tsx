
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Plus,
  MoreHorizontal
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Total Posts", value: "124", change: "+12%", icon: FileText, color: "text-blue-600" },
    { title: "Total Views", value: "45.2K", change: "+23%", icon: Eye, color: "text-green-600" },
    { title: "Comments", value: "892", change: "+8%", icon: MessageSquare, color: "text-purple-600" },
    { title: "Engagement Rate", value: "68%", change: "+5%", icon: TrendingUp, color: "text-orange-600" },
  ];

  const recentPosts = [
    { title: "Getting Started with React 18", status: "Published", views: "1.2K", date: "2024-01-15" },
    { title: "Modern CSS Techniques", status: "Draft", views: "0", date: "2024-01-14" },
    { title: "JavaScript Best Practices", status: "Published", views: "856", date: "2024-01-13" },
    { title: "Building Responsive Layouts", status: "Published", views: "2.1K", date: "2024-01-12" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin!</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your blog today.</p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Posts</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{post.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views} views
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={post.status === "Published" ? "default" : "secondary"}>
                      {post.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3 h-12 bg-primary hover:bg-primary/90">
                <Plus className="w-5 h-5" />
                Create New Post
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <FileText className="w-5 h-5" />
                Manage Categories
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <MessageSquare className="w-5 h-5" />
                Review Comments
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <TrendingUp className="w-5 h-5" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
