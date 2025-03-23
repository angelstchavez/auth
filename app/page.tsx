import AccessModuleForm from "@/components/admin/access-module/access-module-form";
import RoleAccessForm from "@/components/admin/role-access/role-access-form";
import RoleForm from "@/components/admin/role/role-form";
import UserForm from "@/components/admin/user/user-form";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted">
        <div className="container mx-auto p-4 space-y-4">
          <AccessModuleForm />
          <RoleForm />
          <RoleAccessForm />
          <UserForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
