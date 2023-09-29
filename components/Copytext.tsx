"use client";
import { useState, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const Copytext = ({ value, ...props }) => {
  const textareaRef = useRef(null);
  const { toast } = useToast();

  const copyCode = () => {
    navigator.clipboard.writeText(textareaRef.current.value);
    toast({
      title: "Copied to clipboard!",
    });
  };
  return (
    <div className="relative">
      <Textarea
        placeholder="paste your code here"
        value={value}
        ref={textareaRef}
        {...props}
      />
      <Button
        size={"icon"}
        variant={"ghost"}
        className="absolute top-1 right-1"
        onClick={copyCode}
      >
        <CopyIcon size={14} />
      </Button>
    </div>
  );
};
