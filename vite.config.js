import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      include: ['src/api/**', 'src/utils/**', 'src/hooks/**', 'src/components/orders/**', 'src/components/navbar/NotificationDropdown.jsx'],
      reporter: ['text', 'text-summary'],
      thresholds: { lines: 65, functions: 65, statements: 65 },
    },
  },
})
