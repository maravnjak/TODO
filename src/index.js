import React, { Suspense } from 'react'
import './index.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import Auth from 'components/Auth/Auth'

import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<React.StrictMode>
  <BrowserRouter>
    <RecoilRoot>
      <Suspense fallback="Loading...">
        <Auth >
          <App />
        </Auth>
      </Suspense>
    </RecoilRoot>
  </BrowserRouter>
</React.StrictMode>)

