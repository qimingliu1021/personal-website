import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import ProjectList from "@/components/ProjectList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-black">
      <Container className="mt-24 sm:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Your intro text */}
          <FadeIn className="max-w-3xl">
            <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
              A developer dreaming of being an artist
            </h1>
            <p className="mt-6 text-xl text-neutral-600">
              I am founder of{" "}
              <Link
                href="https://www.yi-universe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors underline"
              >
                Yiverse
              </Link>
              , a AI platform helps people find their city meant to be by
              Chinese I Ching trigram.
            </p>
            <p className="mt-6 text-xl text-neutral-600">
              I participated in 3 startup projects, Pomu - help fashion brands
              find manufactures, gotton into LvlUp Ventures and NYU startup
              bootcamp and Innovention at Tandon Future Lab. During the process
              working with fashion brands, I participated with photo shooting,
              marketing and website design. After Pomu, I worked as developer at
              stewardsAI, built a bus express route recommendation system.
            </p>
          </FadeIn>

          {/* Right column - Project list */}
          <ProjectList className="lg:sticky lg:top-24" />
        </div>
      </Container>
    </main>
  );
}
