import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

type ChildField = {
  id: string;
  name: string;
  pricePerHour: string;
};

type AdditionalSport = {
  id: string;
  sport: string;
  pricePerHour: string;
};

type CourtField = {
  id: string;
  courtName: string;
  pricePerHour: string;
  indoorOutdoor: string;
  isDivisible: boolean;
  childFields: ChildField[];
  canBookChildrenSeparately: boolean;
  isMultiSport: boolean;
  additionalSports: AdditionalSport[];
};

type SportCourtsBlock = {
  id: string;
  sport: string;
  courts: CourtField[];
};

type MembershipPlan = {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
};

type DayHours = { open: string; close: string; closed: boolean };

const emptyDayHours = (): DayHours => ({ open: "", close: "", closed: false });

// Create a new form at formspree.io for "Venue Onboarding" and replace YOUR_VENUE_ONBOARDING_FORM_ID with your form ID
const FORMSPREE_VENUE_ONBOARDING_ENDPOINT = "https://formspree.io/f/mjgeynko";

const VenueOnboardingForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [venueName, setVenueName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [sportsOffered, setSportsOffered] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const newCourt = (): CourtField => ({
    id: crypto.randomUUID(),
    courtName: "",
    pricePerHour: "",
    indoorOutdoor: "",
    isDivisible: false,
    childFields: [],
    canBookChildrenSeparately: true,
    isMultiSport: false,
    additionalSports: [],
  });

  const [sportCourtsBlocks, setSportCourtsBlocks] = useState<SportCourtsBlock[]>([
    { id: crypto.randomUUID(), sport: "", courts: [newCourt()] },
  ]);

  const [offersMemberships, setOffersMemberships] = useState(false);
  const [memberships, setMemberships] = useState<MembershipPlan[]>([]);

  const addMembership = () => {
    setMemberships((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", duration: "", price: "", description: "" },
    ]);
  };

  const removeMembership = (id: string) => {
    setMemberships((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMembership = (id: string, field: keyof MembershipPlan, value: string) => {
    setMemberships((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const [hours, setHours] = useState<Record<string, DayHours>>(
    DAYS.reduce((acc, d) => ({ ...acc, [d]: emptyDayHours() }), {} as Record<string, DayHours>)
  );

  const addSportBlock = () => {
    setSportCourtsBlocks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sport: "", courts: [newCourt()] },
    ]);
  };

  const removeSportBlock = (blockId: string) => {
    if (sportCourtsBlocks.length <= 1) return;
    setSportCourtsBlocks((prev) => prev.filter((b) => b.id !== blockId));
  };

  const updateSportBlock = (blockId: string, field: keyof SportCourtsBlock, value: string | CourtField[]) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, [field]: value } : b))
    );
  };

  const addCourt = (blockId: string) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? { ...b, courts: [...b.courts, newCourt()] }
          : b
      )
    );
  };

  const removeCourt = (blockId: string, courtId: string) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId ? { ...b, courts: b.courts.filter((c) => c.id !== courtId) } : b
      )
    );
  };

  const updateCourt = (blockId: string, courtId: string, field: keyof CourtField, value: string) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? { ...b, courts: b.courts.map((c) => (c.id === courtId ? { ...c, [field]: value } : c)) }
          : b
      )
    );
  };

  const updateCourtField = (blockId: string, courtId: string, updates: Partial<CourtField>) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? { ...b, courts: b.courts.map((c) => (c.id === courtId ? { ...c, ...updates } : c)) }
          : b
      )
    );
  };

  const addChildField = (blockId: string, courtId: string) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              courts: b.courts.map((c) =>
                c.id === courtId
                  ? { ...c, childFields: [...c.childFields, { id: crypto.randomUUID(), name: "", pricePerHour: "" }] }
                  : c
              ),
            }
          : b
      )
    );
  };

  const removeChildField = (blockId: string, courtId: string, childId: string) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              courts: b.courts.map((c) =>
                c.id === courtId
                  ? { ...c, childFields: c.childFields.filter((cf) => cf.id !== childId) }
                  : c
              ),
            }
          : b
      )
    );
  };

  const updateChildField = (blockId: string, courtId: string, childId: string, field: keyof ChildField, value: string) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              courts: b.courts.map((c) =>
                c.id === courtId
                  ? { ...c, childFields: c.childFields.map((cf) => (cf.id === childId ? { ...cf, [field]: value } : cf)) }
                  : c
              ),
            }
          : b
      )
    );
  };

  const addAdditionalSport = (blockId: string, courtId: string) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              courts: b.courts.map((c) =>
                c.id === courtId
                  ? { ...c, additionalSports: [...c.additionalSports, { id: crypto.randomUUID(), sport: "", pricePerHour: "" }] }
                  : c
              ),
            }
          : b
      )
    );
  };

  const removeAdditionalSport = (blockId: string, courtId: string, sportId: string) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              courts: b.courts.map((c) =>
                c.id === courtId
                  ? { ...c, additionalSports: c.additionalSports.filter((s) => s.id !== sportId) }
                  : c
              ),
            }
          : b
      )
    );
  };

  const updateAdditionalSport = (blockId: string, courtId: string, sportId: string, field: keyof AdditionalSport, value: string) => {
    setSportCourtsBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              courts: b.courts.map((c) =>
                c.id === courtId
                  ? { ...c, additionalSports: c.additionalSports.map((s) => (s.id === sportId ? { ...s, [field]: value } : s)) }
                  : c
              ),
            }
          : b
      )
    );
  };

  const setDayHours = (day: string, field: "open" | "close" | "closed", value: string | boolean) => {
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const buildPayload = () => {
    // Build a flat, human-readable payload so Formspree emails look clean
    const lines: string[] = [];

    lines.push("=== VENUE DETAILS ===");
    lines.push(`Venue Name: ${venueName}`);
    lines.push(`Address: ${address}`);
    lines.push(`Phone: ${phone}`);
    lines.push(`Email: ${email}`);

    lines.push("");
    lines.push("=== SPORTS OFFERED ===");
    lines.push(sportsOffered.trim() || "(not provided)");

    lines.push("");
    lines.push("=== COURTS & FIELDS ===");
    sportCourtsBlocks.forEach((block, bi) => {
      lines.push(`\nSport ${bi + 1}: ${block.sport || "(not specified)"}`);
      block.courts.forEach((c, ci) => {
        lines.push(`  Court ${ci + 1}: ${c.courtName || "(unnamed)"} — ₦${c.pricePerHour || "?"}/hr — ${c.indoorOutdoor || "?"}`);
        if (c.isDivisible) {
          lines.push(`    ↳ Divisible: Yes`);
          c.childFields.forEach((cf) => {
            lines.push(`      • ${cf.name || "(unnamed)"} — ₦${cf.pricePerHour || "?"}/hr`);
          });
          lines.push(`      Can book remaining sub-fields separately: ${c.canBookChildrenSeparately ? "Yes" : "No"}`);
        }
        if (c.isMultiSport) {
          lines.push(`    ↳ Multi-sport: Yes`);
          c.additionalSports.forEach((s) => {
            lines.push(`      • ${s.sport || "(unnamed)"} — ₦${s.pricePerHour || "?"}/hr`);
          });
        }
      });
    });

    if (offersMemberships && memberships.length > 0) {
      lines.push("");
      lines.push("=== MEMBERSHIPS ===");
      memberships.forEach((m, i) => {
        lines.push(`  Plan ${i + 1}: ${m.name || "(unnamed)"} — ${m.duration || "?"} — ₦${m.price || "?"}`);
        if (m.description) lines.push(`    Includes: ${m.description}`);
      });
    }

    lines.push("");
    lines.push("=== OPERATING HOURS ===");
    DAYS.forEach((day) => {
      if (hours[day]?.closed) {
        lines.push(`  ${day}: CLOSED`);
      } else {
        lines.push(`  ${day}: ${hours[day]?.open || "—"} – ${hours[day]?.close || "—"}`);
      }
    });

    if (additionalNotes.trim()) {
      lines.push("");
      lines.push("=== ADDITIONAL NOTES ===");
      lines.push(additionalNotes.trim());
    }

    return {
      _subject: `SPOTTS Venue Onboarding: ${venueName}`,
      "Venue Name": venueName,
      "Email": email,
      "Phone": phone,
      message: lines.join("\n"),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(FORMSPREE_VENUE_ONBOARDING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (response.ok) {
        toast({
          title: "Submitted successfully",
          description: "Your venue onboarding form has been received. We'll be in touch soon!",
        });
        // Optional: reset form if you want
      } else {
        throw new Error("Submit failed");
      }
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
    <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl mx-auto">
      {/* 1. Basic Information */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">1. Basic Information</h2>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="venueName">Venue Name *</Label>
            <Input
              id="venueName"
              required
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              placeholder="e.g. ABC Sports Complex"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+234 ..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (booking notifications will be sent here) *</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="venue@example.com"
            />
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="description">Brief Description of Your Venue (2–3 sentences) *</Label>
            <Textarea
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your venue, location, and atmosphere..."
              rows={3}
            />
          </div> */}
        </div>
      </section>

      {/* 2. Sports You Offer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">2. Sports You Offer</h2>
        <div className="space-y-2">
          <Label>Please list all the sports available at your venue</Label>
          <Textarea
            value={sportsOffered}
            onChange={(e) => setSportsOffered(e.target.value)}
            placeholder="e.g. Football, Basketball, Tennis, Badminton"
            rows={2}
          />
        </div>
      </section>

      {/* 3. Courts / Fields */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">3. Courts / Fields</h2>
        <p className="text-muted-foreground text-sm">
          For each sport, list all courts/fields. You can mark any court as divisible or multi-sport below.
        </p>
        {sportCourtsBlocks.map((block) => (
          <div key={block.id} className="rounded-lg border p-4 space-y-4 bg-muted/30">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex-1 min-w-[180px] space-y-2">
                <Label>Sport</Label>
                <Input
                  value={block.sport}
                  onChange={(e) => updateSportBlock(block.id, "sport", e.target.value)}
                  placeholder="e.g. Football"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeSportBlock(block.id)}
                disabled={sportCourtsBlocks.length <= 1}
                title="Remove this sport block"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4 pl-2 border-l-2 border-primary/20">
              {block.courts.map((court) => (
                <div key={court.id} className="space-y-3 rounded-md border border-border/50 p-3 bg-background/50">
                  {/* Basic court info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-end">
                    <div className="space-y-1">
                      <Label className="text-xs">Court/Field Name</Label>
                      <Input
                        value={court.courtName}
                        onChange={(e) => updateCourt(block.id, court.id, "courtName", e.target.value)}
                        placeholder="e.g. Court A"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Price per hour (₦)</Label>
                      <Input
                        type="number"
                        min={0}
                        value={court.pricePerHour}
                        onChange={(e) => updateCourt(block.id, court.id, "pricePerHour", e.target.value)}
                        placeholder="5000"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Indoor or Outdoor</Label>
                      <Input
                        value={court.indoorOutdoor}
                        onChange={(e) => updateCourt(block.id, court.id, "indoorOutdoor", e.target.value)}
                        placeholder="Indoor / Outdoor"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCourt(block.id, court.id)}
                      disabled={block.courts.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Divisible toggle */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`div-${court.id}`}
                        checked={court.isDivisible}
                        onCheckedChange={(checked) =>
                          updateCourtField(block.id, court.id, { isDivisible: checked === true })
                        }
                      />
                      <Label htmlFor={`div-${court.id}`} className="text-sm font-normal cursor-pointer">
                        Can this field be divided into smaller fields? (e.g. 10-a-side into 2x 5-a-side)
                      </Label>
                    </div>
                    {court.isDivisible && (
                      <div className="ml-6 space-y-2 rounded border border-dashed border-primary/30 p-3">
                        <p className="text-xs text-muted-foreground">Add each sub-field with its own name and price.</p>
                        {court.childFields.map((cf) => (
                          <div key={cf.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
                            <div className="space-y-1">
                              <Label className="text-xs">Sub-field Name</Label>
                              <Input
                                value={cf.name}
                                onChange={(e) => updateChildField(block.id, court.id, cf.id, "name", e.target.value)}
                                placeholder="e.g. 5-a-side A"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Price per hour (₦)</Label>
                              <Input
                                type="number"
                                min={0}
                                value={cf.pricePerHour}
                                onChange={(e) => updateChildField(block.id, court.id, cf.id, "pricePerHour", e.target.value)}
                                placeholder="8000"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeChildField(block.id, court.id, cf.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addChildField(block.id, court.id)}
                          className="gap-1"
                        >
                          <Plus className="h-4 w-4" /> Add sub-field
                        </Button>
                        <div className="flex items-center gap-2 pt-1">
                          <Checkbox
                            id={`sep-${court.id}`}
                            checked={court.canBookChildrenSeparately}
                            onCheckedChange={(checked) =>
                              updateCourtField(block.id, court.id, { canBookChildrenSeparately: checked === true })
                            }
                          />
                          <Label htmlFor={`sep-${court.id}`} className="text-sm font-normal cursor-pointer">
                            Can remaining sub-fields be booked separately when one is taken?
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Multi-sport toggle */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`multi-${court.id}`}
                        checked={court.isMultiSport}
                        onCheckedChange={(checked) =>
                          updateCourtField(block.id, court.id, { isMultiSport: checked === true })
                        }
                      />
                      <Label htmlFor={`multi-${court.id}`} className="text-sm font-normal cursor-pointer">
                        Is this a multi-sport court? (e.g. a hall used for both basketball and badminton)
                      </Label>
                    </div>
                    {court.isMultiSport && (
                      <div className="ml-6 space-y-2 rounded border border-dashed border-primary/30 p-3">
                        <p className="text-xs text-muted-foreground">Add the other sports this court is used for and their prices.</p>
                        {court.additionalSports.map((s) => (
                          <div key={s.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
                            <div className="space-y-1">
                              <Label className="text-xs">Sport</Label>
                              <Input
                                value={s.sport}
                                onChange={(e) => updateAdditionalSport(block.id, court.id, s.id, "sport", e.target.value)}
                                placeholder="e.g. Badminton"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Price per hour (₦)</Label>
                              <Input
                                type="number"
                                min={0}
                                value={s.pricePerHour}
                                onChange={(e) => updateAdditionalSport(block.id, court.id, s.id, "pricePerHour", e.target.value)}
                                placeholder="4000"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeAdditionalSport(block.id, court.id, s.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addAdditionalSport(block.id, court.id)}
                          className="gap-1"
                        >
                          <Plus className="h-4 w-4" /> Add sport
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addCourt(block.id)} className="gap-1">
                <Plus className="h-4 w-4" /> Add court/field
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addSportBlock} className="gap-1">
          <Plus className="h-4 w-4" /> Add another sport
        </Button>
      </section>

      {/* 4. Memberships */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">4. Memberships</h2>
        <div className="flex items-center gap-2">
          <Checkbox
            id="offersMemberships"
            checked={offersMemberships}
            onCheckedChange={(checked) => {
              const val = checked === true;
              setOffersMemberships(val);
              if (val && memberships.length === 0) addMembership();
            }}
          />
          <Label htmlFor="offersMemberships" className="text-sm font-normal cursor-pointer">
            Does your venue offer memberships? (e.g. monthly gym pass, annual membership)
          </Label>
        </div>
        {offersMemberships && (
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">
              Add each membership plan you offer with its name, duration, and price.
            </p>
            {memberships.map((m) => (
              <div key={m.id} className="rounded-lg border p-4 space-y-3 bg-muted/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-end">
                  <div className="space-y-1">
                    <Label className="text-xs">Plan Name</Label>
                    <Input
                      value={m.name}
                      onChange={(e) => updateMembership(m.id, "name", e.target.value)}
                      placeholder="e.g. Gold Membership"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Duration</Label>
                    <Input
                      value={m.duration}
                      onChange={(e) => updateMembership(m.id, "duration", e.target.value)}
                      placeholder="e.g. 1 Month, 3 Months, 1 Year"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Price (₦)</Label>
                    <Input
                      type="number"
                      min={0}
                      value={m.price}
                      onChange={(e) => updateMembership(m.id, "price", e.target.value)}
                      placeholder="25000"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMembership(m.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">What's included? (optional)</Label>
                  <Input
                    value={m.description}
                    onChange={(e) => updateMembership(m.id, "description", e.target.value)}
                    placeholder="e.g. Unlimited gym access, 2 free court bookings per week"
                  />
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addMembership} className="gap-1">
              <Plus className="h-4 w-4" /> Add membership plan
            </Button>
          </div>
        )}
      </section>

      {/* 5. Operating Hours */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">5. Operating Hours</h2>
        <p className="text-muted-foreground text-sm">Set your opening and closing times, or mark the day as closed.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Day</th>
                <th className="text-left py-2 pr-4">Opening Time</th>
                <th className="text-left py-2 pr-4">Closing Time</th>
                <th className="text-left py-2">Closed?</th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day) => (
                <tr key={day} className="border-b">
                  <td className="py-2 pr-4 font-medium">{day}</td>
                  <td className="py-2 pr-4">
                    <Input
                      value={hours[day]?.closed ? "" : (hours[day]?.open ?? "")}
                      onChange={(e) => setDayHours(day, "open", e.target.value)}
                      placeholder="e.g. 08:00"
                      className="max-w-[140px]"
                      disabled={hours[day]?.closed}
                    />
                  </td>
                  <td className="py-2 pr-4">
                    <Input
                      value={hours[day]?.closed ? "" : (hours[day]?.close ?? "")}
                      onChange={(e) => setDayHours(day, "close", e.target.value)}
                      placeholder="e.g. 22:00"
                      className="max-w-[140px]"
                      disabled={hours[day]?.closed}
                    />
                  </td>
                  <td className="py-2">
                    <Checkbox
                      id={`closed-${day}`}
                      checked={hours[day]?.closed ?? false}
                      onCheckedChange={(checked) => setDayHours(day, "closed", checked === true)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Anything Else */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">6. Anything Else?</h2>
        <div className="space-y-2">
          <Label htmlFor="additionalNotes">If there's anything this form hasn't covered that you'd like us to know, feel free to add it here.</Label>
          <Textarea
            id="additionalNotes"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Type here..."
            rows={4}
          />
        </div>
      </section>

      <div className="pt-4">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
          {loading ? "Submitting..." : "Submit Venue Onboarding Form"}
        </Button>
      </div>
    </form>
  );
};

export default VenueOnboardingForm;
