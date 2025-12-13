import { notFound } from "next/navigation";

const posts = [
  {
    slug: "i-never-thought-i-d-do-startups",
    title: "I never thought I'd do startups",
    content: (
      <>
        <p>
          When I was a kid in Korla, the word “startup” meant absolutely nothing
          to me...
        </p>
        <p>（这里写你的文章内容，也可以拆成小标题）</p>
      </>
    ),
  },
  {
    slug: "i-ching",
    title: "I Ching",
    content: (
      <>
        <p>这里写你的《易经》文章。</p>
      </>
    ),
  },

  {
    slug: "i-hate-cs-i-thank-cs",
    title: "I hate CS, I thank CS",
    content: (
      <>
        <p>I hate CS, I thank CS</p>
      </>
    ),
  },

  {
    slug: "the-matches",
    title: "The matches",
    content: (
      <>
        <p>这里写你的《matches》文章。</p>
      </>
    ),
  },
];

export default function BlogPost({ params }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <article className="prose prose-lg prose-neutral mx-auto max-w-3xl py-12">
      <h1 className="text-black">{post.title}</h1>
      <div className="text-black">{post.content}</div>
    </article>
  );
}
