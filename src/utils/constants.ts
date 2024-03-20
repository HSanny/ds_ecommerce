export const links = [
    {
        id: 1,
        text: 'home',
        url: '/',
    },
    {
        id: 2,
        text: 'products',
        url: '/products',
    },
    {
      id: 3,
      text: 'shipment',
      url: '/shipment',
    },
]

export const API_ENDPOINT = `http://127.0.0.1:8000/products/amazon_products/`

export const QUERY = `
{
  allProduct {
    _id
    name
    slug {
      current
    }
    brand
    categories {
      categories
    }
    clothingCategories {
      clothingCategories
    }
    price
    stock
    forWhom {
      forWhom
    }
    height {
      height
    }
    heightDescription
    age {
      age
    }
    ageDescription
    itemDescription
    featured
    images {
      asset {
        url
      }
    }
  }
}

`