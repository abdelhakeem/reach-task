import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId ?? "";
  const orgId = req.query.orgId ?? "";

  const encodedUserId = encodeURIComponent(
    typeof userId === "string" ? userId : userId[0]
  );

  const encodedOrgId = encodeURIComponent(
    typeof orgId === "string" ? orgId : orgId[0]
  );

  const queryString = `userId=${encodedUserId}&orgId=${encodedOrgId}`;

  try {
    const apiResponse = await fetch(
      `https://mockapi.lumi.systems/getdevices?${queryString}`
    );

    res.status(apiResponse.status).json(await apiResponse.json());
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
}
