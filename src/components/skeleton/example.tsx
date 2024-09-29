type ExampleContentProps = {
  headings?: number;
  paragraphs?: number;
  images?: number;
};

export function ExampleContent({ headings = 1, paragraphs = 1, images = 1 }: ExampleContentProps) {
  return (
    <div className="contents">
      {Array.from({ length: headings }).map((_, index) => (
        <h1 key={index} className="text-2xl font-bold">Heading {index + 1}</h1>
      ))}
      {Array.from({ length: paragraphs }).map((_, index) => (
        <p key={index} className="text-balance">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit obcaecati quam minima natus expedita quia quidem excepturi id? Iure praesentium minima enim, quasi aliquid minus beatae magni perspiciatis odit veritatis.</p>
      ))}
      {Array.from({ length: images }).map((_, index) => (
        <img key={index} src="https://placehold.co/600x400" alt="Placeholder" />
      ))}
    </div>
  );
}
