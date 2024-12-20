export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="prose-headings:mt-4 prose-headings:font-semibold prose-headings:text-textColor prose-h1:text-2xl prose-h1:md:text-5xl prose-h2:text-2xl prose-h2:md:text-4xl prose-h3:text-xl prose-h3:md:text-3xl prose-h4:text-lg prose-h4:md:text-xl prose-headings:mb-3 prose-p:text-textColor prose-p:text-lg prose-p:mb-5 prose-pre:w-full prose-pre:mb-5 prose-pre:overflow-scroll prose-figure:w-full prose-figure:md:w-full prose-figure:mx-auto"
    >
      <section>
        {children}
      </section>
    </article>
  )
}