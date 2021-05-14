import { NextApiRequest, NextApiResponse } from "next";
import { notion } from "../../../notion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blockId } = req.query;

  const response = await notion.blocks.children.list({ block_id: blockId });

  res.send(response);
}
