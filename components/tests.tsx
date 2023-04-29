import { NextPage } from 'next';
import { useEffect, useState } from 'react';

// function to render the page

const Home: NextPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((data) => setUserId(data.name));
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;

// export async function getStaticProps() {
//   const res = await fetch('https://.../posts');
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { id: '1' } },
//       { params: { id: '2' } },
//       { params: { id: '3' } },
//     ],
//     fallback: false,
//   };
// }

// export async function getServerSideProps(context) {
//   const res = await fetch(`https://.../posts/${context.params.id}`);
//   const post = await res.json();

//   return {
//     props: {
//       post,
//     },
//   };
// }
