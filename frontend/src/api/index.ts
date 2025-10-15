import { Bond } from "@/types";
import axios from "axios";

const API_URL = 'http://localhost:3100';

export namespace api{
    export const get_bonds = async () => {
        return (await axios.get(`${API_URL}/bonds`)).data;
    }

    export const create_bond = async (newBond: Bond) => {
        return await axios.post(`${API_URL}/bonds`, newBond);
    }

    export const delete_bond = async (id: string) => {
        return await axios.delete(`${API_URL}/bonds/${id}`);
    }

    export const edit_bond = async (bond: Bond) => {
        return await axios.put(`${API_URL}/bonds/${bond.id}`, bond);
    }
}