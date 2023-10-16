import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table // THIS IS THE DECORATOR THAT WILL BE USED TO CREATE THE TABLE
export class TodosList extends Model { // EXTENDS THE Model CLASS FROM sequelize-typescript
    @Column
    title: string;

    @Column
    userId: number;

    @Column
    status: string;

    @Column
    dueDate: Date;

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;

    @Column(DataType.JSON)
    todos: Array<{ title: string, completed: Boolean }>;
}