"use client";
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import Cards from "../components/Cards";
import Header from '../components/Header';
import Lazyloading from '@/components/Lazyloading';

function Home() {
    return (
        <Provider store={store}>
            <Header />
            <Cards />
        </Provider>
    )
}
export default Home;
