import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataPath = req.query.path ?? "";
  const dataPathStr = typeof dataPath === "string" ? dataPath : dataPath[0];

  try {
    const apiResponse = await fetch(dataPathStr);
    res.status(apiResponse.status).json(await apiResponse.json());
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
}
