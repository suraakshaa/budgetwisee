import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ExpenseItem {
  id: string;
  label: string;
  amount: number;
}

interface ExpenseSectionProps {
  title: string;
  items: ExpenseItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: 'label' | 'amount', value: string | number) => void;
}

export const ExpenseSection = ({
  title,
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}: ExpenseSectionProps) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-lg transition-all duration-300 hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 items-center animate-fade-in"
          >
            <Input
              type="text"
              value={item.label}
              onChange={(e) => onUpdateItem(item.id, 'label', e.target.value)}
              placeholder="Item name"
              className="flex-1 bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                value={item.amount || ''}
                onChange={(e) => onUpdateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="pl-7 bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                min="0"
                step="0.01"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveItem(item.id)}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        onClick={onAddItem}
        variant="outline"
        className="w-full mt-4 border-border hover:bg-primary/10 hover:border-primary transition-all glow-hover"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {title.slice(0, -1)}
      </Button>
    </div>
  );
};
