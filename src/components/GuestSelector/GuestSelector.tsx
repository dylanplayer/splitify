import { useEffect, useState } from 'react';
import { GuestItem } from './components/GuestItem';

import styles from './GuestSelector.module.css';

interface GuestSelectorProps {
  friends: any[];
  guests: any[];
  setGuests: (guests: any[]) => void;
  setFriends: (friends: any[]) => void;
}

export const GuestSelector = ({friends, guests, setGuests, setFriends}: GuestSelectorProps) => {
  const [search, setSearch] = useState('');
  const [newGuest, setNewGuest] = useState<any>({name: '', phone: ''});
  const [gate, setGate] = useState(false);
  const [addFriend, setAddFriend] = useState(false);
  
  const addGuest = (guest: any) => {
    setSearch('');
    setGuests([...guests, guest]);
    setFriends(friends.filter(friend => friend.id !== guest.id));
  };

  const resetInputs = () => {
    setNewGuest({name: '', phone: ''});
    setAddFriend(false);
    setGate(false);
    setSearch('');
  };

  const handleCreateFriend = () => {
    console.log('create friend');
    resetInputs();
  };

  const filteredFriends = friends.filter(friend => friend.name.toLowerCase().includes(search.toLowerCase()));

  if (addFriend) {
    if (!gate) {
      setGate(true);
      if (search.charAt(0).match(/[a-z]/i)) {
        setNewGuest({...newGuest, name: search});
      } else {
        setNewGuest({...newGuest, phone: search});
      }
    }

    const phoneValid = newGuest.phone.length === 10;
    const nameValid = newGuest.name.length > 0;

    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          placeholder='Enter name'
          value={newGuest.name}
          onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
        />
        <div className={styles.line} />
        <input
          className={styles.input}
          placeholder='Enter phone'
          value={newGuest.phone}
          type='tel'
          onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
        />
        {
          phoneValid && nameValid ? (
            <button
              className={styles.action}
              onClick={() => handleCreateFriend()}
            >
              Add Friend
            </button>
          ) : (
            <button
              className={styles.action}
              onClick={() => resetInputs()}
            >
              Back
            </button>
          )
        }
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder='Enter a name or phone number'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {
        search.length > 0 && filteredFriends.length > 0 && (
          <>
            <div className={styles.line} />
            <div className={styles.list}>
              {
                filteredFriends.map((friend) => {
                  return <GuestItem guest={friend} key={`guest-${friend.id}`} addGuest={addGuest} />;
                })
              }
            </div>
          </>
        )
      }
      {
        search.length > 0 && filteredFriends.length === 0 && (
          <button
            className={styles.action}
            onClick={() => setAddFriend(true)}
          >
            Add Friend
          </button>
        )
      }
    </div>
  );
}