
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api';
import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, YAxis, XAxis, Tooltip, Area, Line, Legend, LineChart, BarChart, Bar } from 'recharts';
import { useTheme } from '@mui/material'
import BoxHeader from '@/components/BoxHeader';



type Props = {}

const Row1 = (props: Props) => {

    const { palette } = useTheme()

    const { data } = useGetKpisQuery();

    const revenueExpense = useMemo(() => {
        return (data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
            return {
                name: month.substring(0, 3), // Jan, Feb
                revenue,
                expenses
            }
        }))
    }, [data]);


    const revenueProfit = useMemo(() => {
        return (data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
            return {
                name: month.substring(0, 3), // Jan, Feb
                revenue,
                profit: (revenue - expenses).toFixed(2)
            }
        }))
    }, [data]);



    const revenue = useMemo(() => {
        return (data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
            return {
                name: month.substring(0, 3), // Jan, Feb
                revenue,
            }
        }))
    }, [data]);




    return (
        <>
            <DashboardBox bgcolor="#fff" gridArea="a">
                <BoxHeader
                    title="Revenue and Expenses"
                    subtitle='top line represents revenue, bottom one for expenses'
                    sideText='+4%' />
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={revenueExpense}
                        margin={{
                            top: 15,
                            right: 20,
                            left: -10,
                            bottom: 60,
                        }}
                    >

                        {/* for background */}
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}

                        {/* for fill the chart */}

                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">

                                {/* expenses */}
                                <stop
                                    offset={"5%"}
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.5}
                                />

                                <stop
                                    offset={"95%"}
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />

                            </linearGradient>


                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">

                                {/* expenses */}
                                <stop
                                    offset={"5%"}
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.5}
                                />

                                <stop
                                    offset={"95%"}
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <XAxis dataKey="name"
                            // line extending below
                            tickLine={false}
                            style={{ fontSize: '10px' }}
                        />
                        <YAxis

                            // line extending below
                            tickLine={false}
                            style={{ fontSize: '10px' }}
                            axisLine={{ strokeWidth: "0" }}

                            // between, so that no multiple
                            domain={[8000, 23000]}

                        />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke={palette.primary.main}
                            // fill it
                            fillOpacity={1}
                            dot={true}

                            fill="url(#colorRevenue)"

                        />

                        <Area type="monotone" dataKey="expenses" stroke={palette.primary.main}
                            // fill it
                            fillOpacity={1}
                            dot={true}

                            fill="url(#colorExpenses)"

                        />
                    </AreaChart>
                </ResponsiveContainer>


            </DashboardBox>










            <DashboardBox bgcolor="#fff" gridArea="b">

                <BoxHeader
                    title="Profit and Revenue"
                    subtitle='top line represents revenue, bottom one for expenses'
                    sideText='+4%' />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={revenueProfit}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                    >

                        {/* for background */}
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />


                        <XAxis dataKey="name"
                            // line extending below
                            tickLine={false}
                            style={{ fontSize: '10px' }}
                        />
                        <YAxis
                            yAxisId={'left'}
                            orientation='left'
                            // line extending below
                            tickLine={false}
                            style={{ fontSize: '10px' }}
                            axisLine={false}
                        />

                        <YAxis
                            yAxisId={'right'}
                            orientation='right'
                            // line extending below
                            tickLine={false}
                            style={{ fontSize: '10px' }}
                            axisLine={false}
                        />


                        <Tooltip />

                        {/* below data */}
                        <Legend height={20}
                            wrapperStyle={{
                                margin: "0 0 10px 0"

                            }} />

                        {/* belongs to YAxis [ left ] */}
                        <Line yAxisId={"left"} type="monotone" dataKey="profit" stroke={palette.tertiary[500]}
                        />

                        <Line yAxisId={"right"} type="monotone" dataKey="revenue" stroke={palette.primary.main}
                        />
                    </LineChart>
                </ResponsiveContainer>

            </DashboardBox>







            <DashboardBox bgcolor="#fff" gridArea="c">


                <BoxHeader
                    title="Revenue Month by Month"
                    subtitle='graph representing the revenue month by month'
                    sideText='+4%' />

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={revenue}
                        margin={{
                            top: 17,
                            right: 15,
                            left: -5,
                            bottom: 58,
                        }}
                    >


                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">

                                {/* expenses */}
                                <stop
                                    offset={"5%"}
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.8}
                                />

                                <stop
                                    offset={"95%"}
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />

                            </linearGradient>


                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">

                                {/* expenses */}
                                <stop
                                    offset={"5%"}
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.5}
                                />

                                <stop
                                    offset={"95%"}
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>



                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
                        <Tooltip />

                        <Bar dataKey="revenue" fill="url(#colorRevenue)" />
                    </BarChart>
                </ResponsiveContainer>


            </DashboardBox>
        </>
    )
}

export default Row1