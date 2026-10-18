import logo from "../../../assets/logo_vector.svg";

export default function Circle() {
  return (
    <section className="order-2 text-center lg:order-1 ">
      <div className="flex flex-col items-center justify-center lg:justify-start  lg:mb-4">
        <img
          src={logo}
          className="w-25 md:w-45 lg:w-90 drop-shadow-[0px_5px_8px_#000] lg:drop-shadow-[0px_5px_15px_#000]"
          alt="shabaka logo"
        />
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold tracking-tight lg:block text-white drop-shadow-[0px_5px_15px_#000]">
          SHABAKA
        </h1>
      </div>
      <div className="hidden m-auto lg:block border-slate-400 rounded-2xl p-5 text-white backdrop-blur-md  shadow-sm max-w-3xl ">
        <p className=" text-left font-medium ">
          Welcome to SHABAKA...
          <br />
          A new way to connect, share, and belong <br />
          Join the network built for authentic conversations and real
          communities <br />
          Connect with friends and the world around Now
        </p>
      </div>
    </section>
  );
}
