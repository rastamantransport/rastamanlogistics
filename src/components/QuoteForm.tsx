import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface QuoteFormProps {
  compact?: boolean;
}

const QuoteForm = ({ compact = false }: QuoteFormProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { data[key] = value.toString(); });

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "quote" }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to send");

      toast.success("Quote request submitted! We'll contact you shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="c-name" className="text-sm text-foreground">Name</Label>
          <Input id="c-name" name="name" required placeholder="Your name" className="bg-secondary border-border" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-phone" className="text-sm text-foreground">Phone</Label>
          <Input id="c-phone" name="phone" type="tel" required placeholder="(555) 555-5555" className="bg-secondary border-border" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-email" className="text-sm text-foreground">Email</Label>
          <Input id="c-email" name="email" type="email" required placeholder="you@email.com" className="bg-secondary border-border" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-vehicle" className="text-sm text-foreground">Vehicle Type</Label>
          <Input id="c-vehicle" name="vehicle" required placeholder="e.g. 2024 BMW X5" className="bg-secondary border-border" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-pickup" className="text-sm text-foreground">Pickup ZIP</Label>
          <Input id="c-pickup" name="pickupZip" required placeholder="Pickup ZIP code" className="bg-secondary border-border" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-delivery" className="text-sm text-foreground">Delivery ZIP</Label>
          <Input id="c-delivery" name="deliveryZip" required placeholder="Delivery ZIP code" className="bg-secondary border-border" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-foreground">Transport Type</Label>
          <Select name="transportType">
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open Transport</SelectItem>
              <SelectItem value="enclosed">Enclosed Transport</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90">
            {loading ? "Submitting..." : "Get Free Quote"}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-1.5">
        <Label htmlFor="f-name" className="text-sm text-foreground">Full Name *</Label>
        <Input id="f-name" name="name" required placeholder="Your full name" className="bg-secondary border-border" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="f-phone" className="text-sm text-foreground">Phone *</Label>
        <Input id="f-phone" name="phone" type="tel" required placeholder="(555) 555-5555" className="bg-secondary border-border" />
      </div>
      <div className="md:col-span-2 space-y-1.5">
        <Label htmlFor="f-email" className="text-sm text-foreground">Email *</Label>
        <Input id="f-email" name="email" type="email" required placeholder="you@email.com" className="bg-secondary border-border" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="f-pickup" className="text-sm text-foreground">Pickup City / ZIP *</Label>
        <Input id="f-pickup" name="pickupLocation" required placeholder="City or ZIP code" className="bg-secondary border-border" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="f-delivery" className="text-sm text-foreground">Delivery City / ZIP *</Label>
        <Input id="f-delivery" name="deliveryLocation" required placeholder="City or ZIP code" className="bg-secondary border-border" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="f-year" className="text-sm text-foreground">Vehicle Year</Label>
        <Input id="f-year" name="vehicleYear" placeholder="e.g. 2024" className="bg-secondary border-border" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="f-make" className="text-sm text-foreground">Vehicle Make / Model *</Label>
        <Input id="f-make" name="vehicleMakeModel" required placeholder="e.g. BMW X5" className="bg-secondary border-border" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-sm text-foreground">Condition</Label>
        <Select name="condition">
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="non-running">Non-Running</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label className="text-sm text-foreground">Transport Type</Label>
        <Select name="transportType">
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open Transport</SelectItem>
            <SelectItem value="enclosed">Enclosed Transport</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="f-date" className="text-sm text-foreground">First Available Date</Label>
        <Input id="f-date" name="availableDate" type="date" className="bg-secondary border-border" />
      </div>
      <div className="md:col-span-2 space-y-1.5">
        <Label htmlFor="f-notes" className="text-sm text-foreground">Additional Notes</Label>
        <Textarea id="f-notes" name="notes" placeholder="Any special instructions or details..." className="bg-secondary border-border min-h-[80px]" />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground font-bold text-base py-6 hover:opacity-90">
          {loading ? "Submitting Your Request..." : "Submit Quote Request"}
        </Button>
      </div>
    </form>
  );
};

export default QuoteForm;
