import type { Guest } from '@prisma/client';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input/input';
import { Loading } from '../Loading';
import { GuestItem } from './components/GuestItem';

import styles from './GuestSelector.module.css';

interface GuestSelectorProps {
  friends: Guest[];
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
  setFriends: (friends: Guest[]) => void;
}

export const GuestSelector = ({friends, guests, setGuests, setFriends}: GuestSelectorProps) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [newGuest, setNewGuest] = useState<any>({name: '', phone: ''});
  const [gate, setGate] = useState(false);
  const [addFriend, setAddFriend] = useState(false);
  
  const addGuest = (guest: Guest) => {
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

  const handleCreateFriend = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/guests/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newGuest.name,
          phone: newGuest.phone,
        }),
      });

      const guest: Guest = await response.json();

      setGuests([...guests, guest]);
    } catch (error) {
      console.error(error);
    }

    resetInputs();
    setLoading(false);
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

    const phoneValid = newGuest.phone.length === 12;
    const nameValid = newGuest.name.length > 0;

    return (
      <div className={styles.container}>
        <input
          disabled={loading}
          className={styles.input}
          placeholder='Enter name'
          value={newGuest.name}
          onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
        />
        <div className={styles.line} />
        <PhoneInput
          disabled={loading}
          country='US'
          className={styles.input}
          placeholder='Enter phone'
          value={newGuest.phone}
          onChange={(value) => setNewGuest({...newGuest, phone: value || ''})}
        />
        {
          phoneValid && nameValid ? (
            <button
              className={styles.action}
              onClick={() => handleCreateFriend()}
              disabled={loading}
            >
              { loading ? <Loading /> : <>Add Friend</> }
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