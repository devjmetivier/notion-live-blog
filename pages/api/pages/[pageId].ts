import { NextApiRequest, NextApiResponse } from "next";
import { notion } from "../../../notion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pageId } = req.query;

  const response = await notion.pages.retrieve({ page_id: pageId });

  res.send(response);
}
