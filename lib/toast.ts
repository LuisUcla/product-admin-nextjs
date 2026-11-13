"use client"

import toast from "react-hot-toast"

export type ToastType = "success" | "error"

const DEFAULT_TOAST_DURATION = 2500

export function showToast(type: ToastType, message: string) {
  toast[type](message, { duration: DEFAULT_TOAST_DURATION })
}

export function showErrorToast(error: unknown, fallbackMessage: string) {
  const message =
    error instanceof Error && error.message ? error.message : fallbackMessage

  showToast("error", message)
}
