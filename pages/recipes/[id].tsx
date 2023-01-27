import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";


const url = "https://62b4dc33530b26da4cc60791.mockapi.io/bolos/";
//I define a list of routes that will be generated statically.
export async function getStaticPaths(): Promise<any> {

  const data = await fetch(url);
  const result = await data.json();
  const paths = result.map(({ id }) => ({ params: { id: `${ id }` } }));

  return {
    paths,
    fallback: false,
  };
}
//will pre-render this page at compile time using the props returned by getStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;
  const urlWithParamsId = `${ url }${ id }`;
  const dataResponse = await fetch( urlWithParamsId );
  const cakes = await dataResponse.json();

  return {
    props: {
      id,
      cakes,
    },
  revalidate: 2,
  };
};


type Props = {
  id: string;
  cakes: string[];
};

const Cakes: NextPage<Props> = ({ id, cakes }) => {
  if ( !id ) return "Oops!...I Did It Again - Error - ";

  const { image, title, description, text } = cakes;
  console.log(cakes.image)
  return (
    <div>
      <Head>
        <title>{ cakes.title }</title>
      </Head>
      <main>
        <Link href={`/`}>
          <button>Home</button>
        </Link>
        <div className="container">
          <article className="cards">
            <img src={ image } alt="Recipe Image" />
            <a>{ title }</a>
            <p>{ description }</p>
            <p>{ text }</p>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Cakes;
