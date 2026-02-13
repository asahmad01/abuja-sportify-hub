import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import StaticPhoneShowcase from "@/components/StaticPhoneShowcase";
import { CheckCircle, Calendar, DollarSign, BarChart3, Clock, Users, Shield, Zap, ArrowRight, LayoutDashboard, TrendingUp, UserCheck } from "lucide-react";

const BecomePartner = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                <span className="text-sm font-semibold text-accent">Partner Program</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold italic">
                Simplify Court
                <br />
                <span className="gradient-text">Management</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join Spotts and transform how you manage your sports facility. Increase bookings, streamline operations, and grow your revenue with our all-in-one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 gap-2">
                  <Link to="/venue-onboarding">
                    Fill Venue Onboarding Form
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Have a venue?{" "}
                <Link to="/venue-onboarding" className="text-accent font-medium hover:underline">
                  Submit the onboarding form
                </Link>{" "}
                and we’ll get you on SPOTTS.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get started in just a few simple steps and start accepting bookings today
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Sign Up</h3>
                  <p className="text-muted-foreground">
                    Create your account and tell us about your facility
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/50 to-transparent"></div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Set Up</h3>
                  <p className="text-muted-foreground">
                    Add your courts, pricing, and availability
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/50 to-transparent"></div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Go Live</h3>
                  <p className="text-muted-foreground">
                    Launch your listing and start receiving bookings
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/50 to-transparent"></div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-bold">Grow</h3>
                  <p className="text-muted-foreground">
                    Track performance and optimize with our analytics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Showcase Intro */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Powerful Dashboard,
                <br />
                <span className="text-accent">Simple Interface</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Manage your entire facility from one intuitive dashboard. Track bookings, monitor revenue, and gain insights into your business performance.
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Section 1: Overview */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <LayoutDashboard className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600">Overview Dashboard</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  See Everything
                  <br />
                  <span className="text-blue-600">At a Glance</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Your complete business overview in one screen. Monitor today's bookings, track revenue, see occupancy rates, and identify peak hours instantly.
                </p>

                {/* Key Features */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Today's Performance</h4>
                      <p className="text-muted-foreground">Real-time stats on bookings, revenue, and court utilization</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Upcoming Schedule</h4>
                      <p className="text-muted-foreground">Quick view of next bookings and available slots</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Growth Metrics</h4>
                      <p className="text-muted-foreground">Compare performance with previous periods</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - 3 Screenshots */}
              <div className="flex justify-center">
                <StaticPhoneShowcase
                  screens={[
                    {
                      title: "Key Metrics",
                      description: "Today's revenue and bookings",
                      screenshot: "https://placehold.co/400x800/3b82f6/white?text=Overview+Top"
                    },
                    {
                      title: "Performance Charts",
                      description: "Visual trends and analytics",
                      screenshot: "https://placehold.co/400x800/3b82f6/white?text=Overview+Graphs"
                    },
                    {
                      title: "Quick Actions",
                      description: "Recent activity feed",
                      screenshot: "https://placehold.co/400x800/3b82f6/white?text=Overview+Actions"
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section 2: Bookings Management */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content - 3 Screenshots */}
              <div className="flex justify-center order-2 lg:order-1">
                <StaticPhoneShowcase
                  screens={[
                    {
                      title: "Calendar View",
                      description: "See all bookings at once",
                      screenshot: "https://placehold.co/400x800/f97316/white?text=Bookings+Calendar"
                    },
                    {
                      title: "Booking List",
                      description: "Upcoming reservations",
                      screenshot: "https://placehold.co/400x800/f97316/white?text=Bookings+List"
                    },
                    {
                      title: "Booking Details",
                      description: "Manage and modify bookings",
                      screenshot: "https://placehold.co/400x800/f97316/white?text=Booking+Details"
                    }
                  ]}
                />
              </div>

              {/* Right Content */}
              <div className="space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-semibold text-orange-600">Bookings Management</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Manage Bookings
                  <br />
                  <span className="text-orange-600">Effortlessly</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  View, manage, and organize all your bookings in one place. Calendar view, list view, and detailed booking information at your fingertips.
                </p>

                {/* Key Features */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Calendar Integration</h4>
                      <p className="text-muted-foreground">Visual calendar with drag-and-drop functionality</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Quick Actions</h4>
                      <p className="text-muted-foreground">Confirm, modify, or cancel bookings with one click</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Customer Details</h4>
                      <p className="text-muted-foreground">See customer info and booking history instantly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section 3: Revenue Analytics */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Revenue Analytics</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Track Earnings
                  <br />
                  <span className="text-green-600">& Growth Trends</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Comprehensive revenue insights and financial analytics. Monitor earnings, identify trends, and optimize your pricing strategy with powerful data visualization.
                </p>

                {/* Key Features */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Revenue Dashboard</h4>
                      <p className="text-muted-foreground">Real-time earnings with daily, weekly, and monthly views</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Performance Charts</h4>
                      <p className="text-muted-foreground">Visual graphs showing growth and peak revenue periods</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Payment Breakdown</h4>
                      <p className="text-muted-foreground">Detailed view of payment methods and transaction history</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - 3 Screenshots */}
              <div className="flex justify-center">
                <StaticPhoneShowcase
                  screens={[
                    {
                      title: "Revenue Overview",
                      description: "Total earnings and stats",
                      screenshot: "/behance images/dashboard.png"
                    },
                    {
                      title: "Growth Charts",
                      description: "Visual revenue trends",
                      screenshot: "https://placehold.co/400x800/10b981/white?text=Revenue+Graphs"
                    },
                    {
                      title: "Payment Analytics",
                      description: "Transaction breakdown",
                      screenshot: "https://placehold.co/400x800/10b981/white?text=Payment+Details"
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section 4: Customer Insights */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content - 3 Screenshots */}
              <div className="flex justify-center order-2 lg:order-1">
                <StaticPhoneShowcase
                  screens={[
                    {
                      title: "Customer Overview",
                      description: "Total customers and stats",
                      screenshot: "https://placehold.co/400x800/a855f7/white?text=Customer+Stats"
                    },
                    {
                      title: "Booking Patterns",
                      description: "Customer behavior trends",
                      screenshot: "https://placehold.co/400x800/a855f7/white?text=Booking+Patterns"
                    },
                    {
                      title: "Customer Details",
                      description: "Demographics and insights",
                      screenshot: "https://placehold.co/400x800/a855f7/white?text=Demographics"
                    }
                  ]}
                />
              </div>

              {/* Right Content */}
              <div className="space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  <UserCheck className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600">Customer Insights</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Understand Your
                  <br />
                  <span className="text-purple-600">Customers Better</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Gain valuable insights into your customer base. Track booking patterns, identify repeat customers, and understand demographics to improve your service.
                </p>

                {/* Key Features */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Customer Analytics</h4>
                      <p className="text-muted-foreground">Total customers, new vs returning, and loyalty metrics</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Booking Behavior</h4>
                      <p className="text-muted-foreground">See when and how often customers book your facilities</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Growth Tracking</h4>
                      <p className="text-muted-foreground">Monitor customer acquisition and retention rates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Partner With Spotts?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to succeed in one powerful platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Automated Booking System</h3>
                <p className="text-muted-foreground">
                  Accept bookings 24/7 with automatic confirmation and calendar management. No more phone calls or double bookings.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Increased Revenue</h3>
                <p className="text-muted-foreground">
                  Reach thousands of active users searching for sports facilities. Fill empty slots and maximize your court utilization.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Powerful Analytics</h3>
                <p className="text-muted-foreground">
                  Get detailed insights into booking patterns, peak hours, customer behavior, and revenue trends to make informed decisions.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Save Time</h3>
                <p className="text-muted-foreground">
                  Eliminate manual booking management, reduce administrative work, and focus on providing great customer experiences.
                </p>
              </div>

              {/* Benefit 5 */}
              <div className="p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Marketing & Exposure</h3>
                <p className="text-muted-foreground">
                  Get discovered by sports enthusiasts across Abuja. We handle the marketing so you can focus on operations.
                </p>
              </div>

              {/* Benefit 6 */}
              <div className="p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Accept digital payments securely with automatic payouts. Reduce cash handling and improve financial tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Platform Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                All the tools you need to run a successful sports facility
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-4">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Custom Availability Settings</h4>
                  <p className="text-sm text-muted-foreground">Set opening hours, block dates, and manage time slots easily</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Dynamic Pricing</h4>
                  <p className="text-sm text-muted-foreground">Set different prices for peak hours, weekends, and special events</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Instant Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get notified of new bookings, cancellations, and customer messages</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Customer Management</h4>
                  <p className="text-sm text-muted-foreground">Build relationships with detailed customer profiles and booking history</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Mobile Dashboard</h4>
                  <p className="text-sm text-muted-foreground">Manage your facility on-the-go with our mobile-friendly dashboard</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">24/7 Support</h4>
                  <p className="text-sm text-muted-foreground">Get help whenever you need it from our dedicated support team</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Ready to Get Started?</h2>
              <p className="text-xl text-white/90">
                Join hundreds of sports facilities already using Spotts to grow their business. No setup fees, no long-term contracts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-white text-accent hover:bg-white/90 rounded-full px-8 gap-2">
                  <Link to="/venue-onboarding">
                    Fill Venue Onboarding Form
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomePartner;
