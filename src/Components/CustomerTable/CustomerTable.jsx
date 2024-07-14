import React, { useState } from "react";

const CustomerTable = ({ data, onSelectCustomer }) => {
  const [searchName, setSearchName] = useState("");
  const [searchAmount, setSearchAmount] = useState("");

  const filteredData = data.filter((customer) => {
    const nameMatch = customer.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const amountMatch =
      searchAmount === "" ||
      customer.amount.toString().startsWith(searchAmount);

    return nameMatch && amountMatch;
  });

  const customerTransactionsMap = filteredData.reduce((acc, customer) => {
    const existingCustomer = acc.find((c) => c.id === customer.id);
    if (existingCustomer) {
      existingCustomer.dates.push(customer.date);
      existingCustomer.amounts.push(customer.amount);
    } else {
      acc.push({
        id: customer.id,
        name: customer.name,
        dates: [customer.date],
        amounts: [customer.amount],
      });
    }
    return acc;
  }, []);

  return (
    <div>
      <div className="d-flex w-75 mx-auto gap-3">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control my-3"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by amount"
          className="form-control my-3"
          value={searchAmount}
          onChange={(e) => setSearchAmount(e.target.value)}
        />
      </div>
      <table className="table text-white text-center w-75 mx-auto table-striped">
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>Transaction Dates</th>
            <th>Transaction Amounts</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {customerTransactionsMap.map((customer, index) => (
            <tr key={index}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>
                {customer.dates.map((date, i) => (
                  <React.Fragment key={i}>
                    {i !== 0 && <br />}
                    {date}
                  </React.Fragment>
                ))}
              </td>
              <td>
                {customer.amounts.map((amount, i) => (
                  <React.Fragment key={i}>
                    {i !== 0 && <br />}
                    {amount}
                  </React.Fragment>
                ))}
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => onSelectCustomer(customer.id)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
