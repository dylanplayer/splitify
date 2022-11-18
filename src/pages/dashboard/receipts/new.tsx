import type { GetServerSideProps, InferGetServerSidePropsType} from "next";
import { type NextPage } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";

import { DashboardPage, FeeCreator, FeeList, GuestList, GuestSelector, Input, ItemAssigner, ItemCreator, ItemList, Review } from "../../../components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}

const NewReceipt: NextPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '234567890',
    },
    {
      id: '2',
      name: 'Jane Doe',
      phone: '234567890',
    },
  ]);
  const [items, setItems] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [guestItems, setGuestItems] = useState<any[]>([]);

  if (pageNumber === 1) {
    return (
      <DashboardPage
        title='Add Guests'
        action={{
          text: 'Continue',
          onClick: () => {guests.length > 0 ? setPageNumber(2) : null},
        }}
      >
        <GuestSelector
          friends={friends}
          guests={guests}
          setGuests={setGuests}
          setFriends={setFriends}
        />
        {
          guests.length > 0 && (
            <GuestList
              guests={guests}
              friends={friends}
              setGuests={setGuests}
              setFriends={setFriends}
            />
          )
        }
      </DashboardPage>
    );
  } else if (pageNumber === 2) {
    return (
      <DashboardPage
        title='Add Items'
        action={{
          text: 'Continue',
          onClick: () => setPageNumber(3),
        }}
        back={() => setPageNumber(1)}
      >
        <ItemCreator items={items} setItems={setItems} />
        {
          items.length > 0 && (
            <ItemList items={items} setItems={setItems} />
          )
        }
      </DashboardPage>
    );
  } else if (pageNumber === 3) {
    return (
      <DashboardPage
        title='Add Fees'
        action={{
          text: 'Continue',
          onClick: () => setPageNumber(4),
        }}
        back={() => setPageNumber(2)}
      >
        <FeeCreator fees={fees} setFees={setFees} />
        {
          fees.length > 0 && (
            <FeeList fees={fees} setFees={setFees} />
          )
        }
      </DashboardPage>
    );
  } else if (pageNumber === 4) {
    return (
      <DashboardPage
        title='Asign Items'
        action={{
          text: 'Continue',
          onClick: () => setPageNumber(5),
        }}
        back={() => setPageNumber(3)}
      >
        <ItemAssigner
          items={items}
          guests={guests}
          guestItems={guestItems}
          setGuestItems={setGuestItems}
        />
      </DashboardPage>
    );
  } else if (pageNumber === 5) {
    return (
      <DashboardPage
        title='Review'
        action={{
          text: 'Finish',
          onClick: () => setPageNumber(5),
        }}
        back={() => setPageNumber(4)}
      >
        <Review
          items={items}
          guests={guests}
          guestItems={guestItems}
          fees={fees}
        />
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      title='New Receipt'
      action={{
        text: 'Continue',
        onClick: () => setPageNumber(1),
      }}
    >
      <Input 
        label='Name'
        placeholder='Enter receipt name'
        value={name}
        onChange={setName}
      />
      <Input
        label='Date'
        placeholder='Enter receipt date'
        value={date}
        onChange={setDate}
        type='date'
        max={new Date().toISOString().split('T')[0]}
      />
    </DashboardPage>
  );
}

export default NewReceipt;
