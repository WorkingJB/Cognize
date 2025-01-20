import { execSync } from "child_process"

try {
  console.log("Installing next-themes...")
  const output = execSync("npm install next-themes", { encoding: "utf-8" })
  console.log(output)
  console.log("Installation completed successfully.")
} catch (error) {
  console.error("Error during installation:", error.message)
}

