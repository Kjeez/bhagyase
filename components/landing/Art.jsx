// Hand-drawn style SVG cast and motifs for the landing page.
// Pure SVG (no hooks) so it renders on the server. Moving parts carry class
// names (wave, drum-l, trot-a, flicker…) that landing.css animates; each
// rotating group sets its own transform-origin in viewBox units.

const INK = "#2A1A12";
const O = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round", strokeLinecap: "round" };
const r2 = (n) => Math.round(n * 100) / 100;

function Svg({ vb, className, children }) {
  return (
    <svg viewBox={vb} className={className} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

// An outlined limb: ink stroke under a coloured stroke, optional round hand.
function Limb({ d, color, w = 9, hand }) {
  return (
    <>
      <path d={d} fill="none" stroke={INK} strokeWidth={w + 5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      {hand && <circle cx={hand.x} cy={hand.y} r={hand.r || 5.5} fill={hand.color || color} {...O} />}
    </>
  );
}

function Face({ x, y, r = 17, skin, glasses, moustache }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={skin} {...O} />
      <circle cx={x - 6} cy={y - 1} r={2.2} fill={INK} />
      <circle cx={x + 6} cy={y - 1} r={2.2} fill={INK} />
      <path d={`M${x - 6} ${y + 7} Q${x} ${y + 13} ${x + 6} ${y + 7}`} fill="none" {...O} strokeWidth={2.2} />
      <circle cx={x - 10} cy={y + 5} r={3} fill="#E0457B" opacity=".35" />
      <circle cx={x + 10} cy={y + 5} r={3} fill="#E0457B" opacity=".35" />
      {glasses && (
        <g fill="none" {...O} strokeWidth={1.8}>
          <circle cx={x - 6} cy={y - 1} r={5} />
          <circle cx={x + 6} cy={y - 1} r={5} />
          <path d={`M${x - 1} ${y - 1} H${x + 1}`} />
        </g>
      )}
      {moustache && (
        <path
          d={`M${x - 10} ${y + 5} Q${x - 4} ${y} ${x} ${y + 3.5} Q${x + 4} ${y} ${x + 10} ${y + 5} Q${x + 4} ${y + 7} ${x} ${y + 5.5} Q${x - 4} ${y + 7} ${x - 10} ${y + 5}Z`}
          fill={INK}
        />
      )}
    </g>
  );
}

/* ------------------------------------------------------------ cast */

export function BrideG({ skin = "#C68642" }) {
  return (
    <g>
      <path d="M42 40 Q22 95 30 172 L52 172 Q46 100 60 46Z" fill="#E0457B" {...O} />
      <path d="M40 100 L16 170 Q60 184 104 170 L80 100Z" fill="#C8102E" {...O} />
      <path d="M19 161 Q60 174 101 161 L104 170 Q60 184 16 170Z" fill="#E9B949" {...O} />
      {[[40, 128], [60, 136], [80, 128], [50, 148], [70, 148], [32, 150], [88, 150]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" fill="#F5C542" />
      ))}
      <Limb d="M45 76 Q34 94 36 112" color={skin} w={8} hand={{ x: 36, y: 113, color: "#A0471F" }} />
      <path d="M44 70 Q60 63 76 70 L80 102 L40 102Z" fill="#9E0B23" {...O} />
      <path d="M41 100 H79" stroke="#E9B949" strokeWidth="4" />
      <g className="wave" style={{ transformOrigin: "76px 76px" }}>
        <Limb d="M76 76 Q92 62 94 44" color={skin} w={8} hand={{ x: 94, y: 42, color: "#A0471F" }} />
        <path d="M90 50 l-4 10 M96 50 l1 11" {...O} stroke="#E9B949" strokeWidth="2.5" />
      </g>
      <rect x="55" y="58" width="10" height="12" fill={skin} {...O} />
      <circle cx="60" cy="42" r="20" fill={INK} />
      <Face x={60} y={45} skin={skin} />
      <path d="M43 40 Q44 26 60 26 Q76 26 77 40 Q60 32 43 40Z" fill={INK} />
      <path d="M60 25 V33" stroke="#E9B949" strokeWidth="2" />
      <circle cx="60" cy="35" r="3" fill="#E9B949" stroke={INK} strokeWidth="1.5" />
      <path d="M38 44 Q60 12 82 44" fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" />
      <path d="M38 44 Q60 12 82 44" fill="none" stroke="#E0457B" strokeWidth="7" strokeLinecap="round" />
      <path d="M38 44 Q60 12 82 44" fill="none" stroke="#FFD54A" strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" />
      <circle cx="66" cy="50" r="3.5" fill="none" stroke="#E9B949" strokeWidth="1.8" />
    </g>
  );
}

export function GroomG({ skin = "#8D5524", safa = "#F08A24", coat = "#FBE7C2" }) {
  return (
    <g>
      <Limb d="M52 140 L50 170" color="#FFF8EC" w={10} />
      <Limb d="M68 140 L70 170" color="#FFF8EC" w={10} />
      <ellipse cx="47" cy="173" rx="8" ry="4" fill="#E9B949" {...O} />
      <ellipse cx="73" cy="173" rx="8" ry="4" fill="#E9B949" {...O} />
      <Limb d="M43 78 Q34 100 38 122" color={coat} w={10} hand={{ x: 38, y: 124, color: skin }} />
      <path d="M40 70 Q60 62 80 70 L87 146 L33 146Z" fill={coat} {...O} />
      <path d="M36 138 H84" stroke="#C9A24A" strokeWidth="5" />
      {[82, 94, 106, 118, 130].map((y) => <circle key={y} cx="60" cy={y} r="2.2" fill="#C9A24A" />)}
      <path d="M45 71 L82 136 L76 141 L41 78Z" fill="#8E1B3A" {...O} />
      <g className="wave" style={{ transformOrigin: "78px 78px" }}>
        <Limb d="M78 78 Q96 68 98 50" color={coat} w={10} hand={{ x: 98, y: 47, color: skin }} />
      </g>
      <rect x="55" y="58" width="10" height="12" fill={skin} {...O} />
      <Face x={60} y={46} skin={skin} />
      {safa ? (
        <>
          <path d="M76 36 Q92 50 86 80 L79 78 Q84 54 70 40Z" fill={safa} {...O} />
          <path d="M41 42 Q40 18 60 17 Q80 18 79 42 Q60 33 41 42Z" fill={safa} {...O} />
          <path d="M45 33 Q60 24 76 31 M44 26 Q58 20 72 22" fill="none" {...O} strokeWidth="1.8" />
          <path d="M64 22 Q66 10 76 4 Q70 14 70 22" fill="#FFF8EC" {...O} strokeWidth="1.8" />
          <circle cx="63" cy="27" r="4" fill="#C8102E" stroke="#C9A24A" strokeWidth="2" />
        </>
      ) : (
        <path d="M43 42 Q44 26 60 26 Q76 26 77 42 Q60 34 43 42Z" fill={INK} />
      )}
    </g>
  );
}

export function DholWalaG({ skin = "#8D5524" }) {
  return (
    <g>
      <Limb d="M58 140 L54 172" color="#FFF8EC" w={11} />
      <Limb d="M80 140 L84 172" color="#FFF8EC" w={11} />
      <path d="M46 72 Q70 62 94 72 L98 142 L42 142Z" fill="#FFD54A" {...O} />
      <path d="M52 73 L92 120" stroke="#8E1B3A" strokeWidth="4" />
      <rect x="28" y="104" width="84" height="42" rx="21" fill="#0F6E6E" {...O} />
      <path d="M42 107 L50 143 L60 107 L70 143 L80 107 L90 143 L98 107" fill="none" stroke="#F5C542" strokeWidth="2.5" />
      <ellipse cx="30" cy="125" rx="9" ry="21" fill="#FFF1D6" {...O} />
      <ellipse cx="110" cy="125" rx="9" ry="21" fill="#FFF1D6" {...O} />
      <g className="drum-l" style={{ transformOrigin: "50px 78px" }}>
        <Limb d="M50 78 Q34 92 30 108" color="#FFD54A" w={10} hand={{ x: 30, y: 110, color: skin }} />
        <path d="M30 110 L14 116" {...O} strokeWidth="3.5" />
      </g>
      <g className="drum-r" style={{ transformOrigin: "90px 78px" }}>
        <Limb d="M90 78 Q106 92 110 108" color="#FFD54A" w={10} hand={{ x: 110, y: 110, color: skin }} />
        <path d="M110 110 Q124 104 121 94" fill="none" {...O} strokeWidth="3.5" />
      </g>
      <rect x="65" y="58" width="10" height="12" fill={skin} {...O} />
      <Face x={70} y={46} skin={skin} moustache />
      <path d="M86 26 Q100 20 102 8" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <path d="M86 26 Q100 20 102 8" fill="none" stroke="#E0457B" strokeWidth="5" strokeLinecap="round" />
      <path d="M51 40 Q50 20 70 19 Q90 20 89 40 Q70 32 51 40Z" fill="#E0457B" {...O} />
      <path d="M55 30 Q70 23 85 30" fill="none" {...O} strokeWidth="1.8" />
    </g>
  );
}

export function KidG({ skin = "#E0AC69", dress = "#E0457B", girl = true, sparkler = true }) {
  return (
    <g>
      <Limb d="M34 98 L32 122" color={skin} w={7} />
      <Limb d="M46 98 L48 122" color={skin} w={7} />
      <path
        d={girl ? "M28 62 Q40 56 52 62 L60 102 Q40 108 20 102Z" : "M30 62 Q40 56 50 62 L53 102 L27 102Z"}
        fill={dress}
        {...O}
      />
      <Limb d="M31 66 Q22 80 24 92" color={skin} w={6.5} hand={{ x: 24, y: 93, r: 4.5 }} />
      <g className="wave" style={{ transformOrigin: "49px 66px" }}>
        <Limb d="M49 66 Q60 54 62 40" color={skin} w={6.5} hand={{ x: 62, y: 38, r: 4.5 }} />
        {sparkler && (
          <g>
            <path d="M62 38 L66 14" stroke="#7A5C3A" strokeWidth="2" />
            <g className="spark" style={{ transformOrigin: "66px 12px" }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <path key={a} d="M66 12 L66 2" transform={`rotate(${a} 66 12)`} stroke="#FFC93C" strokeWidth="2" strokeLinecap="round" />
              ))}
              <circle cx="66" cy="12" r="3" fill="#FFF8EC" />
            </g>
          </g>
        )}
      </g>
      <circle cx="40" cy="38" r="17" fill={INK} />
      {girl && (
        <>
          <circle cx="22" cy="34" r="6" fill={INK} />
          <circle cx="58" cy="34" r="6" fill={INK} />
        </>
      )}
      <Face x={40} y={42} r={15} skin={skin} />
      <path d="M26 38 Q28 24 40 24 Q52 24 54 38 Q40 30 26 38Z" fill={INK} />
    </g>
  );
}

