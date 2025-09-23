
import { AddToCartResponse, AddToWishlistResponse, ForgetPasswordResponse, GetCartResponse, GetWishlistResponse, Order, RemoveFromWishlistResponse, ResetPasswordResponse, VerifyCodeResponse } from "@/interfaces";
import { BrandsResponse, CategoriesResponse, ProductsResponse, SingleBrandResponse, SingleCategoryResponse, SingleProductResponse, SingleSubCategoryResponse } from "@/types";
import { getSession } from "next-auth/react";


const baseUrl=process.env.NEXT_PUBLIC_API_BASE_URL;


class ApiServices{
    #baseUrl:string;
    constructor(){
        this.#baseUrl = baseUrl ?? "";
    }

    async getAllProducts(): Promise<ProductsResponse>{
        return await fetch(this.#baseUrl+"api/v1/products",{
            next:{
                revalidate:60
            }
        }

        ).then(res=>res.json())
        
    }
        
        async getAllBrands():Promise<BrandsResponse>{
        return await fetch (this.#baseUrl +"api/v1/brands",{
            next:{
                revalidate:120
            }
        }).then(res=>res.json())
    }


    async getAllCategories():Promise<CategoriesResponse>{
        return await fetch (this.#baseUrl+"api/v1/categories").then(res=>res.json())
    }
    async getSingleProduct(ProductId:string) :Promise<SingleProductResponse>{
        return await fetch (this.#baseUrl+"api/v1/products/" + ProductId)
            .then((res)=>res.json())
    }



    async getSingleBrand(BrandId:string):Promise<SingleBrandResponse>{
        return await fetch (this.#baseUrl +"api/v1/brands/" +BrandId)
        .then((res)=>res.json())
    }
    async getSingleCategory(CategoryId:string):Promise<SingleCategoryResponse>{
        return await fetch (this.#baseUrl +"api/v1/categories/"+CategoryId).then(res=>res.json())
    }
    
    // async getSpecificSubCategory(subCategoryId:string) : Promise<SingleSubCategoryResponse>{
       

    //     return await fetch(this.#baseUrl +"api/v1/subcategories/" +subCategoryId+"/subcategories").then(res=>res.json())
    // }

    // #getHeaders(){
    //     return {
    //             "Content-Type":"application/json",
    //             token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yjk2YTI4Y2E0NWFiOWY5MWE3ZDViNSIsIm5hbWUiOiJtZW5uYWhhbWR5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTY5ODE4MjQsImV4cCI6MTc2NDc1NzgyNH0.QY0eL9jql9qQl0VJZTo7ZAa7LfPq9wdMWpRJRb2-Gj0"
 
    //     };
    // }

    
    async #getHeaders(){
        const session =await getSession()
        return {
                "Content-Type":"application/json",
                token :session?.token || ""
        }
    }
    async addProductToCart(productId:string):Promise<AddToCartResponse>{
        return await fetch (this.#baseUrl + "api/v1/cart",{
            method:"post",
            body : JSON.stringify({
                productId
            }),
            headers:await this.#getHeaders()
        }).then(res=>res.json())
    }
     async addProductTowishlist(productId:string):Promise<AddToWishlistResponse>{
        return await fetch(this.#baseUrl + "api/v1/wishlist",{
            method:"post",
            body: JSON.stringify({
                productId
            }),
            headers:await this.#getHeaders()
        }).then(res => res.json());
     }
    async getUserCart():Promise<GetCartResponse>{
       return await fetch (this.#baseUrl + "api/v1/cart",{
        method :"get",
        headers:await this.#getHeaders()
       }).then(res=>res.json())
    }


    async getUserWishList():Promise<GetWishlistResponse>{
       return await fetch (this.#baseUrl + "api/v1/wishlist",{
        method :"get",
        headers:await this.#getHeaders()
       }).then(res=>res.json())
    }


    async removeCartProduct(productId:string):Promise<GetCartResponse>{
        return await fetch (this.#baseUrl + "api/v1/cart/" + productId,{
            method:"delete",
            headers:await this.#getHeaders()
        }).then(res=>res.json())
    }

    async removeWishListProduct(productId:string):Promise<RemoveFromWishlistResponse>{
        return await fetch (this.#baseUrl + "api/v1/wishlist/" + productId,{
            method:"delete",
            headers:await this.#getHeaders()
        }).then(res=>res.json())
    }
    async clearCartProduct():Promise<unknown>{
        return await fetch (this.#baseUrl + "api/v1/cart",{
            method:"delete",
            headers:await this.#getHeaders()
        }).then(res=>res.json())
    }


   
    async updateCartProduct(productId:string,count:number):Promise<GetCartResponse>{
        return await fetch (this.#baseUrl + "api/v1/cart/"+productId,{
            method:"put",
            body:JSON.stringify({
                count
            }),
            headers:await this.#getHeaders()
        }).then(res=>res.json())
    }


       
    async resetPassword(email:string,newPassword:string):Promise<ResetPasswordResponse>{
        return await fetch (this.#baseUrl + "api/v1/auth/resetPassword",{
            method:"put",
            body:JSON.stringify({
                email,
                newPassword
            }),
           headers:{"Content-Type":"application/json"}
        }).then(res=>res.json())
    }

       
    async forgetPassword(email:string,newPassword:string):Promise<ForgetPasswordResponse>{
        return await fetch (this.#baseUrl + "api/v1/auth/forgotPasswords",{
            method:"post",
            body:JSON.stringify({
                email,
            }),
           headers:{"Content-Type":"application/json"}
        }).then(res=>res.json())
    }

        async verifyResetPassword(resetCode:string):Promise<VerifyCodeResponse>{
        return await fetch (this.#baseUrl + "api/v1/auth/verifyResetCode",{
            method:"post",
            body:JSON.stringify({
                resetCode
            }),
           headers:{"Content-Type":"application/json"}
        }).then(res=>res.json())
    }
    async changePassword(currentPassword:string,password:string,rePassword:string):Promise<ResetPasswordResponse>{
        return await fetch (this.#baseUrl + "api/v1/users/changeMyPassword",{
            method:"put",
            body:JSON.stringify({
           
                 currentPassword,
                 password,
                 rePassword}
           ),
           headers:await this.#getHeaders()
        }).then(res=>res.json())
    }



    async checkOut (cartId:string){ 
        return await fetch (this.#baseUrl + "api/v1/orders/checkout-session/" +cartId +"?url=http://localhost:3000",{
            method :"post",
            body :JSON.stringify({
                    "shippingAddress":{
                    "details": "details",
                    "phone": "01010700999",
                    "city": "Cairo"
        }
            }),
            headers:await this.#getHeaders()
        }).then(res=>res.json())


    }



    async login (email:string,password:string){
        return await fetch (this.#baseUrl +"api/v1/auth/signin",{
            method:"post",
            body:JSON.stringify({
                email,
                password
            }),headers:{"Content-Type":"application/json"}
        }).then(res=>res.json())
    }


        async token (){
        return await fetch (this.#baseUrl +"api/v1/auth/verifyToken",{
           headers:await this.#getHeaders()
        }).then(res=>res.json())
    }

        async register ( name:string,email:string,password:string,rePassword:string,phone:string){
        return await fetch (this.#baseUrl +"api/v1/auth/signup",{
            method:"post",
            body:JSON.stringify({
                email,
                password,
                name,
                rePassword,
                phone,
            }),headers:{"Content-Type":"application/json"}
        }).then(res=>res.json())
    }



    async getUserOrders(userId:string):Promise<Order[] | { data: Order[] }>{
        return await fetch (this.#baseUrl+"api/v1/orders/user/"+userId,{
            headers:await this.#getHeaders()
        }).then(res=>res.json())
    }

    


}




export const apiServices= new ApiServices()
