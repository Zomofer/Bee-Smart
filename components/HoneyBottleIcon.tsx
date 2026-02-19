import React from 'react';
import Svg, { Rect, Mask, Path, G } from 'react-native-svg';

type Props = { color?: string; size?: number };

export default function BeehiveStackIcon({ color = '#000', size = 24 }: Props) {
  const s = size ?? 24;
  // Proporciones pensadas para viewBox 24x24
  // Barras apiladas con extremos redondeados + puerta recortada con mask.
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      {/* Máscara para recortar la puerta (arco) */}
      <Mask id="doorMask" x="0" y="0" width="24" height="24">
        {/* Fondo blanco = visible */}
        <Rect x="0" y="0" width="24" height="24" fill="#fff" />
        {/* Puerta en negro = recorta/oculta */}
        {/* Puerta centrada, arco superior y base recta */}
        <Path
          d="
            M 11 11
            A 1 1 0 0 1 13 11
            L 13 14.2
            L 11 14.2
            Z
          "
          fill="#000"
          transform="translate(0,0) scale(1.5) translate(-4.2,-6.8)"
        />
        {/*
          La puerta está escalada y posicionada para coincidir con la 3ª/4ª barra.
          Si quieres moverla: ajusta el 'translate' final (por ej. -6,-6.8) o la escala 1.5
        */}
      </Mask>

      {/* Grupo con máscara aplicada (las barras se rellenan, la puerta recorta) */}
      <G mask="url(#doorMask)" fill={color}>
        {/* Para mantener el “look” de tu referencia,
            usamos varias barras (rounded rects) de diferentes anchos */}
        {/* Barra 1 (superior, pequeña) */}
        <Rect x={8.2} y={3} width={7.6} height={2.2} rx={1.1} />
        {/* Barra 2 */}
        <Rect x={5.4} y={6} width={13.2} height={2.6} rx={1.3} />
        {/* Barra 3 */}
        <Rect x={3.4} y={9.2} width={17.2} height={2.8} rx={1.4} />
        {/* Barra 4 (donde está la puerta) */}
        <Rect x={2.2} y={12.4} width={19.6} height={2.8} rx={1.4} />
        {/* Barra 5 */}
        <Rect x={3.6} y={15.6} width={16.8} height={2.8} rx={1.4} />
        {/* Barra 6 */}
        <Rect x={5.8} y={18.6} width={12.4} height={2.6} rx={1.3} />
        {/* Barra 7 (opcional, base más pequeña) */}
        {/* <Rect x={7.2} y={21.1} width={9.6} height={2.2} rx={1.1} /> */}
      </G>
    </Svg>
  );
}