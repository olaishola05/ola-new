export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="prose-headings:mt-4 prose-headings:font-semibold prose-headings:text-textColor prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-headings:mb-3 prose-p:text-textColor prose-p:text-lg prose-p:mb-5"
    >
      <section>
        {children}
      </section>
    </article>
  )
}