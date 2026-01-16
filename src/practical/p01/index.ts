import axios from 'axios';
export interface User {
    id: number;
    name: string;
    address: Address;
    phone: string;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}

type RootObject = User[];

export function getPostalAddress(): Promise<User[]> {
    return axios.get<RootObject>('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (response.data.map(user => ({
                id: user.id,
                name: user.name,
                phone: user.phone,
            })) === undefined) {
                return [];
            }
            
            if (response.data.map(user => user.address) === undefined) {
                return [];
            }


            return response.data.map(user => ({
                id: user.id,
                name: user.name,
                phone: user.phone,
                address: user.address,
            }));
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
};
