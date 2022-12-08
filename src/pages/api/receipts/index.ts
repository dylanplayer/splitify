import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const receipts = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session?.user) {
    const receipts = await prisma.receipt.findMany({
      where: {
        userId: session.user.id,
      }
    });

    res.send(receipts);
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default receipts;
