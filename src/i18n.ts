import i18n from "i18next"
import { initReactI18next } from "react-i18next"

export const defaultNS = "translation"

export const resources = {
  ru: {
    translation: {
      price: {
        label: "Цена",
        placeholder: "Например, 2500000",
        help: "Обязательное поле, от 10 до 100 000 000.",
        required: "Укажите цену.",
        number: "Цена должна быть числом.",
        integer: "Цена должна быть целым числом.",
        min: "Цена не может быть меньше 10.",
        max: "Цена не может быть больше 100 000 000.",
        submit: "Создать",
        valid: "Цена выглядит корректно.",
      },
    },
  },
  en: {
    translation: {
      price: {
        label: "Price",
        placeholder: "For example, 2500000",
        help: "Required, from 10 to 100,000,000.",
        required: "Enter a price.",
        number: "Price must be a number.",
        integer: "Price must be a whole number.",
        min: "Price cannot be less than 10.",
        max: "Price cannot be greater than 100,000,000.",
        submit: "Create",
        valid: "Price looks valid.",
      },
    },
  },
  th: {
    translation: {
      price: {
        label: "ราคา",
        placeholder: "เช่น 2500000",
        help: "จำเป็นต้องกรอก ตั้งแต่ 10 ถึง 100,000,000",
        required: "กรุณาระบุราคา",
        number: "ราคาต้องเป็นตัวเลข",
        integer: "ราคาต้องเป็นจำนวนเต็ม",
        min: "ราคาต้องไม่น้อยกว่า 10",
        max: "ราคาต้องไม่เกิน 100,000,000",
        submit: "สร้าง",
        valid: "ราคาถูกต้อง",
      },
    },
  },
} as const

i18n.use(initReactI18next).init({
  defaultNS,
  enableSelector: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  lng: "ru",
  resources,
})

export default i18n
