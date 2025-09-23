import { Product, Brand, Category, ApiResponse, SubCategory } from '@/interfaces';


export type ProductsResponse = ApiResponse<Product>;
export type BrandsResponse = ApiResponse<Brand>;
export type CategoriesResponse = ApiResponse<Category>;
export type SubCategoriesResponse = ApiResponse<SubCategory>;
// Single item responses
export type SingleBrandResponse = {
  data: Brand;
}

export type SingleCategoryResponse = {
  data: Category;
}

export type SingleProductResponse = {
  data: Product;
}

export type SingleSubCategoryResponse = {
  data: SubCategory;
}
