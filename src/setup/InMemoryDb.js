// All data was generated in 4Devs

class InMemoryDb {
    constructor() {
        this.users = [
            {
                name: 'Joao',
                email: 'joao@distributor.com',
                password: '$2a$10$pQ46VLQknJW1qvWRd8ZTJuKzPyIzHfrq6k91lm67KMgUcJMKG97RW',
                status: 'A'
            },
            {
                name: 'Ana',
                email: 'ana@distributor.com',
                password: '$2a$10$pQ46VLQknJW1qvWRd8ZTJuKzPyIzHfrq6k91lm67KMgUcJMKG97RW',
                status: 'A'
            },
            {
                name: 'Jose',
                email: 'jose@distributor.com',
                password: '$2a$10$pQ46VLQknJW1qvWRd8ZTJuKzPyIzHfrq6k91lm67KMgUcJMKG97RW',
                status: 'A'
            }
        ];

        this.customers = [
            {
                name: 'Eduarda Laís Isabelle Viana',
                doc: '18598242187',
                email: 'eduardalaisviana@contjulioroberto.com.br',
                phone: '4728384724'
            },
            {
                name: 'Juan Jorge Santos',
                doc: '86101079902',
                email: 'juan-santos70@agnet.com.br',
                phone: '9338932103'
            },
            {
                name: 'Milena Rafaela da Cruz',
                doc: '88930626408',
                email: 'milena_dacruz@termaqui.com.br',
                phone: '6337850951'
            },
            {
                name: 'Carlos Hugo Caldeira',
                doc: '84274095401',
                email: 'carlos.hugo.caldeira@charquesorocaba.com.br',
                phone: '6525376348'
            },
            {
                name: 'Geraldo Gustavo Freitas',
                doc: '14712416106',
                email: 'geraldo_gustavo_freitas@lagencemodelos.com.br',
                phone: '6736223977'
            },
            {
                name: 'Tatiane Isis Almada',
                doc: '33244818480',
                email: 'tatianeisisalmada@gmail.com',
                phone: '6735678122'
            },
            {
                name: 'Isis Nicole Rocha',
                doc: '60772392161',
                email: 'isis_rocha@outlook.com.br',
                phone: '1129972625'
            },
            {
                name: 'Raimundo Noah João Ribeiro',
                doc: '60899143040',
                email: 'raimundonoahribeiro@novadeliveri.com.br',
                phone: '4826477153'
            },
            {
                name: 'Manuel Antonio Nathan Araújo',
                doc: '17547906079',
                email: 'manuel.antonio.araujo@roche.com',
                phone: '8439330534'
            },
            {
                name: 'César Marcos da Mata',
                doc: '71369417764',
                email: 'cesar_marcos_damata@galpaoestofados.com.br',
                phone: '9528323034'
            }
        ];

        this.products = [
            {
                name: 'Penca de Babana',
                type: 'Frutas',
                price: 3.23,
                quantity: 10,
                provider: 'Fruteira Chapecó'
            },
            {
                name: 'Caixa de Maças',
                type: 'Frutas',
                price: 7.89,
                quantity: 7,
                provider: 'Fruteira Chapecó'
            },
            {
                name: 'Brócolis',
                type: 'Vegetais',
                price: 4.45,
                quantity: 35,
                provider: 'Frutas do Zé'
            },
            {
                name: 'Pé de Alface',
                type: 'Vegetais',
                price: 2.1,
                quantity: 29,
                provider: 'Atacadao das Frutas'
            },
            {
                name: 'Melancia',
                type: 'Frutas',
                price: 12.19,
                quantity: 4,
                provider: 'Frutas do Zé'
            },
            {
                name: 'Saco de Batata',
                type: 'Legumes',
                price: 5.36,
                quantity: 8,
                provider: 'Atacadao das Frutas'
            },
            {
                name: 'Abóbora',
                type: 'Legumes',
                price: 9.99,
                quantity: 3,
                provider: 'Fruteira Chapecó'
            },
            {
                name: 'Pepino',
                type: 'Vegetal',
                price: 0.49,
                quantity: 69,
                provider: 'Frutas do Zé'
            },
            {
                name: 'Saco de Laranja',
                type: 'Frutas',
                price: 14.69,
                quantity: 17,
                provider: 'Atacadao das Frutas'
            },
            {
                name: 'Chuchu',
                type: 'Vegetais',
                price: 3.19,
                quantity: 24,
                provider: 'Frutas do Zé'
            }
        ];

        this.requests = [
            {
                description: 'Compras na feira',
                products: [],
                quantity: [],
                customer: 'Substituido na aplicação',
                author: 'System'
            },
            {
                description: 'Reposição do supermercado',
                products: [],
                quantity: [],
                customer: 'Substituido na aplicação',
                author: 'System'
            },
            {
                description: 'Compras da Supercesta',
                products: [],
                quantity: [],
                customer: 'Substituido na aplicação',
                author: 'System'
            }
        ];
    }

    getUsers() {
        return this.users;
    }

    getCustomers() {
        return this.customers;
    }

    getProducts() {
        return this.products;
    }

    getRequests() {
        return this.requests;
    }
}

module.exports = InMemoryDb;
