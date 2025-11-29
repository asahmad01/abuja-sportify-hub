import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const posts = [
    {
      title: "5 Best Gyms in Abuja for Beginners",
      excerpt: "Starting your fitness journey? Here are the top gyms perfect for beginners in Abuja.",
      date: "Jan 15, 2025",
      readTime: "5 min read",
      category: "Fitness",
    },
    {
      title: "How to Book Your First Tennis Court",
      excerpt: "A complete guide to finding and booking tennis courts through Spotts.",
      date: "Jan 12, 2025",
      readTime: "3 min read",
      category: "Guide",
    },
    {
      title: "Top Sports Facilities Coming to Abuja",
      excerpt: "Exciting new sports venues and fitness centers opening soon in the capital.",
      date: "Jan 10, 2025",
      readTime: "4 min read",
      category: "News",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Spotts <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tips, guides, and news about sports, fitness, and healthy living in Abuja.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={index}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5"></div>
                  <div className="p-6 space-y-4">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <Button variant="link" className="p-0 h-auto gap-2">
                      Read More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
