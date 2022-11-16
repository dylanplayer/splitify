import styles from './GuestItem.module.css';

export interface GuestItemProps {
  guest: any;
  addGuest: (guest: any) => void;
}

export const GuestItem = ({guest, addGuest}: GuestItemProps) => {
  return (
    <div
      className={styles.container}
      onClick={() => addGuest(guest)}
    >
      <h3 className={styles.name}>{guest.name}</h3>
      <p className={styles.phone}>{guest.phone}</p>
    </div>
  );
}
