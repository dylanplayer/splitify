import styles from './Review.module.css';

export interface ReviewProps {
  items: any[];
  guests: any[];
  guestItems: any[];
  fees: any[];
}

export const Review = ({items, guests, guestItems, fees}: ReviewProps) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0)

  const getQtyForItem = (item: any) => {
    const count = guestItems.filter((guestItem) => guestItem.itemId === item.id).length;
    return item.qty / count;
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
      }
    )
  }

  return (
    <div className={styles.container}>
      {
        guests.map((guest, index) => {
          const guestsGuestItems = guestItems.filter(guestItem => guestItem.guestId === guest.id);
          const guestsItems = items.filter(item => guestsGuestItems.some(guestItem => guestItem.itemId === item.id));
          const guestSubtotal = guestsItems.reduce((acc, item) => acc + (item.price * getQtyForItem(item)), 0);
          const guestFeesTotal = fees.reduce((acc, fee) => acc + (fee.price / subtotal) * guestSubtotal, 0);
          const guestTotal = guestSubtotal + guestFeesTotal;

          return (
            <div className={styles.guest} key={`guest-section-${index}`}>
              <div className={styles.guestHeader}>
                <h2 className={styles.guestName}>{guest.name}</h2>
              </div>
              <div className={styles.guestLineItems}>
                {
                  guestsItems.map((item, index) => {
                    const qty = getQtyForItem(item);
                    const price = item.price * qty;

                    return (
                      <div className={styles.guestLineItem} key={`guest-line-item-item-${index}`}>
                        <h3 className={styles.guestLineItemName}>{item.name}</h3>
                        <p className={styles.guestLineItemPrice}>{formatPrice(price)}</p>
                      </div>
                    );
                  })
                }
                <div className={styles.guestLineItem} key={`guest-line-item-subtotal-${index}`}>
                  <h3 className={styles.guestLineItemName}>Subtotal</h3>
                  <p className={styles.guestLineItemPrice}>{formatPrice(guestSubtotal)}</p>
                </div>
                {
                  fees.map((fee, index) => {
                    const feeAmount = (fee.price / subtotal) * guestSubtotal;

                    return (
                      <div className={styles.guestLineItem} key={`guest-line-item-fee-${index}`}>
                        <h3 className={styles.guestLineItemName}>{fee.name}</h3>
                        <p className={styles.guestLineItemPrice}>{formatPrice(feeAmount)}</p>
                      </div>
                    );
                  })
                }
                <div className={styles.guestLineItem} key={`guest-line-item-total-${index}`}>
                  <h3 className={styles.guestLineItemName}>Total</h3>
                  <p className={styles.guestLineItemPrice}>{formatPrice(guestTotal)}</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
