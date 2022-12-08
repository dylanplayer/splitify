import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const following = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session?.user) {
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
    const guest = user?.guest;

    if (guest) {
      res.send(guest.following);
    } else {
      res.status(404).send(`Guest not found for user ${session.user.id}`);
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default following;
