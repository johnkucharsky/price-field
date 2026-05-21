import { type SyntheticEvent, useMemo, useState } from "react"
import { NumericFormat } from "react-number-format"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const MIN_PRICE = 10
const MAX_PRICE = 100_000_000

type PriceIssue = "required" | "number" | "integer" | "min" | "max"
type Language = "ru" | "en" | "th"

const languages: Array<{ label: string; value: Language }> = [
  { label: "RU", value: "ru" },
  { label: "EN", value: "en" },
  { label: "TH", value: "th" },
]

const priceSchema = z
  .string()
  .trim()
  .min(1, { message: "required" satisfies PriceIssue })
  .refine((value) => /^\d+$/.test(value), {
    message: "number" satisfies PriceIssue,
  })
  .transform(Number)
  .refine((value) => Number.isInteger(value), {
    message: "integer" satisfies PriceIssue,
  })
  .refine((value) => value >= MIN_PRICE, {
    message: "min" satisfies PriceIssue,
  })
  .refine((value) => value <= MAX_PRICE, {
    message: "max" satisfies PriceIssue,
  })

function getPriceError(value: string) {
  const result = priceSchema.safeParse(value)

  if (result.success) {
    return null
  }

  return result.error.issues[0]?.message as PriceIssue
}

export function App() {
  const { i18n, t } = useTranslation()
  const [price, setPrice] = useState("")
  const [touched, setTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const priceError = useMemo(() => getPriceError(price), [price])
  const showError = (touched || submitted) && priceError !== null
  const showValid = touched && price !== "" && priceError === null

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setTouched(true)

    const result = priceSchema.safeParse(price)

    if (!result.success) {
      return
    }

    console.log({ price: result.data })
  }

  const errorMessage = useMemo(() => {
    if (showError) {
      return t(($) => $.price[priceError])
    }

    if (showValid) {
      return t(($) => $.price.valid)
    }

    return ""
  }, [priceError, showError, showValid, t])

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <form
        className="w-full max-w-sm space-y-4"
        noValidate
        onSubmit={handleSubmit}
      >
        <ButtonGroup aria-label="Language">
          {languages.map((language) => (
            <Button
              aria-pressed={i18n.resolvedLanguage === language.value}
              key={language.value}
              onClick={() => void i18n.changeLanguage(language.value)}
              type="button"
              variant="outline"
              className={"cursor-pointer"}
            >
              {language.label}
            </Button>
          ))}
        </ButtonGroup>

        <Field>
          <FieldLabel htmlFor="price">{t(($) => $.price.label)}</FieldLabel>

          <NumericFormat
            aria-describedby="price-help price-message"
            aria-invalid={showError}
            className="h-11"
            customInput={Input}
            decimalScale={0}
            fixedDecimalScale={false}
            id="price"
            inputMode="numeric"
            allowNegative={false}
            allowLeadingZeros={false}
            min={MIN_PRICE}
            max={MAX_PRICE}
            name="price"
            onBlur={() => setTouched(true)}
            onValueChange={(values) => {
              setPrice(values.value)
            }}
            placeholder={t(($) => $.price.placeholder)}
            suffix=" ฿"
            required
            thousandSeparator=" "
            type="text"
            value={price}
          />

          <FieldDescription id="price-help">
            {t(($) => $.price.help)}
          </FieldDescription>

          <FieldDescription
            className={
              showError
                ? "min-h-5 text-sm text-destructive"
                : "min-h-5 text-sm text-emerald-700"
            }
            id="price-message"
            role={showError ? "alert" : undefined}
          >
            {errorMessage}
          </FieldDescription>
        </Field>

        <Button className="h-10 cursor-pointer" type="submit">
          {t(($) => $.price.submit)}
        </Button>
      </form>
    </main>
  )
}

export default App
