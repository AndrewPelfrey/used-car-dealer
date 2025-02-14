import { useState, useEffect } from "react";
import "../styles/crudEmployees.css";

interface Employee {
    id: number;
    username: string;
    role: string;
    password: string;
    createdAt: string;
}

const CrudEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
 
    const [newEmployee, setNewEmployee] = useState({
        username: "",
        role: "",
        password: "",
        createdAt: new Date().toISOString()
    });

    const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        fetch("/api/employees")
        .then((res) => res.json())
        .then((data) => {
            setEmployees(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching employees:", error);
            setLoading(false);
        });
    }, []);

    const handleAddEmployee = (event: React.FormEvent) => {
        event.preventDefault();
        fetch("/api/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
        })
        .then((res) => res.json())
        .then((data) => {
            setEmployees((prev) => [...prev, data]);
            setNewEmployee({ username: "", role: "", password: "", createdAt: new Date().toISOString() });
        })
        .catch((error) => console.error("Error adding employee", error));
    };

    const handleEditEmployee = (id: number) => {
        const emp = employees.find((emp) => emp.id === id);
        if (emp) setEditEmployee(emp);
    };

    const handleUpdateEmployee = (event: React.FormEvent) => {
        event.preventDefault();
        if (!editEmployee) return;

        fetch(`/api/employees/${editEmployee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "applicatio/json",
            },
            body: JSON.stringify(editEmployee),
        })
        .then((res) => res.json())
        .then((data) => {
            setEmployees((prev) => 
                prev.map((emp) => (emp.id === data.id ? data : emp))
            );
            setEditEmployee(null);
        })
        .catch((error) => console.error("Error updating employee:", error));
    };

    const handleDeleteEmployee = (id: number) => {
        fetch (`/api/employees/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        })
        .catch((error) => console.error("Error deleting employee:", error));
    };

    if (loading) return <p>Loading Employees..</p>;
    return (
        <div className="crud-container">
            <div className="form-section">
                <h3>Add Employee</h3>
                <form onSubmit={handleAddEmployee} className="employee-form">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Username"
                        value={newEmployee.username}
                        onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Role"
                        value={newEmployee.role}
                        onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        className="input-field"
                        placeholder="Password"
                        value={newEmployee.password}
                        onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        required
                    />
                    <button type="submit" className="crud-button">Add Employee</button>
                </form>
            </div>

            {editEmployee && (
                <div className="form-section">
                    <h3>Edit Employee</h3>
                    <form onSubmit={handleUpdateEmployee} className="employee-form">
                        <input
                            type="text"
                            className="input-field"
                            value={editEmployee.username}
                            onChange={(e) => setEditEmployee({ ...editEmployee, username: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            className="input-field"
                            value={editEmployee.role}
                            onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            className="input-field"
                            value={editEmployee.password}
                            onChange={(e) => setEditEmployee({ ...editEmployee, password: e.target.value })}
                            required
                        />
                        <button type="submit" className="crud-button">Update Employee</button>
                    </form>
                </div>
            )}

            <div className="list-section">
                <h2>All Employees</h2>
                <ul className="employee-list">
                    {employees.map((emp) => (
                        <li key={emp.id} className="employee-item">
                            <span>{emp.username} - {emp.role} (Added: {new Date(emp.createdAt).toLocaleDateString()})</span>
                            <div className="button-group">
                                <button className="crud-button edit" onClick={() => handleEditEmployee(emp.id)}>Edit</button>
                                <button className="crud-button delete" onClick={() => handleDeleteEmployee(emp.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CrudEmployees;