
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Save, Eye, Calendar, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AddBlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    category: "",
    tags: "",
    status: "draft"
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (status: "draft" | "published") => {
    setFormData(prev => ({ ...prev, status }));
    toast({
      title: status === "draft" ? "Draft Saved" : "Post Published",
      description: `Your blog post has been ${status === "draft" ? "saved as draft" : "published successfully"}.`,
    });
  };

  const removeImage = () => setUploadedImage(null);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600 mt-1">Share your thoughts with the world</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleSubmit("draft")} className="gap-2">
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit("published")} className="gap-2 bg-primary hover:bg-primary/90">
            <Eye className="w-4 h-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter your blog post title..."
                  className="mt-1 text-lg"
                />
              </div>

              <div>
                <Label htmlFor="shortDescription" className="text-sm font-medium">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Brief description of your post (appears in previews)..."
                  className="mt-1 resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              {!uploadedImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-gray-600">Upload your featured image</p>
                    <p className="text-sm text-gray-500">Drag and drop or click to browse</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Rich Text Editor Toolbar */}
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-t-lg border">
                  <Button size="sm" variant="ghost" className="text-xs">Bold</Button>
                  <Button size="sm" variant="ghost" className="text-xs">Italic</Button>
                  <Button size="sm" variant="ghost" className="text-xs">Link</Button>
                  <Button size="sm" variant="ghost" className="text-xs">List</Button>
                  <Button size="sm" variant="ghost" className="text-xs">Quote</Button>
                  <Button size="sm" variant="ghost" className="text-xs">Image</Button>
                </div>
                
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your blog content here... You can use Markdown formatting."
                  className="min-h-96 border-t-0 rounded-t-none resize-none font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Publish Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Add tags separated by commas"
                />
                <div className="flex flex-wrap gap-2">
                  {formData.tags.split(',').filter(tag => tag.trim()).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Preview */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">SEO Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-blue-600 text-sm font-medium truncate">
                  {formData.title || "Your blog post title"}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {formData.shortDescription || "Your short description will appear here..."}
                </p>
                <p className="text-xs text-green-600">yourblog.com/posts/slug-here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
