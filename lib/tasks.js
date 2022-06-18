// デプロイ時にサーバーサイドでエンドポイントでアクセスする処理
import fetch from "node-fetch";

export async function getAllTasksData() {
  // nodeのfetchでエンドポイントにアクセス
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks = await res.json();
  // created_atの値で新しい順にソート
  const staticfilteredTasks = tasks.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  // ソート後のデータを変数に格納しreturnで返す
  return staticfilteredTasks;
}

export async function getAllTaskIds() {
  // nodeのfetchでエンドポイントにアクセス
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks = await res.json();
  return tasks.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

// 指定されたIDに基づいてデータを取得
export async function getPostData(id) {
  // nodeのfetchでエンドポイントにアクセス
  const res = await fetch(
    // 引数でIDを受取、URLの末尾につける
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`)
  );
  const task = await res.json();
  return task;
}
