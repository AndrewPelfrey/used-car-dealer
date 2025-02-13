import express, { Request, Response } from "express";
import { User } from "../models/user.js";

const router = express.Router();
// get
router.get('/employees', async (_, res) => {
    try {
        const employees = await User.findAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: "Error getting employees"})
    }
});

router.post('/employees', async (req: Request, res: Response) => {
    try {
        const { username, role, password } = req.body;
        const newEmployee = await User.create({ username, role, password });
        res.json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: "Error creating employee" });
    }
});

router.put('/employees/:id', async (req, res) => {
    try {
        const { username, role } = req.body;
        const employee = await User.findByPk(req.params.id);
        
        if (!employee) return res.status(404).json({ error: "Employee not found" });

        employee.username = username || employee.username;
        employee.role = role || employee.role;
        await employee.save();

        return res.json(employee);
    } catch (error) {
        return res.status(500).json({ error: "error updating employee" });
    }
});

router.delete('/employees/:id', async (req, res) => {
    try {
        const employee = await User.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ error: "Employee not found" });

       await employee.destroy();
       return res.json({ message: "Employee deleted successfully" });
    } catch (error) {
       return res.status(500).json({ error: "Error deleting employee "});
    }
});
export default router;