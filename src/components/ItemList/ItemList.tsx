import styles from './ItemList.module.css';

export interface ItemListProps {
  items: any[];
  setItems: (items: any[]) => void;
}

export const ItemList = ({items, setItems}: ItemListProps) => {
  const handleDeleteItem = (indexToDelete: number) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  }

  return (
    <div
      className={styles.container}
    >
      {items.map((item, index) => (
        <div
          className={styles.item}
          key={index}
          onClick={() => handleDeleteItem(index)}
        >
          <div>
            <h3 className={styles.name}>{item.name}</h3>
            {
              item.quantity > 1 && (
                <p className={styles.quantity}>x{item.quantity}</p>
              )
            }
          </div>
          <p className={styles.price}>
            {
              item.price.toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                }
              )
            }
          </p>
        </div>
      ))}
    </div>
  );
}