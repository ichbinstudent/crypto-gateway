import { Decimal } from "decimal.js";

export default ({
  required: (value: string): string | boolean => !!value || 'Required.',
  numRequired: (value: number): string | boolean => {
    try {
      new Decimal(value)
      return true
    } catch {
      return 'Please enter a valid number.'
    }
  },
  min: (v: string): string | boolean => v.length >= 8 || `Min 8 characters`,
  emailMatch: (v: string): string | boolean => /^[a-zA-Z0-9.+/=?^_-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/u.test(v) || 'E-mail must be valid',
  phoneMatch: (v: string): string | boolean => /^(\+|00)((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/u.test(v) || 'Only valid phone numbers are allowed'
})
