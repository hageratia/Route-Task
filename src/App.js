import React, { useEffect, useState } from "react";
import CustomerTable from "./Components/CustomerTable/CustomerTable";
import TransactionGraph from "./Components/TransactionGraph/TransactionGraph";
import Route from "./assets/Route.jfif";
import "./App.css";

const App = () => {
  const [customerData, setCustomerData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch("https://hageratia.github.io/api/db.json");
        const data = await response.json();
        console.log("Customer Data:", data);
        setCustomerData(data.customers);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    const fetchTransactionData = async () => {
      try {
        const response = await fetch("https://hageratia.github.io/api/db.json");
        const data = await response.json();
        console.log("Transaction Data:", data);
        setTransactionData(data.transactions);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchCustomerData();
    fetchTransactionData();
  }, []);

  const handleSelectCustomer = (customerId) => {
    console.log("Selected Customer ID:", customerId);
    setSelectedCustomerId(customerId);
  };

  const selectedCustomerTransactions = transactionData.filter(
    (transaction) =>
      parseInt(transaction.customer_id) === parseInt(selectedCustomerId)
  );

  console.log("Selected Customer Transactions:", selectedCustomerTransactions);

  const combinedData = customerData
    .map((customer) => {
      const transactions = transactionData.filter(
        (transaction) =>
          parseInt(transaction.customer_id) === parseInt(customer.id)
      );
      return transactions.map((transaction) => ({
        ...customer,
        date: transaction.date,
        amount: transaction.amount,
      }));
    })
    .flat();

  console.log("Combined Data:", combinedData);

  return (
    <div className="container-fluid bg-dark">
      <img
        src={Route}
        className="position-absolute top-0 start-0 border rounded-circle"
        alt="logo"
      />
      <h4 className="text-white text-center pt-3">Customer Transactions</h4>
      <CustomerTable
        data={combinedData}
        onSelectCustomer={handleSelectCustomer}
      />
      {selectedCustomerId ? (
        <TransactionGraph data={selectedCustomerTransactions} />
      ) : (
        <p className="text-white text-center">
          Please select a customer to show the chart
        </p>
      )}
    </div>
  );
};

export default App;
