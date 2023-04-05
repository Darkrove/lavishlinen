import { withMethods } from "@/lib/api-middlewares/with-methods";
import client from "@/lib/commerce";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { CategoryData } from "@/types/api";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CategoryData>
) => {
  try {
    const categories = await client.categories.list();
    if (!categories) {
      return res.status(401).json({
        error: "Unauthorized to perform this action.",
        categories: null,
      });
    }

    return res.status(200).json({ error: null, categories });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues, categories: null });
    }

    return res
      .status(500)
      .json({ error: "Internal Server Error", categories: null });
  }
};

export default withMethods(["GET"], handler);
