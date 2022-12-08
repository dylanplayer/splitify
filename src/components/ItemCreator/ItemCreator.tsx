import type { ReceiptItem } from '@prisma/client';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import styles from './ItemCreator.module.css';

export interface ItemCreatorProps {
  items: ReceiptItem[];
  setItems: (items: ReceiptItem[]) => void;
}

export const ItemCreator = ({items, setItems}: ItemCreatorProps) => {
  const [item, setItem] = useState<any>({name: '', price: '', qty: ''});
  
  const handleAddItem = () => {
    if (item.name.length > 0 && Number(item.price) > 0 && item.qty > 0) {
      setItems([...items, {
        ...item,
        id: items.length + 1,
        price: Number(item.price),
      }]);
      setItem({name: '', price: '', qty: ''});
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder='Name'
        value={item.name}
        onChange={(e) => setItem({...item, name: e.target.value})}
      />
      <div className={styles.line} />
      <CurrencyInput
        placeholder='Price'
        value={item.price}
        onValueChange={(value) => setItem({...item, price: value})}
        allowNegativeValue={false}
        fixedDecimalLength={2}
        className={styles.input}
        prefix='$'
      />
      <div className={styles.line} />
      <CurrencyInput
        className={styles.input}
        allowDecimals={false}
        allowNegativeValue={false}
        placeholder='Quantity'
        value={item.qty}
        onValueChange={(value) => setItem({...item, qty: Number(value) || undefined})}
      />
      <button
        className={styles.button}
        onClick={handleAddItem}
      >Add Item</button>
    </div>
  );
};
