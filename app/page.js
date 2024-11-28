import Link from "next/link";

const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-teal-500">SmartGPT</h1>
          <p className="py-6 text-lg leading-loose">
            Your ultimate AI-powered reading companion. Seamlessly bridging the
            gap between curiosity and knowledge, SmartGPT finds the book that
            you've been searching for. Just provide a title and an author, and
            kick back as the AI chatbot navigates the book and bring your search
            to an end. Fast, reliable, and effortlessly smart—because every
            story deserves to be discovered. 😎
          </p>
          <Link href="/chat" className="btn bg-lime-400">
            Let's Go!!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
