import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import PrivacyPolicySection from "@/components/privacy-policy/privacy-policy-section";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted">
        <PrivacyPolicySection />
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
