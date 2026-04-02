import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface VenueListingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VenueListingForm = ({ open, onOpenChange }: VenueListingFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    venueName: "",
    location: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("YOUR_FORMSPREE_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "Venue Listing",
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "We've received your venue information. Our team will contact you soon!",
        });
        setFormData({ name: "", email: "", phone: "", venueName: "", location: "", description: "" });
        onOpenChange(false);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">List Your Venue</DialogTitle>
          <DialogDescription>
            Join our platform and connect with sports enthusiasts. We'll reach out to discuss partnership opportunities.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="owner-name">Your Full Name *</Label>
            <Input
              id="owner-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner-email">Email *</Label>
            <Input
              id="owner-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner-phone">Phone Number *</Label>
            <Input
              id="owner-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+234 xxx xxx xxxx"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue-name">Venue Name *</Label>
            <Input
              id="venue-name"
              required
              value={formData.venueName}
              onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              placeholder="e.g., ABC Sports Complex"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue-location">Location in Abuja *</Label>
            <Input
              id="venue-location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Wuse 2, Abuja"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue-description">Brief Description *</Label>
            <Textarea
              id="venue-description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about your venue, available facilities, and sports offered..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? "Submitting..." : "Submit Venue Information"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VenueListingForm;
