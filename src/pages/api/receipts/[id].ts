import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const receipt = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session?.user) {
    const receipt = await prisma.receipt.findFirst({
      where: {
        id: String(req.query.id),
        user: {
          id: session.user.id,
        },
      },
      include: {
        guests: true,
        items: true,
        fees: true,
        guestItems: true,
      },
    });
    console.log(`receipt`, receipt);

    if (receipt) {
      res.send(receipt);
    } else {
      res.status(404).send("Receipt not found");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default receipt;
