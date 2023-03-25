
import DashboardBox from '@/components/DashboardBox'
import React from 'react'

type Props = {}

const Row1 = (props: Props) => {
    return (
        <>
            <DashboardBox bgcolor="#fff" gridArea="a"></DashboardBox>
            <DashboardBox bgcolor="#fff" gridArea="b"></DashboardBox>
            <DashboardBox bgcolor="#fff" gridArea="c"></DashboardBox>
        </>
    )
}

export default Row1