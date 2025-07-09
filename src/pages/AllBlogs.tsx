
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const navigate = useNavigate();

  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "Getting Started with React",
      description: "Learn the basics of React development",
      status: "Published",
      date: "2024-01-15",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Modern CSS Techniques",
      description: "Explore the latest CSS features and techniques",
      status: "Draft",
      date: "2024-01-14",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "JavaScript Best Practices",
      description: "Write better JavaScript code with these tips",
      status: "Published",
      date: "2024-01-13",
      image: "/placeholder.svg"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Blogs</h1>
            <p className="text-gray-600 mt-1">Manage your blog posts</p>
          </div>
          <Button 
            className="gap-2 bg-primary hover:bg-primary/90"
            onClick={() => navigate('/add-blog')}
          >
            <Plus className="w-4 h-4" />
            New Blog
          </Button>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge variant={blog.status === "Published" ? "default" : "secondary"}>
                      {blog.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{blog.date}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                    <p className="text-gray-600 text-sm">{blog.description}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {blogs.length === 0 && (
          <Card className="shadow-sm">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs yet</h3>
              <p className="text-gray-600 mb-4">Start by creating your first blog post</p>
              <Button onClick={() => navigate('/add-blog')}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Blog
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AllBlogs;
