import { useState } from "react";

type TagInputFormProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

export default function TagInputForm({ tags, setTags }: TagInputFormProps) {
  const [input, setInput] = useState<string>("");

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setTags([...tags, trimmedInput]);
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mx-auto rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Tags</h2>
      <form onSubmit={addTag} className="flex flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full py-2 px-3 border-0 border-b border-gray-300 focus:outline-none focus:border-orange-500"
          placeholder="ادخل Tag ,اضغط enter"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 px-6 rounded-md"
        >
          أضف
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-200 px-3 py-1 rounded-lg flex items-center gap-2"
          >
            <span>{tag}</span>
            <button onClick={() => removeTag(tag)} className="text-red-500">
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
