import Image from "next/image";

export function PulseLogo({ label = true, light = false }: { label?: boolean; light?: boolean }) {
  return (
    <span className={`pulse-logo ${light ? "pulse-logo-light" : ""}`}>
      <Image src="/pulse-mark.svg" width={28} height={28} alt="Pulse" priority />
      {label && <span>PULSE</span>}
    </span>
  );
}
