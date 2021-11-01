export interface Coin {
  id: string
  symbol: string
  name: string
  block_time_in_minutes: string
  image: Image
  market_data: MarketData
  last_updated: Date
  localization: Localization
}

export interface Image {
  thumb: string
  small: string
  large: string
}

export interface Localization {
  en: string
  de: string
  es: string
  fr: string
  it: string
  pl: string
  ro: string
  hu: string
  nl: string
  pt: string
  sv: string
  vi: string
  tr: string
  ru: string
  ja: string
  zh: string
  'zh-tw': string
  ko: string
  ar: string
  th: string
  id: string
}

export interface MarketData {
  current_price: { [key: string]: number }
  roi: null
  market_cap: { [key: string]: number }
  market_cap_rank: number
  total_volume: { [key: string]: number }
  high_24h: { [key: string]: number }
  low_24h: { [key: string]: number }
  price_change_24h: number
  price_change_percentage_24h: number
  price_change_percentage_7d: number
  price_change_percentage_14d: number
  price_change_percentage_30d: number
  price_change_percentage_60d: number
  price_change_percentage_200d: number
  price_change_percentage_1y: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  price_change_24h_in_currency: { [key: string]: number }
  price_change_percentage_1h_in_currency: { [key: string]: number }
  price_change_percentage_24h_in_currency: { [key: string]: number }
  price_change_percentage_7d_in_currency: { [key: string]: number }
  price_change_percentage_14d_in_currency: { [key: string]: number }
  price_change_percentage_30d_in_currency: { [key: string]: number }
  price_change_percentage_60d_in_currency: { [key: string]: number }
  price_change_percentage_200d_in_currency: { [key: string]: number }
  price_change_percentage_1y_in_currency: { [key: string]: number }
  market_cap_change_24h_in_currency: { [key: string]: number }
  market_cap_change_percentage_24h_in_currency: { [key: string]: number }
  total_supply: string
  circulating_supply: string
}
