import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging tailwind classes correctly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price in rubles
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU') + ' ₽';
}

/**
 * Formats a phone number in Russian format
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Clean the phone number of any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Check if the input is valid
  if (cleaned.length !== 11) {
    return phoneNumber;
  }
  
  // Format the phone number in Russian style: +7 (XXX) XXX-XX-XX
  return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
}

/**
 * Extracts a numeric value from a string (for example, from area dimensions)
 */
export function extractNumericValue(str: string): number {
  const matched = str.match(/\d+/g);
  if (!matched) return 0;
  return parseInt(matched[0], 10);
}

/**
 * Scrolls to an element by ID with smooth scrolling
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}
