type THeaderProps = {
  unreadMessagesCount: number;
};

const Header = ({ unreadMessagesCount }: THeaderProps) => {
  return (
    <header className="w-full border-b border-b-neutral-300 p-4">
      <h2 className="text-xl font-semibold text-neutral-800">
        Messages{unreadMessagesCount > 0 && ` (${unreadMessagesCount})`}
      </h2>
    </header>
  );
};

export default Header;
