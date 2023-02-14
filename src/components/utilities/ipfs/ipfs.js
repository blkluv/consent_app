import { create } from "ipfs-http-client";
const node = create("http://127.0.0.1:5002");

async function upload_data(data) {
  const node = await getNode({ repo: "ok" + Math.random() });
  const file = await node.add(JSON.stringify(data));
  return file.cid.toString();
}

async function read_data(cid) {
  const random = randomInt(1, 100);
  console.log(random);
  const node = await getNode({ repo: "ok" + random });

  if (cid === "" || cid === null) {
    throw Error("found empty CID for data read");
  }

  // const node = await create({ repo: "ok" + Math.random() });
  const decoder = new TextDecoder();
  const stream = await node.cat(cid);
  let data = "";

  for await (const chunk of stream) {
    data += decoder.decode(chunk, { stream: true });
  }

  return data;
}

const _ = {
  upload_data,
  read_data,
};

export default _;
