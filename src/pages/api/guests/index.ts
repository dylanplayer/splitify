import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const guests = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session?.user) {
    if (req.method === "POST") {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        include: {
          guest: {
            include: {
              following: true,
            }
          }
        }
      });

      if (!user?.guest) {
        const guest = await prisma.guest.upsert({
          where: {
            phone: req.body.phone,
          },
          update: {
            userId: session.user.id,
            name: req.body.name,
          },
          create: {
            userId: session.user.id,
            phone: req.body.phone,
            name: req.body.name,
          }
        });

        res.send(guest);
      } else {
        res.status(409).send("Guest already exists");
      }
    } else {
      res.status(404).send("Not found");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default guests;
