import { PersonNode } from "../person-node.interface";

import { data } from '../data';

export const getPersonNodeById = (id: string): Promise<PersonNode> => {
    return new Promise<PersonNode>((resolve, reject) => {
        const person = data.find(x => x.id == id);

        if (person) {
            resolve(person);
        } else {
            reject();
        }
    });
}
