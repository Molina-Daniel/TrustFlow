import { Link, Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Link to="/">
              <h1 className="text-center text-white text-2xl font-bold">
                ETH Lisbon
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          All rights reserved &copy; {new Date().getFullYear()} TrustFlow
        </p>
      </footer>
    </>
  );
}
