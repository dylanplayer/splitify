import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import styles from './FeeCreator.module.css';

export interface FeeCreatorProps {
  fees: any[];
  setFees: (fees: any[]) => void;
}

export const FeeCreator = ({fees, setFees}: FeeCreatorProps) => {
  const [fee, setFee] = useState<any>({name: '', price: ''});

  const handleAddFee = () => {
    if (fee.name.length > 0 && Number(fee.price) > 0) {
      setFees([...fees, {
        ...fee,
        price: Number(fee.price),
      }]);
      setFee({name: '', price: ''});
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder='Name'
        value={fee.name}
        onChange={(e) => setFee({...fee, name: e.target.value})}
      />
      <div className={styles.line} />
      <CurrencyInput
        placeholder='Price'
        value={fee.price}
        onValueChange={(value) => setFee({...fee, price: value})}
        allowNegativeValue={false}
        fixedDecimalLength={2}
        className={styles.input}
        prefix='$'
      />
      <button
        className={styles.button}
        onClick={handleAddFee}
      >Add Fee</button>
    </div>
  );
};
