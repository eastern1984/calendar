import { Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Contacts from '../components/publicPages/Contacts/Contacts'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <>
            <Contacts />
        </>
    )
}
