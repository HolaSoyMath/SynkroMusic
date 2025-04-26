import PulseEffect from "./PulseEffect";
import PulseLogo from "./PulseLogo";

export default function LoadingPulseLogo() {

  const duration = 1500

  return (
    <div className="relative">
      <PulseEffect duration={duration} />
      <PulseLogo duration={duration} />
    </div>
  );
}
