import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const encodedId = encodeURIComponent(typeof id === 'string' ? id : id[0]);

  try {
    const apiResponse = await fetch(
      `https://mockapi.lumi.systems/getdevicedata?deviceId=${encodedId}`
    )

    res.status(apiResponse.status).json(await apiResponse.json());
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" })
  }
}
