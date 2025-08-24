import React from 'react';

const RecordList = ({ records, onEdit, onDelete }) => {
  if (records.length === 0) {
    return (
      <div className="empty-state">
        <p>No records found. Add your first customer record!</p>
      </div>
    );
  }

  return (
    <div className="record-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record._id}>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>
                <span className={`status-badge ${record.status.toLowerCase()}`}>
                  {record.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    onClick={() => onEdit(record)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(record._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;