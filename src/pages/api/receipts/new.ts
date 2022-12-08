import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import type { Guest } from "@prisma/client";

const newReceipt = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session?.user) {
    if (req.method === "POST") {
      const receipt = await prisma.receipt.create({
        data: {
          userId: session.user.id,
          name: req.body.name,
          date: req.body.date,
          guests: {
            connect: req.body.guests.map((guest: Guest) => ({ id: guest.id })),
          },
        },
      });

      const newItems = await Promise.all(req.body.items.map(async (item: any) => {
        const newItem = await prisma.receiptItem.create({
          data: {
            name: item.name,
            price: item.price,
            qty: item.qty,
            receipt: {
              connect: {
                id: receipt.id,
              },
            },
          },
        });

        return Object.assign(newItem, { clientId: item.id });
      }));

      await Promise.all(req.body.fees.map(async (fee: any) => {
        const newReceiptGuestFee = await prisma.receiptFee.create({
          data: {
            name: fee.name,
            price: fee.price,
            receipt: {
              connect: {
                id: receipt.id,
              },
            },
          },
        });

        return newReceiptGuestFee;
      }));

      await Promise.all(req.body.guestItems.map(async (guestItem: any) => {
        const item = newItems.find((item: any) => item.clientId === guestItem.itemId);

        const newReceiptGuestItem = await prisma.receiptGuestItem.create({
          data: {
            receipt: {
              connect: {
                id: receipt.id,
              },
            },
            guest: {
              connect: {
                id: guestItem.guestId,
              },
            },
            item: {
              connect: {
                id: item.id,
              },
            },
          }
        });

        return newReceiptGuestItem;
      }));

      res.status(200).json(receipt);
    } else {
      res.status(400).json({ error: "Invalid request method." });
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default newReceipt;
