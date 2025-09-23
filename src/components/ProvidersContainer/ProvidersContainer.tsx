"use client"
import React, { ReactNode } from 'react'
import CartContextProvider from '../contexts/cartContext'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'

export default function ProvidersContainer({children}:{children:ReactNode}) {
  return (
    <div>
        <SessionProvider>
            <Provider store={store}>
                <CartContextProvider>{children}</CartContextProvider>
            </Provider>
        </SessionProvider>
    
    </div>
  )
}
