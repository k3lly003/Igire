"use client";
import React, { useState, useEffect, useMemo } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaEdit, FaTrash, FaFileDownload, FaPlusCircle } from "react-icons/fa";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EditOrder from "./EditOrder"; // Import edit dialog
import DeleteOrder from "./DeleteOrder"; // Import delete dialog
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Stock() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("https://iro-website-bn.onrender.com/api/Inventory/requests/getAllReq");
        const result = await response.json();
        console.log("API Response:", result); 
        setData(result);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const row = [];

    const tableHeaders = ["ID", "Item Name", "Description", "Category", "Quantity", "Unit Price", "Total Price", "Status", "Date Requested"];
    
    data.forEach((item) => {
      const rowData = [item.id, item.item_name, item.item_description, item.item_category, item.quantity, item.unit_price, item.total_price, item.status, item.date_requested];
      row.push(rowData);
    });

    doc.autoTable({
      head: [tableHeaders],
      body: row,
    });

    doc.save("Purchase order.pdf");
  };

  const handleEditOpen = (order) => {
    setSelectedOrder(order);
    setEditOpen(true);
  };

  const handleDeleteOpen = (order) => {
    setSelectedOrder(order);
    setDeleteOpen(true);
  };

  const handleSave = (updatedOrder) => {
    console.log("Saved order: ", updatedOrder);
    setEditOpen(false);
  };

  const handleDelete = (orderId) => {
    console.log("Deleted order ID:", orderId);
    setDeleteOpen(false);
  };

  const filteredData = useMemo(() => {
    if (Array.isArray(data)) {
      return data.filter(
        (item) =>
          item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (categoryFilter === "" || item.status === categoryFilter)
      );
    }
    return [];
  }, [data, searchTerm, categoryFilter]);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id", id: "id" },
      { Header: "Item Name", accessor: "item_name", id: "item_name" },
      { Header: "Description", accessor: "item_description", id: "item_description" },
      { Header: "Category", accessor: "item_category", id: "item_category" },
      { Header: "Quantity", accessor: "quantity", id: "quantity" },
      { Header: "Unit Price", accessor: "unit_price", id: "unit_price" },
      { Header: "Total Price", accessor: "total_price", id: "total_price" },
      { Header: "Status", accessor: "status", id: "status" },
      { Header: "Date Requested", accessor: "date_requested", id: "date_requested" },
       {
      Header: "Actions", // Add an "Actions" column
      id: "actions",
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditOpen(row.original)}
            className="text-blue-600 hover:text-blue-900"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteOpen(row.original)}
            className="text-red-600 hover:text-red-900"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
    ],
    []
  );
  

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div className="w-full px-6">
      <div className="flex items-center justify-between mt-4 mb-2">
        <div>
          <p className="py-6 text-md font-semibold">Purchase orders</p>
        </div>

        <div className="flex items-center max-w-lg">
          <div className="relative w-full">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border pl-10 pr-20 rounded-md py-2 w-full"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <select
            className="border px-1 text-[15px] py-2 rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Filter Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Denied">Denied</option>
          </select>

          <button
            onClick={handleExportPDF}
            className="flex items-center px-1 py-2 border rounded-md bg-white"
          >
            <FaFileDownload className="mr-1" />
            <span className="hidden md:inline">Download</span>
          </button>

          <a href="purchaseOrder/purchase-new">
            <button className="flex items-center px-1 py-2 border rounded-md bg-green-600 text-white">
              <FaPlusCircle className="mr-1" />
              <span className="hidden md:inline">Purchase New</span>
            </button>
          </a>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#EFF4FA]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end mt-4">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-1 py-1 flex items-center">
          <BiChevronLeft size={20} />
        </Button>
        <span className="mx-2">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-1 py-1 flex items-center">
          <BiChevronRight size={20} />
        </Button>
      </div>

      {isEditOpen && (
        <EditOrder order={selectedOrder} isOpen={isEditOpen} onClose={() => setEditOpen(false)} onSave={handleSave} />
      )}
      {isDeleteOpen && (
        <DeleteOrder order={selectedOrder} isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)} onDelete={handleDelete} />
      )}
    </div>
  );
}
