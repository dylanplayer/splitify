import type { ReceiptFee } from '@prisma/client';
import styles from './FeeList.module.css';

export interface FeeListProps {
  fees: ReceiptFee[];
  setFees: (fees: ReceiptFee[]) => void;
}

export const FeeList = ({fees, setFees}: FeeListProps) => {
  const handleRemoveFee = (indexToRemove: number) => {
    setFees(fees.filter((_, index) => index !== indexToRemove));
  }

  return (
    <div className={styles.container}>
      {fees.map((fee, index) => (
        <div
          className={styles.fee}
          key={index}
          onClick={() => handleRemoveFee(index)}
        >
          <h3 className={styles.name}>{fee.name}</h3>
          <p className={styles.price}>
            {
              fee.price.toLocaleString(
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
};
