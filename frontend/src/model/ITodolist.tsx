import { StatusInterface } from "./IStatus"

export interface TodolistInterface{
    ID:     number,
    List:   string,
    Detail: string,
    StatusID: number,
    Status: StatusInterface
}