import { FaRegFaceSmileWink } from "react-icons/fa6";
import EmojiPicker from "./EmojiPicker";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useState } from "react";

export default function EmojiButton({
  onSelect,
}: {
  onSelect: (emoji: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover isOpen={open} onOpenChange={setOpen} placement="top-end">
      <PopoverTrigger>
        <Button
          isIconOnly
          type="button"
          variant="light"
          size="sm"
          className="flex items-center rounded-lg font-semibold transition hover:bg-slate-100"
          aria-label="Add emoji"
        >
          <FaRegFaceSmileWink className="text-slate-500  text-xl" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <EmojiPicker onSelect={onSelect} onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
