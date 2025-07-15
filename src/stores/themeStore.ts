import { makeAutoObservable } from "mobx"

export class ThemeStore {
  theme: "light" | "dark" = "light"

  constructor() {
    makeAutoObservable(this)

    // Al cargar, lee el tema guardado o el preferido por el SO
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    if (saved) {
      this.theme = saved
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.theme = "dark"
    }

    this.applyTheme()
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light"
    localStorage.setItem("theme", this.theme)
    this.applyTheme()
  }

  applyTheme() {
    const root = window.document.documentElement
    if (this.theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }
}

// Exporta una instancia global
export const themeStore = new ThemeStore()
