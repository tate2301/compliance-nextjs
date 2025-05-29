import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "@heroicons/react/solid";

interface CategorySidebarProps {
  categories: string[];
  currentCategory: string;
  formsByCategory: Record<string, any[]>;
  completedForms: string[];
  step: number;
  onCategorySelect: (category: string) => void;
  onStepSelect: (category: string, step: number) => void;
}

export function CategorySidebar({
  categories,
  currentCategory,
  formsByCategory,
  completedForms,
  step,
  onCategorySelect,
  onStepSelect,
}: CategorySidebarProps) {
  return (
    <div className="w-full lg:w-72 lg:flex-none sticky top-0">
      <div className="flex lg:flex-col gap-2 lg:gap-1 pb-4 lg:pb-0 overflow-x-auto scrollbar-none">
        {categories.map((cat, categoryIndex) => {
          const catForms = formsByCategory[cat];
          const isCurrentCategory = cat === currentCategory;
          const isCompleted = catForms.every((form) =>
            completedForms.includes(form.id)
          );
          const isActive = isCurrentCategory;
          const isPending = categoryIndex > categories.indexOf(currentCategory);

          return (
            <div
              key={cat}
              className="flex-none lg:flex-initial min-w-[200px] lg:min-w-0"
            >
              <button
                onClick={() => onCategorySelect(cat)}
                className={cn(
                  "w-full text-left",
                  isActive && "cursor-default"
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg border-2 p-3",
                    isCompleted && "border-success-10 bg-primary/5",
                    isActive && "bg-slate-1",
                    isPending &&
                      "hover:opacity-75 transition-opacity"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                      isCompleted &&
                        "border-success-10 bg-success-4 text-white",
                      isActive && "border-primary bg-primary text-white",
                      isPending &&
                        "border-muted-foreground text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircleIcon className="h-6 w-6 text-success-10" />
                    ) : (
                      categoryIndex + 1
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className={cn("text-sm font-medium mb-1 truncate", isCompleted && "text-slate-10")}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </div>
                    <div className="text-xs text-slate-10">
                      {
                        catForms.filter((form) =>
                          completedForms.includes(form.id)
                        ).length
                      }
                      /{catForms.length} completed
                    </div>
                  </div>
                </div>
              </button>

              {isCurrentCategory && (
                <div className="ml-7 space-y-1 border-l pl-4 hidden lg:block mt-2">
                  {catForms.map((form, formIndex) => {
                    const isCompleted = completedForms.includes(form.id);
                    const isActive = formIndex + 1 === step;
                    const isPending = formIndex + 1 > step;

                    return (
                      <button
                        key={form.id}
                        onClick={() => onStepSelect(cat, formIndex + 1)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-colors",
                          isCompleted && "text-success-10",
                          isActive && "bg-slate-3 text-slate-12",
                          isPending &&
                            "text-muted-foreground hover:text-muted-foreground/80"
                        )}
                      >
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full shrink-0",
                            isCompleted && "bg-success-10",
                            isActive && "border-2 border-slate-8",
                            isPending && "border border-slate-6"
                          )}
                        />
                        <span className={cn("truncate text-slate-10", isActive && "font-semibold text-slate-12")}>{form.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}