"use client"

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border border-threads-gray-light p-3 ${className}`}
    >
      {children}
    </button>
  )
}
