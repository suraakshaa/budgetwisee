import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExpenseSection } from "@/components/ExpenseSection";
import { BudgetChart } from "@/components/BudgetChart";

interface ExpenseItem {
  id: string;
  label: string;
  amount: number;
}

const Index = () => {
  const [salary, setSalary] = useState<number>(0);
  
  const [debts, setDebts] = useState<ExpenseItem[]>([
    { id: '1', label: 'Student Loan', amount: 0 },
    { id: '2', label: 'Credit Card', amount: 0 },
  ]);
  
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: '1', label: 'Apartment', amount: 0 },
    { id: '2', label: 'Electricity', amount: 0 },
    { id: '3', label: 'Internet', amount: 0 },
    { id: '4', label: 'Water', amount: 0 },
    { id: '5', label: 'Subscriptions', amount: 0 },
  ]);
  
  const [savings, setSavings] = useState<ExpenseItem[]>([
    { id: '1', label: 'Emergency Fund', amount: 0 },
  ]);
  
  const [fun, setFun] = useState<ExpenseItem[]>([
    { id: '1', label: 'Entertainment', amount: 0 },
  ]);

  // Helper functions
  const generateId = () => Math.random().toString(36).substring(7);
  
  const addItem = (setter: React.Dispatch<React.SetStateAction<ExpenseItem[]>>) => {
    setter(prev => [...prev, { id: generateId(), label: '', amount: 0 }]);
  };
  
  const removeItem = (setter: React.Dispatch<React.SetStateAction<ExpenseItem[]>>, id: string) => {
    setter(prev => prev.filter(item => item.id !== id));
  };
  
  const updateItem = (
    setter: React.Dispatch<React.SetStateAction<ExpenseItem[]>>,
    id: string,
    field: 'label' | 'amount',
    value: string | number
  ) => {
    setter(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Calculate totals
  const totalDebts = debts.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalSavings = savings.reduce((sum, item) => sum + item.amount, 0);
  const totalFun = fun.reduce((sum, item) => sum + item.amount, 0);
  const allocated = totalDebts + totalExpenses + totalSavings + totalFun;
  const remaining = salary - allocated;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">BudgetWise</h1>
          <div className="flex gap-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Get Started
            </button>
            <button className="text-foreground hover:text-primary transition-colors">
              Log In
            </button>
            <button className="text-foreground hover:text-primary transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home"
        className="min-h-screen flex items-center justify-center relative gradient-hero pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            See where your money goes
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Simple, smart budgeting that works for you
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Enter your salary, list your expenses, and visualize your financial flow instantly.
          </p>
          <Button 
            size="lg"
            onClick={() => scrollToSection('dashboard')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-hover text-lg px-8 py-6 rounded-xl"
          >
            Get Started
            <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Your Budget Dashboard</h2>
            <p className="text-muted-foreground text-lg">
              Track your income and expenses in one place
            </p>
          </div>

          {/* Salary Input */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg mb-8 animate-fade-in">
            <label className="block text-xl font-semibold mb-4">
              Enter Your Monthly Salary
            </label>
            <div className="relative max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                $
              </span>
              <Input
                type="number"
                value={salary || ''}
                onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="pl-8 text-lg h-14 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                min="0"
                step="0.01"
              />
            </div>
            <p className="mt-4 text-3xl font-bold text-primary">
              ${salary.toFixed(2)}
            </p>
          </div>

          {/* Expense Sections Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ExpenseSection
              title="Debts"
              items={debts}
              onAddItem={() => addItem(setDebts)}
              onRemoveItem={(id) => removeItem(setDebts, id)}
              onUpdateItem={(id, field, value) => updateItem(setDebts, id, field, value)}
            />
            
            <ExpenseSection
              title="Fixed Expenses"
              items={expenses}
              onAddItem={() => addItem(setExpenses)}
              onRemoveItem={(id) => removeItem(setExpenses, id)}
              onUpdateItem={(id, field, value) => updateItem(setExpenses, id, field, value)}
            />
            
            <ExpenseSection
              title="Savings"
              items={savings}
              onAddItem={() => addItem(setSavings)}
              onRemoveItem={(id) => removeItem(setSavings, id)}
              onUpdateItem={(id, field, value) => updateItem(setSavings, id, field, value)}
            />
            
            <ExpenseSection
              title="Fun & Leisure"
              items={fun}
              onAddItem={() => addItem(setFun)}
              onRemoveItem={(id) => removeItem(setFun, id)}
              onUpdateItem={(id, field, value) => updateItem(setFun, id, field, value)}
            />
          </div>

          {/* Summary and Chart */}
          <div className="bg-card rounded-xl p-8 border border-border shadow-lg animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-center">Budget Visualization</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-card/50 rounded-lg border border-border">
                  <span className="text-muted-foreground">Monthly Salary</span>
                  <span className="font-semibold text-lg">${salary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-card/50 rounded-lg border border-border">
                  <span className="text-muted-foreground">Total Debts</span>
                  <span className="font-semibold text-lg text-chart-debts">${totalDebts.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-card/50 rounded-lg border border-border">
                  <span className="text-muted-foreground">Fixed Expenses</span>
                  <span className="font-semibold text-lg text-chart-expenses">${totalExpenses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-card/50 rounded-lg border border-border">
                  <span className="text-muted-foreground">Fun & Leisure</span>
                  <span className="font-semibold text-lg text-chart-fun">${totalFun.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-card/50 rounded-lg border border-border">
                  <span className="text-muted-foreground">Planned Savings</span>
                  <span className="font-semibold text-lg text-chart-savings">${totalSavings.toFixed(2)}</span>
                </div>
                {remaining > 0 && (
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary">
                    <span className="text-foreground font-medium">Unallocated (→ Savings)</span>
                    <span className="font-bold text-lg text-primary">${remaining.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <BudgetChart
                debts={totalDebts}
                expenses={totalExpenses}
                fun={totalFun}
                savings={totalSavings}
                remaining={remaining}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 BudgetWise. Designed with ❤️ for simplicity.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
