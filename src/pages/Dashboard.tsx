
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to BlogCMS</h1>
            <p className="text-gray-600 mt-1">Manage your blog content easily</p>
          </div>
          <Button 
            className="gap-2 bg-primary hover:bg-primary/90"
            onClick={() => navigate('/add-blog')}
          >
            <Plus className="w-4 h-4" />
            New Blog
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/add-blog')}>
            <CardHeader className="text-center">
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Blog
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Start writing a new blog post</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/blogs')}>
            <CardHeader className="text-center">
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                View All Blogs
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Manage your existing blog posts</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
