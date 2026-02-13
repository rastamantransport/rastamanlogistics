import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Star, Check, X, LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [filter, setFilter] = useState<"pending" | "approved" | "all">("pending");

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .single();

      if (roles?.role !== "admin") {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }
      setAuthed(true);
      setChecking(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/admin/login");
    });

    check();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: authed,
  });

  const approveMutation = useMutation({
    mutationFn: async ({ id, approved }: { id: string; approved: boolean }) => {
      const { error } = await supabase.from("reviews").update({ approved }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Review updated.");
    },
    onError: () => toast.error("Failed to update review."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Review deleted.");
    },
    onError: () => toast.error("Failed to delete review."),
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const filtered = reviews?.filter((r) => {
    if (filter === "pending") return !r.approved;
    if (filter === "approved") return r.approved;
    return true;
  });

  const pendingCount = reviews?.filter((r) => !r.approved).length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-14">
          <h1 className="text-lg font-bold font-display text-foreground">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold font-display text-foreground">Review Management</h2>
            <p className="text-sm text-muted-foreground">
              {pendingCount} review{pendingCount !== 1 ? "s" : ""} pending approval
            </p>
          </div>
          <div className="flex gap-2">
            {(["pending", "approved", "all"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={filter === f ? "bg-gradient-gold text-primary-foreground" : ""}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground text-sm">{r.name}</span>
                    {r.location && (
                      <span className="text-xs text-muted-foreground">— {r.location}</span>
                    )}
                    <span
                      className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
                        r.approved
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {r.approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">"{r.message}"</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2 sm:flex-col shrink-0">
                  {!r.approved && (
                    <Button
                      size="sm"
                      onClick={() => approveMutation.mutate({ id: r.id, approved: true })}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4 mr-1" /> Approve
                    </Button>
                  )}
                  {r.approved && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => approveMutation.mutate({ id: r.id, approved: false })}
                    >
                      Unapprove
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(r.id)}
                  >
                    <X className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No reviews in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
