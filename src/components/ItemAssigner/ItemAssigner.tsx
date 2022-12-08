import { useState } from 'react';
import styles from './ItemAssigner.module.css';

export interface ItemAssignerProps {
  items: any[];
  guests: any[];
  guestItems: any[];
  setGuestItems: (guestItems: any[]) => void;
}

export const ItemAssigner = ({items, guests, guestItems, setGuestItems}: ItemAssignerProps) => {
  const [showSelectItemMenu, setShowSelectItemMenu] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<any>(null);

  const getQtyForItem = (item: any) => {
    const count = guestItems.filter((guestItem) => guestItem.itemId === item.id).length;
    return item.qty / count;
  }

  if (showSelectItemMenu) {
    const itemsWithoutSelectedItems = items.filter((item) => !guestItems.find((guestItem) => guestItem.itemId === item.id && guestItem.guestId === currentGuest.id));

    return (
      <div className={styles.container}>
        {
          itemsWithoutSelectedItems.length === 0 ? (
            <p>Guest already has all items</p>
          ) : (
            <>
              <p>Select an item for {currentGuest.name}</p>
              <div className={styles.itemSelectMenu}>
                {
                  itemsWithoutSelectedItems.map((item, index) => {
                    return (
                      <div className={styles.itemSelectMenuItem} key={index} onClick={() => {
                        setGuestItems([...guestItems, {
                          id: guestItems.length + 1,
                          guestId: currentGuest.id,
                          itemId: item.id,
                        }]);
                        setShowSelectItemMenu(false);
                      }}>
                        <h3 className={styles.itemSelectMenuItemName}>{item.name}</h3>
                      </div>
                    );
                  })
                }
              </div>
            </>
          )
        }
        <button onClick={() => setShowSelectItemMenu(false)}>Back</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {
        guests.map((guest, index) => {
          const guestsGuestItems = guestItems.filter((guestItem) => guestItem.guestId === guest.id);
          const guestsItems = guestsGuestItems.map((guestItem) => items.find((item) => item.id === guestItem.itemId));

          return (
            <div className={styles.guest} key={index}>
              <div className={styles.guestHeader}>
                <h3 className={styles.guestName}>{guest.name}</h3>
              </div>
              <div className={styles.guestItems}>
                {
                  guestsItems.map((item, index) => {
                    const qty = getQtyForItem(item);

                    return (
                      <div className={styles.guestItem} key={index} onClick={() => {
                        setGuestItems(guestItems.filter((guestItem) => guestItem.id !== guestsGuestItems[index].id));
                      }}>
                        <h4 className={styles.guestItemName}>{item.name}</h4>
                        <p className={styles.guestItemQty}>{qty}</p>
                      </div>
                    );
                  })
                }
                {
                  guestsItems.length === 0 && (
                    <p>No items selected</p>
                  )
                }
              </div>
              <button
                className={styles.guestAddItem}
                onClick={() => {
                  setShowSelectItemMenu(true);
                  setCurrentGuest(guest);
                }}
              >Add Item</button>
            </div>
          );
        })
      }
    </div>
  );
}
