// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(
    `https://open-api.openocean.finance/v3/bsc/quote?` +
      new URLSearchParams({
        chain: "bsc",
        inTokenAddress: "0x9029FdFAe9A03135846381c7cE16595C3554e10A",
        outTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        amount: 10,
        gasPrice: 5,
        slippage: 1,
      }),
    {
      method: "GET",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log(response.json()); // parses JSON response into native JavaScript objects
  return res.status(200).json({ name: "John Doe" });
}
