import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Pages/ErrorPage.tsx'
import DogPage from './Pages/DogPage.tsx'
import OwnerPage from './Pages/OwnerPage.tsx'
import OwnerDetailsPage from './Pages/OwnerDetailsPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/Dogs",
    element: <DogPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/Owners",
    element: <OwnerPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/Owner",
    element: <OwnerDetailsPage/>,
    errorElement: <ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
