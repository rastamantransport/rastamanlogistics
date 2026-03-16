
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { states } from "@/data/states";

const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster }))
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster }))
);
const StickyCallButton = lazy(() => import("./components/StickyCallButton"));

const Index = lazy(() => import("./pages/Index"));
const CarShippingCalculator = lazy(() => import("./pages/CarShippingCalculator"));
const Services = lazy(() => import("./pages/Services"));
const OpenAutoTransport = lazy(() => import("./pages/OpenAutoTransport"));
const EnclosedAutoTransport = lazy(() => import("./pages/EnclosedAutoTransport"));
const DoorToDoorShipping = lazy(() => import("./pages/DoorToDoorShipping"));
const ExpeditedCarShipping = lazy(() => import("./pages/ExpeditedCarShipping"));
const Gallery = lazy(() => import("./pages/Gallery"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CarShippingStates = lazy(() => import("./pages/CarShippingStates"));
const StateShipping = lazy(() => import("./pages/StateShipping"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/car-shipping-calculator" element={<CarShippingCalculator />} />
    <Route path="/quote" element={<Navigate to="/car-shipping-calculator" replace />} />
    <Route path="/services" element={<Services />} />
    <Route path="/open-auto-transport" element={<OpenAutoTransport />} />
    <Route path="/enclosed-auto-transport" element={<EnclosedAutoTransport />} />
    <Route path="/door-to-door-shipping" element={<DoorToDoorShipping />} />
    <Route path="/expedited-car-shipping" element={<ExpeditedCarShipping />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/how-it-works" element={<HowItWorks />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/reviews" element={<Reviews />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/car-shipping-states" element={<CarShippingStates />} />
    <Route path="/car-shipping/:stateName" element={<StateShipping />} />

    {states.map((s) => (
      <Route key={s.slug} path={`/${s.slug}`} element={<StateShipping />} />
    ))}

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <AppRoutes />
          </Suspense>

          <Suspense fallback={null}>
            <StickyCallButton />
            <Toaster />
            <Sonner />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
