import { observer } from "mobx-react"
import { useStores } from "../../stores/storeContext"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useCallback } from "react"

const ThemeSwitcher = observer(() => {
  const { themeStore } = useStores()
  const isDark = themeStore.theme === "dark"

  const setLightTheme = useCallback(() => {
    if (isDark) {
      themeStore.toggleTheme()
    }
  }, [isDark, themeStore])

  const setDarkTheme = useCallback(() => {
    if (!isDark) {
      themeStore.toggleTheme()
    }
  }, [isDark, themeStore])

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          onClick={setLightTheme}
          variant="ghost"
          size="sm"
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium
            ${!isDark 
              ? "bg-gray-800 text-white border border-gray-700 shadow-sm" 
              : "bg-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
            }
          `}
          aria-pressed={!isDark}
          aria-label="Cambiar a tema claro"
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </Button>
        
        <Button
          onClick={setDarkTheme}
          variant="ghost"
          size="sm"
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium
            ${isDark 
              ? "bg-gray-700 text-white shadow-sm" 
              : "bg-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
            }
          `}
          aria-pressed={isDark}
          aria-label="Cambiar a tema oscuro"
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </Button>
      </div>
    </div>
  )
})

export default ThemeSwitcher