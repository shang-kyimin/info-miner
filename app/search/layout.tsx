import Navbar from "@/components/shares/Navbar";


export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mb-12 mx-4 md:mx-8 flex flex-col gap-4">
      {/* Search Bar */}
      <div className="sticky top-0 z-20 bg-background py-4 border-b rounded-none">
        <Navbar />
      </div>

      {children}
    </main>
  );
}


