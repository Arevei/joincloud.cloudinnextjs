"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
interface EmailLinkProps {
  to: string
  subject?: string
  body?: string
  className?: string
  children: React.ReactNode
}

export function EmailLink({ to, subject = "", body = "", className, children }: EmailLinkProps) {
  const isMobile = useIsMobile()

  const desktopHref = `https://mail.google.com/mail/u/0/?to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&fs=1&tf=cm`
  const mobileHref = `mailto:${to}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}${body ? `${subject ? "&" : "?"}body=${encodeURIComponent(body)}` : ""}`

  return (
    <Link href={isMobile ? mobileHref : desktopHref} className={className}>
      {children}
    </Link>
  )
}