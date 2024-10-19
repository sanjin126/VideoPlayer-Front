'use client';

import Navigator from "./navibar";
import { navigator_names } from "./navibar";
import Player from "./player";
import CommentArea from "./commentarea";
import { CommentNode } from "./commentarea";
import { default as get_vlist, Video } from "./data";

import { useState, useEffect, useCallback } from "react";

async function doGetCommentList(): Promise<CommentNode> {
  return (
    await fetch("http://localhost:8080/user/comment?type=video&storeId=1")
  ).json();
}

export default function Page() {
  const [node, setNode] = useState<CommentNode | null>(null);
  const [vList, setVList] = useState(Array<Video>);
  const [videoType, setVideoType] = useState(navigator_names[0]); // 默认选择一种视频类型

  const fetchData = useCallback(async (type : string) => {
    const nodeData = await doGetCommentList();
    const videoList = await get_vlist(type);

    setNode(nodeData);
    setVList(videoList);
    setVideoType(type);
  }, []);

  useEffect(() => {
    fetchData(videoType);
  }, [fetchData, videoType]);

  return (
    <>
      <Navigator onNavigator={fetchData}></Navigator>
      {vList && <Player vList={vList}></Player>}
      {node && <CommentArea rootnode={node}></CommentArea>}
    </>
  );
}
