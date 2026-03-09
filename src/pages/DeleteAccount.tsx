import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, AlertTriangle } from "lucide-react";
import ShootingStars from "@/components/ShootingStars";

// TODO: Replace with your Formspree endpoint (e.g. "https://formspree.io/f/xxxxx")
const FORMSPREE_ENDPOINT = "";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    comments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirmed) {
      toast({
        title: "Confirmation Required",
        description:
          "Please confirm that you understand this action is irreversible.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (FORMSPREE_ENDPOINT) {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            formType: "Account Deletion Request",
          }),
        });

        if (!response.ok) throw new Error("Failed to submit");
      }

      // Simulate a short delay for UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast({
        title: "Request Received",
        description:
          "Your account deletion request has been received. Our team will review it and confirm the deletion via email within 48 hours.",
      });
      setFormData({ name: "", email: "", reason: "", comments: "" });
      setConfirmed(false);
    } catch {
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
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold">
                Delete Your <span className="gradient-text">Account</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                We're sorry to see you go. Please fill out the form below to
                request your account deletion.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pt-0 pb-16 md:pb-24 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[48px] bg-black overflow-hidden">
              <ShootingStars />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/50 rounded-full blur-[100px] pointer-events-none z-0"></div>
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-blue-600/5 via-transparent to-transparent pointer-events-none z-0"></div>

              <div className="relative z-10 p-8 md:p-16">
                <div className="max-w-2xl mx-auto">
                  {/* Warning Banner */}
                  <div className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-xl flex gap-4 items-start">
                    <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-400 mb-2">
                        What happens when you delete your account
                      </h3>
                      <ul className="text-white/70 space-y-1.5 text-sm list-disc pl-4">
                        <li>
                          Your personal information (name, email, phone number) will be permanently deleted
                        </li>
                        <li>
                          All active bookings will be cancelled — refunds will be processed in line with the venue's cancellation policy where applicable
                        </li>
                        <li>
                          You will lose access to your booking history and preferences
                        </li>
                        <li>
                          Transaction records will be anonymized and retained for 7 years as required by Nigerian financial regulations, then securely deleted
                        </li>
                        <li>This action cannot be undone</li>
                        <li>You will receive a confirmation email once deletion is complete</li>
                      </ul>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Your full name"
                          className="h-12 bg-white/10 border-white/20 placeholder:text-white/50 text-white rounded-xl focus:bg-white/15 focus:border-white/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Registered Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="Email linked to your account"
                          className="h-12 bg-white/10 border-white/20 placeholder:text-white/50 text-white rounded-xl focus:bg-white/15 focus:border-white/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason" className="text-white">
                        Reason for Deletion
                      </Label>
                      <Select
                        required
                        value={formData.reason}
                        onValueChange={(value) =>
                          setFormData({ ...formData, reason: value })
                        }
                      >
                        <SelectTrigger className="h-12 bg-white/10 border-white/20 text-white rounded-xl focus:bg-white/15 focus:border-white/40 [&>span]:text-white/50 [&[data-state=open]>span]:text-white data-[state=closed]:text-white/50">
                          <SelectValue placeholder="Why are you deleting your account?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="No longer using the service">
                            No longer using the service
                          </SelectItem>
                          <SelectItem value="Privacy concerns">
                            Privacy concerns
                          </SelectItem>
                          <SelectItem value="Found an alternative">
                            Found an alternative
                          </SelectItem>
                          <SelectItem value="Too many notifications">
                            Too many notifications
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comments" className="text-white">
                        Additional Comments{" "}
                        <span className="text-white/40">(optional)</span>
                      </Label>
                      <Textarea
                        id="comments"
                        value={formData.comments}
                        onChange={(e) =>
                          setFormData({ ...formData, comments: e.target.value })
                        }
                        placeholder="Anything else you'd like us to know..."
                        rows={4}
                        className="bg-white/10 border-white/20 placeholder:text-white/50 text-white rounded-xl focus:bg-white/15 focus:border-white/40 resize-none"
                      />
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <Checkbox
                        id="confirm"
                        checked={confirmed}
                        onCheckedChange={(checked) =>
                          setConfirmed(checked === true)
                        }
                        className="mt-0.5 border-white/30 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      />
                      <Label
                        htmlFor="confirm"
                        className="text-white/80 text-sm leading-relaxed cursor-pointer"
                      >
                        I understand that deleting my account is permanent and
                        irreversible. All my personal data will be erased and I
                        will lose access to my bookings and account.
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading || !confirmed}
                      className="w-full h-12 bg-red-600 text-white hover:bg-red-700 rounded-xl font-semibold gap-2 shadow-lg disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Request Account Deletion"}
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>

                  {/* Help Section */}
                  <div className="mt-12 p-8 bg-white/10 backdrop-blur-sm rounded-lg text-center border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Need help instead?
                    </h3>
                    <p className="text-white/70 mb-4">
                      If you're having issues with your account, our support team
                      might be able to help before you delete.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href="/support"
                        className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
                      >
                        Contact Support
                      </a>
                      <span className="hidden sm:inline text-white/40">
                        &bull;
                      </span>
                      <a
                        href="mailto:info@spottsapp.com"
                        className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
                      >
                        info@spottsapp.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DeleteAccount;
