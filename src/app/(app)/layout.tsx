import { Billboards } from "./components/billboards";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Billboards />
      <main className="mx-auto max-w-screen-lg flex flex-1 flex-col gap-4 p-1 md:p-4 pt-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
