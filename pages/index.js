import React from "react";
import Link from "next/link";


export const getStaticProps = async()=>{

const result = await fetch("https://62b4dc33530b26da4cc60791.mockapi.io/bolos");
const cakes = await result.json();
return {
  props: { cakes }
};
}

export default function Home(props) {
  const { cakes } = props;

  return (
    <section>
      <h1>Cakes Recipes</h1>
      <div className="container">
        {cakes.map((cakes) => (
          <Link href={`/bolos/${cakes.id}`} key={cakes.id}>
            <article className="cards">
              <img src={cakes.image} alt="Recipe Image" />
              <a>{cakes.title}</a>
              <p>{cakes.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
