import { observer } from "mobx-react"
import {useStores} from "../../stores/storeContext"
const ThemeSwitcher = observer(() => {
  const { themeStore } = useStores()

  return (
    <button
      className="h-8 w-8 flex items-center justify-center rounded border bg-background hover:bg-muted text-foreground transition-colors"
      onClick={() => themeStore.toggleTheme()}
    >
      {themeStore.theme === "light" ? "🌙" : "☀️"}
    </button>
  )
})

export default ThemeSwitcher
