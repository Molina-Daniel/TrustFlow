import { Button } from "../components/ui/button";

const Landing = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#030A06] text-white">
      <div className="relative flex min-h-screen items-center justify-between px-12 py-8">
        {/* Blurred light effect */}
        <div className="absolute bottom-0 left-1/4 -translate-x-1/2 rounded-full w-[600px] h-[600px] bg-[#2243D466] blur-[100px] z-0 opacity-70"></div>

        {/* Hexagon background pattern - restricted to left half */}
        <div
          className="absolute inset-y-0 left-0 z-0 w-1/2 bg-cover bg-center bg-no-repeat opacity-20 size-full hidden md:block"
          style={{
            backgroundImage: "url('/src/assets/hive-background.png')",
          }}
        />

        {/* Content container with logo and text */}
        <div className="z-10 flex w-full flex-row items-center justify-between">
          {/* Left side - Logo */}
          <div className="w-1/2 hidden md:block">
            <img
              src="/src/assets/trustflow-logo.svg"
              alt="TrustFlow Logo"
              className="h-auto w-[500px]"
            />
          </div>

          {/* Right side - Title and description */}
          <div className="flex w-full flex-col items-center justify-center space-y-4 md:w-1/2">
            <img
              src="/src/assets/trustflow-title.svg"
              alt="TrustFlow"
              className="h-auto w-[500px]"
            />

            <div className="text-2xl mt-4 text-center text-[#C0E4CD]">
              <h2 className="font-light">Decentralized social funding</h2>
              <p className="font-light">
                transparent, automated, and collective
              </p>
            </div>

            <div className="mt-8 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <Button className="cursor-pointer rounded-lg bg-[#0D1B3F] border-none px-8 py-6 text-white text-lg font-medium shadow-[0_0_20px_rgba(34,67,212,0.5)] hover:shadow-[0_0_30px_rgba(34,67,212,0.7)]">
                Book a demo
              </Button>
              <Button className="cursor-pointer rounded-lg bg-[#0A2231] border-none px-8 py-6 text-white text-lg font-medium shadow-[0_0_20px_rgba(96,217,221,0.5)] hover:shadow-[0_0_30px_rgba(96,217,221,0.7)]">
                Connect Wallet
              </Button>
              <Button className="cursor-pointer rounded-lg bg-[#0D1B3F] border-none px-8 py-6 text-white text-lg font-medium shadow-[0_0_20px_rgba(34,67,212,0.5)] hover:shadow-[0_0_30px_rgba(34,67,212,0.7)]">
                Explore Impact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
