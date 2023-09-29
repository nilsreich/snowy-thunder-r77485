"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PlusIcon, XIcon } from "lucide-react";
import { useState, useEffect, FormEvent, useCallback } from "react";

interface Item {
  id: string;
  content: string;
  checked: boolean;
}

const loadLocalStorage = () => {
  const storedItems = localStorage.getItem("items");
  return storedItems ? JSON.parse(storedItems) : [];
};

export default function Home() {
  const [items, setItems] = useState<Item[]>(loadLocalStorage());

  const [value, setValue] = useState("");
  const addItem = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") {
      return;
    }
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        content: value,
        checked: false,
      },
    ]);
    setValue("");
  };
  const toggleItem = (id: string) => {
    // Find the index of the item with the matching ID
    const index = items.findIndex((item) => item.id === id);

    if (index !== -1) {
      // Clone the items array to avoid modifying state directly
      const updatedItems = [...items];

      // Toggle the checked property of the item
      updatedItems[index].checked = !updatedItems[index].checked;

      // Update the state with the modified items array
      setItems(updatedItems);
    }
  };

  const deleteItem = (id: string) => {
    // Use the filter method to create a new array without the item to delete
    const updatedItems = items.filter((item) => item.id !== id);

    // Update the state with the new array of items
    setItems(updatedItems);
  };

  useEffect(() => {
    const sortedItems = [...items].sort((a, b) => {
      // If 'a' is checked and 'b' is not, 'a' should come before 'b'.
      // If 'b' is checked and 'a' is not, 'b' should come before 'a'.
      // If both are checked or both are unchecked, maintain the order.
      return a.checked === b.checked ? 0 : a.checked ? 1 : -1;
    });

    setItems(sortedItems);
    localStorage.setItem("items", JSON.stringify(sortedItems));
  }, [items]);

  return (
    <div className="flex flex-col gap-2 m-2 h-[100dvh] overflow-clip relative">
      {items.map((item) => {
        return (
          <div
            className="py-2 px-4 rounded bg-foreground/10 flex items-center gap-4"
            key={item.id}
          >
            <Checkbox
              checked={item.checked}
              onCheckedChange={() => toggleItem(item.id)}
            />
            <div className={`${item.checked && "line-through"} grow`}>
              {item.content}
            </div>
            <Button variant="ghost" onClick={() => deleteItem(item.id)}>
              <XIcon className="text-foreground/50" />
            </Button>
          </div>
        );
      })}

      <form
        className="flex w-full absolute bottom-2 p-2 items-center gap-4"
        onSubmit={addItem}
      >
        <Input
          placeholder="Gemüse..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button>
          <PlusIcon />
        </Button>
      </form>
    </div>
  );
}
