// src/components/Layout.tsx
import { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
    <Header />
    <main>{children}</main> 
    <Footer />
  </div>
  )
}