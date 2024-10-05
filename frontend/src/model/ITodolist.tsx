import { StatusInterface } from "./IStatus"

export interface TodolistInterface{
    ID:     number,
    List:   string,
    StatusID: number,
    Status: StatusInterface
}