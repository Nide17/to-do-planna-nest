
import { Column, Model, Table } from 'sequelize-typescript';

@Table // THIS IS THE DECORATOR THAT WILL BE USED TO CREATE THE TABLE
export class User extends Model { // EXTENDS THE Model CLASS FROM sequelize-typescript
    @Column
    username: string;

    @Column
    email: string;

    @Column
    password: string;
}