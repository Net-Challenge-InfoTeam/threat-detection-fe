import Icons from "src/assets/Icons";
import colorSet from "src/styles/colorSet";

interface MarkderProps {
  onClick?: () => void;
}

interface MarkerGeneratorProps extends MarkderProps {
  color?: string;
  icon?: React.ReactNode;
}

const MarkerGenerator = ({
  color = colorSet.primary,
  icon,
  onClick,
}: MarkerGeneratorProps) => {
  const markerOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={markerOnClick}
      style={{
        position: "relative",
        bottom: "24px",
      }}
    >
      {/* icon */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "12px",
        }}
      >
        {icon}
        {!icon && <Icons.Safe size="20px" color={colorSet.white} />}
      </div>
      <svg
        width="44"
        height="67"
        viewBox="0 0 44 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="22" cy="20" r="20" fill={color} />
        <path d="M22 67L2.94744 26.5L41.0526 26.5L22 67Z" fill={color} />
      </svg>
    </div>
  );
};

export default MarkerGenerator;

export const CautionMarker = ({ onClick }: MarkderProps) => {
  return (
    <MarkerGenerator
      color={colorSet.caution}
      icon={<Icons.Caution size="20px" color={colorSet.white} />}
      onClick={onClick}
    />
  );
};

export const ThreatMarker = ({ onClick }: MarkderProps) => {
  return (
    <MarkerGenerator
      color={colorSet.threat}
      icon={<Icons.Threat size="20px" color={colorSet.white} />}
      onClick={onClick}
    />
  );
};