export function DadiG({ skin = "#C68642" }) {
  return (
    <g>
      <path d="M30 76 Q55 66 80 76 L90 172 Q55 180 20 172Z" fill="#FFF1D6" {...O} />
      <path d="M78 76 L40 172 L26 170 L70 74Z" fill="#8E1B3A" {...O} />
      <path d="M22 164 Q55 172 88 164" fill="none" stroke="#8E1B3A" strokeWidth="5" />
      <Limb d="M34 82 Q30 104 46 108" color="#FFF1D6" w={9} hand={{ x: 48, y: 108, color: skin }} />
      <Limb d="M76 82 Q82 104 66 108" color="#FFF1D6" w={9} hand={{ x: 64, y: 108, color: skin }} />
      <ellipse cx="56" cy="104" rx="25" ry="6" fill="#E9B949" {...O} />
      <circle cx="44" cy="101" r="3" fill="#E0457B" />
      <circle cx="68" cy="101" r="3" fill="#F5A524" />
      <path d="M49 100 Q56 107 63 100Z" fill="#B5651D" {...O} strokeWidth="1.8" />
      <path className="flicker" style={{ transformOrigin: "56px 99px" }} d="M56 99 Q50 92 56 83 Q62 92 56 99Z" fill="#F5A524" {...O} strokeWidth="1.5" />
      <rect x="50" y="58" width="10" height="12" fill={skin} {...O} />
      <circle cx="55" cy="40" r="19" fill="#B9B4AC" />
      <Face x={55} y={45} skin={skin} glasses />
      <path d="M41 38 Q44 30 55 30 Q66 30 69 38 Q55 34 41 38Z" fill="#B9B4AC" />
      <path d="M33 48 Q31 19 55 17 Q79 19 77 48 Q75 28 55 26 Q35 28 33 48Z" fill="#FFF1D6" {...O} />
      <circle cx="55" cy="37" r="2" fill="#C8102E" />
    </g>
  );
}

