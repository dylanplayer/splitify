import { useSession } from 'next-auth/react';
import { GuestItem } from './components';
import styles from './GuestList.module.css';

export interface GuestListProps {
  guests: any[];
  friends: any[];
  setGuests: (guests: any[]) => void;
  setFriends: (friends: any[]) => void;
}

export const GuestList = ({guests, friends, setGuests, setFriends}: GuestListProps) => {
  const session = useSession();
  
  const removeGuest = (guest: any) => {
    setGuests(guests.filter((g) => g.id !== guest.id));
    setFriends([...friends, guest]);
  }

  return (
    <div className={styles.container}>
      {
        guests.map((guest) => {
          if (session.data?.user?.id !== guest.userId) {
            return (
              <GuestItem guest={guest} key={`guest-${guest.id}`} removeGuest={removeGuest}/>
            );
          } else {
            return <></>;
          }
        })
      }
    </div>
  );
}