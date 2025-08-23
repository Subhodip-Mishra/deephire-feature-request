import FeatureRequestForm from "./components/FeatureRequestForm";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-professional-bg">
      {/* Top Branding */}
      <Header />

      

      {/* Feature Request Form */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <FeatureRequestForm />
        </div>
      </main>
    </div>
  );
}
