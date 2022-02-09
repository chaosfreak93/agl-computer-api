import { buildSchema } from 'graphql';

export default buildSchema(`
type Product {
    _id: ID!
    name: String!
    price: Float!
    image: String
}

input ProductInput {
    name: String!
    price: Float!
    image: String
}

type Query {
    products: [Product!]!
    getProductByID(productId: ID!): Product
    getProductByName(productName: String!): Product
}

type Mutation {
    createProduct(input: ProductInput!): Product
}
`);