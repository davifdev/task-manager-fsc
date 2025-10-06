interface LabelTextProps {
  title?: string;
  id?: string;
}
const LabelText = ({ title, id }: LabelTextProps) => {
  return (
    <label htmlFor={id} className="text-dark-blue text-sm font-semibold">
      {title}
    </label>
  );
};

export default LabelText;
