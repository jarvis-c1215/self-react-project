import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './routes/RootLayout';
import LatestList from './routes/LatestList'
import HotList from './routes/HotList'
import HomePage from './routes/HomePage';

const router = createBrowserRouter([ //a config object
    { 
      path: '/',
      element: <RootLayout />, //
      children: [
        { path: '/', element: <HomePage />},
        { path: '/latest', element: <LatestList />},
        { path: '/hot', element: <HotList />},
      ],
    }
]);

//ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(<RouterProvider router={router}/>, document.getElementById('root'))