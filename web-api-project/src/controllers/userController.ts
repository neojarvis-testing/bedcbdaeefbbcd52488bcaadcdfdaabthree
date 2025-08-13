class UserController {
    private users: { id: number; name: string; email: string }[] = [];
    private currentId: number = 1;

    getUser(req: any, res: any) {
        const userId = parseInt(req.params.id);
        const user = this.users.find(u => u.id === userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    createUser(req: any, res: any) {
        const { name, email } = req.body;
        const newUser = { id: this.currentId++, name, email };
        this.users.push(newUser);
        res.status(201).json(newUser);
    }

    updateUser(req: any, res: any) {
        const userId = parseInt(req.params.id);
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            const { name, email } = req.body;
            this.users[userIndex] = { id: userId, name, email };
            res.status(200).json(this.users[userIndex]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}

export default UserController;