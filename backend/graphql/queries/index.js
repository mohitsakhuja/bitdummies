import { GraphQLObjectType } from 'graphql'

import { products, product } from './productQueries'
import { Orders, orders } from './orderQueries'
import { addresses } from './addressQueries'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    products,
    product,
    Orders,
    orders,
    addresses,
  },
})

export default RootQuery
