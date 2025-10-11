import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";
import CreateCustomer from "./CreateCustomer";

const ReactTableComponent = ({ data }) => {
  const [currentCustomers, setCurrentCustomers] = useState(data); // State to store customer data
  const [customerModal, setCustomerModal] = useState(false); // State for controlling modal visibility
  const [customerData, setCustomerData] = useState(null);

  // Function to handle customer deletion
  const handleDelete = async (customerId) => {
    try {
      const response = await axios.delete(`/api/customer/${customerId}`);
      if (response.status === 200) {
        alert(response.data.msg);
        // Update the state to remove the deleted customer
        setCurrentCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer._id !== customerId)
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert(error.response.data.msg);
      }
    }
  };

  // Open the modal and pass the customer data to be edited
  const handleUpdate = (customer) => {
    setCustomerData(customer);
    setCustomerModal(true);
  };

  // Handle updates when the modal closes
  const handleCustomerUpdated = (updatedCustomer) => {
    setCurrentCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer._id === updatedCustomer._id ? updatedCustomer : customer
      )
    );
    setCustomerModal(false);
  };

  // Function to handle adding a new customer
  const handleCustomerCreated = (newCustomer) => {
    setCurrentCustomers((prevCustomers) => [newCustomer , ...prevCustomers]); // Add the new customer to the state
    setCustomerModal(false); // Close modal after customer is created
  };

  // Columns definition for React Table
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Company", accessor: "company" },
      { Header: "Industry", accessor: "industry" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => handleUpdate(row.original)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => handleDelete(row.original._id)} // Calling handleDelete function with the customer ID
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [] // Empty dependency array to ensure memoization of columns
  );

  // React Table setup
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: currentCustomers,
    });

  const openModal = () => setCustomerModal(true);
  const closeModal = () => setCustomerModal(false);

  return (
    <div className="w-full gap-y-2">
      <div className="mb-4 flex flex-row justify-between">
        <button
          className="px-3 py-1 bg-green-600 text-white text-xl rounded-md"
          onClick={openModal}
        >
          Create
        </button>
        <input
          className="border-2 border-gray-300 p-2 w-1/3 rounded-xl outline-gray-400 bg-slate-200"
          placeholder="Search"
          type="text"
        />
      </div>
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full table-auto border-collapse text-sm"
        >
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2 text-left font-semibold text-gray-600"
                    key={column.id}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.id}
                  className="hover:bg-gray-50"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-gray-800"
                      key={cell.column.id}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <CreateCustomer
        customerData={customerData}
        isVisible={customerModal}
        onClose={closeModal}
        onCustomerCreated={handleCustomerCreated}
        onCustomerUpdated={handleCustomerUpdated} // Update customer after modal closes
      />
    </div>
  );
};

export default ReactTableComponent;
