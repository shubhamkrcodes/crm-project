import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth(); // ← Remove logout from here

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await api.get('/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = () => {
    setEditingRecord(null);
    setShowForm(true);
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingRecord(null);
  };

  const handleRecordUpdate = () => {
    fetchRecords();
    handleFormClose();
  };

  const handleDeleteRecord = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await api.delete(`/records/${id}`);
        fetchRecords();
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar /> {/* ← Add Sidebar here */}
      
      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1>Customer Management</h1>
          <button onClick={handleCreateRecord} className="btn-primary">
            + Add New Customer
          </button>
        </header>
        
        <main className="dashboard-content">
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Total Customers</h3>
              <div className="value">{records.length}</div>
            </div>
            <div className="stat-card">
              <h3>Active Customers</h3>
              <div className="value">
                {records.filter(r => r.status === 'Active').length}
              </div>
            </div>
            <div className="stat-card">
              <h3>Inactive Customers</h3>
              <div className="value">
                {records.filter(r => r.status === 'Inactive').length}
              </div>
            </div>
          </div>
          
          <RecordList 
            records={records} 
            onEdit={handleEditRecord}
            onDelete={handleDeleteRecord}
          />
        </main>
      </div>
      
      {showForm && (
        <RecordForm 
          record={editingRecord}
          onClose={handleFormClose}
          onSuccess={handleRecordUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
