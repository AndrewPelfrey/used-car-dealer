import { useState, useEffect } from "react";

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
        <>
        <div>
            <h3>Add Employees</h3>
            <form onSubmit={handleAddEmployee}>
                <input type="text"
                placeholder="Username"
                value={newEmployee.username}
                onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                required
                 />
                 <input type="text"
                 placeholder="Role"
                 value={newEmployee.role}
                 onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                 required
                  />
                  <input type="text"
                  placeholder="Password" 
                  value={newEmployee.password}
                  onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                  required
                  />
                  <button type="submit">Add Employee</button>
            </form>
        </div>
        {editEmployee && (
            <div>
                <h3>Edit Employee</h3>
                <form onSubmit={handleUpdateEmployee}>
                    <input type="text"
                    value={editEmployee.username}
                    onChange={(e) => setEditEmployee({ ...editEmployee, username: e.target.value })} 
                    required
                    />
                    <input type="text"
                    value={editEmployee.role}
                    onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })}
                    required
                    />
                    <input type="password"
                    value={editEmployee.password}
                    onChange={(e) => setEditEmployee({ ...editEmployee, password: e.target.value })}
                    required
                     />
                     <button type="submit">Update Employee</button>
                </form>
            </div>
        )}

        <div>
            <h2>All Employees</h2>
            <ul>
                {employees.map((emp) => (
                    <li key={emp.id}>
                        {emp.username} - {emp.role} (Joined: {new Date(emp.createdAt).toLocaleDateString()})
                        <button onClick={() => handleEditEmployee(emp.id)}>Edit</button>
                        <button onClick={() => handleDeleteEmployee(emp.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default CrudEmployees;