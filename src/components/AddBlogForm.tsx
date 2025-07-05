
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AddBlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
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
      title: status === "draft" ? "Draft Saved" : "Blog Published",
      description: `Your blog post has been ${status === "draft" ? "saved as draft" : "published successfully"}.`,
    });
    console.log('Blog data:', { ...formData, status, image: uploadedImage });
  };

  const removeImage = () => setUploadedImage(null);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog</h1>
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

      <div className="space-y-6">
        {/* Title and Description */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Blog Details</CardTitle>
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
                placeholder="Brief description of your post..."
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary/50 transition-colors relative">
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
            <div className="min-h-96">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                modules={quillModules}
                placeholder="Write your blog content here..."
                style={{ height: '300px', marginBottom: '50px' }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
