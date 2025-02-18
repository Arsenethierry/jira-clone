import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/sidebar";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen">
            <CreateWorkspaceModal />
            <div className="flex w-full h-full">
                <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="lg:pl-[264px] w-full h-full">
                    <div className="mx-auto max-w-screen-2xl w-full h-full">
                        <Navbar />
                        <main className="h-full py-8 px-6 flex flex-col">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
