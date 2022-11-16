import styles from './GuestItem.module.css';

export interface GuestItemProps {
  guest: any;
  removeGuest: (guest: any) => void;
}

export const GuestItem = ({guest, removeGuest}: GuestItemProps) => {
  return (
    <div
      className={styles.container}
      onClick={() => removeGuest(guest)}
    >
      <div className={styles.name}>{guest.name}</div>
      <div className={styles.phone}>{guest.phone}</div>
    </div>
  );
};
