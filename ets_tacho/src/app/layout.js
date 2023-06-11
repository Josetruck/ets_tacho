import './globals.css'


export const metadata = {
  title: 'ETS tacógrafo',
  description: 'EuroAntas Sim Tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
