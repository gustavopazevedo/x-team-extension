import { TMessage } from "@/types";
import { formatDate, twClassNames } from "@/utils";
import { ChangeEvent } from "react";

interface IMessageProps extends TMessage {
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Message = ({
  checked,
  content,
  read,
  timestamp,
  onChange,
}: IMessageProps) => {
  return (
    <div
      className={twClassNames(
        "w-full border-b border-b-neutral-300 bg-neutral-100 p-4 flex flex-wrap items-center gap-x-4",
        {
          ["bg-white"]: read,
        }
      )}
    >
      <label
        className={twClassNames("flex flex-1 items-center text-base gap-x-2", {
          ["font-semibold"]: !read,
        })}
      >
        <span className="flex">
          <input type="checkbox" checked={checked} onChange={onChange} />
        </span>
        {content}
      </label>
      <span className={twClassNames()}>{formatDate(timestamp)}</span>
    </div>
  );
};

export default Message;
