// デプロイ時にサーバーサイドでエンドポイントでアクセスする処理
import fetch from "node-fetch";

export async function getAllPostsData() {
  // nodeのfetchでエンドポイントにアクセス
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json();
  // created_atの値で新しい順にソート
  const filteredPosts = posts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  // ソート後のデータを変数に格納しreturnで返す
  return filteredPosts;
}
