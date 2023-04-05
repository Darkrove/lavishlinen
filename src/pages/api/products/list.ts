import { withMethods } from "@/lib/api-middlewares/with-methods";
import client from "@/lib/commerce";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = await client.products.list();

    return res.status(200).json({ error: null, products });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues, products: null });
    }

    return res
      .status(500)
      .json({ error: "Internal Server Error", products: null });
  }
};

export default withMethods(["GET"], handler);
