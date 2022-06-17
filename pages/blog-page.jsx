import Layout from "../components/Layout";
import Link from "next/link";
import { getAllPostsData } from "../lib/posts";
import Post from "../components/Post";

export default function BlogPage({ filteredPosts }) {
  return (
    <Layout title="Blog page">
      <ul>
        {/* filteredPostにデータが存在する場合(三項演算子) */}
        {filteredPosts &&
          filteredPosts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
      <Link href="/main-page">
        <div className=" flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
}

// ビルド時に呼び出されてサーバーサイドで実行される処理
export async function getStaticProps() {
  // RESTAPIからブログの一覧を取得
  const filteredPosts = await getAllPostsData();
  return {
    // propsで返し、propsを使うと自動で埋め込まれる
    props: { filteredPosts },
  };
}
