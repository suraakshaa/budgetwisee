import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BudgetChartProps {
  debts: number;
  expenses: number;
  fun: number;
  savings: number;
  remaining: number;
}

export const BudgetChart = ({ debts, expenses, fun, savings, remaining }: BudgetChartProps) => {
  const data = [
    { name: 'Debts', value: debts, color: 'hsl(var(--chart-debts))' },
    { name: 'Fixed Expenses', value: expenses, color: 'hsl(var(--chart-expenses))' },
    { name: 'Fun & Leisure', value: fun, color: 'hsl(var(--chart-fun))' },
    { name: 'Savings', value: savings, color: 'hsl(var(--chart-savings))' },
  ].filter(item => item.value > 0);

  // Add remaining only if it's positive and add it to savings display
  const totalSavings = savings + (remaining > 0 ? remaining : 0);
  const displayData = data.map(item => 
    item.name === 'Savings' ? { ...item, value: totalSavings } : item
  );

  const total = debts + expenses + fun + savings + remaining;

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        <p>Enter your salary and expenses to see the visualization</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={displayData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
              color: 'hsl(var(--foreground))',
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-card/50 rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Allocated</p>
          <p className="text-2xl font-semibold">${(total - remaining).toFixed(2)}</p>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Going to Savings</p>
          <p className="text-2xl font-semibold text-chart-savings">${totalSavings.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
