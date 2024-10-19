"use client";

class Comment {
  id: number;
  parentId: number;
  storeId: number;
  content: string;
  timestamp: number;
  constructor(
    id: number,
    parentId: number,
    storeId: number,
    content: string,
    timestamp: number
  ) {
    this.id = id;
    this.parentId = parentId;
    this.storeId = storeId;
    this.content = content;
    this.timestamp = timestamp;
  }
}

export class CommentNode {
  comment: Comment;
  children: Array<CommentNode>;
  constructor(comment: Comment) {
    this.comment = comment;
    this.children = [];
  }
}

const commentOn = (comment: string, parentId: number) => {
  const video = document.querySelector(".active");
  video?.getAttribute("data-src");
  fetch("http://47.97.29.190:8080/user/comment", {
    method: "POST",
    body:
      "type=video&storeId=1&content=" +
      comment +
      "&parentId=" +
      parentId +
      "&timestamp=" +
      new Date().getTime(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    mode: "cors",
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

// 时间戳转换为日期时间
function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

const replyInput = (id: number, parentId: number) => (
  <div className="hidden reply" data-offset={'id:'+id+"pid"+parentId}>
    <textarea
      className="w-full textarea"
      placeholder="Type your comment here..."
    ></textarea>
    <button
      className="btn btn-primary align-bottom"
      onClick={(event) => {
        const btn = event.target as HTMLElement;
        const comment = btn.parentElement?.querySelector("textarea")?.value;
        commentOn(comment!, id);
        // 隐藏回复框
        btn.parentElement?.classList.toggle("hidden");
      }}
    >
      回复
    </button>
  </div>
);

const commentsDIV = (
  id: number,
  content: string,
  timestamp: number,
  parentId: number
) => (
  <div key={id}>
    <div>时间:{formatDate(timestamp)}</div>
    <div>content:{content}</div>
    <div className="hidden">{parentId}</div>
    <div className="hidden">{id}</div>
    <button
      className="button"
      onClick={(event) => {
        // 获取当前父对象
        const btn = (event.target as HTMLElement);
        btn.nextElementSibling?.classList.toggle("hidden");
      }}

    >
      回复
    </button>
    {replyInput(id, parentId)}
  </div>
);

function CommentContainer({
  rootnode,
  level,
}: {
  rootnode: CommentNode;
  level: number;
}) {
  console.log(typeof rootnode);
  console.log(rootnode);
  console.log("comment:" + rootnode.comment);
  console.log("child:" + rootnode["children"]);
  const comments = rootnode["children"]?.map((node: CommentNode) => {
    return (
      <div
        key={node["comment"]["id"]}
        style={{
          marginLeft: level * 20,
          borderLeft: "1px solid black",
          padding: "5px",
          marginBottom: "5px",
        }}
      >
        {commentsDIV(
          node["comment"]["id"],
          node["comment"]["content"],
          node["comment"]["timestamp"],
          node["comment"]["parentId"]
        )}
        {CommentContainer({ rootnode: node, level: level + 1 })}
      </div>
    );
  });
  return <div>{comments}</div>;
}

export default function CommentArea({ rootnode }: { rootnode: CommentNode }) {
  return (
    <>
      <CommentContainer rootnode={rootnode} level={0}></CommentContainer>

      <div className="w-full">
        <textarea
          className="w-full textarea"
          placeholder="Type your comment here..."
        ></textarea>
        <button
          className="btn btn-primary align-bottom"
          onClick={() => {
            const comment = document.querySelector("textarea")?.value;
            commentOn(comment!, 0);
          }}
        >
          Send
        </button>
      </div>
    </>
  );
}
