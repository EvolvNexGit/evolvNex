import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const config = [
  ...nextVitals,
  ...nextTs,
  {
    // These React Compiler-era rules flag long-standing, working patterns in the animation
    // and mount-detection code (setState in a mount effect, ref sync during render).
    // Kept as warnings so they stay visible without blocking lint; refactor separately.
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
  { ignores: ['.next/**', 'node_modules/**', 'docs/**', 'next-env.d.ts'] },
]

export default config
