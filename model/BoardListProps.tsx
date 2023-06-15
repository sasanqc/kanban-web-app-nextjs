interface BoardListProps {
  boards: { name: string }[];
  onChangedaActiveBoard: (acitve: number) => void;
  activeBoard: number;
  onAddNewBoard: () => void;
}
export default BoardListProps;
