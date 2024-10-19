"use client";
import { Video } from "./data";

function doGetVideoList(vList: Array<Video>) {
  if (!Array.isArray(vList) || vList.length === 0) {
    return <div>暂无视频, 请联系王鑫</div>;
  }
  const divItems = vList.map((item) => (
    <div
      key={item.title}
      onClick={(event) => handleVideoClick(event)}
      data-src={"http://47.97.29.190:8080" + item.url}
      className=" box-border bg-black hover:bg-sky-700 
     text-white rounded-box p-1 flex carousel-item w-full text-justify pt-1 pb-1 mt-0.5"
    >
      {item.title}
    </div>
  ));

  return divItems;
}

function handleVideoClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  document.querySelectorAll(".carousel-item").forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
      item.classList.remove("bg-violet-700");
      item.classList.add("bg-black");
    }
  });
  const video = document.querySelector("video");
  const element = e.target as HTMLDivElement;
  video!.src = element.getAttribute("data-src")!;
  element.classList.add("bg-violet-700");
  element.classList.add("active");
}

export default function Player({ vList }: { vList: Array<Video> }) {
  return (
    <>
      <div className="flex w-full flex-row flex-wrap">
        <div className="w-3/4 flex-grow bg-white rounded-xl shadow-lg flex items-center">
          <video controls src=""></video>
        </div>
        <div className="relative">
          <div
            className="sticky top-0 px-4 py-3 flex items-center font-semibold
            text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10"
          >
            播放列表
          </div>
          <div className="carousel carousel-vertical w-64 h-64 border-4 border-blue-50co">
            <div className="divide-y p-2 dark:divide-slate-200/5">
              {doGetVideoList(vList)}
            </div>
          </div>
          <div className="text-center">向下滑还有更多↓</div>
        </div>
      </div>
    </>
  );
}