export function ChachaG({ skin = "#8D5524" }) {
  return (
    <g>
      <Limb d="M52 138 Q44 156 52 172" color="#FFF8EC" w={11} />
      <Limb d="M70 138 Q86 150 82 170" color="#FFF8EC" w={11} />
      <path d="M38 72 Q60 62 82 72 Q96 110 84 146 L36 146 Q24 110 38 72Z" fill="#B8336A" {...O} />
      <path d="M60 70 V100" {...O} strokeWidth="2" />
      <g className="bhangra-l" style={{ transformOrigin: "42px 78px" }}>
        <Limb d="M42 78 Q24 70 18 50" color="#B8336A" w={10} hand={{ x: 17, y: 46, color: skin }} />
      </g>
      <g className="bhangra-r" style={{ transformOrigin: "78px 78px" }}>
        <Limb d="M78 78 Q94 60 92 38" color="#B8336A" w={10} hand={{ x: 92, y: 35, color: skin }} />
      </g>
      <rect x="55" y="58" width="10" height="12" fill={skin} {...O} />
      <circle cx="60" cy="40" r="18" fill={INK} />
      <Face x={60} y={45} skin={skin} moustache />
      <path d="M43 40 Q44 26 60 26 Q76 26 77 40 Q60 34 43 40Z" fill={INK} />
    </g>
  );
}

