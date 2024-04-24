import React, { useEffect, useState } from "react";
import { useEditRestaurantContext } from "../../context/editRestaurant";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";

const Table = ({
  setEditTable,
  status,
  name,
  fetchTablesData,
  tableId,
  setSuccess,
  setError,
  sendData,
}) => {
  const delTable = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this table?",
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`${API_ENDPOINTS.DELETE_TABLE}${tableId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess("Table Deleted!");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
        fetchTablesData();
      } catch (error) {
        setError("Error deleting this table.");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  const handleClick = () => {
    setEditTable(true);
    sendData([tableId, name]);
  };

  return (
    <section>
      <section className="mb-4 flex items-center justify-between rounded-lg border px-3 py-2">
        <section className="text-xs xs:text-sm">
          <p>
            Name: <span className="font-bold">{name}</span>
          </p>
          <p>
            Status:
            <span className="font-bold">
              {status[0].toUpperCase() + status.slice(1)}
            </span>
          </p>
        </section>
        <section className="flex gap-3">
          <button
            onClick={handleClick}
            className="text-sm font-bold text-green-500"
          >
            Edit
          </button>
          <button onClick={delTable} className="text-sm font-bold text-red-600">
            Delete
          </button>
        </section>
      </section>
    </section>
  );
};

const Form = () => {
  return (
    <section className={`${addLocation ? "block" : "hidden"} mb-6`}>
      <h1 className="mb-3 text-xl font-bold">Add Tables Location</h1>
      <form onSubmit={(e) => e.preventDefault()} action="">
        <input
          className="rounded-lg border px-3 py-2 outline-none"
          type="text"
          placeholder="Location"
        />
        <section className="mt-4 flex gap-2">
          <button className="rounded-lg bg-red-600 px-4 py-2 text-white outline-none">
            Cancel
          </button>
          <button className="rounded-lg bg-green-500 px-4 py-2 text-white outline-none">
            Update
          </button>
        </section>
      </form>
    </section>
  );
};

const Tables = () => {
  const { showRestaurantSection } = useEditRestaurantContext();
  const { selectedRestaurantId } = useRestaurantsPathsContext();
  const [editLocation, setEditLocation] = useState(false);
  const [addLocation, setAddLocation] = useState(true);
  const [addTable, setAddTable] = useState(false);
  const [addTableBulk, setAddTableBulk] = useState(false);
  const [editTable, setEditTable] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState(0);
  const [locationName, setLocationName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [editLocationName, setEditLocationName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [status, setStatus] = useState("available");
  const [selectedTableId, setSelectedTableId] = useState("");
  const [selectedTableName, setSelectedTableName] = useState("");
  const [tablesBulkName, setTableBulkName] = useState("");
  const [bulkStart, setBulkStart] = useState("");
  const [bulkEnd, setBulkEnd] = useState("");

  // change location
  const handleLocationChange = (event) => {
    const index = event.target.value;
    setLocation(index);
    setLocationId(tablesData[index].id);
    setEditLocationName(tablesData[index].name);
  };

  const [tablesData, setTablesData] = useState([]);

  // get tables
  const fetchTablesData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        `${API_ENDPOINTS.GET_TABLES}${selectedRestaurantId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(response.data);
      setTablesData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTablesData();
  }, []);

  useEffect(() => {
    if (tablesData.length > 0) {
      setLocationId(tablesData[0].id);
      setEditLocationName(tablesData[0].name);
    }
  }, [tablesData]);

  // delete location

  const delLocation = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this location?",
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`${API_ENDPOINTS.DELETE_LOCATION}${locationId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess("Location deleted successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
        fetchTablesData();
      } catch (error) {
        setError("Error deleting location.");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  // create location

  const handleAddLocation = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        API_ENDPOINTS.CREATE_LOCATION,
        { restaurant: selectedRestaurantId, name: locationName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchTablesData();
      setSuccess("Location created successfully!");
      setLocationName("");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError("Error creating location.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setAddLocation(false);
  };

  // edit location

  const handleEditLocation = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      const requestData = {
        restaurant: selectedRestaurantId,
        name: editLocationName,
      };

      const response = await axios.put(
        `${API_ENDPOINTS.UPDATE_LOCATION}${locationId}/`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSuccess("Location updated successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 2000);

      fetchTablesData();
    } catch (error) {
      console.log(error);
      setError("Error updating location.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  // create table
  const handleAddTable = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      const requestData = {
        location: locationId,
        table_number: tableNumber,
        restaurant: selectedRestaurantId,
      };

      const response = await axios.post(
        API_ENDPOINTS.CREATE_TABLE,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess("Table created successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 2000);

      fetchTablesData();
      setTableNumber("");
    } catch (error) {
      error.response.data.error
        ? setError(error.response.data.error)
        : error.response.data.non_field_errors[0]
          ? setError(error.response.data.non_field_errors[0])
          : setError("Error creating table.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }

    setAddTable(false);
  };

  // edit table

  const handleTableData = (data) => {
    setSelectedTableId(data[0]);
    setSelectedTableName(data[1]);
  };

  const handleEditTable = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      const requestData = {
        location: locationId,
        table_number: selectedTableName,
        status: status,
      };

      const response = await axios.put(
        `${API_ENDPOINTS.EDIT_TABLE}${selectedTableId}/`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSuccess("Table updated successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 2000);

      fetchTablesData();
    } catch (error) {
      setError("Error updating table.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  // talbes bulk
  const handleTablesBulk = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      const start = parseInt(bulkStart);
      const end = parseInt(bulkEnd);
      if (end - start > 20) {
        setError(
          "The difference between bulkStart and bulkEnd cannot exceed 20.",
        );
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }

      for (let i = start; i <= end; i++) {
        const tableNumber = `${tablesBulkName}${i}`;

        const requestData = {
          location: locationId,
          table_number: tableNumber,
          restaurant: selectedRestaurantId,
        };

        await axios.post(API_ENDPOINTS.CREATE_TABLE, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setSuccess("Tables created successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
      fetchTablesData();
    } catch (error) {
      error.response.data
        ? setError(error.response.data.error)
        : setError("Error creating tables.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }

    setTableBulkName("");
    setBulkStart("");
    setBulkEnd("");
    setAddTableBulk(false);
  };

  return (
    <section
      className={`${showRestaurantSection == 3 ? "block" : "hidden"} mt-12`}
    >
      {tablesData.length === 0 ? (
        <section className={`${addLocation ? "block" : "hidden"} mb-6`}>
          {/* add location  */}
          <h1 className="mb-3 text-xl font-bold">Add Tables Location</h1>
          <form onSubmit={handleAddLocation} action="">
            <input
              className="rounded-lg border px-3 py-2 outline-none"
              type="text"
              placeholder="Location"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
            <section className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setAddLocation(false)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white outline-none"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-green-500 px-4 py-2 text-white outline-none">
                Create
              </button>
            </section>
          </form>
        </section>
      ) : (
        <>
          <section className={`${addLocation ? "block" : "hidden"} mb-6`}>
            {/* add location  */}
            <h1 className="mb-3 text-xl font-bold">Add Tables Location</h1>
            <form onSubmit={handleAddLocation} action="">
              <input
                className="rounded-lg border px-3 py-2 outline-none"
                type="text"
                placeholder="Location"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
              <section className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAddLocation(false)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white outline-none"
                >
                  Cancel
                </button>
                <button className="rounded-lg bg-green-500 px-4 py-2 text-white outline-none">
                  Create
                </button>
              </section>
            </form>
          </section>

          {/* edit location  */}
          <section className={`${editLocation ? "block" : "hidden"} mb-6`}>
            <h1 className="mb-3 text-xl font-bold">Edit Tables Location</h1>
            <form onSubmit={handleEditLocation} action="">
              <input
                className="rounded-lg border px-3 py-2 outline-none"
                type="text"
                value={editLocationName}
                onChange={(e) => setEditLocationName(e.target.value)}
              />
              <section className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditLocation(false)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditLocation(false)}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white outline-none"
                >
                  Update
                </button>
              </section>
            </form>
          </section>

          {/* add tables location  */}

          {/* add table  */}
          <section className={`${addTable ? "block" : "hidden"} mb-6`}>
            <h1 className="mb-3 text-xl font-bold">Add Table</h1>
            <form onSubmit={handleAddTable} action="">
              <input
                className="rounded-lg border px-3 py-2 outline-none"
                type="text"
                placeholder="Table Name"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
              <section className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAddTable(false)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setAddTable(false)}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white outline-none"
                >
                  Create
                </button>
              </section>
            </form>
          </section>

          {/* add tables bulk  */}
          <section className={`${addTableBulk ? "block" : "hidden"} mb-6`}>
            <h1 className="mb-3 text-xl font-bold">Add Tables Bulk</h1>
            <form
              onSubmit={handleTablesBulk}
              className="flex flex-col items-start gap-3"
              action=""
            >
              <input
                className="rounded-lg border px-3 py-2 outline-none"
                type="text"
                placeholder="Table Name"
                value={tablesBulkName}
                onChange={(e) => setTableBulkName(e.target.value)}
              />
              <input
                className="rounded-lg border px-3 py-2 outline-none"
                type="number"
                placeholder="Starting number"
                value={bulkStart}
                onChange={(e) => setBulkStart(e.target.value)}
              />
              <input
                className="rounded-lg border px-3 py-2 outline-none"
                type="number"
                placeholder="Ending Number"
                value={bulkEnd}
                onChange={(e) => setBulkEnd(e.target.value)}
              />
              <section className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAddTableBulk(false)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setAddTableBulk(false)}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white outline-none"
                >
                  Create
                </button>
              </section>
            </form>
          </section>

          {/* edit table  */}

          <section className={`${editTable ? "block" : "hidden"} mb-6`}>
            <h1 className="mb-3 text-xl font-bold">Edit Table</h1>
            <form
              className="flex flex-col items-start"
              onSubmit={handleEditTable}
              action=""
            >
              <input
                className="rounded-lg border px-3 py-2 outline-none"
                type="text"
                placeholder="Table Name"
                value={selectedTableName}
                onChange={(e) => setSelectedTableName(e.target.value)}
              />
              <select
                className="mt-3 w-52 rounded-lg border px-3 py-2 outline-none"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              <section className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditTable(false)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditTable(false)}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white outline-none"
                >
                  Update
                </button>
              </section>
            </form>
          </section>

          {/* Tables  */}
          <h1 className="text-xl font-bold sm:text-3xl">Tables</h1>
          <section className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3">
            <select
              name=""
              id=""
              value={location}
              onChange={handleLocationChange}
              className="rounded-lg border p-2 text-xs outline-none xs:text-sm"
            >
              {tablesData.map((location, idx) => (
                <option key={location.id} value={idx}>
                  {location.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setEditLocation(true);
                setAddTable(false);
                setAddLocation(false);
                setAddTable(false);
                setAddTableBulk(false);
              }}
              className="rounded-lg bg-green-500 px-5 py-2 text-xs text-white xs:text-sm"
            >
              Edit Location
            </button>
            <button
              onClick={delLocation}
              className="rounded-lg bg-red-600 px-5 py-2 text-xs text-white xs:text-sm"
            >
              Delete Location
            </button>
          </section>
          <section className="mb-8 mt-4 grid grid-cols-2 gap-5 text-xs xs:text-sm sm:grid-cols-3">
            <button
              onClick={() => {
                setEditLocation(false);
                setAddTable(false);
                setAddLocation(true);
                setAddTable(false);
                setAddTableBulk(false);
              }}
              className="rounded-lg bg-green-500 px-5 py-2 text-white"
            >
              Add Location
            </button>
            <button
              onClick={() => {
                setAddTable(true);
                setEditLocation(false);
                setAddLocation(false);
                setAddTableBulk(false);
              }}
              className="rounded-lg bg-green-500 px-5 py-2 text-white"
            >
              Add Table
            </button>
            <button
              onClick={() => {
                setEditLocation(false);
                setAddTable(false);
                setAddLocation(false);
                setAddTable(false);
                setAddTableBulk(true);
              }}
              className="rounded-lg bg-green-500 px-5 py-2 text-white"
            >
              Add Table-Bulk
            </button>
          </section>

          {/* tables  */}
          {success || error ? (
            <p
              className={`my-6 rounded-lg py-2 text-center font-bold text-white ${success ? "bg-green-500" : "bg-red-600"}`}
            >
              {success || error}
            </p>
          ) : null}

          {tablesData[location] && tablesData[location].tables.length > 0 ? (
            tablesData[location].tables.map((table) => (
              <Table
                key={table.id}
                setEditTable={setEditTable}
                status={table.status}
                name={table.table_number}
                fetchTablesData={fetchTablesData}
                tableId={table.id}
                setSuccess={setSuccess}
                setError={setError}
                sendData={handleTableData}
              />
            ))
          ) : (
            <h1 className="col-span-3 text-center text-lg font-bold sm:text-2xl">
              No tables to show
            </h1>
          )}
        </>
      )}
    </section>
  );
};

export default Tables;
