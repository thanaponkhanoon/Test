import { StatusInterface } from "./IStatus"

export interface TodolistInterface{
    ID:     number,
    List:   string,
    Des:    string,
    Date:   Date,
    StatusID: number,
    Status: StatusInterface
}