export function GhodiG() {
  return (
    <g>
      <path d="M50 112 Q28 120 34 152 Q40 132 54 124Z" fill="#F4EEE4" {...O} />
      <g className="trot-a" style={{ transformOrigin: "70px 132px" }}>
        <Limb d="M70 132 L66 180" color="#ECE4D8" w={10} />
      </g>
      <g className="trot-b" style={{ transformOrigin: "140px 132px" }}>
        <Limb d="M140 132 L146 180" color="#ECE4D8" w={10} />
      </g>
      <ellipse cx="104" cy="122" rx="58" ry="27" fill="#FFF8EC" {...O} />
      <path d="M140 112 Q150 76 166 62 L182 74 Q166 92 160 124Z" fill="#FFF8EC" {...O} />
      <path d="M164 58 Q186 54 196 78 Q194 88 184 86 Q174 76 162 74Z" fill="#FFF8EC" {...O} />
      <circle cx="178" cy="67" r="2.2" fill={INK} />
      <path d="M165 58 L162 45 L172 56Z" fill="#FFF8EC" {...O} />
      <path d="M161 56 Q156 32 168 22" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <path d="M161 56 Q156 32 168 22" fill="none" stroke="#C8102E" strokeWidth="5" strokeLinecap="round" />
      <path d="M150 74 Q146 96 152 116" fill="none" stroke="#C9A24A" strokeWidth="4" strokeDasharray="2 5" strokeLinecap="round" />
      <g className="trot-b" style={{ transformOrigin: "80px 136px" }}>
        <Limb d="M80 136 L78 182" color="#FFF8EC" w={10} />
      </g>
      <g className="trot-a" style={{ transformOrigin: "150px 136px" }}>
        <Limb d="M150 136 L156 182" color="#FFF8EC" w={10} />
      </g>
    </g>
  );
}

