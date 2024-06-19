import InfoMinerForm from "@/components/shares/InfoMinerForm";

export default function HomePage() {
  return (
    <main>
      <section className="flex flex-col justify-center items-center my-40 gap-4 mx-3">
        <div className="text-start max-w-xl w-full ml-2 md:ml-8">
          <h1 className="text-lg md:text-2xl md:font-medium">
            Explore the idea<br />
            That comes into your mind!
          </h1>
        </div>

        <InfoMinerForm />
      </section>

      <section>
      </section>
    </main>
  );
}


