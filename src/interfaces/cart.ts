import { Brand } from "./brand"
import { Category, Subcategory } from "./category"

export interface AddToCartResponse{
    "status": string,
    "message": string,
    "numOfCartItems": number,
    "cartId": string,
    "data": CartResponseData<string>
}
export interface GetCartResponse{
    "status": string,
    "message": string,
    "numOfCartItems": number,
    "cartId": string,
    "data": CartResponseData<InnerCartProduct>
}
export interface CartResponseData<T>{
        "_id": string,
        "cartOwner":string,
        "products": CartResponseProduct<T>[]
        "createdAt": string,
        "updatedAt": string,
        "__v":  number,
        "totalCartPrice": number
    }
export interface CartResponseProduct<T>{
    
        "count":  number,
        "_id": string,
        "product": T,
        "price": number
        
    }



// export interface Product {
//   count: number
//   _id: string
//   product: Product2
//   price: number
// }

export interface InnerCartProduct {
  subcategory: Subcategory[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}