export function GroomOnGhodiG() {
  return (
    <g>
      <GhodiG />
      <g transform="translate(52 -6) scale(0.72)">
        <GroomG />
      </g>
      <path d="M68 100 Q104 90 140 100 L136 142 Q104 152 72 142Z" fill="#C8102E" {...O} />
      <path d="M73 136 Q104 146 135 136" fill="none" stroke="#E9B949" strokeWidth="4" />
      {[78, 92, 106, 120, 132].map((x) => (
        <circle key={x} cx={x} cy={144 + (x === 106 ? 4 : x === 92 || x === 120 ? 3 : 1)} r="3" fill="#E9B949" {...O} strokeWidth="1.5" />
      ))}
    </g>
  );
}

/* Standalone wrappers */
export const Bride = (p) => <Svg vb="0 0 120 190" className={p.className}><BrideG {...p} /></Svg>;
export const Groom = (p) => <Svg vb="0 0 120 190" className={p.className}><GroomG {...p} /></Svg>;
export const DholWala = (p) => <Svg vb="0 0 140 190" className={p.className}><DholWalaG {...p} /></Svg>;
export const Kid = (p) => <Svg vb="0 0 80 130" className={p.className}><KidG {...p} /></Svg>;
export const Dadi = (p) => <Svg vb="0 0 110 180" className={p.className}><DadiG {...p} /></Svg>;
export const Chacha = (p) => <Svg vb="0 0 120 190" className={p.className}><ChachaG {...p} /></Svg>;
export const GroomOnGhodi = (p) => <Svg vb="0 0 210 192" className={p.className}><GroomOnGhodiG /></Svg>;

/* ------------------------------------------------------------ motifs */

export function Marigold({ x, y, r = 9, c1 = "#F5A524", c2 = "#FFC93C" }) {
  return (
    <g>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * 36 * Math.PI) / 180;
        return <circle key={i} cx={r2(x + Math.cos(a) * r * 0.75)} cy={r2(y + Math.sin(a) * r * 0.75)} r={r2(r * 0.42)} fill={c1} />;
      })}
      <circle cx={x} cy={y} r={r2(r * 0.72)} fill={c2} />
      <circle cx={x} cy={y} r={r2(r * 0.3)} fill="#E07B00" />
    </g>
  );
}

function Leaf({ x, y, rot = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 Q9 12 0 30 Q-9 12 0 0Z" fill="#4E7D3A" stroke="#2F5223" strokeWidth="1.2" />
      <path d="M0 3 V27" stroke="#2F5223" strokeWidth="1" />
    </g>
  );
}

// Quadratic point for the toran rope (P0=(x0,6), P1=(x0+60,46), P2=(x0+120,6)).
const ropeY = (t) => r2(6 * (1 - t) ** 2 + 2 * (1 - t) * t * 46 + 6 * t * t);

