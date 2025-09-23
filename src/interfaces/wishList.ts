export interface AddToWishlistResponse {
  status: string;
  message: string;
  data: string[];
}

export interface RemoveFromWishlistResponse {
  status: string;
  message: string;
  data: string[]; 
}

export interface GetWishlistResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}

export interface WishlistProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  images: string[];
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  subcategory: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[];
  ratingsQuantity: number;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
