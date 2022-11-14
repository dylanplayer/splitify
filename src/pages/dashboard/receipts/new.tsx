import { type NextPage } from "next";
import { useState } from "react";

import { DashboardPage, Input } from "../../../components";

const NewReceipt: NextPage = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  if (pageNumber === 1) {
    return (
      <DashboardPage
        title='Add Guests'
        action={{
          text: 'Continue',
          onClick: () => setPageNumber(2),
        }}
      >
        <p>Guest selector</p>
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
