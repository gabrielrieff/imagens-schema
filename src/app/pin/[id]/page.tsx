export default function Pin({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <section>
      <span>{params.id}</span>
    </section>
  );
}