// Marigold + mango-leaf garland hung across the top of a section.
export function Toran({ units = 14, className = "" }) {
  const w = units * 120;
  return (
    <svg viewBox={`0 0 ${w} 112`} preserveAspectRatio="xMidYMin slice" className={`toran ${className}`} aria-hidden="true" focusable="false">
      {Array.from({ length: units }, (_, i) => {
        const x0 = i * 120;
        const flowerColors = i % 2 ? ["#F5A524", "#FFC93C"] : ["#E86A10", "#F5A524"];
        return (
          <g key={i}>
            <path d={`M${x0} 6 Q${x0 + 60} 46 ${x0 + 120} 6`} fill="none" stroke="#8E1B3A" strokeWidth="2.5" />
            <Leaf x={x0 + 42} y={ropeY(0.35)} rot={12} />
            <Leaf x={x0 + 78} y={ropeY(0.65)} rot={-12} />
            {[0.2, 0.5, 0.8].map((t) => (
              <Marigold key={t} x={x0 + 120 * t} y={ropeY(t)} r={t === 0.5 ? 10 : 8} c1={flowerColors[0]} c2={flowerColors[1]} />
            ))}
            <g className="sway" style={{ transformOrigin: `${x0}px 6px`, animationDelay: `${(i % 5) * -0.7}s` }}>
              <path d={`M${x0} 6 V86`} stroke="#8E1B3A" strokeWidth="1.5" />
              <Marigold x={x0} y={34} r={8} />
              <Marigold x={x0} y={54} r={8} c1="#E86A10" c2="#F5A524" />
              <Marigold x={x0} y={74} r={8} />
              <circle cx={x0} cy={92} r="4" fill="#E0457B" stroke={INK} strokeWidth="1.2" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

const BULBS = ["#FFD54A", "#E0457B", "#7FD1C7", "#F5A524", "#FFF1D6"];

export function FairyLights({ units = 12, className = "" }) {
  const w = units * 100;
  return (
    <svg viewBox={`0 0 ${w} 60`} preserveAspectRatio="xMidYMin slice" className={`fairy ${className}`} aria-hidden="true" focusable="false">
      {Array.from({ length: units }, (_, i) => {
        const x0 = i * 100;
        return (
          <g key={i}>
            <path d={`M${x0} 8 Q${x0 + 50} 44 ${x0 + 100} 8`} fill="none" stroke="#FFF1D6" strokeOpacity=".5" strokeWidth="1.5" />
            {[0.25, 0.5, 0.75].map((t, j) => {
              const y = r2(8 * (1 - t) ** 2 + 2 * (1 - t) * t * 44 + 8 * t * t) + 6;
              return (
                <circle
                  key={t}
                  className="twinkle"
                  style={{ animationDelay: `${((i * 3 + j) % 7) * -0.3}s` }}
                  cx={x0 + 100 * t}
                  cy={y}
                  r="5"
                  fill={BULBS[(i * 3 + j) % BULBS.length]}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

// Jharokha arch with hanging marigold strings — sits behind the hero phone.
export function Arch({ className }) {
  return (
    <Svg vb="0 0 400 520" className={className}>
      <path d="M20 520 V210 Q20 70 200 22 Q380 70 380 210 V520" fill="#FFF1D6" stroke="#C9A24A" strokeWidth="6" />
      <path d="M48 520 V220 Q48 98 200 54 Q352 98 352 220 V520" fill="none" stroke="#C9A24A" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
      {[70, 330].map((x) => (
        <g key={x}>
          <path d={`M${x} 150 V380`} stroke="#8E1B3A" strokeWidth="1.5" />
          {[170, 200, 230, 260, 290, 320, 350].map((y, i) => (
            <Marigold key={y} x={x} y={y} r={9} c1={i % 2 ? "#E86A10" : "#F5A524"} c2={i % 2 ? "#F5A524" : "#FFC93C"} />
          ))}
        </g>
      ))}
      <path d="M200 22 V60" stroke="#8E1B3A" strokeWidth="1.5" />
      <path d="M186 60 Q200 92 214 60Z" fill="#E9B949" stroke={INK} strokeWidth="2" />
      <circle cx="200" cy="96" r="4" fill="#E9B949" stroke={INK} strokeWidth="1.5" />
    </Svg>
  );
}

// Rangoli corner ornament.
export function Rangoli({ className }) {
  const petals = ["#E0457B", "#F5A524", "#0F6E6E", "#FFD54A", "#C8102E", "#4E7D3A"];
  return (
    <Svg vb="0 0 200 200" className={className}>
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} cx="100" cy="46" rx="14" ry="34" fill={petals[i % petals.length]} opacity=".9" transform={`rotate(${i * 30} 100 100)`} />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={`b${i}`} cx="100" cy="66" rx="8" ry="18" fill="#FFF8EC" transform={`rotate(${i * 30 + 15} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="26" fill="#C8102E" />
      <circle cx="100" cy="100" r="16" fill="#FFD54A" />
      <circle cx="100" cy="100" r="6" fill="#0F6E6E" />
    </Svg>
  );
}

/* ------------------------------------------------------------ function scenes */

function Splat({ x, y, r }) {
  return <circle cx={x} cy={y} r={r} fill="#FFC800" opacity=".9" />;
}

export function HaldiScene() {
  return (
    <Svg vb="0 0 230 192">
      <g transform="translate(-4 60)"><KidG dress="#FFC800" sparkler={false} /></g>
      <g transform="translate(152 60)"><KidG girl={false} dress="#4E7D3A" skin="#8D5524" sparkler={false} /></g>
      <g transform="translate(55 0)">
        <GroomG safa={null} coat="#FFF4C2" skin="#C68642" />
        <Splat x={51} y={50} r={5} />
        <Splat x={70} y={42} r={4} />
        <Splat x={62} y={60} r={3.5} />
        <Splat x={46} y={100} r={6} />
        <Splat x={74} y={116} r={5} />
      </g>
      <g className="bob">
        <circle cx="40" cy="40" r="4" fill="#FFC800" />
        <circle cx="196" cy="36" r="5" fill="#FFC800" />
        <circle cx="186" cy="58" r="3" fill="#FFC800" />
      </g>
      <path d="M86 172 Q115 196 144 172Z" fill="#C9A24A" {...O} />
      <ellipse cx="115" cy="172" rx="29" ry="6" fill="#FFC800" {...O} />
      <Marigold x={128} y={168} r={6} />
    </Svg>
  );
}

function MehendiHandG() {
  const henna = "#7A2E12";
  return (
    <g>
      {[[30, 22], [45, 14], [60, 16], [75, 26]].map(([x, y]) => (
        <rect key={x} x={x} y={y} width="14" height={78 - y} rx="7" fill="#C68642" {...O} />
      ))}
      <rect x="22" y="58" width="76" height="66" rx="26" fill="#C68642" {...O} />
      <path d="M26 92 Q8 78 10 62 Q16 56 24 66 L32 80" fill="#C68642" {...O} />
      <circle cx="60" cy="92" r="13" fill="none" stroke={henna} strokeWidth="2" />
      <circle cx="60" cy="92" r="6" fill="none" stroke={henna} strokeWidth="2" />
      <circle cx="60" cy="92" r="2" fill={henna} />
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx={r2(60 + Math.cos((i * Math.PI) / 4) * 18)} cy={r2(92 + Math.sin((i * Math.PI) / 4) * 18)} r="2" fill={henna} />
      ))}
      {[[37, 26], [52, 18], [67, 20], [82, 30]].map(([x, y]) => (
        <path key={x} d={`M${x - 3} ${y + 6} l3 4 l3 -4 M${x - 3} ${y + 16} l3 4 l3 -4 M${x} ${y + 26} v8`} fill="none" stroke={henna} strokeWidth="1.6" strokeLinecap="round" />
      ))}
      <rect x="34" y="122" width="52" height="9" rx="4" fill="#C8102E" {...O} />
      <rect x="34" y="131" width="52" height="7" rx="3.5" fill="#E9B949" {...O} />
    </g>
  );
}

export function MehendiScene() {
  return (
    <Svg vb="0 0 230 192">
      <g transform="translate(6 44) scale(1.05)"><MehendiHandG /></g>
      <g transform="translate(112 2)"><BrideG skin="#E0AC69" /></g>
      <g className="bob" fill="#2F5223" fontSize="22" fontFamily="serif">
        <text x="20" y="34">♪</text>
        <text x="96" y="22">♫</text>
        <text x="200" y="40">♪</text>
      </g>
    </Svg>
  );
}

export function SangeetScene() {
  return (
    <Svg vb="0 0 240 192">
      <path d="M120 0 V14" stroke="#FFF1D6" strokeWidth="1.5" />
      <path d="M120 30 L40 192 H90Z M120 30 L200 192 H150Z" fill="#FFF1D6" opacity=".08" />
      <g className="spin-slow" style={{ transformOrigin: "120px 30px" }}>
        <circle cx="120" cy="30" r="16" fill="#C9CED6" stroke="#FFF1D6" strokeWidth="2" />
        <path d="M104 30 H136 M108 22 H132 M108 38 H132 M120 14 V46 M112 16 Q108 30 112 44 M128 16 Q132 30 128 44" stroke="#8D96A3" strokeWidth="1.2" fill="none" />
      </g>
      <g className="twinkle"><path d="M88 22 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3Z" fill="#FFD54A" /></g>
      <g className="twinkle" style={{ animationDelay: "-.8s" }}><path d="M160 46 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2Z" fill="#E0457B" /></g>
      <g className="bob"><g transform="translate(0 2)"><ChachaG /></g></g>
      <g className="bob" style={{ animationDelay: "-.4s" }}><g transform="translate(112 62)"><KidG dress="#FFD54A" sparkler={false} /></g></g>
      <g className="bob" style={{ animationDelay: "-.2s" }}><g transform="translate(160 62)"><KidG girl={false} dress="#0F6E6E" skin="#8D5524" sparkler={false} /></g></g>
    </Svg>
  );
}

export function BaraatScene() {
  return (
    <Svg vb="0 0 330 196">
      <g transform="translate(0 30) scale(0.86)"><DholWalaG /></g>
      <g transform="translate(116 2)"><GroomOnGhodiG /></g>
    </Svg>
  );
}

export function PherasScene() {
  return (
    <Svg vb="0 0 220 192">
      <rect x="20" y="168" width="180" height="16" rx="4" fill="#E9B949" {...O} />
      {[34, 186].map((x) => <rect key={x} x={x - 5} y="46" width="10" height="122" fill="#C8102E" {...O} />)}
      <path d="M14 56 Q110 -6 206 56 Z" fill="#C8102E" {...O} />
      <path d="M22 54 Q110 2 198 54" fill="none" stroke="#E9B949" strokeWidth="4" />
      {[60, 90, 130, 160].map((x, i) => (
        <g key={x}>
          <path d={`M${x} ${i === 0 || i === 3 ? 38 : 26} V${i === 0 || i === 3 ? 86 : 74}`} stroke="#8E1B3A" strokeWidth="1.2" />
          <Marigold x={x} y={i === 0 || i === 3 ? 60 : 48} r={6} />
          <Marigold x={x} y={i === 0 || i === 3 ? 76 : 64} r={6} c1="#E86A10" />
        </g>
      ))}
      <path d="M80 168 L88 140 H132 L140 168Z" fill="#B5651D" {...O} />
      <g className="flicker" style={{ transformOrigin: "110px 140px" }}>
        <path d="M110 140 Q90 120 104 92 Q108 112 116 104 Q128 120 110 140Z" fill="#F5A524" {...O} />
        <path d="M110 140 Q100 128 108 112 Q112 124 118 122 Q120 132 110 140Z" fill="#FFD54A" />
      </g>
      <g className="twinkle"><circle cx="78" cy="110" r="2.5" fill="#F5A524" /><circle cx="146" cy="100" r="2" fill="#F5A524" /></g>
    </Svg>
  );
}

export function ReceptionScene() {
  return (
    <Svg vb="0 0 240 192">
      <path d="M30 176 V80 Q30 20 120 10 Q210 20 210 80 V176" fill="#0F6E6E" opacity=".25" />
      <path d="M30 176 V80 Q30 20 120 10 Q210 20 210 80 V176" fill="none" stroke="#C9A24A" strokeWidth="4" />
      <path d="M0 0 L60 190 H100Z M240 0 L180 190 H140Z" fill="#FFF8EC" opacity=".25" />
      <g transform="translate(40 -2) scale(0.96)"><BrideG skin="#C68642" /></g>
      <g transform="translate(110 -2) scale(0.96)"><GroomG skin="#E0AC69" safa="#C8102E" coat="#2B1036" /></g>
      <rect x="20" y="176" width="200" height="12" rx="4" fill="#E9B949" {...O} />
    </Svg>
  );
}
