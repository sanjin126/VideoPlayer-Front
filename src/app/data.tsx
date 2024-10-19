export class Video {
  title: string;
  url: string;
  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

let data = null;
let vList: Array<Video> = [];
export async function init(navigator_name: string) {
  data = await fetch("http://47.97.29.190:8080/user/videolist/" + navigator_name);
  vList = await data.json();
}

export default async function getVideoList(navigator_name: string) {
    console.log(navigator_name);
    await init(navigator_name);
    return vList;
}