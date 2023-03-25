import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import { ResponsiveContainer, CartesianGrid, YAxis, XAxis, Tooltip, Line, LineChart, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import { useTheme, Box, Typography } from '@mui/material'
import BoxHeader from '@/components/BoxHeader';
import { useMemo } from "react"
import FlexBetween from '@/components/FlexBetween';



const Row2 = () => {

    const pieData = [
        { name: "Group A", value: 600 },
        { name: "Group B", value: 400 },
    ]

    const { palette } = useTheme()

    const pieColors = [palette.primary[800], palette.primary[300]]


    const { data: productData } = useGetProductsQuery();
    const { data: operationalData } = useGetKpisQuery();


    const modifiedData = useMemo(() => {
        return (operationalData && operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
            return {
                name: month.substring(0, 3), // Jan, Feb
                "Operational Expenses": operationalExpenses,
                "Non Operational Expenses": nonOperationalExpenses
            }
        }))
    }, [operationalData]);



    const productExpenseData = useMemo(() => {
        return (productData && productData.map(({ _id, price, expense }) => {
            return {
                id: _id,
                price, expense
            }
        }))
    }, [productData]);




    return (
        <>
            <DashboardBox bgcolor="#fff" gridArea="d">
                <BoxHeader
                    title="Operational vs Non-Operational Expenses"
                    sideText='+4%' />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={modifiedData}
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


                        {/* belongs to YAxis [ left ] */}
                        <Line yAxisId={"left"} type="monotone" dataKey="Non Operational Expenses" stroke={palette.tertiary[500]}
                        />

                        <Line yAxisId={"right"} type="monotone" dataKey="Operational Expenses" stroke={palette.primary.main}
                        />
                    </LineChart>
                </ResponsiveContainer>


            </DashboardBox>



            <DashboardBox bgcolor="#fff" gridArea="e">

                <BoxHeader
                    title="Campaings and Targets"
                    sideText='+4%' />

                <FlexBetween>

                    <PieChart width={110} height={100}
                        margin={{
                            top: 0,
                            right: -10,
                            left: 10,
                            bottom: 0,
                        }} onMouseEnter={() => { }}>
                        <Pie
                            // border
                            stroke="none"
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index]} />
                            ))}
                        </Pie>

                    </PieChart>

                    <Box ml="-0.7rem" flexBasis={"40%"} textAlign="center">
                        <Typography variant="h5"> Target Sales</Typography>
                        <Typography m="0.3rem 0" variant="h3" >83</Typography>
                        <Typography variant="h6">Finance Goals of the campaign</Typography>

                    </Box>


                    <Box flexBasis={"40%"}>
                        <Typography variant="h5"> Losses in Revenue</Typography>
                        <Typography variant="h6" >Losses down 25%</Typography>
                        <Typography variant="h5"> Profit Margin</Typography>

                        <Typography variant="h6">Margin up by 30%</Typography>

                    </Box>



                </FlexBetween>
            </DashboardBox>







            <DashboardBox bgcolor="#fff" gridArea="f">

                <BoxHeader
                    title="Product Prices vs Expenses"
                    sideText='+4%' />


                <ResponsiveContainer width="100%" height={"100%"}>
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 40,
                            left: -10,
                        }}
                    >
                        <CartesianGrid stroke={palette.grey[800]} />


                        <XAxis
                            type="number"
                            dataKey="price"
                            name="price"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: '10px' }}
                            tickFormatter={(v) => `$${v}`} />


                        <YAxis
                            type="number"
                            dataKey="expense"
                            name="expense"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: '10px' }}
                            tickFormatter={(v) => `$${v}`}
                        />

                        <ZAxis type="number" range={[20]} />
                        <Tooltip formatter={(v) => `$${v}`} />
                        <Scatter name="Product Expense" data={productExpenseData} fill={palette.tertiary[500]} />
                    </ScatterChart>
                </ResponsiveContainer>



            </DashboardBox>

        </>
    )
}

export default Row2
