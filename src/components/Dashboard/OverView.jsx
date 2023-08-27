import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const OverView = ({ data }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="createdAt"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="price"
          fill="#3498db"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default OverView;
