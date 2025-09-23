"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { apiServices } from "@/services/api"
import { CartItem, Order } from "@/interfaces"
// import { useSession } from "next-auth/react"


export default function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

// const { data: session } = useSession()
// console.log(session?.user?.id)


async function fetchOrders() {
  const tokenRes = await apiServices.token();
  console.log("Token Response:", tokenRes);

  const userId = tokenRes?.decoded?.id;
  if (!userId) {
    console.error("User ID not found in token response");
    setLoading(false);
    return;
  }

  const res = await apiServices.getUserOrders(userId);
  console.log("Orders API Response:", res);

setOrders(Array.isArray(res) ? res : (res?.data ?? []));
  setLoading(false);
}

useEffect(() => {
  fetchOrders()
}, [])

  if (loading) {
    return <p className="text-center text-gray-600">Loading orders...</p>
  }

  if (orders.length === 0) {
    return <p className="text-center text-black text-3xl font-bold m-20">No orders found.</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {orders.map((order, index) => (
        <Card key={index} className="shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Order #{index + 1}</span>
              <Badge variant="outline">{order.paymentMethodType}</Badge>
            </CardTitle>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* User Info */}
            <div>
              <h3 className="font-semibold">Customer</h3>
              <p className="text-sm text-gray-700">{order.user.name}</p>
              <p className="text-sm text-gray-700">{order.user.email}</p>
              <p className="text-sm text-gray-700">{order.user.phone}</p>
            </div>

            <Separator />

            {/* Shipping Info */}
            <div>
              <h3 className="font-semibold">Shipping Address</h3>
              <p className="text-sm text-gray-700">
                {order.shippingAddress.city} - {order.shippingAddress.details}
              </p>
              <p className="text-sm text-gray-700">
                Phone: {order.shippingAddress.phone}
              </p>
            </div>

            <Separator />

            {/* Products */}
            <div>
              <h3 className="font-semibold">Items</h3>
              <div className="space-y-3 mt-2">
                {order.cartItems.map((item:CartItem) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border rounded-lg p-2"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={60}
                        height={60}
                        className="rounded-md border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.count}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ${item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Status & Total */}
            <div className="flex justify-between items-center">
              <div>
                <Badge
                  className={`${
                    order.isPaid ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </Badge>
                <Badge
                  className={`ml-2 ${
                    order.isDelivered ? "bg-green-500" : "bg-yellow-500"
                  } text-white`}
                >
                  {order.isDelivered ? "Delivered" : "Pending"}
                </Badge>
              </div>
              <p className="text-lg font-bold">
                Total: ${order.totalOrderPrice}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
