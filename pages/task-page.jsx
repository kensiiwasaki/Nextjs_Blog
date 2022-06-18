import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import Task from "../components/Task";
import useSWR from "swr";
import { useEffect } from "react";

// クライアントのフェッチ用の関数
const fetcher = (url) => fetch(url).then((res) => res.json());
// apiのエンドポイントを定数として定義
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

export default function TaskPage({ staticfilterdTasks }) {
  // 第一引数にfetchしたいURLを渡す
  // 第二引数にfetcher関数を渡す
  // 第三引数にfallbackDataを指定できる
  // 返り値dataをtasksという名前で受け取る
  // mutate関数 データのキャッシュを最新のものに更新してくれる
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticfilterdTasks,
  });
  // tasksが存在する場合にソートする
  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // taskーpageがマウントされた時に確実にキャッシュの内容が更新されるようにuseEffectを使用
  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout title="Task page">
      <ul>
        {filteredTasks &&
          filteredTasks.map((task) => <Task key={task.id} task={task} />)}
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

export async function getStaticProps() {
  const staticfilterdTasks = await getAllTasksData();

  return {
    props: { staticfilterdTasks },
    revalidate: 3,
  };
}
