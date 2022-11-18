import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import styles from './ItemCreator.module.css';

export interface ItemCreatorProps {
  items: any[];
  setItems: (items: any[]) => void;
}

export const ItemCreator = ({items, setItems}: ItemCreatorProps) => {
  const [item, setItem] = useState<any>({name: '', price: '', quantity: ''});
  
  const handleAddItem = () => {
    if (item.name.length > 0 && Number(item.price) > 0 && item.quantity > 0) {
      setItems([...items, {
        ...item,
        id: items.length + 1,
        price: Number(item.price),
      }]);
      setItem({name: '', price: '', quantity: ''});
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
        value={item.quantity}
        onValueChange={(value) => setItem({...item, quantity: Number(value) || undefined})}
      />
      <button
        className={styles.button}
        onClick={handleAddItem}
      >Add Item</button>
    </div>
  );
};
