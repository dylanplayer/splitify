import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const newGuest = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session?.user) {
    if (req.method === "POST") {
      const userGuest = await prisma.guest.findUnique({
        where: {
          userId: session.user.id,
        },
      })

      if (userGuest) {
        const guest = await prisma.guest.upsert({
          where: {
            phone: req.body.phone,
          },
          update: {
            followers: {
              connect: {
                id: userGuest.id,
              },
            },
          },
          create: {
            phone: req.body.phone,
            name: req.body.name,
            followers: {
              connect: {
                id: userGuest.id,
              },
            },
          },
        });

        res.status(200).json(guest);
      } else {
        res.status(400).json({ error: "Guest not found for current user." });
      }
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default newGuest;
